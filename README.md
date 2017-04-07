# Angular-Polymer Generator

This project bridges the gap between **[Angular](https://angular.io)** and **[Polymer 1.x](https://www.polymer-project.org/)**. Therefore `generator-angular-polymer` is a [Yeoman generator](http://yeoman.io/) which creates directives to deal with issues between current Angular and Polymer versions.

> The directives base on [angular-polymer](https://github.com/platosha/angular-polymer/).

## Getting Started
1. Configure the generator for your project setup (see [Configuration](#configuration)).
2. Run `yo angular-polymer` to create directives.
3. Integrate the created directives in the existing Angular project. They are stored within the configured out-dir.

## Demo App
The [demo project](https://github.com/pfecht/angular-polymer-demo) shows an example usage of the generator with Angular 4 and angular-cli.

## Installation
This project is part of the Yeoman environment and requires a current Yeoman version installed. To install Yeoman run:


```npm install -g yo```.

For more informations about Yeoman see the [Yeoman documentation](http://yeoman.io/).

Afterwards install the generator globally with:

```npm install -g generator-angular-polymer ```

or local with: 

```npm install --save-dev generator-angular-polymer ```

## Configuration
The generator's configuration is stored within the Yeoman configuration file (`.yo-rc.json`). Run `yo angular-polymer:init` inside the root directory of your project which creates an initial configuration of the generator.

The configruation file is located in the project's root directory and offers you the following configuration parameters:

| Parameter     | Function  |
| ------------- |-------------|
|html-imports| List of all paths to html documents that contain polymer-elements the directives should be created for. |
| out-dir | Relative path to a directory in which the generatered directives will be stored.
|excluded| List of all elements that should not be part of the generation process.



## Best Practices
### Use "Wrapper Files"
It's helpful to use one file which includes the Polymer elements in the Angular application and configures the generator, too. Since the file paths of polymer elements don't exist twice these wrapper files minimalize the configuration overhead.

### Use the global `POLYMER_ELEMENTS` constant
It's possible but not to recommended to separately include polymer elements instead of using the global `POLYMER_ELEMENTS` constant. This constant encapsulates all necessary directives and gets recreated after every generator run. Because of this, there are no changes in Angular after adding or removing Polymer elements necessary.

## Contributors
none

## License
Apache License 2.0