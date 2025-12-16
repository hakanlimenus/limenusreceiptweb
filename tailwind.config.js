// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ src klasörü içindeki tüm dosyalar
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ app router yapısı kullanıyorsan
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // 🔠 Örnek özel font
      },
    },
  },
  plugins: [],
};