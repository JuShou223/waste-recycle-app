export default {
  mini: {},
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    // webpackChain (chain) {
    //   /**
    //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
    //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
    //    */
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    //   /**
    //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首屏数据。
    //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
    //    */
    //   const path = require('path')
    //   const Prerender = require('prerender-spa-plugin')
    //   const staticDir = path.join(__dirname, '..', 'dist')
    //   chain
    //     .plugin('prerender')
    //     .use(Prerender, [{
    //       staticDir,
    //       routes: [ '/pages/index/index' ],
    //       postProcess (renderedRoute) {
    //         renderedRoute.route = renderedRoute.originalRoute
    //         renderedRoute.html = renderedRoute.html.split('>').join('>\n')
    //         if (renderedRoute.route.endsWith('.html')) {
    //           renderedRoute.outputPath = path.join(staticDir, renderedRoute.route)
    //         }
    //         return renderedRoute
    //       },
    //       renderer: new Prerender.PuppeteerRenderer({
    //         // 在 main.js 中 document.dispatchEvent(new Event('custom-render-trigger'))，两者的事件名称要对应上。
    //         renderAfterDocumentEvent: 'custom-render-trigger'
    //       })
    //     }])
    // }
  }
}