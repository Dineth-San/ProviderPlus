import axios from 'axios';
import { Platform } from 'react-native';

// --- CONFIGURATION ---
// 1. REPLACE THIS with the IP you found in Step 1
// This is safe for dev because it's a local address.
const LAPTOP_IP = '10.31.18.97'; //

// 2. LOGIC:
// - Android Emulator uses '10.0.2.2' (special alias for host loopback).
// - Physical Device / iOS uses your real LAN IP.
const BASE_URL = Platform.OS === 'android' && !Platform.isTV
    ? `http://${LAPTOP_IP}:8000/api`
    : `http://${LAPTOP_IP}:8000/api`;

console.log("🔗 Connecting to Backend at:", BASE_URL);

// 3. Create the Axios Instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // Wait 10 seconds before failing
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiClient;