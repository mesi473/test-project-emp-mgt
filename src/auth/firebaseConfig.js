
// firebase configuration
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBzhaZuNf71sdpFWMvqrR_SmXM3b9HP_28",
  authDomain: "personal-web-3d25c.firebaseapp.com",
  projectId: "personal-web-3d25c",
  storageBucket: "personal-web-3d25c.appspot.com",
  messagingSenderId: "478863315566",
  appId: "1:478863315566:web:d42e54964f050e05d7cc7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;