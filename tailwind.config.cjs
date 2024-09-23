/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'tw-',
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1400px',
        },
        extend: {
            fontFamily: {
                standard: 'var(--font-family-standard)',
                firacode: 'var(--font-family-firacode)',
            },
            backgroundImage: {
                'custom-gradient': `
                  linear-gradient(0deg, #fffbfb, #fffbfb),
                  radial-gradient(90.01% 33.44% at 22.03% 60.33%, rgba(255, 169, 200, 0.6) 0%, rgba(255, 169, 200, 0) 100%),
                  linear-gradient(224.58deg, #ef556c 21.82%, rgba(239, 85, 108, 0) 51.99%)
                `,
            },
            backgroundColor: {
                'custom-popup-bg': 'rgb(110 48 75 0.6)',
            },
            colors: {
                pink: {
                    default: '#ef99b1',
                },
            },
        },
    },
    plugins: [
        ({ addUtilities }) => {
            const newUtilities = {
                '.before-noise': {
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundImage: "url('/public/images/media/noise.png')",
                        opacity: '0.5',
                        pointerEvents: 'none',
                        mixBlendMode: 'soft-light',
                    },
                },
            };
            addUtilities(newUtilities, ['before']);
        },
    ],
};
