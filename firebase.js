import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFPRADLsa0DVFQTDVC1W_-LZ5hSXZIZFU",
  authDomain: "quizeplayerstar.firebaseapp.com",
  databaseURL: "https://quizeplayerstar-default-rtdb.firebaseio.com",
  projectId: "quizeplayerstar",
  storageBucket: "quizeplayerstar.firebasestorage.app",
  messagingSenderId: "165611085599",
  appId: "1:165611085599:web:88a452365efb3a26b55a2a"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
