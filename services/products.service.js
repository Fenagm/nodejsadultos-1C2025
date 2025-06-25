import { db } from '../config/firebase.js';

const collection = 'products';

export const getAllProducts = async () => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const createProduct = async (product) => {
  const docRef = await db.collection(collection).add(product);
  return { id: docRef.id, ...product };
};

export const deleteProduct = async (id) => {
  await db.collection(collection).doc(id).delete();
};