const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },

  viewportHeight: 814,
  viewportWidth: 1440,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
