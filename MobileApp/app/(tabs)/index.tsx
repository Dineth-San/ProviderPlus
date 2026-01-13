import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router'; // <--- Tool to navigate pages
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Provider+</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>

            {/* METHOD 1: Using the Link Component (Simple) */}
            <Link href="/chatbot" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>🤖 Open AI Assistant</Text>
                </TouchableOpacity>
            </Link>

            {/* METHOD 2: Using a Function (For more control) */}
            <TouchableOpacity
                style={[styles.button, { marginTop: 10, backgroundColor: '#34C759' }]}
                onPress={() => router.push('/chatbot')}
            >
                <Text style={styles.buttonText}>💬 Start New Chat</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
    subtitle: { fontSize: 18, color: '#666', marginBottom: 40 },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});