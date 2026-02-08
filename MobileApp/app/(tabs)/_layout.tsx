import React from 'react';
import { Image, View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, useRouter } from 'expo-router';

// Solid frosted glass look — no blur needed, works everywhere
const FrostyTabBarBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.glassContainer]}>
      {/* Base: semi-transparent white */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />
      {/* Top edge highlight for glass effect */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.05)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFill]}
      />
    </View>
  );
};

export default function TabLayout() {
  const router = useRouter();

  const activeTintColor = '#0056D2';
  const inactiveTintColor = 'rgba(0,0,0, 0.5)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -4,
          marginBottom: Platform.OS === 'ios' ? 6 : 10,
          letterSpacing: 0.3,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 20 : 22,
          left: 16,
          right: 16,
          elevation: 0,
          backgroundColor: 'rgba(255, 255, 255)',
          borderTopWidth: 0,
          borderRadius: 24,
          height: Platform.OS === 'ios' ? 72 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 8 : 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          overflow: 'hidden',
        },
        tabBarBackground: () => <FrostyTabBarBackground />,
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}>

      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? activeTintColor : inactiveTintColor,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 2. SURVY → navigates to AiPage */}
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/survy.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? activeTintColor : inactiveTintColor,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 3. ALERTS */}
      <Tabs.Screen
        name="Alerts"
        options={{
          title: 'ALERTS',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/alerts.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? activeTintColor : inactiveTintColor,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 4. ACCOUNT */}
      <Tabs.Screen
        name="UserLogin"
        options={{
          title: 'ACCOUNT',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/account.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? activeTintColor : inactiveTintColor,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
});