/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#FF0000", // Power-Taller Red
                "primary-dark": "#CC0000",
                "sidebar": "#FF0000",
                "top-bar": "#000000", // Top left logo area
                "background-light": "#F3F4F6", // Light gray background
                "background-dark": "#1f2937",
                "surface-light": "#ffffff",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
