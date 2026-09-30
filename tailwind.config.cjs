const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.vue',
		'./node_modules/flyonui/dist/js/*.js',
	],

	darkMode: 'class',

	preflight: {
		fontFamily: {
			sans: ['Quicksand', 'sans-serif'],
			playfair: ['Playfair Display', 'serif'],
			spartan: ['League Spartan', 'sans-serif'],
			quicksand900: ['Quicksand-900', 'sans-serif'],
		},
	},

	theme: {
		extend: {
			fontFamily: {
				sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
				quicksand900: [
					'Quicksand-900',
					...defaultTheme.fontFamily.sans,
				],
				playfair: ['Playfair Display', ...defaultTheme.fontFamily.sans],
				spartan: ['League Spartan', ...defaultTheme.fontFamily.sans],
			},
			animation: {
				'float-3s': 'float 3s ease-in-out infinite',
				'float-4s': 'float 4s ease-in-out infinite',
				'float-5s': 'float 4s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10%)' },
				},
			},
		},
	},

	flyonui: {
		vendors: true,
	},

	plugins: [
		require('flyonui'),
		require('flyonui/plugin'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('tailwindcss-animated'),
	],
};
