import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Get screen dimensions to ensure full coverage
const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // This timer simulates the loading process.
    // After 3 seconds (3000ms), it navigates to your Home screen.
    const timer = setTimeout(() => {
      // REPLACE '(tabs)' with the actual path to your home screen if it's different.
      // In Expo Router, usually your main app lives in (tabs) or a 'home' route.
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  return (
    <LinearGradient
      // The colors array creates the gradient from Top (Cyan-ish) to Bottom (Dark Blue)
      // Adjust these hex codes to match your Figma exact values
      colors={['#00C6FF', '#0072FF']}
      style={styles.container}
    >
      {/* Top Section: Main Text */}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>FIND THE BEST.</Text>
        <Text style={styles.titleText}>FOR YOU.</Text>
      </View>

      {/* Middle Section: Logo */}
      <View style={styles.logoContainer}>
        {/* Make sure the filename matches exactly what you put in the assets folder */}
        <Image
          source={require('../assets/images/provider-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section: Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>ALL RIGHT RESERVED. 2025</Text>
        <Text style={styles.footerText}>PROVIDER+</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'space-between', // Distributes space between Top, Middle, Bottom
    alignItems: 'center',
    paddingVertical: 50, // Adds breathing room at top and bottom
  },
  textContainer: {
    marginTop: 80, // Pushes text down from the top status bar
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700', // Bold
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // This helps center the logo visually in the remaining space
    flexGrow: 1,
  },
  logo: {
    width: 120, // Adjust based on how big you want the P logo
    height: 120,
  },
  footerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8, // Slightly transparent for a premium look
    fontWeight: '500',
    marginTop: 2,
  },
});

export default SplashScreen;
