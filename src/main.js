import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElLoading} from "element-plus";

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
app.use(ElementPlus).mount('#app')

