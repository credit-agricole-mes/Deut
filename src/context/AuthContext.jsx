// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Charger l'utilisateur au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ⚡⚡⚡ CRITIQUE : Écouter les mises à jour
  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        console.log('🔄 User mis à jour:', parsed.name, 'Solde:', parsed.balance);
        setUser({ ...parsed, _timestamp: Date.now() }); // Force re-render
      }
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  const login = async (username, password) => {
    const userData = await UserService.authenticate(username, password);
    const token = btoa(JSON.stringify({ userId: userData.id, timestamp: Date.now() }));
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    window.dispatchEvent(new CustomEvent('userUpdated'));
    
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('userUpdated'));
  };

  const register = async (userData) => {
    const newUser = await UserService.createUser(userData);
    const token = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }));
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', token);
    window.dispatchEvent(new CustomEvent('userUpdated'));
    
    return { success: true, user: newUser };
  };

  // ⚡ Mise à jour du user (pour les virements)
  const updateUser = (updatedUserData) => {
    console.log('💾 Mise à jour user:', updatedUserData.name, 'Solde:', updatedUserData.balance);
    
    setUser({ ...updatedUserData, _timestamp: Date.now() });
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    window.dispatchEvent(new CustomEvent('userUpdated'));
    
    return { success: true, user: updatedUserData };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};