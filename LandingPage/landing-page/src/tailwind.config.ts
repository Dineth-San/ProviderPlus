import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // Added to ensure components folder is scanned
    ],
    theme: {
        extend: {
            colors: {
                navy: "#0C2B4E",        // Dark Text
                primary: "#19579F",     // Medium Blue
                accent: "#2B7FDE",      // Bright Blue
                orange: "#D96C06",      // Buttons / Highlights
                offwhite: "#F9FAFB",    // Background
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;