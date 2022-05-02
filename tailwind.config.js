module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SUIT", "sans-serif"],
        "head-bold": ["CocoSharpL-Bold", "SUIT", "sans-serif"],
        head: ["CocoSharpL-Regular", "SUIT", "sans-serif"],
      },
      colors: {
        primary: "#9747FF",
      },
    },
  },
  plugins: [],
};
