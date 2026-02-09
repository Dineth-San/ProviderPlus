import React, { useEffect, useRef } from 'react';
import { Image, View, StyleSheet, Platform, Animated, TouchableOpacity, Text } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';

const FrostyTabBarBackground = ({ borderRadius }: { borderRadius: any }) => {
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={25}
      tint="light"
      style={[StyleSheet.absoluteFill, { borderRadius: 24, overflow: 'hidden', backgroundColor: 'transparent' }]}
    />
  );
};

// ─── Custom Animated Tab Bar ─────────────────────────────────────────
function AnimatedTabBar({ state, descriptors, navigation }: any) {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/index';
  const isDarkbgPage = pathname.includes('UserLogin') || pathname.includes('Alerts');

  const activeTintColor = '#0056D2';
  const inactiveTintColor = isDarkbgPage ? 'rgba(255,255,255, 0.6)' : 'rgba(0,0,0, 0.5)';

  // Animation: 1 = home (full), 0 = floating (other pages)
  const anim = useRef(new Animated.Value(isHomePage ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isHomePage ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 10,
    }).start();
  }, [isHomePage]);

  // ── Interpolations ──
  const animBottom = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [Platform.OS === 'ios' ? 20 : 22, -5],
  });
  const animLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [9, 0],
  });
  const animRight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [9, 0],
  });
  const animBorderRadius = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 20],
  });
  const animHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Platform.OS === 'ios' ? 72 : 68,
      Platform.OS === 'ios' ? 90 : 80,
    ],
  });
  const animBorderTopWidth = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  // Border color (not animated, changes instantly based on page)
  const borderColor = isDarkbgPage ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.25)';

  // Icon sources mapped by route name
  const iconMap: Record<string, any> = {
    index: require('../../assets/images/home.png'),
    Survy: require('../../assets/images/survy.png'),
    Alerts: require('../../assets/images/alerts.png'),
    UserLogin: require('../../assets/images/account.png'),
  };

  const labelMap: Record<string, string> = {
    index: 'HOME',
    Survy: 'SURVY',
    Alerts: 'ALERTS',
    UserLogin: 'ACCOUNT',
  };

  return (
    <Animated.View
      style={[
        styles.tabBarOuter,
        {
          bottom: animBottom,
          left: animLeft,
          right: animRight,
          height: animHeight,
          borderRadius: animBorderRadius,
          borderTopWidth: animBorderTopWidth,
          borderColor: borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
      ]}
    >
      {/* Blur background */}
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={25}
        tint="light"
        style={[StyleSheet.absoluteFill, { overflow: 'hidden', backgroundColor: 'transparent' }]}
      />

      {/* Tab items */}
      <View style={styles.tabRow}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          const label = labelMap[route.name] || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Image
                source={iconMap[route.name]}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: tintColor,
                }}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: tintColor },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
}

// ─── Main Tab Layout ─────────────────────────────────────────────────
export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const isDarkbgPage = pathname.includes('UserLogin') || pathname.includes('Alerts');

  const activeTintColor = '#0056D2';
  const inactiveTintColor = isDarkbgPage ? 'rgba(255,255,255, 0.6)' : 'rgba(0,0,0, 0.5)';

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
        }}
      />

      {/* 2. SURVY */}
      <Tabs.Screen
        name="Survy"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/AiPage');
          },
        })}
        options={{
          title: 'SURVY',
        }}
      />

      {/* 3. ALERTS */}
      <Tabs.Screen
        name="Alerts"
        options={{
          title: 'ALERTS',
        }}
      />

      {/* 4. ACCOUNT */}
      <Tabs.Screen
        name="UserLogin"
        options={{
          title: 'ACCOUNT',
        }}
      />
    </Tabs>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    elevation: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    overflow: 'hidden',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : -2,
  },
  tabRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -4,
    marginBottom: Platform.OS === 'ios' ? 6 : 10,
    letterSpacing: 0.3,
  },
});
