/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // `<alpha-value>` is what lets `bg-signal-mark/60` and friends compile.
      // Handing Tailwind a whole var() colour instead makes those classes vanish
      // silently, which is exactly the bug this shape prevents.
      colors: {
        ground: {
          DEFAULT: 'rgb(var(--ground-rgb) / <alpha-value>)',
          raised: 'rgb(var(--ground-raised-rgb) / <alpha-value>)',
          sunk: 'rgb(var(--ground-sunk-rgb) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          2: 'rgb(var(--ink-2-rgb) / <alpha-value>)',
          3: 'rgb(var(--ink-3-rgb) / <alpha-value>)',
        },
        signal: {
          DEFAULT: 'rgb(var(--signal-rgb) / <alpha-value>)',
          mark: 'rgb(var(--signal-mark-rgb) / <alpha-value>)',
        },
        sky: 'rgb(var(--sky-rgb) / <alpha-value>)',
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
