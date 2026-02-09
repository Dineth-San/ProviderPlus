import React, {useRef, useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, COLORS } from '@/app/styles/UserSignUpStyles';

type Language = 'ENG' | 'සිං';

const UserSignUp2 = ({ navigation }: any) => {
    const pin1 = useRef<TextInput>(null);
    const pin2 = useRef<TextInput>(null);
    const pin3 = useRef<TextInput>(null);
    const pin4 = useRef<TextInput>(null);



    const [contactNo, setContactNo] = useState("");
    const [contactError, setContactError] = useState("");

    const [language, setLanguage] = useState<Language>('ENG');
    const [isTranslating, setIsTranslating] = useState<boolean>(false);

    // Contact number validation (only numbers, 10 digits)
    const handleContactInput = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, '');

        if (filteredText.length <= 10) {
            setContactNo(filteredText);

            if (filteredText.length === 0) {
                setContactError("Contact number is required");
            } else if (filteredText.length < 10) {
                setContactError("Contact number must be exactly 10 digits");
            } else {
                setContactError("");
            }
        }
    };

    const handleNext = () => {
        let hasError = false;


        // Validate contact
        if (!contactNo.trim()) {
            setContactError("Contact number is required");
            hasError = true;
        } else if (contactNo.length !== 10) {
            setContactError("Contact number must be exactly 10 digits");
            hasError = true;
        }

        // If any error, don't proceed
        if (hasError) {
            alert("Please fix all errors before proceeding");
            return;
        };
    };
    return (
        <View style={globalStyles.mainContainer}>
            <LinearGradient colors={COLORS.userGradient} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={globalStyles.safeArea}>
                <View style={styles.headerToggleLang}>
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
                <View style={globalStyles.stepContainer}>
                    <View style={globalStyles.stepWrapper}><Text style={globalStyles.inactiveStepText}>Step 1</Text><View style={globalStyles.activeLine}/></View>
                    <View style={globalStyles.stepWrapper}><Text style={globalStyles.stepText}>Step 2</Text><View style={globalStyles.activeLine}/></View>
                    <View style={globalStyles.stepWrapper}><Text style={globalStyles.inactiveStepText}>Step 3</Text><View style={globalStyles.inactiveLine}/></View>
                </View>

                <Text style={globalStyles.title}>Enter Your OTP For Verification</Text>

                {/* CONTACT NO - Numbers Only, 10 digits */}
                <View>
                    <BlurView intensity={20} style={globalStyles.inputWrapper}>
                        <TextInput
                            placeholder="Contact No."
                            placeholderTextColor="rgba(255,255,255,0.6)"
                            style={globalStyles.textInput}
                            value={contactNo}
                            onChangeText={handleContactInput}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </BlurView>
                    {contactError ? (
                        <Text style={styles.errorText}>{contactError}</Text>
                    ) : null}
                </View>

                <View style={styles.otpRow}>
                    <TextInput
                        ref={pin1}
                        style={styles.otpCircle}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => text && pin2.current?.focus()}
                    />
                    <TextInput
                        ref={pin2}
                        style={styles.otpCircle}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => text && pin3.current?.focus()}
                    />
                    <TextInput
                        ref={pin3}
                        style={styles.otpCircle}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => text && pin4.current?.focus()}
                    />
                    <TextInput
                        ref={pin4}
                        style={styles.otpCircle}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                </View>

                <Pressable
                    style={globalStyles.nextButton}
                    onPress={handleNext}
                >
                    <Image
                        source={require('../assets/images/next.png')}
                        style={styles.buttonIcon}
                        resizeMode="contain"
                    />
                </Pressable>
            </SafeAreaView>
        </View>


    );
};

const styles = StyleSheet.create({
    otpRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 },
    otpCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: '#FFF',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },

    headerToggleLang: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 10, marginBottom: 20 },

    langToggleContainer: {
        width: 104,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFF",
        overflow: "hidden",
        padding: 3,
        marginBottom:20,
        // alignItems: 'flex-end',
    },
    toggleBackground: { flex: 1, flexDirection: "row" },
    langButton: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 15 },
    langText: { fontSize: 12, fontWeight: "bold", color: "#888" },
    activeToggleText: { color: "#FFF" },

    buttonIcon: {
        width: 30,
        height: 30,
        tintColor: '#FFF',
    },

    errorText: {
        color: '#FF0000',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: '600',
    },

});
export default UserSignUp2;
