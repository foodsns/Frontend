import { initializeApp, getApps } from 'firebase/app'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB-HsMnu4Q1nxk1r2smnX3BM-OfTi1ITxI',
    authDomain: 'mogutsou.firebaseapp.com',
    projectId: 'mogutsou',
    storageBucket: 'mogutsou.appspot.com',
    messagingSenderId: '240755752715',
    appId: '1:240755752715:web:80858af7f9fe24db112c0e',
    measurementId: 'G-K1ZD44ZVJX'
}

let app = null
if (!getApps().length) {
    app = initializeApp(firebaseConfig)
}

export default app
