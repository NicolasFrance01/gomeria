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
