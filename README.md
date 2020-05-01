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
