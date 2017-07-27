const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let paths = {};
paths.projectRoot = path.resolve(__dirname, '../../');
paths = Object.assign({}, paths,
   {
      source: path.resolve(paths.projectRoot, 'source'),
      devToolsSetup: path.resolve(
         paths.projectRoot, 'devToolsSetup')
   }
);

module.exports = {
   entry: `${paths.source}/entry.jsx`,
   plugins: [
      new HtmlWebpackPlugin({
         template: 'source/entry.html'
      })
   ],
   module: {
      rules: [
         {
            test: /\.js(|x)$/,
            use: {
               loader: 'babel-loader',
               options: {
                  extends: `${paths.devToolsSetup}/babel/babelrc`
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
                  options: {includePaths: [paths.source]}
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
         path.resolve(paths.projectRoot, 'node_modules'),
         path.resolve(paths.source, 'reusables/all'),
         path.resolve(paths.source),
      ],
      extensions: ['.js', '.jsx']
   }
};