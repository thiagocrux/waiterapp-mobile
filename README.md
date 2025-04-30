# WaiterApp (Mobile)

Mobile client of the WaiterApp, an app made to help waiters to manage orders. This app enables you to create orders.

For more details on other project components, check out the [API](https://github.com/thiagocrux/waiterapp-api) and [web client](https://github.com/thiagocrux/waiterapp-web) repositories.

## Technologies

These are some of the tecnologies used in this project:

- `commitlint`: A tool that checks your commits and ensures consistency in version control.
- `eslint`: A linting tool for JavaScript/TypeScript code.
- `husky`: A tool for adding Git hooks to automate tasks like linting, testing, or commits in JavaScript/Node.js projects.
- `lint-staged`: Runs linters on Git staged files.
- `prettier`: A code formatter.
- `react-native`: A framework for building native mobile applications for iOS and Android using JavaScript and the React paradigm.
- `styled-components`: A library for React and React Native that allows you to use component-level styles in your application.
- `tsx`: A command-line tool and Node.js enhancement that allows you to execute TypeScript files directly without needing to explicitly compile them to JavaScript first.
- `typescript`: A superset of JavaScript that introduces optional static typing, interfaces, enums, and other language features.

_For more information about other dependencies, see the `package.json` file._

## Requirements

To fully experience and test this application during development, you'll need either the [Expo Go](https://expo.dev/go) app installed on your mobile device or the [Android Studio](https://developer.android.com/studio?gad_source=1&gbraid=0AAAAAC-IOZnyFaBH2T4tNZWS-HYe3XH0l&gclid=Cj0KCQjw2ZfABhDBARIsAHFTxGzl6xUeXQy2zz4WwtmLmddsa-p-Ve2xmNjHgrIH-IWLqygtPOQP0hsaAu10EALw_wcB&gclsrc=aw.ds&hl=pt-br) emulator configured on your computer.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/waiterapp-mobile.git
```

2. Browse to the project folder:

```bash
cd waiterapp-mobile
```

3. Install dependencies:

```
pnpm install
```

## Available scripts

This section describes the available scripts in the `package.json` file and their functionalities.

### Development

- #### `start`

  Starts the expo development server. It bundles your JavaScript code, assets, and provides a way for your app to run on emulators, simulators, or physical devices.

  ```bash
  pnpm dev
  ```

- #### `android`

  This script specifically tells the Expo CLI to start the development server and then attempt to open your app in an Android emulator or on a connected Android device. If you don't have an emulator running, it might prompt you to set one up.

  ```bash
  pnpm android
  ```

- #### `ios`

  Similar to the Android script, this one starts the development server and tries to open your app in an iOS simulator. You'll need Xcode installed on your macOS machine to use this.

  ```bash
  pnpm ios
  ```

- #### `web`

  This script starts the development server and opens your React Native app in a web browser. Expo makes it possible to target web platforms in addition to native mobile.

  ```bash
  pnpm web
  ```

### Code quality

- #### `lint`

  Analyzes your codebase for potential errors and style violations using `eslint`.

  ```bash
  pnpm lint
  ```

### Git hooks

- #### `prepare`

  Automatically configures Git hooks (via `husky`) before each commit.

  ```bash
  pnpm prepare
  ```

## Screenshots

![image](https://raw.githubusercontent.com/thiagocrux/_images/refs/heads/main/screenshots/waiterapp/waiterapp-mobile-screenshot-1.png)
![image](https://raw.githubusercontent.com/thiagocrux/_images/refs/heads/main/screenshots/waiterapp/waiterapp-mobile-screenshot-2.png)
![image](https://raw.githubusercontent.com/thiagocrux/_images/refs/heads/main/screenshots/waiterapp/waiterapp-mobile-screenshot-3.png)
![image](https://raw.githubusercontent.com/thiagocrux/_images/refs/heads/main/screenshots/waiterapp/waiterapp-mobile-screenshot-4.png)
![image](https://raw.githubusercontent.com/thiagocrux/_images/refs/heads/main/screenshots/waiterapp/waiterapp-mobile-screenshot-5.png)

## Useful links

- [JStack](https://app.jstack.com.br/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
