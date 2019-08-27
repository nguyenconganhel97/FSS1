module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      HomePage: 'app/components/HomePage.js',
      Cell: 'app/components/Cell.js',
      Topics: 'app/components/Topics.js',
      About: 'app/components/About.js',
      Account: 'app/components/Account.js',
      SignIn: "app/components/SignIn.js",
      Login: "app/components/Login.js",
      AccountInfo: "app/components/AccountInfo.js"
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  }
};
