import { extendTheme } from 'native-base'

export const THEME = extendTheme({
    colors: {
        blue: {
            7: '#364D9D',
            5: '#647AC7',
        },
        red: {
            5: '#EE7979',
        },
        gray: {
            1: '#1A181B',
            2: '#3E3A40',
            3: '#5F5B62',
            4: '#9F9BA1',
            5: '#D9D8DA',
            6: '#EDECEE',
            7: '#F7F7F8',
            100: '#F7F7F8',
        }
    },
    fonts: {
        heading: 'Karla_700Bold',
        body: 'Karla_400Regular',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xx: 33,
    },
    sizes: {
        11: 45,
        14: 56,
        15: 60,
        71: 280,
    },
})