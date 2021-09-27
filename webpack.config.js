// 引入一个包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')


module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    // 指定打包文件目录
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',

    // 告诉webpack不使用箭头
    environment: {
      arrowFunction: false,
      // 不使用const,此时兼容IE 10
      const: false
    }
  },

  mode: 'development', // 设置mode

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            loader: "babel-loader",
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "88"
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式“usage”表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        // 从下往上执行
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          // 类似于babel，把css语法转换兼容旧版浏览器的语法
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions"
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}