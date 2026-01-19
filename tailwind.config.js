/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                gradient: 'gradient 8s linear infinite',
                shine: 'shine 5s linear infinite',
                highlight: 'highlight 2s ease-in-out infinite alternate',
                flash: 'flash 5s ease-in-out infinite',
            },
            colors: {
                card: 'rgb(23, 23, 23)',
            },
            borderColor: {
                DEFAULT: '#30363d',
            },
            keyframes: {
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                shine: {
                    '0%': { 'background-position': '100%' },
                    '100%': { 'background-position': '-100%' },
                },
                highlight: {
                    '0%': { backgroundColor: 'var(--highlight)', opacity: '0.8' },
                    '100%': { backgroundColor: 'var(--highlight)', opacity: '1' },
                },
                flash: {
                    '0%, 50%, 100%': { backgroundColor: 'transparent' },
                    '25%': { backgroundColor: 'var(--highlight)' },
                },
            },
        },
    },
    plugins: [],
}
