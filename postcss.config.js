// postcss.config.js
module.exports = {
    plugins: {
      '@tailwindcss/postcss': {}, // ✅ Required for Tailwind 4.x + Next 15 canary
      autoprefixer: {},
    },
  };
  