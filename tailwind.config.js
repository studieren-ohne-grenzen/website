module.exports = {
  theme: {
    mode: 'JIT',
    extend: {
      fontFamily: {
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
      stroke: {
        'sogblue-dark': '#007EBB',
      },
      strokeWidth: {
        10: 10,
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
      },
      fill: {
        white: '#FFFFFF',
        none: 'none',
      },
      listStyleType: {
        circle: 'circle',
        square: 'square',
      },
      maxWidth: {
        '3/4': '80%',
      },
    },
  },
}
