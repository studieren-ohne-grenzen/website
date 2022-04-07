module.exports = {
  mode: 'jit',
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
        '3/4': '80%',
      },
      fill: {
        white: '#FFFFFF',
        none: 'none',
      },
      listStyleType: {
        circle: 'circle',
        square: 'square',
      },
      width: {
        '2/7': '33%',
      },
      height: {
        43: '10.5rem',
      },
      inset: {
        '1/100': '5%',
        3.6: '0.8rem',
      },
    },
  },
}
