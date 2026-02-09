import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// 1. DATA INTERFACE
interface Provider {
    id: string;
    name: string;
    subCategory: string;
    rating: string;
    image: string;
}

// 2. CARD COMPONENT
const Card = ({ name, subCategory, rating, image }: Provider) => (
    <View style={styles.cardWrapper}>
        <View style={styles.glassCard}>
            <Image source={{ uri: image }} style={styles.providerImage} />
            <View style={styles.cardInfo}>
                {/* Rating Badge with BLUE Star */}
                <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={10} color="#D96C06" />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>

                <Text style={styles.providerName} numberOfLines={1}>{name}</Text>
                <Text style={styles.subCategoryText} numberOfLines={1}>{subCategory}</Text>

                <TouchableOpacity
                    style={styles.viewProfileBtn}
                    onPress={() => console.log('Navigate to profile')}
                >
                    <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default function ProviderMarketplace() {
    const [currentPage, setCurrentPage] = useState(1);

    // Mock Database Data
    const providers: Provider[] = Array.from({ length: 20 }).map((_, i) => ({
        id: i.toString(),
        name: `Provider ${i + 1 + (currentPage - 1) * 20}`,
        subCategory: "Professional Plumber",
        rating: (4 + Math.random()).toFixed(1),
        image: `https://i.pravatar.cc/150?u=${i + (currentPage - 1) * 20}`,
    }));

    // Pagination Component
    const PaginationFooter = () => (
        <View style={styles.paginationContainer}>
            {[1, 2, 3, 4, 5].map((page) => (
                <TouchableOpacity
                    key={page}
                    onPress={() => setCurrentPage(page)}
                    style={[styles.pageNumber, currentPage === page && styles.activePage]}
                >
                    <Text style={[styles.pageText, currentPage === page && styles.activePageText]}>
                        {page}
                    </Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.nextBtn}>
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        // BACKGROUND: Lighter Top (#4FC3F7) -> Deep Blue (#0072FF)
        <LinearGradient
            colors={['#4FC3F7', '#0072FF']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={providers}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={
                        <View style={styles.headerContent}>

                            {/* 1. Search Bar Only (Centered) */}
                            <View style={styles.searchRow}>
                                <View style={styles.searchContainer}>
                                    <Ionicons name="search" size={20} color="rgba(255,255,255,0.8)" />
                                    <TextInput
                                        placeholder="Search providers..."
                                        style={styles.searchInput}
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                    />
                                </View>
                            </View>

                            {/* 2. Category Header with Sort Button (Centered) */}
                            <View style={styles.sectionHeader}>
                                <TouchableOpacity style={styles.sortButton}>
                                    <Ionicons name="options-outline" size={22} color="#FFF" />
                                </TouchableOpacity>
                                <Text style={styles.sectionTitle}>Plumbers</Text>
                            </View>

                        </View>
                    }
                    renderItem={({ item }) => <Card {...item} />}
                    ListFooterComponent={PaginationFooter}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    headerContent: {
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },

    // Search Styles
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#FFFFFF',
    },

    // Category Header Styles
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    sortButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginRight: 15,
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },

    // CARD STYLES
    cardWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    glassCard: {
        width: width * 0.85,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 22,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    providerImage: {
        width: 85,
        height: 85,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignSelf: 'flex-start', // Keeps image at top if card grows
    },
    cardInfo: {
        flex: 1,
        marginLeft: 15,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#D96C06', // CHANGED: Blue color for rating text
        marginLeft: 3,
    },
    providerName: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },
    subCategoryText: {
        fontSize: 13,
        color: 'rgba(255, 255, 255)',
        marginTop: 2,
        marginBottom: 8, // Space before button
    },

    // NEW BUTTON STYLES
    viewProfileBtn: {
        backgroundColor: '#D96C06', // CHANGED: Blue color for button
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    viewProfileText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // PAGINATION STYLES
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        paddingBottom: 20,
    },
    pageNumber: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    activePage: {
        backgroundColor: '#FFFFFF',
    },
    pageText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    activePageText: {
        color: '#0072FF',
    },
    nextBtn: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 10,
    },
    nextText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
