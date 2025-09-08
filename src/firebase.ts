import { initializeApp } from 'firebase/app';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBzPEcnZcTdmkoKrNnRFkFmqM7s0V5aUdU',
  authDomain: 'pokedex-8240a.firebaseapp.com',
  projectId: 'pokedex-8240a',
  storageBucket: 'pokedex-8240a.firebasestorage.app',
  messagingSenderId: '60564154408',
  appId: '1:60564154408:web:c1aa1e0c0a7db2bea42d1d',
  databaseURL: 'https://pokedex-8240a-default-rtdb.asia-southeast1.firebasedatabase.app',
};
const app = initializeApp(firebaseConfig);

export default app;
