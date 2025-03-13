/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "Sofia Pro Regular",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        headingTest: ["Space Grotesk", "sans-serif"],
        "europa-regular": [
          "Europa Regular",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        "europa-light": [
          "Europa Light",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        roboto: [
          "Roboto",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        ssm: "12px",
        15: "15px",
        17: "17px",
        19: "19px",
        28: "28px",
      },
      width: {
        1286: "1286px",
      },
      colors: {
        "vr-light-gray": "rgb(249, 249, 249)",
        "vr-light-gray-blur": "rgb(0, 0, 0, 0.65)",
        "input-color": "#383838",
        "light-dark": "rgb(153, 153, 153)",
        dark: "rgb(51, 51, 51)",
        "main-color": "#f15e22",
      },
      screens: {
        ssm: "425px",
      },
    },
  },
  plugins: [],
};
