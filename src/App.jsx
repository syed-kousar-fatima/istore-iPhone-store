import { useCallback, useState } from 'react';
import {
  AuthModal, CartDrawer, CheckoutModal, Header, OrderConfirmation,
  ProductDetails, SplashScreen, Toast,
} from './components/StoreUI';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import WishlistPage from './pages/WishlistPage';
import { useStore } from './hooks/useStore';

function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authMode, setAuthMode] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState('');
  const {
    cart, wishlist, total, itemCount, toast, setToast, addToCart,
    updateQuantity, removeFromCart, toggleWishlist, removeFromWishlist, clearCart,
  } = useStore();

  const openCategory = (category) => {
    document.querySelector(`.product-filters button[data-category="${category}"]`)?.click();
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const placeOrder = (details) => {
    const newOrder = {
      ...details,
      trackingId: `ISTORE${Math.floor(100000 + Math.random() * 900000)}`,
      total,
      items: itemCount,
      lines: cart.map((item) => ({ name: item.name, quantity: item.quantity })),
    };
    setOrder(newOrder);
    setCheckoutOpen(false);
    clearCart();
    setToast('Your order is confirmed. A little joy is on its way.');
  };

  const handleLogin = (name) => {
    setCustomer(name);
    setAuthMode('');
    setToast(`Welcome to iStore, ${name}.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = useCallback((message) => setToast(message), [setToast]);

  if (!splashComplete) {
    return <SplashScreen onComplete={() => setSplashComplete(true)} />;
  }

  if (!customer) {
    return (
      <>
        <AuthPage onSuccess={handleLogin} />
        <Toast message={toast} />
      </>
    );
  }

  return (
    <>
      {wishlistOpen ? (
        <WishlistPage
          products={wishlist}
          onClose={() => setWishlistOpen(false)}
          onRemove={removeFromWishlist}
          onAdd={addToCart}
        />
      ) : (
        <>
          <Header
            itemCount={itemCount}
            wishlistCount={wishlist.length}
            onCart={() => setCartOpen(true)}
            onWishlist={() => setWishlistOpen(true)}
            onAuth={() => setAuthMode('login')}
          />
          <div className="welcome-strip">HELLO, {customer.toUpperCase()} <span>— WELCOME TO iSTORE</span></div>
          <main>
            <HomePage
              onExplore={setDetailProduct}
              onWishlist={toggleWishlist}
              wishlist={wishlist}
              onCategory={openCategory}
              onToast={showToast}
              onOpenWishlist={() => setWishlistOpen(true)}
            />
          </main>
        </>
      )}
      <ProductDetails product={detailProduct} onClose={() => setDetailProduct(null)} onAdd={addToCart} />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={total}
        onClose={() => setCartOpen(false)}
        onQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <AuthModal mode={authMode} onClose={() => setAuthMode('')} onLogin={handleLogin} onSwitch={setAuthMode} />
      <CheckoutModal open={checkoutOpen} total={total} cart={cart} onClose={() => setCheckoutOpen(false)} onPlaceOrder={placeOrder} />
      <OrderConfirmation order={order} onClose={() => setOrder(null)} />
      <Toast message={toast} />
    </>
  );
}

export default App;
