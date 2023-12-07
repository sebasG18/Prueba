import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyASQQkpuGd71fArP7tJrUBjvsrJfWQM4W0",
  authDomain: "prueba-5b36c.firebaseapp.com",
  databaseURL: "https://prueba-5b36c-default-rtdb.firebaseio.com",
  projectId: "prueba-5b36c",
  storageBucket: "prueba-5b36c.appspot.com",
  messagingSenderId: "667501541602",
  appId: "1:667501541602:web:ded4c43a6c4691cc27c6bb",
  measurementId: "G-SDT5M464VN"
};

const app = initializeApp(firebaseConfig);
export const db =getDatabase(app)
export default firebaseConfig;