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
                "saas-bg": "#f5f5f5",      /* Light Gray Background */
                "saas-red": "#b91c1c",     /* Elegant Dark Red (Sidebar/Primary) */
                "saas-red-hover": "#991b1b",
                "saas-gray": "#374151",    /* Secondary Buttons/Text */
                "primary": "#b91c1c",      /* Map primary to elegant red */
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",     /* Softer corners for cards */
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
}
