module.exports = {
    port: 666,
    outDir: "admin",
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: { // 代理配置信息
            '/api': {
                target: 'http://82.156.168.246:8080',   //代理接口
                // target: 'http://localhost:8080',
                changeOrigin: true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
                pathRewrite: {
                    '^\/api': '' // 重写路径
                }
            }
        },
    }
}