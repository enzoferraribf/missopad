<p align="center">
    <img src="https://imgur.com/UOlIAJE.png">
    <p align="center">
        Share and update documents in real-time
    </p>
</p>

<br>

<p align="center">
    <img src="https://imgur.com/xkSOFsC.png">
</p>

Missopad is a real-time collaborative tool that renders Markdown. You can access any page without the need to authenticate in any way. Simply access a url (e.g https://missopad.com/<any_url>) and start editing!

<br>

# How to contribute

The whole project is hosted on firebase. The main credentials, located at `src/services/firebase.ts` **will not work** on your local machine:

```ts
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```

Use the [Firebase Emulator](https://firebase.google.com/docs/emulator-suite/connect_and_prototype) or your own project credentials to run the app.

Please open a PR describing the changes and your new features. Any help will be much apreciated 😀
