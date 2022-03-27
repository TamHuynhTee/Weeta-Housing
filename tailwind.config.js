module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        baseColor: 'rgb(0, 132, 137)',
        bannerHome: '#671C0B',
        'red-F7': '#F7E8E8',
        'red-50': '#B31D1D',
        mobile: '#C5D0CF',

        'white-100': '#F9F9F9',
        'white-200': '#F5F5F5',
        'white-300': '#FDFDFD',

        'blue-100': '#F0F6F6',
        'blue-200': '#167BA7',
        'blue-300': '#1C1F2E',
        'blue-400': '#232635',
        'blue-2': '#393D4F',

        'yellow-100': '#EDC856',
        'skin-100': '#F2DDCC',

        'brown-100': '#5A1607',
        'brown-200': '#852813',

        'grey-ES': '#E5E5E5',
        'grey-50': '#A3A3A3',
        'grey-100': '#E3E3E3',
        'grey-200': '#ACACB9',
        'grey-300': '#6E6D7A',
        'grey-400': '#313131',
        'grey-500': '#53596F',
        'grey-600': '#F1F1F1',
        'grey-700': '#9897A0',
        'grey-800': '#2C2B3E',
        'grey-900': '#C4C4C4',
        'grey-1000': '#2C2B3E',
        'grey-1100': '#C5D0CF',

        'black-100': '#3D3D4E',
        'black-200': '#1B5C5E',
        'black-300': '#0D0C22',

        'green-50': '#F7FAFA',
        'green-100': '#F0F7F4',
        'green-200': '#E2F0E9',
        'green-300': '#9CD6CF',
        'green-400': '#59ADA4',
        'green-500': '#2B6B64',
        'green-600': '#1C4843',
        'green-700': '#1B5C5E',

        'purple-100': '#2A1C48',

        'orange-100': '#FF9700',
        'orange-200': '#FFB800',
      },
    },
    gridTemplateAreas: {
      homeExpertXS: ['content', 'image'],
    },

    screens: {
      lg: {
        max: '1250px',
      },
      md: {
        max: '1024px',
      },
      sm: {
        max: '768px',
      },
      xs: {
        max: '500px',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
