import { useEffect, useState } from 'react';
import {
  FiArrowRight, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight,
  FiHeart, FiMenu, FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX,
} from 'react-icons/fi';
import { formatPrice } from '../utils/format';
import StoreImage from './StoreImage';

export function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1700);
    return () => window.clearTimeout(timer);
  }, [onComplete]);
  return (
    <div className="splash" aria-label="iStore loading">
      <div className="splash-brand"><img src="/istore-mark.svg" alt="" /><span>iStore</span></div>
      <p>Your world. One store.</p>
      <div className="splash-progress"><i /></div>
    </div>
  );
}

export function Header({ itemCount, wishlistCount, onCart, onWishlist, onAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Home', '#home'], ['iPhone', '#products'], ['Accessories', '#categories'], ['Offers', '#offers'], ['Contact', '#contact']];
  return (
    <>
      <div className="announcement"><span>THE iSTORE SALE</span>  Extra savings on your next upgrade. <a href="#offers">Explore offers <FiArrowRight /></a></div>
      <header className="site-header">
        <a className="wordmark" href="#home"><img className="brand-icon" src="/istore-mark.svg" alt="" /><span>iStore</span></a>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="mobile-login" onClick={() => { setMenuOpen(false); onAuth(); }}>Sign in</button>
        </nav>
        <div className="header-actions">
          <button className="signin-button" onClick={onAuth}>Sign in <FiArrowRight /></button>
          <button className="icon-action wishlist-nav-button" aria-label={`Wishlist, ${wishlistCount} items`} onClick={onWishlist}>
            <FiHeart />{wishlistCount > 0 && <b>{wishlistCount}</b>}
          </button>
          <button className="bag-button" aria-label={`Shopping bag, ${itemCount} items`} onClick={onCart}>
            <FiShoppingBag /><span>Bag</span>{itemCount > 0 && <b>{itemCount}</b>}
          </button>
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        </div>
      </header>
    </>
  );
}

export function ProductCard({ product, onExplore, onWishlist, isWishlisted }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={() => onExplore(product)} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && onExplore(product)}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <StoreImage src={product.image} alt={product.name} category={product.category} loading="lazy" />
        <button className="quick-view" onClick={(event) => { event.stopPropagation(); onExplore(product); }}>Explore <FiArrowRight /></button>
        <button className={isWishlisted ? 'wish-button is-saved' : 'wish-button'} aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`} aria-pressed={isWishlisted} onClick={(event) => { event.stopPropagation(); onWishlist(product); }}><FiHeart fill={isWishlisted ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.categoryName}</span><span className="tiny-stars">★★★★★</span></div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.originalPrice)}</del></div>
        <button className="button button-small" onClick={() => onExplore(product)}>Explore & buy <FiArrowRight /></button>
      </div>
    </article>
  );
}

export function ProductDetails({ product, onClose, onAdd }) {
  const [storage, setStorage] = useState('256 GB');
  const [ram, setRam] = useState('16 GB');
  const [memoryUpgrade, setMemoryUpgrade] = useState(false);
  const [color, setColor] = useState('Midnight');
  useEffect(() => {
    setStorage('256 GB');
    setRam('16 GB');
    setMemoryUpgrade(false);
    setColor('Midnight');
  }, [product?.id]);
  if (!product) return null;
  const includesRam = ['phones', 'laptops', 'tablets'].includes(product.category);
  const storageIndex = includesRam ? product.storages.indexOf(storage) : 1;
  const selectedRam = memoryUpgrade ? ram : '8 GB';
  const ramIndex = product.ram.indexOf(selectedRam);
  const price = Math.max(
    1000,
    product.price + ((storageIndex - 1) * 8000) + (ramIndex > 0 ? ramIndex * 12000 : 0),
  );
  const selectedProduct = { ...product, price, originalPrice: Math.round(price * 1.12 / 100) * 100 };
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="product-modal modal-panel" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><FiX /></button>
        <div className="detail-photo"><StoreImage src={product.image} alt={product.name} category={product.category} /></div>
        <div className="detail-copy">
          <span className="eyebrow">{product.categoryName} / {product.badge || 'ONE COLLECTION'}</span>
          <h2>{product.name}</h2><p>{product.description}. Designed for the way you live, work, and create.</p>
          <div className="detail-price">{formatPrice(price)} <del>{formatPrice(selectedProduct.originalPrice)}</del></div>
          {includesRam && <>
            <label className="field-label" htmlFor="detail-storage">Storage / ROM</label>
            <select id="detail-storage" value={storage} onChange={(event) => setStorage(event.target.value)}>
              {product.storages.map((option, index) => <option key={option} value={option}>{option} {index === 1 ? '(Most popular)' : `· ${index === 0 ? '−' : '+'}${formatPrice(Math.abs(index - 1) * 8000)}`}</option>)}
            </select>
            <label className="memory-toggle">
              <input type="checkbox" checked={memoryUpgrade} onChange={(event) => setMemoryUpgrade(event.target.checked)} />
              <span><strong>Add a memory upgrade</strong><small>Optional · 8 GB included</small></span>
            </label>
            {memoryUpgrade && <label className="field-label" htmlFor="detail-ram">RAM upgrade</label>}
            {memoryUpgrade && <select id="detail-ram" value={ram} onChange={(event) => setRam(event.target.value)}>
              {product.ram.filter((option) => option !== '8 GB').map((option, index) => <option key={option} value={option}>{option} · +{formatPrice((index + 1) * 12000)}</option>)}
            </select>}
          </>}
          <label className="field-label">Finish — {color}</label>
          <div className="color-options">{product.colors.map((option, index) => <button key={option} className={color === option ? 'color-dot selected' : 'color-dot'} style={{ '--swatch': ['#26272a', '#ddd6c9', '#aaa9a5', '#63758c'][index] }} onClick={() => setColor(option)} aria-label={option} title={option} />)}</div>
          <button className="button detail-buy" onClick={() => { onAdd(selectedProduct, { storage: includesRam ? storage : '', ram: includesRam ? selectedRam : '', color }); onClose(); }}>Add to bag — {formatPrice(price)} <FiArrowRight /></button>
          <div className="detail-perks"><span><FiCheck /> Free delivery</span><span><FiCheck /> 14-day returns</span></div>
        </div>
      </section>
    </div>
  );
}

export function CartDrawer({ open, cart, total, onClose, onQuantity, onRemove, onCheckout }) {
  if (!open) return null;
  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="drawer-heading"><div><span className="eyebrow">YOUR BAG</span><h2>A good choice.</h2></div><button className="modal-close" onClick={onClose}><FiX /></button></div>
        {cart.length === 0 ? <div className="empty-cart"><FiShoppingBag /><h3>Your bag is taking a breather.</h3><p>Find something that feels like you.</p><button className="button" onClick={onClose}>Explore the store <FiArrowRight /></button></div> : <>
          <div className="cart-items">
            {cart.map((item) => <article className="cart-item" key={item.key}>
              <StoreImage src={item.image} alt="" category={item.category} />
              <div className="cart-item-copy">
                <h3>{item.name}</h3>
                <p>{[item.selectedRam, item.selectedStorage, item.selectedColor].filter(Boolean).join(' · ')}</p>
                <div className="quantity-control">
                  <button aria-label="Decrease quantity" onClick={() => onQuantity(item.key, item.quantity - 1)}><FiMinus /></button>
                  <span>{item.quantity}</span>
                  <button aria-label="Increase quantity" onClick={() => onQuantity(item.key, item.quantity + 1)}><FiPlus /></button>
                  <button className="remove-cart-item" aria-label={`Remove ${item.name} from bag`} onClick={() => onRemove(item.key)}><FiTrash2 /> Remove</button>
                </div>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </article>)}
          </div>
          <div className="cart-summary"><div><span>Subtotal</span><b>{formatPrice(total)}</b></div><div><span>Delivery</span><span className="free-label">FREE</span></div><p>Inclusive of all taxes. Great things are on their way.</p><button className="button checkout-button" onClick={onCheckout}>Continue to checkout <FiArrowRight /></button></div>
        </>}
      </aside>
    </div>
  );
}

export function AuthModal({ mode, onClose, onLogin, onSwitch }) {
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim();
    const password = String(form.get('password'));
    const name = String(form.get('name') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (mode === 'signup' && name.length < 2) return setError('Enter a name with at least 2 characters.');
    if (mode === 'signup' && password !== form.get('confirmPassword')) return setError('Your passwords don’t match.');
    onLogin(mode === 'signup' ? name : email.split('@')[0]);
  };
  if (!mode) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal modal-panel" role="dialog" aria-modal="true" aria-label={mode === 'signup' ? 'Create account' : 'Sign in'}>
        <button className="modal-close" onClick={onClose}><FiX /></button><img className="auth-mark-icon" src="/istore-mark.svg" alt="" />
        <span className="eyebrow">WELCOME TO iSTORE</span><h2>{mode === 'signup' ? 'Your next chapter.' : 'Good to see you.'}</h2>
        <p>{mode === 'signup' ? 'Create an account. Make every upgrade yours.' : 'Sign in to pick up right where you left off.'}</p>
        <form onSubmit={submit} noValidate>
          {mode === 'signup' && <input name="name" type="text" placeholder="Your name" required minLength="2" />}
          <input name="email" type="email" placeholder="Email address" autoComplete="email" required />
          <input name="password" type="password" placeholder="Password (8+ characters)" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength="8" />
          {mode === 'signup' && <input name="confirmPassword" type="password" placeholder="Confirm password" required />}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <FiArrowRight /></button>
        </form>
        <div className="demo-credentials"><strong>Demo credentials</strong><br />store@demo.com&nbsp; / &nbsp;Store123!</div>
        <p className="auth-switch">{mode === 'signup' ? 'Already a member?' : 'New to One?'} <button onClick={() => { setError(''); onSwitch(mode === 'signup' ? 'login' : 'signup'); }}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
      </section>
    </div>
  );
}

export function CheckoutModal({ open, total, cart, onClose, onPlaceOrder }) {
  const [payment, setPayment] = useState('UPI');
  const [error, setError] = useState('');
  if (!open) return null;
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!String(data.get('fullName')).trim() || !String(data.get('phone')).match(/^[6-9]\d{9}$/) || !String(data.get('address')).trim()) {
      setError('Enter your name, a valid 10-digit Indian mobile number, and delivery address.');
      return;
    }
    onPlaceOrder({ name: data.get('fullName'), phone: data.get('phone'), address: data.get('address'), payment });
  };
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="checkout-modal modal-panel" role="dialog" aria-modal="true" aria-label="Checkout">
        <button className="modal-close" onClick={onClose}><FiX /></button><span className="eyebrow">CHECKOUT · STEP 01</span><h2>Make it yours.</h2><p>Just the essentials. Then it's on its way.</p>
        <form onSubmit={submit} noValidate>
          <div className="form-grid"><input name="fullName" placeholder="Full name" required /><input name="phone" type="tel" placeholder="10-digit mobile number" maxLength="10" required /></div>
          <textarea name="address" placeholder="Delivery address" rows="2" required />
          <label className="field-label">How would you like to pay?</label>
          <div className="payment-options">{['UPI', 'Card', 'Cash on delivery'].map((option) => <button type="button" key={option} className={payment === option ? 'payment-option active' : 'payment-option'} onClick={() => setPayment(option)}>{option}</button>)}</div>
          {error && <p className="form-error">{error}</p>}
          <div className="checkout-total"><span>{cart.length} item{cart.length === 1 ? '' : 's'} · Total</span><strong>{formatPrice(total)}</strong></div>
          <button className="button auth-submit" type="submit">Place order <FiArrowRight /></button>
        </form>
      </section>
    </div>
  );
}

export function OrderConfirmation({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="modal-backdrop"><section className="confirmation-modal modal-panel" role="dialog" aria-modal="true" aria-label="Order confirmation">
      <div className="confirmation-check"><FiCheck /></div><span className="eyebrow">ORDER CONFIRMED</span><h2>It's official, {order.name.split(' ')[0]}.</h2>
      <p>Your new favourites are getting ready to meet you.</p>
      <div className="tracking-card"><span>YOUR TRACKING ID</span><strong>{order.trackingId}</strong><small>Estimated delivery · 2–4 business days</small><div className="tracking-track"><i /><i /><i /><i /></div><div className="tracking-labels"><span>Confirmed</span><span>Packing</span><span>On the way</span><span>Delivered</span></div></div>
      <div className="order-lines">{order.lines.map((line) => <div key={line.name}><span>{line.name} × {line.quantity}</span></div>)}</div>
      <div className="confirmation-summary"><span>{order.items} items · {order.payment}</span><strong>{formatPrice(order.total)}</strong></div>
      <button className="button auth-submit" onClick={onClose}>Back to the store <FiArrowRight /></button>
    </section></div>
  );
}

export function Toast({ message }) {
  return message ? <div className="toast" role="status"><FiCheck />{message}</div> : null;
}

export function SectionTitle({ eyebrow, title, copy, link, onLink }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{link && <button className="text-link" onClick={onLink}>{link} <FiArrowRight /></button>}</div>;
}

export function SliderControls({ onPrevious, onNext, label = 'Slide' }) {
  return <div className="slider-controls"><button aria-label={`Previous ${label}`} onClick={onPrevious}><FiChevronLeft /></button><button aria-label={`Next ${label}`} onClick={onNext}><FiChevronRight /></button></div>;
}

export function Chevron() {
  return <FiChevronDown />;
}
