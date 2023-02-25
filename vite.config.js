import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import StringReplace from 'vite-plugin-string-replace'

// https://vitejs.dev/config/

let devEnv = process.env.NODE_ENV == 'development' ? true : false

export default defineConfig({
  plugins: [
    vue(),
    StringReplace([
            {
                search: '%BASE_URL%',
                replace: devEnv ? 'http://localhost:5000' : 'https://broke-foodie-server.vercel.app',

            },
        ])
  ],
})
