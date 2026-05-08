import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBegUNt5LxDZuVRktN0L4Z3gyOWqs_58y4",
  authDomain: "codern-3aeea.firebaseapp.com",
  projectId: "codern-3aeea",
  storageBucket: "codern-3aeea.firebasestorage.app",
  messagingSenderId: "486028173241",
  appId: "1:486028173241:web:faaf1995704b38af8e2068",
  measurementId: "G-2M9TJVSTLT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();