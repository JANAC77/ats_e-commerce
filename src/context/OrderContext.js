import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedOrders, setSearchedOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  };

  // Add new order
  const addOrder = (orderData) => {
    setLoading(true);
    
    try {
      const newOrder = {
        id: generateOrderId(),
        ...orderData,
        status: 'confirmed',
        paymentStatus: orderData.payment.method === 'cod' ? 'pending' : 'paid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            status: 'order_placed',
            date: new Date().toISOString(),
            description: 'Order has been placed successfully'
          }
        ]
      };

      setOrders(prevOrders => [newOrder, ...prevOrders]);
      
      toast.success('Order placed successfully!');
      return newOrder;
    } catch (error) {
      toast.error('Failed to place order');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Get orders by email (for searching without login)
  const getOrdersByEmail = (email) => {
    if (!email) return [];
    const filteredOrders = orders.filter(order => 
      order.customer.email.toLowerCase() === email.toLowerCase()
    );
    setSearchedOrders(filteredOrders);
    return filteredOrders;
  };

  // Get orders by phone (alternative search)
  const getOrdersByPhone = (phone) => {
    if (!phone) return [];
    const filteredOrders = orders.filter(order => 
      order.customer.phone === phone
    );
    setSearchedOrders(filteredOrders);
    return filteredOrders;
  };

  // Search orders by email or phone
  const searchOrders = (searchTerm) => {
    if (!searchTerm) {
      setSearchedOrders([]);
      return [];
    }
    
    const filtered = orders.filter(order => 
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchedOrders(filtered);
    return filtered;
  };

  // Update order status
  const updateOrderStatus = (orderId, status, note = '') => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = {
            ...order,
            status,
            updatedAt: new Date().toISOString(),
            timeline: [
              ...order.timeline,
              {
                status,
                date: new Date().toISOString(),
                description: note || `Order ${status.replace('_', ' ')}`
              }
            ]
          };
          return updatedOrder;
        }
        return order;
      })
    );
    toast.success(`Order status updated to ${status}`);
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'cancelled',
            updatedAt: new Date().toISOString(),
            timeline: [
              ...order.timeline,
              {
                status: 'cancelled',
                date: new Date().toISOString(),
                description: 'Order has been cancelled'
              }
            ]
          };
        }
        return order;
      })
    );
    toast.success('Order cancelled successfully');
  };

  // Track order
  const trackOrder = (orderId) => {
    const order = getOrderById(orderId);
    if (order) {
      return order.timeline;
    }
    return [];
  };

  // Clear searched orders
  const clearSearch = () => {
    setSearchedOrders([]);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      searchedOrders,
      loading,
      addOrder,
      getOrderById,
      getOrdersByEmail,
      getOrdersByPhone,
      searchOrders,
      updateOrderStatus,
      cancelOrder,
      trackOrder,
      clearSearch
    }}>
      {children}
    </OrderContext.Provider>
  );
};