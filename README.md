# CWFileExplorer

This is a **work in progress**.

## Running

To run the server, navigate to the project directory and run:

```
sudo node server/app.js
```

The `sudo` is required because currently the app does not handle permission
checking and might crash if a resource that the default user does not have
access to is attempted to be accessed.

Once the server is running, simply run the Xcode project in your simulator.


