# Quick instructions for this:

## Personalize the config.js

```console
cp example-config.js config.js
```

Change the url, username, and password to the API URL you have in your server, 
which can be found in your server's continuum.conf, for example:

```code
module.exports.efmrl = {
  url : 'http://api.efmrl.dean.demo.apcera.net',
  username : 'test',
  password : 'dummy'
}
```

## Personalize the App Manifest

```console
cp example-continuum.conf continuum.conf 
```

Change the url that you want this to be live on, for example (this should be unique in the cluster):

```code
name: "loadshow"
allow_egress: true
start: true

ports: [
  {
    number: 0,
    routes: [
      {
        type: "http",
		# This is the endpoint the loadshow gui will be available on
        endpoint: "loadshow.jrs.demo.apcera.net"
      }
    ]
  }
]

## Start the application

```code
apc app start
```