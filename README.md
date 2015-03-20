# ember-cli-anything-to-js
Ember CLI preprocessor add-on to embed any type of file into a valid JS module, exporting the original file's contents as a string.

This is a work in progress, but it is in a very usable state. Any issues or comments are greatly appreciated.

## Installation

`npm install ember-cli-anything-to-js --save-dev`

## Configuration

Configure the add-on in your application's `config/environment.js`:

    ENV['toJSOptions'] = {
        trimFiles: true, // defaults to false
        extensions: ['vert', 'frag'] // defaults to ['txt']
    };

## Common issues

This takes the entire app tree, scanning for eligible files, modifying them in-place and then assigning them the appropriate `.js` extension. If files are in the same directory and have the same name, but different extensions, there will be a collision. The best advice is to not name files so similarly, but if it is unavoidable, just move them to different subdirectories. A practical example of this would be for WebGL shader files like this:

    app/
        utils/
            vert-shaders/
                sweet-shader.vert
            frag-shaders/
                sweet-shader.frag

Another issue comes from over sharing files. If you tell this plugin to transform `.txt` files, it will transform all of them, and they will be included in your build. Don't do this if you have any sensitive data sitting in any files in your app tree. You probably shouldn't do that anyway, regardless of using this add-on or not.

## TODOs

- Add tests
- Potentially concentrate non-js files to a certain directory in app
