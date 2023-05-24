/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './components/**/*.tsx'],
	darkMode: ['class'],
	theme: {
		extend: {
			colors: {
				darker: '#24293E',
				dark: '#2F3651'
			}
		}
	},
	plugins: [require('tailwindcss-global-dark')]
};
