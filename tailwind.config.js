/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: {
          DEFAULT: 'var(--ground)',
          raised: 'var(--ground-raised)',
          sunk: 'var(--ground-sunk)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        signal: { DEFAULT: 'var(--signal)', dim: 'var(--signal-dim)' },
        sky: { DEFAULT: 'var(--sky)', dim: 'var(--sky-dim)' },
        hair: { DEFAULT: 'var(--line)', strong: 'var(--line-strong)' },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        data: ['"Martian Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.14em',
        widest2: '0.22em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
