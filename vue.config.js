const ImageminPlugin = require('imagemin-webpack-plugin').default;
const EncodingPlugin = require('webpack-encoding-plugin');
const path = require('path');
// 新建一个multipage.js文件，用来处理vue加载模板的入口；
const pages = require('./config/multipage').getPages();
const getRoutes = require('./config/multipage').getRoutes();
const NODE_ENV = process.env.NODE_ENV;
const argv = require('minimist')(process.argv.slice(2));
let pre = argv.pre ? true : false;
let outputDir = path.resolve(getRoutes, './release');
if(pre){
  outputDir = path.resolve(getRoutes, './pre');
}
module.exports = {
  outputDir: outputDir,
  assetsDir: 'static',
  // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  pages,
  css: {                // css相关配置
    sourceMap: false, // 开启 CSS source maps?
    // loaderOptions: {
    //   less: {
    //     javascriptEnabled: true
    //   }
    // },             // css预设器配置项
    modules: false, // 启用 CSS modules for all css / pre-processor files.,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      }
    }
  },

  chainWebpack: config => {
    config
      .plugin('ImageminPlugin')
      .use(ImageminPlugin, [{
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '80-90'
        }
      }]);
    config
      .plugin('EncodingPlugin')
      .use(EncodingPlugin,[{
        test: /\.(js|css|html)$/i,
        encoding: 'utf-8'
      }]);
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
    if (NODE_ENV === 'production') {
      config.module.rule('images').use('url-loader').loader('url-loader').tap(options => {
        Object.assign(options, { limit: 10240 })
        return options;
      });
      config.plugin('extract-css').tap(() => [
        {
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].css'
        }
      ]);
    }
  },

  configureWebpack: config => {
    if (NODE_ENV === 'production') {
      // config.output.path = path.join(__dirname, './dist')
      config.output.filename = 'static/js/[name].[contenthash:8].js'
      config.output.chunkFilename = 'static/js/[name].[contenthash:8].js'
    }
    Object.assign(config, {
      // 打包时webpack不打包进去
      // externals: [
      //   { 'vue': 'window.Vue' },
      //   { 'vue-router': 'window.VueRouter' }
      // ],
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './trunk'),
          'assets': path.resolve(__dirname, './trunk/assets'),
          'common': path.resolve(__dirname, './trunk/common'),
          'components': path.resolve(__dirname, './trunk/components'),
          'pages': path.resolve(__dirname, './trunk/branch'),
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    });
  }
};

