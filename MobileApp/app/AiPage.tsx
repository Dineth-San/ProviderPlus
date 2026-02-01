import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const App = () => {
    // Sample Data for the Plumber Cards
    const plumbers = [
        { id: '1', name: "Nimal's Plumbing", rating: 4.5, image: 'https://via.placeholder.com/100' },
        { id: '2', name: "Nimal's Plumbing", rating: 4.5, image: 'https://via.placeholder.com/100' },
        { id: '3', name: "Nimal's Plumbing", rating: 4.5, image: 'https://via.placeholder.com/100' },
        { id: '4', name: "Nimal's Plumbing", rating: 4.5, image: 'https://via.placeholder.com/100' },
        { id: '5', name: "Nimal's Plumbing", rating: 4.5, image: 'https://via.placeholder.com/100' },
    ];

    return (
        <LinearGradient colors={['#00ADF5', '#0072FF']} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>



                <View style={styles.header}>
                    <BlurView intensity={30} tint="light" style={styles.headerContent}>

                        {/* Left Icon: Using a local file */}
                        <TouchableOpacity style={styles.iconPlaceholder}>
                            <Image
                                source={require('../assets/images/36594908f7207cdd137f1131cad1f0c97379fb36.png')} // Update path to match your folder structure
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Servy</Text>

                        {/* Right Icon: Using a local file */}
                        <TouchableOpacity style={styles.iconPlaceholder}>
                            <Image
                               source={require('../assets/images/765ef90f7f1c09808be3832c621a6b7fa497fbcc.png')}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>

                    </BlurView>
                </View>

                {/* Chat Area */}
                <FlatList
                    data={plumbers}
                    keyExtractor={(item) => item.id}
                    style={StyleSheet.absoluteFill} // Makes the list fill the whole screen behind other elements
                    contentContainerStyle={{
                        paddingTop: 100,    // Height of your header + extra space
                        paddingBottom: 100  // Height of your input bar + extra space
                    }}
                    ListHeaderComponent={() => (
                        <View>
                            <Text style={styles.botBubble}>Hello! Alex How Can I Help You</Text>
                            <Text style={styles.userBubble}>My Garden Tap Is Broken So I Need A Top Rated Plumber For That</Text>
                            <Text style={styles.botBubble}>Yeah Sure These Are The Top Rated Plumbers In Your Area</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}> {/* Use a container to handle margins */}
                            <BlurView intensity={30} tint="light" style={styles.glassCard}>
                                <Image source={require('../assets/images/8fd666c5ddf277987fa36fc615f6f73a3587c900.jpg')}
                                       style={styles.avatar} />

                                <View style={styles.cardInfo}>
                                    <Text style={styles.plumberName}>{item.name}</Text>
                                    <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>

                                    <TouchableOpacity onPress={() => console.log("Booking...")} style={styles.bookBtnContainer}>
                                        <LinearGradient
                                            // Diagonal gradient: top-left to bottom-right
                                            colors={['#E440FF', '#5A1F63']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.bookBtnGradient}
                                        >
                                            <Text style={styles.bookText}>Book Now</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </BlurView>
                        </View>
                    )}
                />

                {/* Input Field */}
                <View style={styles.bottomWrapper}>
                    <BlurView intensity={40} tint="light" style={styles.inputGlassContainer}>
                        <TextInput
                            placeholder="Ask From Servy..."
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.input}
                        />
                        {/* Replace with your Send Icon */}
                        <TouchableOpacity style={styles.sendBtn} onPress={() => console.log("Message Sent!")}>
                            <Image
                                source={require('../assets/images/f07bde08f3fa0fba4685ffa38ab849d5cba51896.png')} // Update this path to your send icon file
                                style={styles.sendIcon}
                            />
                        </TouchableOpacity>
                    </BlurView>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        position: 'absolute', // Locks it to the top
        top: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        zIndex: 100, // High number ensures it stays in front of everything
    },
    headerContent: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // The glass base
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)', // The "shine" on the edge
        // Shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Important for your Android testing
    },
    iconPlaceholder: {
        width: 24, // Matches standard icon size
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: 12,
        marginHorizontal: 20, // Keeps bubbles away from screen edges
        marginVertical: 8,
        borderRadius: 15,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)', // Makes it look like glass
        maxWidth: '75%',
        color:'white',
    },
    userBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 12,
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 15,
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        maxWidth: '75%',
        color:'white',
    },
    bubbleText: {
        color: 'white',
        fontSize: 14,
    },
    cardContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden', // Required to clip the BlurView
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    glassCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 12
    },
    cardInfo: {
        marginLeft: 15,
        flex: 1,
        justifyContent: 'center'
    },
    plumberName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    rating: {
        marginTop: 4,
    },
    bookBtnContainer: {
        alignSelf: 'flex-end',
        marginTop: 10,
        borderRadius: 20, // Must match the gradient radius
        overflow: 'hidden', // This "cuts" anything outside the rounded corners
        // Ensure there is NO backgroundColor here
    },
    bookBtnGradient: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase', // Optional: makes it look more like a CTA
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        height: 60,
    },
    bottomWrapper: {
        position: 'absolute', // Floats it over the list
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: 'transparent', // Crucial: removes the solid rectangle
    },
    inputGlassContainer: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden', // Clips the blur to the border radius
    },
    headerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: 'white',
    },
    sendBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5, // Circular button
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Matches your glass theme
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    sendIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: 'white', // Forces the icon to be white to match your UI
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    }
});

export default App;