import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElLoading} from "element-plus";
import Router from "./router/index.js"
import Store from "./store"
import * as echarts from 'echarts'




let loading;
const isLoading = (show_text) => {
    loading = ElLoading.service({
        lock: true,
        text: show_text,
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0.7)'
    });
}
const finishLoading = () => {
    loading.close();
}


const app = createApp(App)
app.config.productionTip = false
app.config.globalProperties.$finishLoading = finishLoading
app.config.globalProperties.$showLoading = isLoading
app.config.globalProperties.$echarts = echarts
app.use(ElementPlus).use(Router).use(Store).mount('#app')

