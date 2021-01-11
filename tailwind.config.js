module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // TODO: add necessary overpass weights to /static
        overpass:
          'overpass, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      colors: {
        sogblue: {
          lighter: '#71C5EA',
          light: '#57B4DC',
          DEFAULT: '#0098CF',
          dark: '#007EBB',
          darker: '#00679E',
          darkest: '#003359',
        },
        sogorange: {
          DEFAULT: '#E1823E',
        },
      },
    },
  },
}
