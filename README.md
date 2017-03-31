# Angular-Polymer Generator

This project bridges the gap between **[Angular](angular.io)** and **[Polymer 1.x](https://www.polymer-project.org/)**. Therefore `generator-angular-polymer` is a [Yeoman](http://yeoman.io/) generator which creates directives to deal with issues between current Angular and Polymer versions.


## Basic Usage
> For the basic setup to use Polymer elements in Angular projects see TODO

1. Follow the instuctions to configure the generator (see [Configuration](#Configuration)).
2. Run `yo angular-polymer` to create directives.
3. Integrate the created directives in the existing Angular project.

/*Therefore add the `POLYMER_ELEMENTS` constant to the  the index.ts file inside in the configuried output directory to.*/

## Demo App
> TODO: Link Demo App project


## Motivation and Goal
The strengths of Angular seem to be obvious. It enables an enormous amount of possiblities to develop high interactive single page applications. However, even today the ui components of Anguar aren't usable in other frameworks. Because of this, Web Components as standard and Polymer as their most common library enable the development of native and re-usable ui elements. That's why the goal of `generator-angular-polymer` is the cooperative usage of Angular and Polymer in productive projects.

## Installation
This project is part of the Yeoman environment and requires therefore a current version of Yeoman installed. To install Yeoman run:

```npm install -g yo```.

> TODO: Explain installation of yeoman as npm package


## Configuration
The generator needs to be configured with a standard Yeoman configuration file (`.yo-rc.json`). 
To initially create a basic configuration, run the  `yo angular-polymer:init` command in the root path of the target project.

The generated file is also located in the project root path and provides the following parameter:

| Parameter     | Function  |
| ------------- |-------------|
|html-imports| List of all paths to html documents that contain polymer-elements the directives should be created for. |
| out-dir | Relative path to the directory inside the target project the generatered directives should be stored in.
|excluded| List of all elements that should not be involved inside the generation process.

## Tests
> TODO: Add tests

## Best Practices


### "Wrapper Files"
It's recommanded to use the same file to add Polymer elements to the Angular application and to configure the generator. Instead of adding the file paths of polymer elements twice these wrapper files minimalize the configuration overhead.

### Use the global `POLYMER_ELEMENTS` constant
It's possible but not to recommend to seperatly include polymer elements instead of using the global `POLYMER_ELEMENTS` constant. This constant encapsulates all necessary directives and gets recreated after every generator run. Because of that there aren't changes inside of Angular necessary after adding / removing elements.

## Contributors
Pascal Fecht (fecht.pascal@gmail.com)

## License

Apache License 2.0