# Angular Riding Rails

I created this boilerplate to help me minimize the time needed to get Angular2, Webpack, and Karma test working within my Rails5 applications. I figured it might be useful to other developers who want to bypass the initial headache of dealing with configuration errors and who prefer to focus their time on more important things. Along with some initial files and basic npm commands to get started, I also added the Tour of Heroes example to this repo. When initialized you will be able to see a working example of an Angular2 app, with routing, and api support from the Rails backend. You should be able to follow the code in this simple example to get your app connected and running smoothly.

#### Brief summary of the technologies used

-  Rails 5 - See major changes [here](http://edgeguides.rubyonrails.org/5_0_release_notes.html)
-  Postgres - I use postgres for all of my relational database needs. You can change this by updating the db adaptor and making the necessary changes to the `config/database.yml` 
-  RackCors - Used for development `only` to avoid cross origin issues when using the webpack-dev-server or the karma chrome debugger.
-  RspecRails - Just because...
-  Angular2 - Additional info can be found [here](https://angular.io/docs/ts/latest/)
-  Webpack - Additional info can be found [here](http://webpack.github.io/docs/)
-  Karma Test Runner - Additional info can be found [here](http://karma-runner.github.io/1.0/intro/installation.html)
-  PhantomJS - Used for headless javascript testing
-  Typescript - I think this is just a new standard for Angular2. It's a little confusing at first glance, but it's not that hard to pick up.

I created this using Mac OS, so I'm unaware of and PC issues that exists when developing Rails applications on Windows. If you have any problems on Windows, and have recommendations on how to fix them, please open a pull request with your suggestions. 

### Prerequesites

I'm assuming if you found this repo, than at a minimum, you have some version of NodeJS installed and your preferred version of Ruby. For this app I used RVM to install Ruby `ruby-2.3.0` and NVM to install Node `v5.0.0` which ships with NPM `3.3.6`. There's plenty of documentation online for installing both Ruby and Node, so I'm not covering that here.

### Quick Start

Get the app

`$ git clone git@github.com:dsgn1graphics/angular-riding-rails.git`

Rails setup

```
$ cd <app dir>
$ bundle install
$ rake db:create
$ rake db:migrate
```

Node Setup

```
$ npm install
$ npm run test
$ npm run build
```

Start the rails server

`$ rails server`

View the app at http://localhost:3000

#### Setup Gotchas

If you use the [Postgres App](http://postgresapp.com/) like me you may get an pg gem install error. Have no fear, this is common. You just need to tell bundler where to find the `pg_config` file. Use the following command and you should be ok. Make sure you update the version numbers accordingly.
  
```
gem install pg -v '0.18.4' -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/9.6/bin/pg_config
```  

#### Files and Directories

I tried to keep the directory structure simple, organized and easy to understand.

```
app
├── assets
│   ├── angular
│   │   ├── app.bundle.js
│   │   ├── app.bundle.js.map
│   │   ├── assets
│   │   │   └── angular.png
│   │   ├── index.html # used for webpack-dev-server
│   │   ├── polyfills.bundle.js
│   │   ├── polyfills.bundle.js.map
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── app.module.ts
│   │   │   │   ├── components
│   │   │   │   │   └── app.component.ts
│   │   │   │   ├── stylesheets
│   │   │   │   │   └── app.component.css
│   │   │   │   └── templates
│   │   │   │       └── app.component.html
│   │   │   ├── main.ts
│   │   │   ├── polyfills.ts
│   │   │   └── vendor.ts
│   │   ├── vendor.bundle.js
│   │   └── vendor.bundle.js.map
config
├── javascripts
│   ├── helpers.js
│   ├── karma-test-shim.js
│   ├── karma.conf.js
│   ├── webpack.common.js
│   ├── webpack.demo.build.js
│   ├── webpack.demo.js
│   ├── webpack.dev.js
│   ├── webpack.prod.js
│   └── webpack.test.js
spec
├── javascripts
│   └── app.component.spec.ts
├──node_modules
├──karma.conf.js
├──package.json
├──tsconfig.json
├──typings.json
├──webpack.config.js
  
```                        


#### The asset pipeline

The asset pipeline framework is used to compress, compile or minify assets through the usage of preprocessors such as CoffeeScript, Sass, or ERB. The usage of the asset pipeline along with Webpack is vital to making sure concerns remain separated without swaying away from Rails conventions. Because stand alone front end apps are nearly impossible to create without a server to control things like sessions or ssl encryption, it only makes since to inject and serve our Angular2 code through the framework that Rails already provides. Because of the unique setup of this example app, it is still possible to develop the front end application separately from the api backend. This could work perfectly for small to large development teams or freelancers. The ability to extend a Webpack build by preprocessing files through ERB for variable injection is still possible, but I won't be covering that here.
        
Below are a few things to note, as far as understanding how to setup a similar project with Angular or even React.
                
`config/initializers/assets.rb`
```
Rails.application.config.assets.precompile  += %w( ui.js )
```

This line adds the file `ui.js` to the Rails precompile array. Any files that are required within this file will automatically be processed through the requested preprocessor extension (ie. .erb, .coffee). In a nutshell, if you wanted to modify your Webpack config to create chunk files with a .erb extension, you should be able to use variable injection with ERB to add server information prior to the final output of your js file being created. Once completed, the digested file will be added to the appropriate `public/assets/` directory.

Additionally, for even better dependency control, you could add the addition precompile files for the vendor and polyfill chunks that Webpack creates. These file can be loaded separately into the browser decreasing the resulting file size and download time. This is probably the best way to do things if your app will be targeting mobile devices.

`app/views/layouts/application.html.erb`

This file is the entry level template for the application. You'll see some the of the standard header information included, but most importantly you'll see the following two lines added.

```
<base href="/">
```
Needed for angular routing

```
<%= javascript_include_tag 'ui', 'data-turbolinks-track': 'reload' %>
```
Creates the script tag with the appropriate digested file name. If you're splitting up your vendor and polyfill chunks as mentioned above, you'll need to add those files here so that they are loaded into the browser.

##### Advanced asset pipeline gotchas

If you're taking a look at the example app, you'll notice that another file was modified.

`config/application.rb`
```
Rails.application.config.eager_load_paths += Dir[Rails.root.join(\'app\', \'tour_of_heroes\', \'**\')]'
```

This line was added to tell Rails that there is an additional non-standard app directory available to load and lookup objects from. Because the example app is only included for demonstration purposes this line is added during the demo setup task and removed during the demo remove task. It's not needed for regular operation. 


### Viewing the Tour of Heroes Example

This is a fully working example of the Tour of Heroes tutorial that is available on the [Angular tutorial](https://angular.io/docs/ts/latest/tutorial/) page. I've taken the liberty of creating a working api controller so that calls can be processed and data can be persisted. I'm hoping this will give you a good start with consuming an API service from your isolated Angular app.
  
#### Setup

This command will create and modify the appropriate files and directories needed to copy the Tour of Heroes app into the asset pipeline and configure the api routing.
  
```
rake tour_of_heroes:setup
```

This command will populate the newly created heroes table with sample data. There is no migration or schema changes recorded for the example, so the cleanup task won't require any database migrations or rollbacks. Meaning, you could keep the example app running as a reference, but I don't recommend doing this since you only have to run two task at any time to view the example.
 
```
rake tour_of_heroes:seed
```
 
This command will remove the example app, remove the heroes table in the database, and clean up any additional configuration files that where modified during the setup task. 
 
```
rake tour_of_heroes:remove
```
 

#### Starting the Tour of Heroes Example
  
I set this up as a working development/production app, so you can use the `webpack-dev-server` or build the example app as if it where running in production mode. When in development and building out your front end application the webpack dev server will have to be started in a different terminal process then the Rails server.
  
Start the Rails server on port 3000 (default).

```
rails server
```

Start the webpack dev server.

```
npm run demo
```

You can now view the demo app at `http://localhost:8080`. Once the Angular router takes over the browser you'll notice the redirect to `/dashboard`. I set this as the default route, but I encourage you to change and play with the routing defaults while exploring. The webpack dev server handles browser sync fairly seamlessly, so you can make changes to the example app code and see your changes appear without having to restart either server.

To build the app as if you where in a production environment, simple run the following command.

```
npm run demo:build
```

This will build and precompile files that will be made available in the Rails asset pipeline like your live production app will. There's no need for the webpack dev server at this point, so feel free close it and view your compiled app at `http://localhost:3000`


### Testing

Test are located in the `spec/javascripts` directory. Karma is configured to look into this directory to load test files. Relative file paths are used in test import statements to load the required application code. This can be cleaned up possibly by creating a helper function that pre-loads app files, or that returns the an asset path for the require function. If you have a better solution I'd love to see it.

More about testing can be found [here](https://angular.io/docs/ts/latest/guide/testing.html).

The following command will run test in a headless state using PhantomJS. Testing was not included for the sample app, in case you're wondering :(
  
```
npm run test
```
  
The testing debugger command will run test in a Chrome browser so that you can use the Karma debug browser tools.

```
npm run test:debug
```

To change or add additional browsers, modify the following line in the  `config/javascripts/karma.conf.js` file.

```
configuration.browsers = ['Chrome'];
```


# Licence

Nowadays who really cares about this... But just incase, lets just call it [MIT licensed](./License.txt).

# Questions, concerns, issues?

Feel free to fix any bugs you find and open a pull request. If there are additional features you'd like me to add to the Rails side or the example app, open an issue and I'll consider adding it.