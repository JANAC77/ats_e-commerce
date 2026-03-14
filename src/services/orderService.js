import { 
  collection, 
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const ordersCollection = collection(db, 'orders');

// 🔥 FIX: Clean data before saving
const cleanData = (obj) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) {
      cleaned[key] = ''; // Replace undefined/null with empty string
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = cleanData(value); // Recursively clean nested objects
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// Save order
export const saveOrder = async (orderData) => {
  try {
    // 🔥 Clean the data to remove undefined values
    const cleanedOrderData = cleanData(orderData);
    
    const orderWithTimestamp = {
      ...cleanedOrderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('📦 Saving cleaned order:', orderWithTimestamp);
    
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    console.log('✅ Order saved with ID:', docRef.id);
    
    toast.success('Order placed successfully!');
    return { id: docRef.id, ...orderWithTimestamp };
  } catch (error) {
    console.error('❌ Error saving order:', error);
    toast.error(`Failed to save order: ${error.message}`);
    throw error;
  }
};

// Get user orders by email
export const getUserOrders = async (email) => {
  try {
    if (!email) return [];
    
    const q = query(
      ordersCollection,
      where('customer.email', '==', email),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    return [];
  }
};

// Get all orders (for admin)
export const getAllOrders = async () => {
  try {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error getting all orders:', error);
    return [];
  }
};