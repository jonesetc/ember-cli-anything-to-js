var defaults  = require('lodash.defaults');
var checker = require('ember-cli-version-checker');
var ToJSFilter = require('broccoli-anything-to-js');

/**
 * The preprocessor to register with Ember.
 *
 * @class
 * @param {object} options The options object
 */
function ToJSPreprocessor(options) {
    this.name = 'ember-cli-anything-to-js';
    this.options = options || {};
}

/**
 * Ember CLI add-on hook. This actually calls broccoli-anything-to-js, which does the work.
 *
 * @function
 * @param {string,broccoliTree} tree The options object
 * @param {string,broccoliTree} inputPath
 * @param {string,broccoliTree} outputPath
 */
ToJSPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
    defaults(this.options, {
        srcDir: inputPath,
        destDir: outputPath
    });

    return ToJSFilter(tree, this.options);
};

module.exports = {
    name: "Ember CLI Anything-To-JS Addon",

    /**
     * Function for checking if we need to manually run setupPreprocessorRegistry.
     *
     * @function
     * @return {boolean} Whether we need to manually run setupPreprocessorRegistry
     */
    shouldSetupRegistryInIncluded: function () {
        return !checker.isAbove(this, '0.2.0');
    },

    /**
     * Access the configuration for this plugin from the Ember CLI environment.
     *
     * @function
     */
    getConfig: function () {
        var brocfileConfig = {};
        var toJSOptions = this.project.config(process.env.EMBER_ENV).toJSOptions || {};

        return toJSOptions;
    },

    /**
     * Register this as an Ember CLI preprocessor.
     *
     * @function
     * @param {string} type
     * @param {registry} registry
     */
    setupPreprocessorRegistry: function(type, registry) {
        var plugin = new ToJSPreprocessor(this.getConfig());
        registry.add('js', plugin);
    },

    /**
     * Ember CLI add-on hook. All this does is call setupPreprocessorRegistry if needed.
     *
     * @function
     * @param {Ember.app} app
     */
    included: function (app) {
        if (this.shouldSetupRegistryInIncluded()) {
            this.setupPreprocessorRegistry('parent', app.registry);
        }
    }
};
