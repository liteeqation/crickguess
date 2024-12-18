import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitScore(score: number, playerName: string) {
  try {
    await addDoc(collection(db, 'leaderboard'), {
      score,
      playerName,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error submitting score:', error);
  }
}

export async function getTopScores(limit = 10) {
  const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'), limit(limit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}