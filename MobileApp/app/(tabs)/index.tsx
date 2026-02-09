import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Translation Object
const TRANSLATIONS = {
  en: {
    searchPlaceholder: 'Who Are You Looking For?',
    searchYourself: 'SEARCH YOURSELF',
    letUsPlan: 'LET US PLAN',
    swipeUp: 'SWIPE UP FOR CATEGORIES',
    categoriesTitle: 'SERVICE PROVIDER CATEGORIES',
    categories: {
      'DJ Artist': 'DJ Artist',
      'Event Planner': 'Event Planner',
      'Plumber': 'Plumber',
      'Beautician': 'Beautician',
      'Electrician': 'Electrician',
      'Catering': 'Catering',
      'Photography': 'Photography',
      'LED Wall Provider': 'LED Wall Provider',
      'Sound System': 'Sound System',
      'Decoration': 'Decoration',
      'Videography': 'Videography',
      'Florist': 'Florist',
      'Transportation': 'Transportation',
    }
  },
  si: {
    searchPlaceholder: 'ඔබ කාව සොයනවාද?',
    searchYourself: 'ඔබම සොයන්න',
    letUsPlan: 'අපි සැලසුම් කරමු',
    swipeUp: 'කාණ්ඩ සඳහා ඉහළට ස්වයිප් කරන්න',
    categoriesTitle: 'සේවා සපයන්නන්ගේ කාණ්ඩ',
    categories: {
      'DJ Artist': 'DJ කලාකරු',
      'Event Planner': 'උත්සව සැලසුම්කරු',
      'Plumber': 'ජලනල කාර්මිකයා',
      'Beautician': 'රූපලාවන්‍ය ශිල්පියා',
      'Electrician': 'විදුලි කාර්මිකයා',
      'Catering': 'ආහාර සේවාව',
      'Photography': 'ඡායාරූපකරණය',
      'LED Wall Provider': 'LED තිර සපයන්නා',
      'Sound System': 'ශබ්ද පද්ධතිය',
      'Decoration': 'සැරසිලි',
      'Videography': 'වීඩියෝ රූපකරණය',
      'Florist': 'මල් අලෙවිකරු',
      'Transportation': 'ප්‍රවාහනය',
    }
  }
};

// Category Data
const CATEGORIES = [
  { id: 1, name: 'DJ Artist', icon: '🎧' },
  { id: 2, name: 'Event Planner', icon: '📅' },
  { id: 3, name: 'Plumber', icon: '🔧' },
  { id: 4, name: 'Beautician', icon: '💄' },
  { id: 5, name: 'Electrician', icon: '⚡' },
  { id: 6, name: 'Catering', icon: '🍽️' },
  { id: 7, name: 'Photography', icon: '📷' },
  { id: 8, name: 'LED Wall Provider', icon: '💡' },
  { id: 9, name: 'Sound System', icon: '🔊' },
  { id: 10, name: 'Decoration', icon: '🎨' },
  { id: 11, name: 'Videography', icon: '🎥' },
  { id: 12, name: 'Florist', icon: '🌸' },
  { id: 13, name: 'Transportation', icon: '🚗' }
];

export default function HomeScreen() {
  const router = useRouter();
  const [isSinhala, setIsSinhala] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const t = isSinhala ? TRANSLATIONS.si : TRANSLATIONS.en;

  // --- ANIMATION SETUP ---
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '75%'], []);
  const animatedIndex = useSharedValue(0);

  // Track when the sheet is expanding to disable touches on toggle
  useAnimatedReaction(
    () => animatedIndex.value,
    (currentValue) => {
      if (currentValue > 0.15) {
        runOnJS(setSheetExpanded)(true);
      } else {
        runOnJS(setSheetExpanded)(false);
      }
    },
    []
  );

  // 1. LOGO ANIMATION (Center -> Top Left)
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedIndex.value, [0, 1], [0, -120], Extrapolation.CLAMP);
    const translateX = interpolate(animatedIndex.value, [0, 1], [0, -width / 2 + 60], Extrapolation.CLAMP);
    const scale = interpolate(animatedIndex.value, [0, 1], [1, 0.35], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  // 2. SEARCH BAR ANIMATION (Center -> Top Right)
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedIndex.value, [0, 1], [0, -120], Extrapolation.CLAMP);
    const widthAnim = interpolate(animatedIndex.value, [0, 1], [width * 0.9, width * 0.95], Extrapolation.CLAMP);

    return {
      width: widthAnim,
      transform: [{ translateY }],
    };
  });

  // 3. FADE OUT ANIMATION (Elements that disappear)
  const fadeOutStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [0, 0.2], [1, 0], Extrapolation.CLAMP);
    return { opacity };
  });

  // @ts-ignore
  // @ts-ignore
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>

          {/* --- TOP BAR (Language) --- */}
          <View style={styles.topBar}>
             <View style={{width: 50}} />
             <View style={styles.langContainer}>
              <Text style={styles.langText}>ENG | සිං</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#E37322" }}
                thumbColor={"#f4f3f4"}
                onValueChange={() => setIsSinhala(!isSinhala)}
                value={isSinhala}
                style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
              />
            </View>
          </View>

          {/* --- MAIN CONTENT AREA --- */}
          <View style={styles.contentContainer}>

            {/* Animated Logo */}
            <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
              <Image
                source={require('../../assets/images/provider-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Animated Search Bar */}
            <Animated.View style={[styles.searchWrapper, searchBarAnimatedStyle]}>
              <View style={styles.searchBar}>
                <TextInput
                  placeholder={t.searchPlaceholder}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  style={styles.searchInput}
                />
                <Text style={{ color: 'white', fontSize: 18 }}>🔎</Text>
              </View>
            </Animated.View>

            {/* Mode Toggle — disabled when sheet is expanded */}
            <Animated.View
              style={[styles.toggleWrapper, fadeOutStyle]}
              pointerEvents={sheetExpanded ? 'none' : 'auto'}
            >
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleBtn, !isAiMode && styles.activeWhiteBtn]}
                  onPress={() => setIsAiMode(false)}
                >
                  <Text style={[styles.toggleText, !isAiMode && styles.activeBlueText]}>
                    {t.searchYourself}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.toggleBtn, isAiMode && styles.activeOrangeBtn]}
                  onPress={() => router.push('/AiPage')}
                >
                  <Text style={[styles.toggleText, isAiMode && styles.activeWhiteText]}>
                    {t.letUsPlan}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

          </View>

          {/* --- SWIPE INDICATORS --- */}
          <Animated.View
            style={[styles.swipeIndicator, fadeOutStyle]}
            pointerEvents={sheetExpanded ? 'none' : 'auto'}
          >
             <Text style={styles.arrowText}>^</Text>
             <Text style={styles.swipeText}>{t.swipeUp}</Text>
          </Animated.View>

          {/* --- BOTTOM SHEET --- */}
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            animatedIndex={animatedIndex}
            handleIndicatorStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', width: 40 }}
            backgroundStyle={{ backgroundColor: '#F0F8FF' }}
            enableOverDrag={false}
            enablePanDownToClose={false}
            maxDynamicContentSize={height * 0.55}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.sheetContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sheetTitle}>{t.categoriesTitle}</Text>

              <View style={styles.grid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity key={cat.id} style={styles.card}>
                    <Text style={{ fontSize: 32 }}>{cat.icon}</Text>
                    <Text style={styles.cardText}>{t.categories[cat.name as keyof typeof TRANSLATIONS.en.categories]}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Space for Bottom Tab Bar */}
              <View style={{ height: 100 }} />
            </BottomSheetScrollView>
          </BottomSheet>

        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    zIndex: 20,
  },
  langContainer: { flexDirection: 'row', alignItems: 'center' },
  langText: { color: 'white', fontWeight: '700', marginRight: 5 },

  // Main Content
  contentContainer: {
    alignItems: 'center',
    marginTop: 60,
    zIndex: 10,
  },

  // Logo
  logoWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  logoImage: { width: '100%', height: '100%' },

  // Search Bar
  searchWrapper: {
    marginTop: 30
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    width: '100%',
  },
  searchInput: { flex: 1, color: 'white', fontSize: 16, fontWeight: '600', marginRight: 10 },

  // Toggle
  toggleWrapper: { marginTop: 40 },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 30,
    width: width * 0.75,
    padding: 4,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 25, alignItems: 'center' },
  activeWhiteBtn: { backgroundColor: 'white' },
  activeOrangeBtn: { backgroundColor: '#E37322' },
  toggleText: { color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: 12 },
  activeBlueText: { color: '#0072FF' },
  activeWhiteText: { color: 'white' },

  // Swipe Indicators
  swipeIndicator: { position: 'absolute', bottom: '16%', width: '100%', alignItems: 'center' },
  arrowText: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  swipeText: { color: 'white', fontWeight: '700', letterSpacing: 1 },

  // Bottom Sheet
  sheetContent: { padding: 20, alignItems: 'center' },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0072FF',
    marginBottom: 20,
    marginTop: 10
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  card: {
    width: '46%',
    backgroundColor: '#89CFF0',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: { marginTop: 10, fontWeight: '600', color: '#333', textAlign: 'center' }
});
