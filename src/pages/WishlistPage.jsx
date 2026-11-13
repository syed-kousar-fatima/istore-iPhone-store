import { FiArrowLeft, FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '../utils/format';
import StoreImage from '../components/StoreImage';

export default function WishlistPage({ products, onClose, onRemove, onAdd }) {
  return (
    <main className="wishlist-page">
      <header className="wishlist-page-header">
        <button className="wishlist-back" onClick={onClose}><FiArrowLeft /> Back to iStore</button>
        <a className="wordmark" href="#home">
          <img className="brand-icon" src="/istore-mark.svg" alt="" />
          <span>iStore</span>
        </a>
        <span className="eyebrow">YOUR WISHLIST</span>
      </header>
      <section className="wishlist-content">
        <span className="eyebrow">SAVED FOR A LITTLE LATER</span>
        <h1>Your <em>good things.</em></h1>
        <p>All the things that feel like you, in one little place.</p>
        {products.length === 0 ? (
          <div className="wishlist-empty">
            <FiHeart />
            <h2>Nothing saved just yet.</h2>
            <p>Tap the heart on anything you love. We’ll keep it safe here.</p>
            <button className="button" onClick={onClose}>Find your favourites <FiArrowLeft /></button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {products.map((product) => (
              <article className="wishlist-card" key={product.id}>
                <StoreImage src={product.image} alt={product.name} category={product.category} />
                <div className="wishlist-card-copy">
                  <span>{product.categoryName}</span>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price-row"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.originalPrice)}</del></div>
                  <div className="wishlist-card-actions">
                    <button className="button button-small" onClick={() => onAdd(product)}><FiShoppingBag /> Add to bag</button>
                    <button className="wishlist-remove" onClick={() => onRemove(product.id)}><FiTrash2 /> Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
