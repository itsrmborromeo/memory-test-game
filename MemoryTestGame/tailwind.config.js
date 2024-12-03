/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "app-banner": "url(assets/images/coded.gif)",
        "gameboard-background": "url(assets/images/square.jpg)",
        "fruit-background": "url(assets/images/fruit-bg.png)",
        "sidebar-background": "url(assets/images/gif.gif)",
      },
    },
  },
  plugins: [],
};
