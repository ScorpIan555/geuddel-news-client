const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const devServerConfig = require('./webpack.dev.config');

// Set port to serve development server
const Port = 3000;
const Host = 'localhost';

// Set server options
const options = {
  host: Host,
  // enable hot module reloading here
  hot: true,
  // full-screen overlay in browser for errors or warnings
  overlay: {
    warnings: false,
    errors: true
  },
  // Settings for errors and warnings to be shown in console
  quiet: false,
  // Show or hide build info
  noInfo: false,
  // Tell server where to look for static files
  contentBase: devServerConfig.devServer.contentBase,
  // If static content changes, force page reload
  watchContentBase: true,
  // configure public path
  publicPath: devServerConfig.output.publicPath,
  // to use React Router > v4, set historyApiFallback to true
  historyApiFallback: true,
  //  to execute custom middleware options/commmands, use after()
  after() {
    process.stdout.write(`dev server running at http://${Host}:${Port}\n`);
  }
};

// configure webpack development server application with config & server options at entry points
WebpackDevServer.addDevServerEntrypoints(devServerConfig, options); // double check that this isn't duplicating/interfering
// load compiler with configuration
const compiler = webpack(devServerConfig);
// instantiate dev server object with compiler library + options
const server = new WebpackDevServer(compiler, options);
// direct server object to listen
server.listen(Port, Host, () => {});
