# The Dartmouth Mobile App

## Setup

The project is built on React Native bootstraped with Expo.

Before continuing, ensure that you have Node 12.16.X and XCode CLT installed.

### Installing Expo command line interface (CLI)

```bash
$ npm install --global expo-cli
```

The only bugs you should see outputted are `WARN deprecated` or `WARN optional/notsup`. If anything else comes up, let me know.

### Project local setup

#### Package installation

Our project depends on many external Node packages. Once you have cloned the repo, run

```bash
$ yarn install
```

to fetch all the latest modules. Once downloaded, they are found in `node_modules`.

#### Starting up the app

Finally, to start the local development app, choose among the following:

1. `yarn start` opens the generic Expo interace, where you can choose where to run the app
2. `yarn web` runs the app virtually on your browser
3. `yarn ios` runs the app natively on your XCode simulator
4. `yarn android` runs the app with Android Studio

Ensure this is working, and you've completed the installation!
