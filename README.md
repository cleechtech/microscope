microscope
====

Code inside folders that are not `client/` or `server/` will run in both contexts

Anything you put inside the `/lib` folder is guaranteed to load first 
before anything else in your app. Its contents will be available on client and server.