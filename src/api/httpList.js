import qs from 'qs'  //ajax请求
import router from '../router/index'
// 引用axios
var axios = require('axios')
//获取URL查询字符串值
function getURLSearchParams(params){
    if(!isArray(params)) return;
    param = qs.stringify(params)
    return param
}

axios.interceptors.response.use(
    response => {
        if(response.data.errcode=='100'){
            // 100 清除token信息并跳转到登录页面
            router.push({
                path: '/user/mobileLogin',
                // path: '/user/login',
                query: {redirect: encodeURIComponent(router.currentRoute.fullPath)}
            })
        }else{
            return response
        }
    }   
)

// get请求
function getRequest(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
}
  
// post请求
function postRequest(url, params, success, failure) {
    return apiAxios('POST', url,params, success, failure)
}

/**
 * 发送请求
 */
function apiAxios(method, url, params,success, failure) {
    return new Promise((resolve, reject)=>{
        axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            withCredentials: true
        })
        .then((response)=> {
            if(response){
                if(response.data.data){
                    resolve(response.data.data)  
                }else if(response.data.status!=1){
                    reject(response.data)
                } else{
                   resolve(response.data.data)   
                }
            }else{
                reject('暂无数据') 
            }      
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export default {
    getRequest,
    postRequest
}