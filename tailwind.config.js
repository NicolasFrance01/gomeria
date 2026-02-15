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
                "theme-red": "#FF0000", /* Bright Red from images */
                "theme-black": "#000000",
                "theme-gray": "#F5F5F5", /* Light gray background */
                "theme-darkgray": "#333333",
                "primary": "#137fec",
                "primary-dark": "#0e64bd",
                "primary-content": "#ffffff",
                "background-light": "#f6f7f8",
                "background-dark": "#101922",
                "surface-light": "#ffffff",
                "surface-dark": "#182430",
                "surface-dark-lighter": "#202e3b",
                "neutral-50": "#f0f7ff",
                "neutral-100": "#e0effe",
                "neutral-200": "#bae0fd",
                "neutral-300": "#7cc5fb",
                "neutral-400": "#36a9f8",
                "neutral-500": "#137fec",
                "neutral-600": "#0b62c0",
                "neutral-700": "#094e9b",
                "neutral-800": "#0b4281",
                "neutral-900": "#0e386c",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"] // Clean sans-serif
            },
            borderRadius: {
                "DEFAULT": "4px", /* Sharper edges as seen in images */
                "md": "6px",
                "lg": "8px",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
