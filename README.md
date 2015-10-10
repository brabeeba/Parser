# Parser
## Overview
This single page web app is built with ♥ by Brabeeba Wang with Flask and React.js <br/>
This is the prototype website for demo tracking system.<br/> 
## Stack
<b>Front end</b>: react.js<br>
<b>Back end</b>: Flask<br>
<b>Dependency manager</b>: Bower and npm for javascript, virtualenv for python<br>
<b>Streaming Build System</b> (This is where the magic happened ;) ) gulp + watchify + babel + browserify + exorcist
## Setup
Get gulp dependency
```
sudo npm install --global gulp
```
And to start the auto building process
```
gulp
```
Then, whenever you save the JSX file, gulp will automatically compile it to Javascript and bundle it to bundle.js. To run the website, type
```
./run.py
```
## Directory
The main front end UI JSX file is in 
```
/app/static/js/main.js
```
The streaming build system is 
```
/gulp.js
```
API is exposed at
```
/app/view.py
```

