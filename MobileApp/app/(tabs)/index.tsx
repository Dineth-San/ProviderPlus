import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fetchAllCategories } from '../services/categoryService';
import { useLanguage } from '../context/LanguageContext';
import { useBlockBack } from '../hooks/useBlockBack';

const { width, height } = Dimensions.get('window');

// Soft accent tints for each card icon bubble — cycles automatically
const CARD_TINTS = ['#DDEEFF', '#D6F0FF', '#E0EAFF', '#D8F3DC', '#FFF0DC', '#FFE8F0'];

export default function HomeScreen() {
  useBlockBack();
  const router = useRouter();
  const [isAiMode, setIsAiMode] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['26%', '82%'], []);
  const animatedIndex = useSharedValue(0);

  const { isSinhala, toggleLanguage, t, isTranslating } = useLanguage();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
        setFilteredCategories(data);
      } catch (error) {
        console.error('Failed to load categories on Home Screen.');
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  useAnimatedReaction(
      () => animatedIndex.value,
      (currentValue) => {
        if (currentValue > 0.3) runOnJS(setSheetExpanded)(true);
        else runOnJS(setSheetExpanded)(false);
      },
      []
  );

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleSearchSubmit = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredCategories(categories);
      setIsSearchActive(false);
      return;
    }
    const results = categories.filter((cat) =>
        cat.name.toLowerCase().includes(query)
    );
    setFilteredCategories(results);
    setIsSearchActive(true);
    bottomSheetRef.current?.snapToIndex(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredCategories(categories);
    setIsSearchActive(false);
    bottomSheetRef.current?.snapToIndex(0);
  };

  /* ── Animated styles (unchanged logic) ── */
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedIndex.value, [0.2, 1], [0, -120], Extrapolation.CLAMP);
    const translateX = interpolate(animatedIndex.value, [0.2, 1], [0, -width / 2 + 60], Extrapolation.CLAMP);
    const scale = interpolate(animatedIndex.value, [0.2, 1], [1, 0.35], Extrapolation.CLAMP);
    return { transform: [{ translateY }, { translateX }, { scale }] };
  });

  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedIndex.value, [0.2, 1], [0, -120], Extrapolation.CLAMP);
    const widthAnim = interpolate(animatedIndex.value, [0.2, 1], [width * 0.9, width * 0.95], Extrapolation.CLAMP);
    return { width: widthAnim, transform: [{ translateY }] };
  });

  const fadeOutStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [0.2, 0.6], [1, 0], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.container}>
          <SafeAreaView style={styles.safeArea}>

            {/* ── TOP BAR ── */}
            <View style={styles.topBar}>
              <View style={{ width: 50 }} />
              <View style={styles.topBarRight}>
                <View style={styles.languageToggle}>
                  <Text style={[styles.langLabel, !isSinhala && styles.langLabelActive]}>ENG</Text>
                  <Text style={styles.langDivider}>|</Text>
                  <Text style={[styles.langLabel, isSinhala && styles.langLabelActive]}>සිං</Text>
                  {isTranslating && (
                      <ActivityIndicator size="small" color="#FFF" style={{ marginRight: 4 }} />
                  )}
                  <Switch
                      value={isSinhala}
                      onValueChange={toggleLanguage}
                      trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#FF6B35' }}
                      thumbColor={isSinhala ? '#fff' : '#f0f0f0'}
                      ios_backgroundColor="rgba(255,255,255,0.3)"
                      style={styles.switchStyle}
                  />
                </View>

                <TouchableOpacity style={styles.bellButton} onPress={() => router.push('/Alerts')}>
                  <Text style={styles.bellIcon}>🔔</Text>
                  {hasUnreadAlerts && <View style={styles.redDot} />}
                </TouchableOpacity>
              </View>
            </View>

            {/* ── MAIN CONTENT ── */}
            <View style={styles.contentContainer}>
              <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
                <Image
                    source={require('../../assets/images/provider-logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
              </Animated.View>

              <Animated.View style={[styles.searchWrapper, searchBarAnimatedStyle]}>
                <View style={styles.searchBar}>
                  <TextInput
                      placeholder={t('Who Are You Looking For?')}
                      placeholderTextColor="rgba(255,255,255,0.65)"
                      style={styles.searchInput}
                      value={searchQuery}
                      onChangeText={handleSearch}
                      onSubmitEditing={handleSearchSubmit}
                      returnKeyType="search"
                  />
                  {searchQuery.length > 0 ? (
                      <TouchableOpacity
                          onPress={handleClearSearch}
                          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      >
                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>✕</Text>
                      </TouchableOpacity>
                  ) : (
                      <TouchableOpacity
                          onPress={handleSearchSubmit}
                          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      >
                        <Text style={{ color: 'white', fontSize: 18 }}>🔎</Text>
                      </TouchableOpacity>
                  )}
                </View>
              </Animated.View>

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
                      {t('SEARCH YOURSELF')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[styles.toggleBtn, isAiMode && styles.activeOrangeBtn]}
                      onPress={() => router.push('/AiPage')}
                  >
                    <Text style={[styles.toggleText, isAiMode && styles.activeWhiteText]}>
                      {t('LET US PLAN')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>

            {/* ── SWIPE INDICATOR — clean, no background panel ── */}
            <Animated.View
                style={[styles.swipeIndicator, fadeOutStyle]}
                pointerEvents={sheetExpanded ? 'none' : 'auto'}
            >
              {/* Three stacked chevrons fading from dim → bright = motion feel */}
              <View style={styles.chevronStack}>
                <Text style={[styles.chevron, { color: 'rgba(255,255,255,0.18)' }]}>∧</Text>
                <Text style={[styles.chevron, { color: 'rgba(255,255,255,0.5)', marginTop: -12 }]}>∧</Text>
                <Text style={[styles.chevron, { color: 'rgba(255,255,255,0.95)', marginTop: -12 }]}>∧</Text>
              </View>
              <Text style={styles.swipeLabel}>{t('SWIPE UP FOR CATEGORIES')}</Text>
            </Animated.View>

            {/* ── BOTTOM SHEET ── */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                animatedIndex={animatedIndex}
                handleIndicatorStyle={styles.sheetHandle}
                backgroundStyle={styles.sheetBg}
                enableOverDrag={false}
                enablePanDownToClose={false}
            >
              <BottomSheetScrollView
                  contentContainerStyle={styles.sheetContent}
                  showsVerticalScrollIndicator={false}
              >

                {/* Header */}
                {isSearchActive ? (
                    <View style={styles.searchHeaderRow}>
                      <View style={styles.searchIconBubble}>
                        <Text style={{ fontSize: 14 }}>🔍</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.sheetTitleSearch} numberOfLines={1}> {searchQuery}</Text>
                        <Text style={styles.sheetSubtitle}>
                          {filteredCategories.length} {filteredCategories.length === 1 ? 'result' : 'results'} found
                        </Text>
                      </View>
                      <TouchableOpacity onPress={handleClearSearch} style={styles.clearPill}>
                        <Text style={styles.clearPillText}>✕  Clear</Text>
                      </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.defaultHeaderRow}>
                      <View style={styles.headerAccentBar} />
                      <Text style={styles.sheetTitle}>{t('SERVICE PROVIDER CATEGORIES')}</Text>
                    </View>
                )}

                {/* Hairline divider */}
                <View style={styles.divider} />

                {/* Body */}
                {loadingCategories ? (
                    <ActivityIndicator size="large" color="#0072FF" style={{ marginTop: 32 }} />
                ) : filteredCategories.length === 0 ? (
                    /* Empty state */
                    <View style={styles.emptyState}>
                      <View style={styles.emptyBubble}>
                        <Text style={{ fontSize: 38 }}>🤷</Text>
                      </View>
                      <Text style={styles.emptyTitle}>{t('No category found')}</Text>
                      <Text style={styles.emptyBody}>
                        {t("We don\'t have this service yet. Try something else.")}
                      </Text>
                      <TouchableOpacity style={styles.emptyBtn} onPress={handleClearSearch}>
                        <Text style={styles.emptyBtnText}>{t('Browse All Categories')}</Text>
                      </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.grid}>
                      {filteredCategories.map((cat, idx) => (
                          <TouchableOpacity
                              key={cat._id}
                              style={styles.card}
                              activeOpacity={0.72}
                              onPress={() =>
                                  router.push({
                                    pathname: '/SelectProvider',
                                    params: { categorySlug: cat.slug, categoryName: cat.name },
                                  })
                              }
                          >
                            <View
                                style={[
                                  styles.iconBubble,
                                  { backgroundColor: CARD_TINTS[idx % CARD_TINTS.length] },
                                ]}
                            >
                              <Text style={styles.cardIcon}>{cat.icon}</Text>
                            </View>
                            <Text style={styles.cardLabel} numberOfLines={2}>{cat.name}</Text>
                          </TouchableOpacity>
                      ))}
                    </View>
                )}

                <View style={{ height: 80 }} />
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

  /* ── TOP BAR ── */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    zIndex: 20,
  },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  langLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
  langLabelActive: { color: '#fff' },
  langDivider: { color: 'rgba(255,255,255,0.4)', marginHorizontal: 6, fontSize: 12 },
  switchStyle: { marginLeft: 6, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  bellButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  bellIcon: { fontSize: 18 },
  redDot: {
    position: 'absolute', top: 8, right: 8,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)',
  },

  /* ── MAIN CONTENT ── */
  contentContainer: { alignItems: 'center', marginTop: 60 },
  logoWrapper: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', zIndex: 30 },
  logoImage: { width: '100%', height: '100%' },
  searchWrapper: { marginTop: 30 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    paddingHorizontal: 20, paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
    width: '100%',
  },
  searchInput: { flex: 1, color: 'white', fontSize: 16, fontWeight: '600', marginRight: 10 },

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

  /* ── SWIPE INDICATOR ── */
  swipeIndicator: {
    position: 'absolute',
    bottom: '29%',
    width: '100%',
    alignItems: 'center',
  },
  chevronStack: { alignItems: 'center' },
  chevron: { fontSize: 22, fontWeight: '900', lineHeight: 26 },
  swipeLabel: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 2.5,
    marginTop: 6,
  },

  /* ── BOTTOM SHEET ── */
  sheetHandle: { backgroundColor: '#C8D8EE', width: 38 },
  sheetBg: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#0055CC',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 14,
  },
  sheetContent: { paddingHorizontal: 20, paddingTop: 18 },

  /* default header (all categories) */
  defaultHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerAccentBar: {
    width: 4, height: 18, borderRadius: 3,
    backgroundColor: '#0072FF',
    marginRight: 10,
  },
  sheetTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A2A4A',
    letterSpacing: 0.6,
  },

  /* search-active header */
  searchHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    minHeight: 42,
  },
  searchIconBubble: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: '#EEF5FF',
    justifyContent: 'center', alignItems: 'center',
  },
  sheetTitleSearch: {
    fontSize: 14, fontWeight: '800', color: '#1A2A4A',
  },
  sheetSubtitle: {
    fontSize: 11, color: '#99AABB', marginTop: 1, fontWeight: '500',
  },
  clearPill: {
    backgroundColor: '#EEF5FF',
    borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  clearPillText: { color: '#0072FF', fontWeight: '700', fontSize: 11 },

  divider: {
    width: '100%', height: 1,
    backgroundColor: '#EDF2F8',
    marginBottom: 18,
  },

  /* ── CARDS ── */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#4A7FC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EDF3FC',
  },
  iconBubble: {
    width: 58, height: 58, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: { fontSize: 28 },
  cardLabel: {
    fontSize: 12, fontWeight: '700',
    color: '#253559',
    textAlign: 'center',
    lineHeight: 17,
  },

  /* ── EMPTY STATE ── */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyBubble: {
    width: 76, height: 76, borderRadius: 24,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 17, fontWeight: '800', color: '#1A2A4A', marginBottom: 8,
  },
  emptyBody: {
    fontSize: 13, color: '#8899BB',
    textAlign: 'center', lineHeight: 20, marginBottom: 28,
  },
  emptyBtn: {
    backgroundColor: '#0072FF',
    borderRadius: 30,
    paddingHorizontal: 32, paddingVertical: 13,
  },
  emptyBtnText: { color: 'white', fontWeight: '800', fontSize: 13 },
});
