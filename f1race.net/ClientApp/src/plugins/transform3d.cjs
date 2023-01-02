// transform3d.js

const plugin = require("tailwindcss/plugin");

const transform3d = plugin(
  ({matchUtilities, theme}) => {
    matchUtilities(
      {
        "rotate-x": (value) => ({
          transform: `rotateX(${value})`,
          transformStyle: "preserve-3d"
        }),
        "rotate-y": (value) => ({
          transform: `rotateX(${value})`,
          transformStyle: "preserve-3d"
        }),
        "rotate-z": (value) => ({
          transform: `rotateX(${value})`,
          transformStyle: "preserve-3d"
        }),
      },
      {values: theme("rotateY")},
    );
    matchUtilities(
      {
        "perspective": (value) => ({
          perspective: value,
        })
      },
      {values: theme("perspective")},
    )
  },
  {
    theme: {
      rotateY: {
        "-180": "-180deg",
        "-90": "-90deg",
        "-45": "-45deg",
        "-30": "-30deg",
        "-15": "-15deg",
        "-10": "-10deg",
        "-5": "-5deg",
        0: "0",
        5: "5deg",
        10: "10deg",
        15: "15deg",
        30: "30deg",
        45: "45deg",
        90: "90deg",
        180: "180deg",
      },
      perspective: {
        none: "none",
        0: "0",
        100: "100px",
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "900px",
        1000: "1000px",
      }
    },
  }
);

module.exports = transform3d;
