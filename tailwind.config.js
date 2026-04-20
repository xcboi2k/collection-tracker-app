/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}'],

    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#8c54a4', //purple
                    200: '#6c447c', //darker-purple
                },
                colorOne: '#96C3B3',
                colorTwo: '#E6B7D2',
                colorThree: '#F7D1D1',
                colorFour: '#B2D2B2',
                colorFive: '#E6D2B7',
                white: '#F2E9EA', //off-white
                black: '#1a1717',
            },
        },
    },
    plugins: [],
}
