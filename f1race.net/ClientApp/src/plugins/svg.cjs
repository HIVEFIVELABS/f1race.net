// ./plugins/svg.js

const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      fill: (value) => ({
        fill: value,
      }),
    },
    { values: theme("colors") }
  );
});
