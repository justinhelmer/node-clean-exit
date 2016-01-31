(function() {
  'use strict';

  var _ = require('lodash');
  var chalk = require('chalk');
  var pluralize = require('pluralize');

  /**
   * Exit a node script cleanly, including child processes.
   *
   * @param {object} [options] - Additional options to modify the behavior of exit().
   * @param {array} [options.children] - List of spork or forever-monitor child processes to be killed on exit.
   * @param {boolean} [options.quiet=false] - Output nothing (suppress STDOUT and STDERR)').
   * @param {mixed} [options.verbose=false] - Output more. Can be a boolean or a number. The higher the number, the higher the verbosity.
   * @see https://github.com/justinhelmer/node-spork
   */
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
          console.log('Killing', chalk.bold.blue(options.children.length + ''), 'background', pluralize('process', options.children.length), '...');
        }

        // suppress errors that may come up for children that are already killed
        process.stdout.write = _.noop;

        _.each(options.children, function(child) {
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

        options.children = [];
      }

      if (_.get(exitData, 'exit')) {
        process.exit(exitData.exit);
      }
    }
  }

  module.exports = exit;
})();
