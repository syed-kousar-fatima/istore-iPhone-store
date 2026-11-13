import { useEffect, useMemo, useState } from 'react';

const readStoredList = (key) => {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export function useStore() {
  const [cart, setCart] = useState(() => readStoredList('one-store-cart'));
  const [wishlist, setWishlist] = useState(() => readStoredList('istore-wishlist'));
  const [toast, setToast] = useState('');
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  useEffect(() => {
    localStorage.setItem('one-store-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('istore-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (product, options = {}) => {
    const configurable = ['phones', 'laptops', 'tablets'].includes(product.category);
    const selectedRam = options.ram || (configurable ? '8 GB' : '');
    const selectedStorage = options.storage || (configurable ? '256 GB' : '');
    const selectedColor = options.color || 'Midnight';
    const key = `${product.id}-${selectedRam}-${selectedStorage}-${selectedColor}`;
    setCart((current) => {
      const found = current.find((item) => item.key === key);
      if (found) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, {
        ...product,
        key,
        quantity: 1,
        selectedRam,
        selectedStorage,
        selectedColor,
      }];
    });
    setToast(`${product.name} added to your bag`);
  };

  const updateQuantity = (key, quantity) =>
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.key !== key)
        : current.map((item) => item.key === key ? { ...item, quantity } : item),
    );

  const removeFromCart = (key) =>
    setCart((current) => current.filter((item) => item.key !== key));

  const toggleWishlist = (product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    setWishlist((current) =>
      isSaved
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
    setToast(isSaved ? `${product.name} removed from your wishlist` : `${product.name} saved to your wishlist`);
  };

  const removeFromWishlist = (id) =>
    setWishlist((current) => current.filter((item) => item.id !== id));

  return {
    cart,
    wishlist,
    total,
    itemCount,
    toast,
    setToast,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    removeFromWishlist,
    clearCart: () => setCart([]),
  };
}
