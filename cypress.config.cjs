const {defineConfig} = require('cypress')

module.exports = defineConfig({
    component: {
        devServer: {
            framework: 'svelte',
            bundler: 'vite',
        },
    },
    viewportHeight: 814,
    viewportWidth: 1440
})