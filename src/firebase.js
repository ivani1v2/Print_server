// src/firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRZsvdirIVvKtRGlUG_hEJKDXyaeTACxg",
  authDomain: "mitienda-f5ef8.firebaseapp.com",
  databaseURL: "https://mitienda-f5ef8.firebaseio.com",
  projectId: "mitienda-f5ef8",
  storageBucket: "mitienda-f5ef8.appspot.com",
  messagingSenderId: "662761932641",
  appId: "1:662761932641:web:716d3f469e9c3947ede720",
};

// ✅ Inicializar Firebase con la sintaxis clásica de Firebase 7
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ✅ Exportar las referencias
export { auth, database, firebaseApp };

const empresas = firebaseApp.database().ref("empresas");
const notificaciones = firebaseApp.database().ref("notificaciones");

export const allEmpresas = () => {
  return empresas;
};

export const nuevaEmpresa = (id, array) => {
  return empresas.child(id).set(array);
};

export const eliminaEmpresa = (id) => {
  return empresas.child(id).remove();
};

export const actualizaEmpresa = (id, array) => {
  return empresas.child(id).set(array);
};
