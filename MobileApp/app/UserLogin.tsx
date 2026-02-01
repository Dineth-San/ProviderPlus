import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    TextInput,
    StatusBar,
    Dimensions,
    Alert,
    ImageSourcePropType
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

// --- TYPES ---
type UserRole = 'user' | 'provider';

const UserLogin: React.FC = () => {
    // --- STATE MANAGEMENT (Typed) ---
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<UserRole>("user");

    // --- HANDLERS ---
    const handleLogin = (): void => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        Alert.alert("Login Attempt", `User: ${username}\nRole: ${userRole}`);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Background Image */}
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" }}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Dark Overlay */}
            <View style={styles.overlay} />

            <SafeAreaView style={styles.safeArea}>

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View style={styles.langContainer}>
                        <Text style={styles.langText}>
                            ENG | <Text style={styles.langTextFaded}>ISX</Text>
                        </Text>
                    </View>

                    <View style={styles.orangeIndicator}>
                        <View style={styles.orangeDot} />
                    </View>
                </View>

                {/* --- LOGO SECTION --- */}
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2942/2942813.png" }}
                        style={styles.mainLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.welcomeText}>LOG IN</Text>
                </View>

                {/* --- FORM SECTION --- */}
                <View style={styles.formContainer}>

                    {/* Username */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Username"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }}
                            style={styles.inputIcon}
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Image
                                source={{
                                    uri: isPasswordVisible
                                        ? "https://cdn-icons-png.flaticon.com/512/709/709612.png" // Eye Open
                                        : "https://cdn-icons-png.flaticon.com/512/2767/2767146.png" // Eye Closed
                                }}
                                style={styles.inputIcon}
                            />
                        </Pressable>
                    </View>

                    {/* Forgot Password */}
                    <Pressable style={styles.forgotPassContainer} onPress={() => console.log("Forgot Password")}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </Pressable>

                    {/* Login Button */}
                    <Pressable style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>SIGN IN</Text>
                    </Pressable>

                </View>

                {/* --- FOOTER / TOGGLE --- */}
                <View style={styles.footer}>
                    <Pressable>
                        <Text style={styles.signupText}>Didn’t sign up yet?</Text>
                    </Pressable>

                    {/* Role Switcher */}
                    <View style={styles.toggleContainer}>
                        <View style={styles.toggleBackground}>
                            {/* Sliding Gradient */}
                            <LinearGradient
                                colors={['#00c9fa', '#015bd4']}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                style={[
                                    styles.activeToggleGradient,
                                    userRole === 'provider' ? { left: '50%' } : { left: 0 }
                                ]}
                            />

                            {/* Buttons */}
                            <Pressable style={styles.toggleButton} onPress={() => setUserRole('user')}>
                                <Text style={[styles.toggleText, userRole === 'user' && styles.activeToggleText]}>
                                    User
                                </Text>
                            </Pressable>
                            <Pressable style={styles.toggleButton} onPress={() => setUserRole('provider')}>
                                <Text style={[styles.toggleText, userRole === 'provider' && styles.activeToggleText]}>
                                    Provider
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    // --- LAYOUT ---
    mainContainer: {
        flex: 1,
        backgroundColor: "#121212",
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
        paddingVertical: 20,
    },

    // --- HEADER ---
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    langContainer: {
        // Container styles if needed
    },
    langText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    langTextFaded: {
        color: "rgba(255,255,255,0.6)",
    },
    orangeIndicator: {
        width: 49,
        height: 25,
        backgroundColor: "#d96c06",
        borderRadius: 12.5,
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    orangeDot: {
        width: 18,
        height: 18,
        backgroundColor: "#fff",
        borderRadius: 9,
        alignSelf: "flex-end",
    },

    // --- LOGO ---
    logoContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    mainLogo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "900",
        color: "#fff",
        letterSpacing: 2,
        textTransform: "uppercase",
    },

    // --- FORM ---
    formContainer: {
        width: "100%",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 30,
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    textInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
        height: "100%",
    },
    inputIcon: {
        width: 20,
        height: 20,
        tintColor: "#fff",
        opacity: 0.8,
    },
    forgotPassContainer: {
        alignSelf: "flex-end",
        marginBottom: 30,
        marginRight: 10,
    },
    linkText: {
        color: "#fff",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    loginButton: {
        backgroundColor: "#fff",
        borderRadius: 30,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    loginButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },

    // --- FOOTER ---
    footer: {
        alignItems: "center",
        marginBottom: 10,
    },
    signupText: {
        color: "#fff",
        fontSize: 14,
        textDecorationLine: "underline",
        marginBottom: 20,
    },
    toggleContainer: {
        width: 200,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: 2,
    },
    toggleBackground: {
        flex: 1,
        flexDirection: "row",
        position: "relative",
    },
    activeToggleGradient: {
        position: "absolute",
        width: "50%",
        height: "100%",
        borderRadius: 20,
    },
    toggleButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
    },
    activeToggleText: {
        color: "#fff",
    },
});

export default UserLogin;