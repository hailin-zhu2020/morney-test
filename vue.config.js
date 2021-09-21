/* eslint-disable */
const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/morney-website/'
      : '/',
  lintOnSave: false,
  /*用来配置svg*/
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
        .rule('svg-sprite') //规则名
        .test(/\.svg$/) //符合正则的文件使用该规则
        .include.add(dir).end()//只包含icons目录
        .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod') //新版不会出现scss文件导入不认识的问题，使用svg-sprite-loader就可以了
        .options({extract: false})//不要解析成文件
        .end() //使用svg-sprite-loader执行规则
        .use('svgo-loader').loader('svgo-loader') //svgo为svg优化
        .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]}))//删除svg图片中自带的fill属性
        .end()
    
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'),[{planSprite: true}])
    config.module.rule('svg').exclude.add(dir)//其他svg loader排除icons目录
  }
}
