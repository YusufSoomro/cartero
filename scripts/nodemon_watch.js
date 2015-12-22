var spawn = require('child_process').spawn;

var watch_flags = [ 
  'config',
  'models',
  'views',
  'migrations',
  'routes',
  'seeders',
  'app.js',
  'bin/www'].map(function(arg){
    return '--watch ' + arg;
  });
var ext_flag = '--ext jade,json,js,css';
var exec_flag = '--exec \"npm run build && npm run start\"';
var flags = [].concat(watch_flags, ext_flag, exec_flag).join(' ');

var nodemon = spawn('nodemon', [flags]);

nodemon.stdout.on('data', function(data){
  console.log('stdout: ' + data);
});

nodemon.stderr.on('data', function(data){
  console.log('stderr: ' + data);
});

nodemon.on('exit', function(code){
  console.log('nodemon script exited with code ' + code);
});
