// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#005087", // Pantone 2945
//         secondary: "#193A5A", // Pantone 2955
//         accent: "#0081BC", // Process Blue
//         background: "#ffffff", // Default background color
//         foreground: "#000000", // Default text color
//       },
//       fontFamily: {
//         sans: ['Open Sans', 'Arial', 'sans-serif'], // Primary font
//         serif: ['PT Serif', 'Times New Roman', 'serif'], // Secondary font
//       },
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         edmonton: {
//           primary: "#005087", // Primary brand color
//           secondary: "#193A5A", // Secondary brand color
//           accent: "#0081BC", // Accent color
//           neutral: "#3d4451", // Neutral (for borders, etc.)
//           "base-100": "#ffffff", // Base background
//           "base-200": "#f7f7f7", // Secondary background
//           "base-300": "#e5e5e5", // Light borders
//           "base-content": "#000000", // Text color
//           info: "#2094f3", // Info notifications
//           success: "#009485", // Success messages
//           warning: "#ff9900", // Warnings
//           error: "#ff5724", // Errors
//         },
//       },
//     ],
//   },
// };


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#005087", // Pantone 2945
//         secondary: "#193A5A", // Pantone 2955
//         accent: "#0081BC", // Process Blue
//         background: "#ffffff", // Default background color for light mode
//         foreground: "#000000", // Default text color for light mode
//       },
//       fontFamily: {
//         sans: ['Open Sans', 'Arial', 'sans-serif'],
//         serif: ['PT Serif', 'Times New Roman', 'serif'],
//       },
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         "edmonton-light": {
//           primary: "#005087", // Primary brand color
//           secondary: "#193A5A", // Secondary brand color
//           accent: "#0081BC", // Accent color
//           neutral: "#3d4451", // Neutral for borders, etc.
//           "base-100": "#ffffff", // Light background
//           "base-200": "#f7f7f7", // Light secondary background
//           "base-300": "#e5e5e5", // Light borders
//           "base-content": "#000000", // Light mode text
//           info: "#2094f3",
//           success: "#009485",
//           warning: "#ff9900",
//           error: "#ff5724",
//         },
//       },
//       {
//         "edmonton-dark": {
//           primary: "#005087", // Primary brand color
//           secondary: "#193A5A", // Secondary brand color
//           accent: "#0081BC", // Accent color
//           neutral: "#1c1c1c", // Dark neutral for borders
//           "base-100": "#121212", // Dark background
//           "base-200": "#1f1f1f", // Dark secondary background
//           "base-300": "#2d2d2d", // Dark borders
//           "base-content": "#ffffff", // Dark mode text
//           info: "#2094f3",
//           success: "#009485",
//           warning: "#ff9900",
//           error: "#ff5724",
//         },
//       },
//     ],
//   },
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005087", // Pantone 2945
        secondary: "#193A5A", // Pantone 2955
        accent: "#0081BC", // Process Blue
        background: "#ffffff", // Light background
        foreground: "#000000", // Light text
      },
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'sans-serif'],
        serif: ['PT Serif', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        "edmonton-light": {
          primary: "#005087",
          secondary: "#193A5A",
          accent: "#0081BC",
          neutral: "#3d4451",
          "base-100": "#ffffff", // Light background
          "base-200": "#f7f7f7", // Light secondary background
          "base-300": "#e5e5e5", // Light borders
          "base-content": "#000000", // Text color
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      {
        "edmonton-dark": {
          primary: "#005087",
          secondary: "#193A5A",
          accent: "#0081BC",
          neutral: "#1c1c1c",
          "base-100": "#121212", // Dark background
          "base-200": "#1f1f1f",
          "base-300": "#2d2d2d",
          "base-content": "#ffffff", // Text color
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
  },
};
