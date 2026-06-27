// src/firebase.js
// ------------------------------------------------------------------
// Moon Light Cafe — Firebase setup
// Fill in your own config values from Firebase Console
// (Project Settings → General → Your apps → Web app → SDK config)
// ------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF-nLSnQH87KI_GTnDJXsBYzH922Ce1L4",
  authDomain: "menu-4819f.firebaseapp.com",
  databaseURL: "https://menu-4819f-default-rtdb.firebaseio.com",
  projectId: "menu-4819f",
  storageBucket: "menu-4819f.firebasestorage.app",
  messagingSenderId: "449946304567",
  appId: "1:449946304567:web:d2c5f22ab87865aa507fb2",
  measurementId: "G-GC620K2130",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const ORDERS_COLLECTION = "orders";

// Listen to live order updates (real-time across all devices)
export function subscribeOrders(callback) {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
}

// Create a new order (called from Customer mode)
export async function createOrder(order) {
  await addDoc(collection(db, ORDERS_COLLECTION), {
    ...order,
    createdAt: serverTimestamp(),
    createdAtMs: Date.now(), // fallback for immediate UI display
  });
}

// Update an order's stage (called from Counter dashboard)
export async function setOrderStage(orderId, stage) {
  await updateDoc(doc(db, ORDERS_COLLECTION, orderId), { stage });
}
