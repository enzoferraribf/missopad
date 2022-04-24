# How to Configure Firebase Emulator

## Requeriments

- Install latest [Java](https://www.java.com/it/download/)
- Install latest [Node.js](https://nodejs.org/en/)
- [Firebase](https://firebase.google.com/?hl=pt) Account
- Firebase project (create one at Firebase Console)
- Create a Firebase app under project configurations
- Basic knowledge of CLI

## Setup Firebase

1) Run this command to install Firebase globally with npm.

```
npm install -g firebase-tools
```

2) Install firebase tools with yarn

```
yarn global add firebase-tools
```

3) Login with your Firebase account

```
firebase login
```

## Create Firebase Project

Now you should have everything installed and configured to start using Firebase.

Make sure you're on the root project folder

**IMPORTANT: remove default firebase project from /.firebaserc**

1) Init Firebase project

```
firebase init
```

It will prompt some questions:

    1) You choose yes or no
    2) Select only Emulators, since we want to run it only locally
    3) Select Authentication and Database Emulators
    4) Leave everything default and install emulator

2) Get Credentials, copy and paste it on src/services/Firebase.ts

Note: don't commit this file changes into main

```
firebase apps:sdkconfig
```

3) Start the Firebase Emulator

```
firebase emulators:start
```

4) Open Firebase UI, go to Database Realtime and copy the database URL then paste it in firebaseConfig

Your firebase config should look like this:

```ts
const firebaseConfig = {
  projectId: "cafapad-f91a5",
  appId: "1:642534084468:web:79511934ecd3f597d5a621",
  storageBucket: "cafapad-f91a5.appspot.com",
  apiKey: "AIzaSyCd1HXPPGgtlfxuJyFW0s6s4OWdp-DcWyM",
  authDomain: "cafapad-f91a5.firebaseapp.com",
  messagingSenderId: "642534084468",
  measurementId: "G-JM36P6BECX",  
  databaseURL: "http://localhost:9000/?ns=cafapad-f91a5"
};
```

5) Restart Firebase Emulator

## Testing Firebase Configuration

Start missopad application with `npm run start` and try creating a page, it should appear the data you inserted on Firebase UI Emulator.

If you get there, congratulations! You've successfully installed and configured Firebase, now it's time to start coding and make missopad better!
