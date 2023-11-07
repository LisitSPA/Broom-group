module.exports = {
  content: [
    './app/views/**/*.{html,html.erb,erb}',
    './app/views/devise/**/*.{html,html.erb,erb}',
    './app/frontend/components/**/*.{vue,js,ts,jsx,tsx}',
    './app/frontend/**/*.{vue,js,ts,jsx,tsx}',
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        CoolGray: "#DEE2E6",
        Coral: "#F07167",
        DarkSlateGray: "#253237",
        LightBlueGray: "#489FB5",
        LightCyan: "#CAF0F8",
        LightGray: "#E9ECEF",
        LightGrayishBlue: "#F4F6F8",
        LightSilver: "#F8F9FA",
        NavyBlue: "#1B4965",
        RoyalBlue: "#0077B6",
        TealBlue: "#0A9396",
        Turquoise: "#00A896",
        RoseRed: "#AA4B6B",
        SlateGray: "#6B6B83",
        AquaTeal: "#3B8D99",
      },
    },
  },
  plugins: [],
}
