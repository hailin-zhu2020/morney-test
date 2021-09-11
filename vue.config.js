// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  lintOnSave: false,
  /*用来配置svg*/
  chainWebpack : config =>{
    const dir = path.resolve(__dirname,'src/assets/icons')
    config.module
        .rule('svg-sprite') //规则名
        .test(/\.svg$/) //符合正则的文件使用该规则
        .include.add(dir).end()//只包含icons目录
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')//使用svg-sprite-loader执行规则
        .options({extract:false}) //不要解析成文件
        .end()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{planSprite: true}])
    config.module.rule('svg').exclude.add(dir)//其他svg loader排除icons目录
  }
}
