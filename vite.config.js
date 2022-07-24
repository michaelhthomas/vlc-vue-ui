import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import viteComponents, { VuetifyResolver } from "vite-plugin-components";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    viteComponents({
      customComponentResolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
			'@/': `${path.resolve(__dirname, 'src')}/` // eslint-disable-line
    },
  },
  server: {
    port: 8081,
    proxy: {
      "^/requests": {
        target: "http://127.0.0.1:8080",
        // ws: true,
        changeOrigin: true,
      },
    },
  },
});
