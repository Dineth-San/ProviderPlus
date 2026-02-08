import React, {useRef, useState} from 'react';
import {View, Text, TextInput, Pressable, Image, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, COLORS } from '@/app/UserSignUpStyles';

type Language = 'ENG' | 'සිං';

const UserSignUp3 = ({ navigation }: any) => {

    const [language, setLanguage] = useState<Language>('ENG');
    const [isTranslating, setIsTranslating] = useState<boolean>(false);

    const handleNext = () => {
        let hasError = false;



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
                    <View style={globalStyles.stepWrapper}><Text style={globalStyles.inactiveStepText}>Step 2</Text><View style={globalStyles.activeLine}/></View>
                    <View style={globalStyles.stepWrapper}><Text style={globalStyles.stepText}>Step 3</Text><View style={globalStyles.activeLine}/></View>
                </View>

                <Text style={globalStyles.title}>Create Password</Text>

                <BlurView intensity={20} style={globalStyles.inputWrapper}>
                    <TextInput placeholder="Password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.6)" style={globalStyles.textInput} />
                </BlurView>
                <BlurView intensity={20} style={globalStyles.inputWrapper}>
                    <TextInput placeholder="Re-Enter Password" secureTextEntry placeholderTextColor="rgba(255,255,255,0.6)" style={globalStyles.textInput} />
                </BlurView>

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



});
export default UserSignUp3;