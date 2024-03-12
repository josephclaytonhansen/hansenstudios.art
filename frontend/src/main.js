import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Main from "./components/main/Main.vue"

import { createRouter, createWebHistory } from "vue-router"

import { routes } from "./routes.js"

routes.forEach((route) => {
  route.component = Main
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount("#app")

export { routes }
