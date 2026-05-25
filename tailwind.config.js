/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          white: '#FFFFFF',
          alt:   '#FAFAF8',
        },
        line: {
          hair:    '#EFEFEC',
          divider: '#E5E5E0',
          mid:     '#D4D4CE',
        },
        ink: {
          primary:   '#1A1A1A',
          secondary: '#6B6B68',
          tertiary:  '#9B9B96',
          muted:     '#BBBBB6',
        },
        accent: {
          bg:       '#F0F5F1',
          primary:  '#1F4D3D',
          hover:    '#0F6E56',
          emphasis: '#04342C',
        },
        success: '#1D9E75',
        warning: '#BA7517',
        danger:  '#A32D2D',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xxl': ['96px', { lineHeight: '1',    fontWeight: '400', letterSpacing: '-0.03em' }],
        'display-xl':  ['72px', { lineHeight: '1.05', fontWeight: '400', letterSpacing: '-0.025em' }],
        'display-lg':  ['56px', { lineHeight: '1.05', fontWeight: '400', letterSpacing: '-0.02em' }],
        'display-md':  ['40px', { lineHeight: '1.1',  fontWeight: '400', letterSpacing: '-0.02em' }],
        'h1':          ['32px', { lineHeight: '1.15', fontWeight: '500', letterSpacing: '-0.01em' }],
        'h2':          ['24px', { lineHeight: '1.2',  fontWeight: '500' }],
        'h3':          ['20px', { lineHeight: '1.3',  fontWeight: '500' }],
        'body-lg':     ['18px', { lineHeight: '1.7',  fontWeight: '400' }],
        'body':        ['16px', { lineHeight: '1.7',  fontWeight: '400' }],
        'body-sm':     ['14px', { lineHeight: '1.6',  fontWeight: '400' }],
        'caption':     ['12px', { lineHeight: '1.5',  fontWeight: '400' }],
        'eyebrow':     ['11px', { lineHeight: '1',    letterSpacing: '0.2em', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0',
        xs: '2px',
        sm: '4px',
      },
      boxShadow: {
        none: 'none',
      },
      transitionTimingFunction: {
        swiss: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '100': '100ms',
        '400': '400ms',
        '800': '800ms',
      },
      maxWidth: {
        container: '1280px',
        prose:     '720px',
      },
      spacing: {
        '128': '32rem',
        '192': '48rem',
        '256': '64rem',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in':      'fade-in 800ms cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-subtle': 'pulse-subtle 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
