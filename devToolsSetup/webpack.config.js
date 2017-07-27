const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve(__dirname, '../');
const SOURCE_FILES_PATH = path.resolve(PROJECT_ROOT, 'source');
const DEV_TOOLS_SETUP_PATH = path.resolve(PROJECT_ROOT, 'devToolsSetup');
const devServerPort = 3030;

module.exports = {
   entry: `${SOURCE_FILES_PATH}/entry.jsx`,
   output: {
      publicPath: `http://localhost:${devServerPort}/`
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'source/entry.html'
      })
   ],
   devtool: 'source-map',
   devServer: {port: devServerPort},
   module: {
      rules: [
         {
            test: /\.js(|x)$/,
            use: {
               loader: 'babel-loader',
               options: {
                  extends: `${DEV_TOOLS_SETUP_PATH}/babelrc`
               }
            }
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            // css-loader resolves import url-s,
            // style-loader injects style elements in generated html
         },
         {
            test: /\.scss$/,
            use: [
               {loader: 'style-loader'},
               {loader: 'css-loader'},
               {
                  loader: 'sass-loader',
                  options: {includePaths: [SOURCE_FILES_PATH]}
               }
            ]
         },
         {
            test: /\.svg$/,
            use: {
               loader: 'svg-react-loader'
            }
         }
      ]
   },
   resolve: {
      modules: [
         path.resolve(PROJECT_ROOT, 'node_modules'),
         path.resolve(SOURCE_FILES_PATH, 'reusables/all'),
         path.resolve(SOURCE_FILES_PATH),
      ],
      extensions: ['.js', '.jsx']
   }
};