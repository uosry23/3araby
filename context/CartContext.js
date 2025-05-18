'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

// Create the cart context with default values
const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isLoading: true,
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    clearCart: () => { }
});

// Function to safely get cart from localStorage (used outside of component)
const getStoredCart = () => {
    if (typeof window === 'undefined') return [];

    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
    }
};

// Create a provider component
export const CartProvider = ({ children }) => {
    // Initialize state with a lazy initializer function to avoid localStorage during render
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const hasInitialized = useRef(false);

    // Initialize cart from localStorage on component mount
    useEffect(() => {
        if (!hasInitialized.current) {
            const storedItems = getStoredCart();
            setCartItems(storedItems);
            hasInitialized.current = true;
            setIsLoading(false);
        }
    }, []);

    // Update localStorage and derived state whenever cart changes
    useEffect(() => {
        if (hasInitialized.current) {
            // Only update localStorage after initialization
            try {
                localStorage.setItem('cart', JSON.stringify(cartItems));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }

            // Calculate cart count and total
            const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
            setCartCount(itemCount);

            const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
            setCartTotal(total);
        }
    }, [cartItems]);

    // Add item to cart
    const addToCart = (product, quantity = 1, size = 'M') => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id && item.size === size
            );

            let result;
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                const updatedItem = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                updatedItems[existingItemIndex] = updatedItem;
                result = updatedItems;

                setTimeout(() => toast.success('Item quantity updated in cart'), 0);
            } else {
                result = [...prevItems, { ...product, quantity, size }];
                setTimeout(() => toast.success('Item added to cart'), 0);
            }
            return result;
        });
    };


    // Remove item from cart
    const removeFromCart = (productId, size) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(
                item => !(item.id === productId && item.size === size)
            );

            // Show toast outside of state update
            setTimeout(() => toast.success('Item removed from cart'), 0);
            return updatedItems;
        });
    };

    // Update item quantity
    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId, size);
            return;
        }

        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === productId && item.size === size) {
                    return { ...item, quantity };
                }
                return item;
            });
            return updatedItems;
        });
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        // Show toast outside of state update
        setTimeout(() => toast.success('Cart cleared'), 0);
    };

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};
