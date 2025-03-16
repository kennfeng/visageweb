import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const LOCAL_STORAGE_KEY = 'user_session';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load saved session on mount
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                setUser(userData);
            }
        } catch (err) {
            console.error('Error loading user session:', err);
            setError('Failed to load user session');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            
            // Store user data in localStorage for persistence
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (err) {
            console.error('Error during login:', err);
            setError('Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setUser(null);
            setError(null);
        } catch (err) {
            console.error('Error during logout:', err);
            setError('Logout failed');
        }
    };

    const updateUser = (updates) => {
        try {
            const updatedUser = { ...user, ...updates };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user data');
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        updateUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
