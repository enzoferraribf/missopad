# How to Configure Firebase Emulator

## Requeriments

- Install Java
- Firebase Account
- Basic knowledge of CLI
- Node.js

## Setup Firebase

1) Run this command to install Firebase globally.

```
npm install -g firebase-tools
```

2) Install firebase tools

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

1) Create a new Firebase project

```
firebase projects:create
```

2) Store your firebase id into a variable to re-use later on

```
$fbid=yourproject-id
```

3) Create a web app in Firebase and enable **only Emulators**
Once in **Emulator section**: Choose Database, Authentication, and Hosting
Leave other configs as default.

```
firebase apps:create --project $fbid web missopad-app
```

## Add Credentials and Run Emulator

1) Run this command to get some credentials informations

```
firebase apps:sdkconfig --project $fbid > src/firebase-preview.js
```

2) Open this file and retrieve every information, go to src/firebase.ts and paste the equivalent values, if you don't have databaseURL then you'll get this later, keep following.

Should be something like that.

```ts
const firebaseConfig = {
  apiKey: "AIzaSyAjEMBrnRqyYTX-4f7tu10Ta92eYAOVl5s",
  authDomain: "missopad-ricc.firebaseapp.com",
  databaseURL: "",
  projectId: "missopad-ricc",
  storageBucket: "missopad-ricc.appspot.com",
  messagingSenderId: "86548688569",
  appId: "1:86548688569:web:94721a61ecbee85b1af568",
};
```

3) Start the Firebase Emulator
```
firebase emulators:start
```

4) Open Firebase UI, go to Database Realtime and copy the database URL then paste it in firebaseConfig

5) Restart Firebase Emulator

## Testing Firebase Configuration

Start missopad application and try creating a page, it should appear the data you inserted on Firebase UI Emulator.

If you get there, congratulations! You've successfully installed and configured Firebase, now it's time to start coding and make missopad better!