import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, Image, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles, COLORS } from '@/app/UserSignUpStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type UserRole = 'user' | 'provider';
type Language = 'ENG' | 'සිං';


const UserSignUp1 = ({ navigation }: any) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [dob, setDob] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const [language, setLanguage] = useState<Language>('ENG');
    const [isTranslating, setIsTranslating] = useState<boolean>(false);

    const [strings, setStrings] = useState({
        user: "User",
        provider: "Provider",

    });


    const [userRole, setUserRole] = useState<UserRole>("user");

    // State for all fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    // Error states for ALL fields
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [contactError, setContactError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [dobError, setDobError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [profileError, setProfileError] = useState("");

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Open image picker with editing enabled
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,  // Enables crop/zoom on supported devices
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            setProfileError(""); // Clear error when image is selected
        }
    };

    // Dropdown options
    const genderData = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Rather not say', value: 'rather_not_say' },
    ];

    // Function to handle date selection from the calendar
    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            setDob(formattedDate);
            setDobError(""); // Clear error when date is selected
        }
    };

    // Function to allow only letters and spaces for first name
    const handleFirstNameInput = (text: string) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setFirstName(filteredText);

        if (filteredText.trim().length === 0) {
            setFirstNameError("First name is required");
        } else if (filteredText.trim().length < 2) {
            setFirstNameError("First name must be at least 2 characters");
        } else {
            setFirstNameError("");
        }
    };

    // Function to allow only letters and spaces for last name
    const handleLastNameInput = (text: string) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setLastName(filteredText);

        if (filteredText.trim().length === 0) {
            setLastNameError("Last name is required");
        } else if (filteredText.trim().length < 2) {
            setLastNameError("Last name must be at least 2 characters");
        } else {
            setLastNameError("");
        }
    };

    // Email validation function
    const validateEmail = (text: string) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (text.trim().length === 0) {
            setEmailError("Email is required");
        } else if (!emailRegex.test(text)) {
            setEmailError("Invalid email format (e.g., user@example.com)");
        } else {
            setEmailError("");
        }
    };

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

    // Address validation
    const handleAddressInput = (text: string) => {
        setAddress(text);

        if (text.trim().length === 0) {
            setAddressError("Address is required");
        } else if (text.trim().length < 5) {
            setAddressError("Address is too short");
        } else {
            setAddressError("");
        }
    };

    // Check if all fields are valid before navigation
    const handleNext = () => {
        let hasError = false;

        // Validate profile image
        if (!profileImage) {
            setProfileError("Please upload a profile picture");
            hasError = true;
        }

        // Validate first name
        if (!firstName.trim()) {
            setFirstNameError("First name is required");
            hasError = true;
        } else if (firstName.trim().length < 2) {
            setFirstNameError("First name must be at least 2 characters");
            hasError = true;
        }

        // Validate last name
        if (!lastName.trim()) {
            setLastNameError("Last name is required");
            hasError = true;
        } else if (lastName.trim().length < 2) {
            setLastNameError("Last name must be at least 2 characters");
            hasError = true;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            hasError = true;
        }

        // Validate contact
        if (!contactNo.trim()) {
            setContactError("Contact number is required");
            hasError = true;
        } else if (contactNo.length !== 10) {
            setContactError("Contact number must be exactly 10 digits");
            hasError = true;
        }

        // Validate address
        if (!address.trim()) {
            setAddressError("Address is required");
            hasError = true;
        } else if (address.trim().length < 5) {
            setAddressError("Address is too short");
            hasError = true;
        }

        // Validate DOB
        if (!dob) {
            setDobError("Please select your date of birth");
            hasError = true;
        }

        // Validate gender
        if (!gender) {
            setGenderError("Please select your gender");
            hasError = true;
        }

        // If any error, don't proceed
        if (hasError) {
            alert("Please fix all errors before proceeding");
            return;
        }

        // All validations passed
        navigation.navigate('UserSignUp2', {
            firstName,
            lastName,
            email,
            contactNo,
            address,
            dob,
            gender,
            profileImage
        });
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

                <View style={globalStyles.stepContainer}>
                    <View style={globalStyles.stepWrapper}>
                        <Text style={globalStyles.stepText}>Step 1</Text>
                        <View style={globalStyles.activeLine}/>
                    </View>
                    <View style={globalStyles.stepWrapper}>
                        <Text style={globalStyles.inactiveStepText}>Step 2</Text>
                        <View style={globalStyles.inactiveLine}/>
                    </View>
                    <View style={globalStyles.stepWrapper}>
                        <Text style={globalStyles.inactiveStepText}>Step 3</Text>
                        <View style={globalStyles.inactiveLine}/>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <Text style={globalStyles.title}>Personal Details</Text>

                    {/* PROFILE PICTURE SECTION */}
                    <View style={styles.profileContainer}>
                        <Pressable style={styles.imageCircle} onPress={pickImage}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImg} />
                            ) : (
                                <Image
                                    source={require("../assets/images/profile.png")}
                                    style={styles.placeholderImg}
                                />
                            )}
                            <View style={styles.addIconContainer}>
                                <Text style={styles.addIconText}>+</Text>
                            </View>
                        </Pressable>
                        {profileError ? (
                            <Text style={styles.errorText}>{profileError}</Text>
                        ) : null}
                    </View>

                    {/* FIRST NAME - Letters Only */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                style={globalStyles.textInput}
                                value={firstName}
                                onChangeText={handleFirstNameInput}
                                keyboardType="default"
                            />
                        </BlurView>
                        {firstNameError ? (
                            <Text style={styles.errorText}>{firstNameError}</Text>
                        ) : null}
                    </View>

                    {/* LAST NAME - Letters Only */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                style={globalStyles.textInput}
                                value={lastName}
                                onChangeText={handleLastNameInput}
                                keyboardType="default"
                            />
                        </BlurView>
                        {lastNameError ? (
                            <Text style={styles.errorText}>{lastNameError}</Text>
                        ) : null}
                    </View>

                    {/* EMAIL - With Validation */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                style={globalStyles.textInput}
                                value={email}
                                onChangeText={validateEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </BlurView>
                        {emailError ? (
                            <Text style={styles.errorText}>{emailError}</Text>
                        ) : null}
                    </View>

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

                    {/* ADDRESS */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <TextInput
                                placeholder="Address"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                style={globalStyles.textInput}
                                value={address}
                                onChangeText={handleAddressInput}
                            />
                        </BlurView>
                        {addressError ? (
                            <Text style={styles.errorText}>{addressError}</Text>
                        ) : null}
                    </View>

                    {/* DATE OF BIRTH SECTION */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <TextInput
                                placeholder="Date of Birth"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                style={globalStyles.textInput}
                                value={dob}
                                editable={false}
                            />
                            <Pressable onPress={() => setShowDatePicker(true)}>
                                <Image
                                    source={require("../assets/images/dob.png")}
                                    style={{ width: 24, height: 24, tintColor: '#FFF' }}
                                />
                            </Pressable>
                        </BlurView>
                        {dobError ? (
                            <Text style={styles.errorText}>{dobError}</Text>
                        ) : null}
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            maximumDate={new Date()}
                            onChange={onDateChange}
                        />
                    )}

                    {/* GENDER DROPDOWN SECTION */}
                    <View>
                        <BlurView intensity={20} style={globalStyles.inputWrapper}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemText}
                                data={genderData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Gender' : '...'}
                                value={gender}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setGender(item.value);
                                    setGenderError(""); // Clear error when selected
                                    setIsFocus(false);
                                }}
                            />
                        </BlurView>
                        {genderError ? (
                            <Text style={styles.errorText}>{genderError}</Text>
                        ) : null}
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
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
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

    inlineRoleToggle: {
        alignSelf: "center",
        width: 180,
        height: 35,
        borderRadius: 25,
        backgroundColor: "#FFF",
        overflow: "hidden",
        padding: 2,
        marginBottom:10

    },
    toggleButton: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 25},
    toggleText: { fontSize: 14, fontWeight: "bold", color: "#888", zIndex: 1 },

    imageCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        position: 'relative',
    },
    profileImg: {
        width: 110,
        height: 110,
        borderRadius: 55,
    },
    placeholderImg: {
        width: 60,
        height: 60,
        tintColor: '#FFF',
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#00ADF5',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    addIconText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: -2,
    },
    textInputStyle: {
        flex: 1,
        color: "#fff",
        paddingLeft: 15,
        fontSize: 15,
        fontWeight: "900",
    },
    dropdown: {
        width: '100%',
        paddingHorizontal: 15,
        flex: 1,
        height: 50,
    },
    dropdownContainer: {
        backgroundColor: '#015bd4',
        borderRadius: 15,
        borderWidth: 0,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#fff',
    },
    itemText: {
        color: '#FFF',
        fontSize: 14,
    },
    buttonIcon: {
        width: 30,
        height: 30,
        tintColor: '#FFF',
    },
    errorText: {
        color: '#FF4B4B',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: '600',
    },
});

export default UserSignUp1;