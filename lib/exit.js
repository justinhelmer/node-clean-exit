(function() {
  'use strict';

  var _ = require('lodash');
  var chalk = require('chalk');
  var pluralize = require('pluralize');

  function exit(options) {
    options = options || {};
    process.stdin.resume();

    process.on('exit', exitHandler);
    process.on('SIGINT', _.partial(exitHandler, {exitCode: 2}));
    process.on('uncaughtException', _.partial(exitHandler, {exitCode: 99}));

    function exitHandler(exitData, err) {
      if (!options.quiet && err && err.stack) {
        console.error(chalk.red(err));
        process.exit(1);
      }

      if (!_.isEmpty(options.children)) {
        if (options.verbose) {
          console.log('Killing', chalk.bold.blue(children.length + ''), 'background', pluralize('process', children.length), '...');
        }

        _.each(children, function(child) {
          if (_.isFunction(_.get(child, 'kill'))) {
            if (_.isNumber(options.verbose) && options.verbose > 1) {
              console.log(chalk.bold.cyan('process:'), child);
            }

            child.kill();
          } else if (options.verbose) {
            console.log(chalk.bold.yellow('[WARNING:]'), 'Not a valid node process. Skipping.');
            console.log(chalk.bold.cyan('found:'), child);
          }
        });

        children = [];
      }

      if (_.get(exitData, 'exit')) {
        process.exit(exitData.exit);
      }
    }
  }

  module.exports = exit;
})();
