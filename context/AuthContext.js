'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from '@/config';

// Create the authentication context
const AuthContext = createContext({});

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up function
    const signup = async (email, password, name) => {
        setLoading(true);
        setError('');
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with name
            if (name) {
                await updateProfile(userCredential.user, {
                    displayName: name
                });
            }
            
            return userCredential.user;
        } catch (error) {
            setError(error.message);
            console.error('Signup error:', error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError('');
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            setError(error.message);
            console.error('Login error:', error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        setError('');
        
        try {
            await signOut(auth);
        } catch (error) {
            setError(error.message);
            console.error('Logout error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Reset password function
    const resetPassword = async (email) => {
        setLoading(true);
        setError('');
        
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            setError(error.message);
            console.error('Reset password error:', error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        resetPassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
