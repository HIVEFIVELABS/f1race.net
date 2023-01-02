// postcss.config.cjs

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-extend': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: './tailwind.config.cjs',
    },
    autoprefixer: {},
  },
}
