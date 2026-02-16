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

                /* Shadcn/UI Standard Colors Mapped to SaaS Theme */
                border: "#e5e7eb",
                input: "#e5e7eb",
                ring: "#b91c1c",
                background: "#ffffff",
                foreground: "#020817",
                primary: {
                    DEFAULT: "#b91c1c",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#f1f5f9",
                    foreground: "#0f172a",
                },
                destructive: {
                    DEFAULT: "#ef4444",
                    foreground: "#f8fafc",
                },
                muted: {
                    DEFAULT: "#f1f5f9",
                    foreground: "#64748b",
                },
                accent: {
                    DEFAULT: "#f1f5f9",
                    foreground: "#0f172a",
                },
                popover: {
                    DEFAULT: "#ffffff",
                    foreground: "#020817",
                },
                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#020817",
                },
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
