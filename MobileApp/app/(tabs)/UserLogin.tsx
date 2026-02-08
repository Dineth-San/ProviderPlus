import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    TextInput,
    StatusBar,
    Alert,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';

type UserRole = 'user' | 'provider';
type Language = 'ENG' | 'සිං';

const UserLogin: React.FC = () => {
    // --- STATE ---
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<UserRole>("user");
    const [language, setLanguage] = useState<Language>('ENG');
    const [isTranslating, setIsTranslating] = useState<boolean>(false);

    const [strings, setStrings] = useState({
        login: "LOG IN",
        username: "Username",
        password: "Password",
        forgot: "Forgot Password?",
        signin: "SIGN IN",
        signup: "Didn’t sign up yet?",
        user: "User",
        provider: "Provider",
        errorTitle: "Error",
        errorMsg: "Please fill in all fields"
    });

    // // --- AUTOMATED TRANSLATION LOGIC ---
    // const translateAll = async (targetLang: Language, role: UserRole) => {
    //     // Change Username label based on role
    //     const dynamicUserLabel = role === 'user' ? "Username" : "Provider Name";
    //
    //     const baseEnglish = {
    //         login: "LOG IN",
    //         username: dynamicUserLabel,
    //         password: "Password",
    //         forgot: "Forgot Password?",
    //         signin: "SIGN IN",
    //         signup: "Didn’t sign up yet?",
    //         user: "User",
    //         provider: "Provider",
    //         errorTitle: "Error",
    //         errorMsg: "Please fill in all fields"
    //     };
    //
    //     if (targetLang === 'ENG') {
    //         setStrings(baseEnglish);
    //         return;
    //     }
    //
    //     setIsTranslating(true);
    //     const targetCode = 'si';
    //     const translatedStrings = { ...baseEnglish };
    //
    //     try {
    //         const keys = Object.keys(baseEnglish) as Array<keyof typeof baseEnglish>;
    //         await Promise.all(keys.map(async (key) => {
    //             const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetCode}&dt=t&q=${encodeURI(baseEnglish[key])}`;
    //             const res = await fetch(url);
    //             const data = await res.json();
    //             if (data && data[0] && data[0][0]) {
    //                 translatedStrings[key] = data[0][0][0];
    //             }
    //         }));
    //         setStrings(translatedStrings);
    //     } catch (error) {
    //         console.error("Translation error:", error);
    //     } finally {
    //         setIsTranslating(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     translateAll(language, userRole);
    // }, [language, userRole]);

    const handleLogin = (): void => {
        if (!username.trim() || !password.trim()) {
            Alert.alert(strings.errorTitle, strings.errorMsg);
            return;
        }
        Alert.alert("Success", `Logging in as ${userRole}`);
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={userRole === 'user' ? ['#00ADF5', '#004eba'] : ['#1086b5', '#022373']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        {/* HEADER LANGUAGE TOGGLE (image_3b8679.png style) */}
                        <View style={styles.header}>
                            <View style={styles.langToggleContainer}>
                                <View style={styles.toggleBackground}>
                                    <Pressable style={styles.langButton} onPress={() => setLanguage('ENG')}>
                                        {language === 'ENG' && <LinearGradient colors={['#E440FF', '#5A1F63']} style={[StyleSheet.absoluteFill, { borderRadius: 15 }]} />}
                                        <Text style={[styles.langText, language === 'ENG' && styles.activeToggleText]}>ENG</Text>
                                    </Pressable>
                                    <Pressable style={styles.langButton} onPress={() => setLanguage('සිං')}>
                                        {language === 'සිං' && <LinearGradient colors={['#E440FF', '#5A1F63']} style={[StyleSheet.absoluteFill, { borderRadius: 15 }]} />}
                                        <Text style={[styles.langText, language === 'සිං' && styles.activeToggleText]}>සිං</Text>
                                    </Pressable>
                                </View>
                            </View>
                            {isTranslating && <ActivityIndicator size="small" color="#FFF" style={{ marginLeft: 10 }} />}
                        </View>

                        {/* LOGO (style) */}
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/images/provider-logo.png')} style={styles.mainLogo} resizeMode="contain" />
                            <Text style={styles.welcomeText}>{strings.login}</Text>
                        </View>

                        {/* FORM SECTION */}
                        <View style={styles.formContainer}>
                            {/* ROLE TOGGLE style) */}
                            <View style={styles.inlineRoleToggle}>
                                <View style={styles.toggleBackground}>
                                    <Pressable style={styles.toggleButton} onPress={() => setUserRole('user')}>
                                        {userRole === 'user' && <LinearGradient colors={['#00ADF5', '#0072FF']} style={[StyleSheet.absoluteFill, { borderRadius: 25 }]} />}
                                        <Text style={[styles.toggleText, userRole === 'user' && styles.activeToggleText]}>{strings.user}</Text>
                                    </Pressable>
                                    <Pressable style={styles.toggleButton} onPress={() => setUserRole('provider')}>
                                        {userRole === 'provider' && <LinearGradient colors={['#1086b5', '#022373']} style={[StyleSheet.absoluteFill, { borderRadius: 25 }]} />}
                                        <Text style={[styles.toggleText, userRole === 'provider' && styles.activeToggleText]}>{strings.provider}</Text>
                                    </Pressable>
                                </View>
                            </View>

                            {/* GLASS INPUT FIELDS */}
                            <BlurView intensity={25} tint="light" style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={strings.username}
                                    placeholderTextColor="rgba(255,255,255,0.6)"
                                    value={username}
                                    onChangeText={setUsername}
                                />
                                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }} style={styles.inputIcon} />
                            </BlurView>

                            <BlurView intensity={25} tint="light" style={styles.inputWrapper}>
                                <TextInput style={styles.textInput} placeholder={strings.password} placeholderTextColor="rgba(255,255,255,0.6)" secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} />
                                <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Image source={{ uri: isPasswordVisible ? "https://cdn-icons-png.flaticon.com/512/709/709612.png" : "https://cdn-icons-png.flaticon.com/512/2767/2767146.png" }} style={styles.inputIcon} />
                                </Pressable>
                            </BlurView>

                            <Pressable style={styles.forgotPassContainer} onPress={() => Alert.alert(strings.forgot, "Reset link sent.")}>
                                <Text style={styles.linkText}>{strings.forgot}</Text>
                            </Pressable>

                            {/* SIGN IN BUTTON */}
                            <Pressable style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>{strings.signin}</Text>
                            </Pressable>

                            <Pressable style={styles.signupTextContainer} onPress={() => Alert.alert(strings.signup, "Navigating...")}>
                                <Text style={styles.signupText}>{strings.signup}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    safeArea: { flex: 1, zIndex: 1 },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 },
    header: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 10, marginBottom: 20 },
    langToggleContainer: {
        width: 104,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFF",
        overflow: "hidden",
        padding: 3,
        marginBottom:30
    },
    toggleBackground: { flex: 1, flexDirection: "row" },
    langButton: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 15 },
    langText: { fontSize: 12, fontWeight: "bold", color: "#888" },
    activeToggleText: { color: "#FFF" },
    logoContainer: { alignItems: "center", marginTop:20 },
    mainLogo: { width: 80, height: 80 },
    welcomeText: { fontSize: 28, fontWeight: "900", color: "#FFF", letterSpacing: 2,margin:50 },
    formContainer: { width: "100%" },
    inlineRoleToggle: {
        alignSelf: "center",
        width: 180,
        height: 35,
        borderRadius: 25,
        backgroundColor: "#FFF",
        overflow: "hidden",
        padding: 2,
        marginBottom:50

    },
    toggleButton: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 25},
    toggleText: { fontSize: 14, fontWeight: "bold", color: "#888", zIndex: 1 },
    inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 30, height: 60, marginBottom: 20, paddingHorizontal: 20, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.3)", overflow: 'hidden' },
    textInput: { flex: 1, color: "#FFF", fontSize: 16 },
    inputIcon: { width: 22, height: 22, tintColor: "#FFF" },
    forgotPassContainer: { alignSelf: "center", marginBottom: 25 },
    linkText: { color: "#FFF", textDecorationLine: "underline", fontSize: 14 },
    loginButton: { backgroundColor: "#FFF", borderRadius: 30, height: 60, justifyContent: "center", alignItems: "center", elevation: 5, marginBottom: 20 },
    loginButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
    signupTextContainer: { alignSelf: "center", padding: 10 },
    signupText: { color: "#FFF", textDecorationLine: "underline", fontSize: 14 },
});

export default UserLogin;