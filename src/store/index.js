import {createStore} from 'vuex'
import axios from 'axios';


const store = createStore({
    state: {
        token: localStorage.getItem('token'),
    },
    mutations: {
        auth_success(state, {token, user}) {
            state.token = token;
        },
        logout(state) {
            state.token = '';
        },
    },
    actions: {
        Login({commit}, {params, checkList}) {
            return new Promise((resolve, reject) => {
                console.log(params);
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                /*axios.post('/api/admin/login', params)
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('token', token.toString())
                        commit('auth_success', {
                            token: token,
                        })
                        resolve(resp)
                    })
                    .catch(err => {
                        localStorage.clear();
                        reject(err)
                    })*/
                if (params.username == 'admin' && params.password == '123456') {
                    localStorage.setItem('token', "123456");
                    resolve();
                }
            })
        },
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.clear()
                resolve('logout');
            })
        }
    },
});
export default store;