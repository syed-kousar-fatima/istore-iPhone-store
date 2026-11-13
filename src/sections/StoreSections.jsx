import { useEffect, useMemo, useState } from 'react';
import {
  FiArrowDown, FiArrowRight, FiArrowUpRight, FiCheck, FiChevronDown,
  FiCompass, FiHeart, FiMapPin, FiPlay, FiShield, FiTruck,
} from 'react-icons/fi';
import { categories, products } from '../data/catalog';
import { formatPrice } from '../utils/format';
import { ProductCard, SectionTitle, SliderControls } from '../components/StoreUI';
import StoreImage from '../components/StoreImage';

const revealProps = {
  className: 'reveal',
  'data-reveal': '',
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

export function Hero({ onExplore }) {
  const heroProducts = [products[0], products[1], products[2], products[12]];
  return (
    <section className="hero-section" id="home">
      <div className="hero-glow" />
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow"><i /> INTRODUCING iPHONE 17 PRO</span>
        <h1>Meet the<br /><em>extraordinary.</em></h1>
        <p>iStore brings your favourite technology together in one thoughtful place. Meet the new iPhone 17 Pro — and find little things that make every day a little more you.</p>
        <div className="hero-actions"><a className="button" href="#products">Shop iPhone <FiArrowRight /></a><button className="hero-play" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}><span><FiPlay /></span> Discover the iStore story</button></div>
        <div className="hero-footnote"><span><FiCheck /> Free delivery over ₹5,000</span><span><FiCheck /> Easy, 14-day returns</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-orbit">
          {heroProducts.map((product, index) => <button className={`orbit-card orbit-card-${index + 1}`} key={product.id} onClick={() => onExplore(product)}>
            <StoreImage src={product.image} alt={product.name} category={product.category} />
            <span>{product.name}</span><small>{formatPrice(product.price)}</small>
          </button>)}
        </div>
        <div className="orbit-caption"><span>01 — 04</span><i /><span>MADE FOR YOUR MOMENT</span></div>
        <div className="hero-side-note">THE NEW<br />STANDARD <FiArrowDown /></div>
      </div>
      <a className="hero-scroll" href="#categories">SCROLL TO EXPLORE <FiArrowDown /></a>
    </section>
  );
}

export function CategorySection({ onCategory }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setOffset((value) => (value + 1) % categories.length), 3600);
    return () => window.clearInterval(timer);
  }, []);
  const visible = [0, 1, 2].map((step) => categories[(offset + step) % categories.length]);
  return (
    <section className="category-section page-section" id="categories">
      <div className="section-topline"><span>CURATED FOR YOUR EVERY DAY</span><span>01 / 08</span></div>
      <SectionTitle eyebrow="THE iSTORE UNIVERSE" title={<>Find your <em>kind of wonderful.</em></>} copy="From the device in your pocket to your favourite way to unwind." />
      <div className="category-slider">
        {visible.map((category, index) => <button className={`category-tile category-tile-${index}`} key={category.id} onClick={() => onCategory(category.id)}>
          <StoreImage className="category-background" src={category.image} alt="" category={category.id} />
          <span className="category-index">0{(categories.indexOf(category) + 1).toString()}</span>
          <span className="category-content"><small>{category.eyebrow}</small><strong>{category.name}</strong><span className="category-cta">Explore collection <FiArrowUpRight /></span></span>
        </button>)}
      </div>
      <div className="category-pagination"><span><i style={{ transform: `translateX(${offset * 100}%)` }} /></span><small>A LITTLE SOMETHING FOR EVERYONE</small><span>{String(offset + 1).padStart(2, '0')} <b>/</b> 08</span></div>
    </section>
  );
}

export function OfferSection({ onExplore }) {
  const offers = [
    { product: products[0], tag: 'THE IPHONE 17 PRO MAX', title: 'A little more pro. A little less.', copy: 'Get the most advanced iPhone, with a little something off the top.', action: 'Shop iPhone 17 Pro Max' },
    { product: products[5], tag: 'THE MACBOOK PRO 14', title: 'Big ideas. A smaller price.', copy: 'Bring home your next creative companion and save on every detail.', action: 'Shop MacBook Pro' },
    { product: products[10], tag: 'THE IPAD PRO 13', title: 'Make room for more.', copy: 'A little more power for the ideas you can’t wait to make.', action: 'Shop iPad Pro' },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % offers.length), 5500);
    return () => window.clearInterval(timer);
  }, []);
  const offer = offers[index];
  const savings = offer.product.originalPrice - offer.product.price;
  const discount = Math.round((savings / offer.product.originalPrice) * 100);
  return <section className="offers-section page-section" id="offers" {...revealProps}>
    <div className="offers-layout" key={offer.product.id}>
      <div className="offers-copy">
        <span className="eyebrow offers-kicker"><i /> THE iSTORE SELECTS</span>
        <div className="offer-index"><strong>0{index + 1}</strong><span>/ 0{offers.length}</span><i /> LIMITED-TIME OFFER</div>
        <h2>{offer.title}</h2>
        <p>{offer.copy}</p>
        <div className="offer-prices"><strong>{formatPrice(offer.product.price)}</strong><del>{formatPrice(offer.product.originalPrice)}</del><span>YOU SAVE {formatPrice(savings)}</span></div>
        <button className="button" onClick={() => onExplore(offer.product)}>{offer.action} <FiArrowRight /></button>
        <div className="offer-dots">{offers.map((item, dot) => <button aria-label={`View offer ${dot + 1}`} className={index === dot ? 'active' : ''} key={item.tag} onClick={() => setIndex(dot)} />)}</div>
      </div>
      <div className="offers-art">
        <span className="offer-art-label">{offer.tag}</span>
        <button className="offer-product-card" onClick={() => onExplore(offer.product)} aria-label={`Explore ${offer.product.name} offer`}>
          <StoreImage src={offer.product.image} alt={offer.product.name} category={offer.product.category} />
          <span className="offer-discount"><strong>{discount}%</strong><small>OFF</small></span>
          <span className="offer-image-caption"><strong>{offer.product.name}</strong><span>SAVE {formatPrice(savings)}</span></span>
        </button>
        <span className="offer-art-note">A LITTLE EXTRA, JUST FOR YOU</span>
      </div>
    </div>
  </section>;
}

export function ProductSection({ onExplore, onWishlist, wishlist }) {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const list = useMemo(() => products.filter((product) => filter === 'all' || product.category === filter), [filter]);
  const visibleProducts = filter === 'all' && !showAll ? list.slice(0, 8) : list;
  const filters = [{ id: 'all', label: 'All iStore' }, ...categories.map(({ id, name }) => ({ id, label: name }))];
  return <section className="products-section page-section" id="products">
    <div className="products-header"><SectionTitle eyebrow="THE GOOD STUFF" title={<>A little <em>closer to you.</em></>} copy="The newest ideas, thoughtfully picked. Find the one that feels right." link={showAll ? 'Show a little less' : 'View all 40'} onLink={() => { setFilter('all'); setShowAll(!showAll); }} /></div>
    <div className="product-filters" role="tablist" aria-label="Product categories">{filters.map((item) => <button data-category={item.id} role="tab" aria-selected={filter === item.id} key={item.id} className={filter === item.id ? 'active' : ''} onClick={() => { setFilter(item.id); setShowAll(false); }}>{item.label}</button>)}</div>
    <div className="product-grid">{visibleProducts.map((product, index) => <div className="product-reveal" key={product.id} style={{ '--delay': `${(index % 4) * 70}ms` }}><ProductCard product={product} onExplore={onExplore} onWishlist={onWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} /></div>)}</div>
    <div className="products-foot"><span>SHOWING {visibleProducts.length} THOUGHTFUL FINDS</span><span>LESS, BUT SO MUCH MORE. <FiHeart /></span></div>
  </section>;
}

export function AboutSection() {
  return <section className="about-section page-section" id="about">
    <div className="about-visual" {...revealProps}>
      <div className="about-image">
        <StoreImage src="https://i.pinimg.com/736x/d3/af/ea/d3afea6696575e54e97a0278896d80bb.jpg" alt="Friends connecting around a phone" category="phones" loading="lazy" />
        <span className="about-image-label">TECHNOLOGY, WITH A HUMAN TOUCH</span>
        <span className="about-image-caption">A MORE THOUGHTFUL WAY TO FIND YOUR NEXT FAVORITE</span>
      </div>
      <div className="about-note-card"><span>i</span><div><strong>Good things, thoughtfully chosen.</strong><small>Here for the moments that matter.</small></div></div>
      <span className="about-visual-index">iSTORE / OUR STORY</span>
    </div>
    <div className="about-copy" {...revealProps}>
      <span className="eyebrow">A LITTLE ABOUT iSTORE</span>
      <h2>Technology should<br /><em>feel more human.</em></h2>
      <p>Finding the technology you love should feel just as good as using it. iStore brings together the devices and everyday essentials that help you create, connect, and make more of the moments that matter.</p>
      <p>We pair thoughtful choices with honest guidance and care from real people. No overwhelm, no fuss — just a better way to find the thing that feels right for you.</p>
      <div className="about-values">
        <div><strong>01</strong><span>Thoughtful<br />choices</span></div>
        <div><strong>02</strong><span>Real help,<br />real humans</span></div>
        <div><strong>03</strong><span>Care in every<br />detail</span></div>
      </div>
      <a href="#contact" className="text-link">Get to know us <FiArrowRight /></a>
    </div>
  </section>;
}

const quotes = [
  { quote: 'It felt less like shopping and more like someone really understood what I needed. The little details made all the difference.', name: 'Ananya M.', city: 'Bengaluru', initials: 'AM' },
  { quote: 'The whole experience was thoughtful, from the first click to opening the box. My new Mac arrived beautifully packed and right on time.', name: 'Rohan K.', city: 'Mumbai', initials: 'RK' },
  { quote: 'Finally a place that makes finding the right tech feel simple. Great service, honest advice, and I love my new iPhone.', name: 'Meera S.', city: 'New Delhi', initials: 'MS' },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const change = (step) => setIndex((value) => (value + step + quotes.length) % quotes.length);
  return <section className="testimonial-section page-section" id="stories">
    <SectionTitle eyebrow="KIND WORDS, REAL PEOPLE" title={<>It feels good to <em>be understood.</em></>} />
    <div className="testimonial-layout"><div className="testimonial-quote" key={index}><div className="quote-stars">★★★★★</div><blockquote>“{quotes[index].quote}”</blockquote><div className="quote-person"><span>{quotes[index].initials}</span><div><strong>{quotes[index].name}</strong><small>{quotes[index].city} · Verified customer</small></div></div></div>
      <div className="testimonial-side"><div className="testimonial-number">0{index + 1}<span> / 03</span></div><p>A LITTLE LOVE NOTE FROM THE iSTORE COMMUNITY</p><SliderControls label="testimonial" onPrevious={() => change(-1)} onNext={() => change(1)} /></div></div>
  </section>;
}

export function GallerySection() {
  const images = [
    ['https://i.pinimg.com/736x/c8/3c/f6/c83cf649e1dad5dbda47692d989a9b81.jpg', 'A little bit of wonder', 'phones'],
    ['https://i.pinimg.com/736x/4a/62/d3/4a62d3e72f0c8880835eb22dcaf3266f.jpg', 'Made for everyday', 'phones'],
    ['https://i.pinimg.com/736x/5a/13/c7/5a13c77c1150f5495a6dce2a91975295.jpg', 'Room to create', 'laptops'],
    ['https://i.pinimg.com/1200x/91/4a/b5/914ab591c1f28ba6f3b72b6c09a0fa60.jpg', 'Time, well spent', 'watches'],
    ['https://i.pinimg.com/1200x/4e/47/8e/4e478ea1217ec5c2b477340ee131ec02.jpg', 'Find your frequency', 'buds'],
  ];
  return <section className="gallery-section page-section"><SectionTitle eyebrow="LIFE, THROUGH THE iSTORE LENS" title={<>Little things. <em>Big feeling.</em></>} copy="Tag your moments with @istore and find a little inspiration." />
    <div className="gallery-grid">{images.map(([image, alt, category], index) => <a className={`gallery-image gallery-image-${index + 1}`} href="#products" key={image}><StoreImage loading="lazy" src={image} alt={alt} category={category} /><span><FiArrowUpRight /> {alt}</span></a>)}</div>
  </section>;
}

export function StepsSection() {
  const steps = [
    { number: '01', title: 'Find your thing', copy: 'Take your time. Browse the pieces that feel like you.', icon: <FiCompass /> },
    { number: '02', title: 'Make it yours', copy: 'Choose your finish, storage, and the details you love.', icon: <FiHeart /> },
    { number: '03', title: 'A few details', copy: 'Pick how you would like to pay. We keep it simple.', icon: <FiShield /> },
    { number: '04', title: 'Meet your new thing', copy: 'Free delivery, thoughtful packing, and a little joy.', icon: <FiTruck /> },
  ];
  return <section className="steps-section page-section"><SectionTitle eyebrow="THE EASY PART" title={<>Four little steps. <em>One big smile.</em></>} copy="From finding the right thing to it finding its way home." />
    <div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.number}><div className="step-top"><span>{step.number}</span>{step.icon}</div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
  </section>;
}

const faqs = [
  ['Can I trade in my current device?', 'Absolutely. Our trade-in program gives you credit toward your next upgrade. Trade-in value depends on the device model and condition.'],
  ['How long does delivery take?', 'Most orders arrive in 2–4 business days. We will share tracking details as soon as your order is on its way. Delivery is free across India.'],
  ['What payment methods can I use?', 'Pay with UPI, credit or debit card, or choose cash on delivery. Eligible purchases can also be paid in easy monthly instalments.'],
  ['Can I return or exchange my order?', 'Yes. You can request a return or exchange within 14 days of delivery, provided the product is in its original condition.'],
  ['Are all products genuine?', 'Every product is genuine and sourced through trusted, authorized channels. Products include applicable manufacturer warranty.'],
];

export function FAQSection() {
  const [open, setOpen] = useState(0);
  return <section className="faq-section page-section" id="faq"><div className="faq-intro"><span className="eyebrow">A FEW THINGS YOU MIGHT WONDER</span><h2>Good questions.<br /><em>Honest answers.</em></h2><p>Still curious? We are just a hello away.</p><a className="text-link" href="#contact">Talk to a real person <FiArrowRight /></a></div>
    <div className="faq-list">{faqs.map(([question, answer], index) => <div className={open === index ? 'faq-item open' : 'faq-item'} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span><small>0{index + 1}</small>{question}</span><FiChevronDown /></button>{open === index && <p>{answer}</p>}</div>)}</div>
  </section>;
}

export function ContactSection({ onToast }) {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') || '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onToast('Please enter a valid email address.');
      return;
    }
    event.currentTarget.reset();
    onToast('Lovely. We’ll be in touch soon.');
  };
  return <section className="contact-section page-section" id="contact"><div className="contact-copy"><span className="eyebrow">A HUMAN, WHENEVER YOU NEED ONE</span><h2>Need a little<br /><em>help finding your iStore?</em></h2><p>Real people, thoughtful answers. No bots, no fuss.</p><a href="mailto:hello@istore.in" className="contact-email">hello@istore.in <FiArrowUpRight /></a><span className="contact-hours"><FiMapPin /> Here for you, Monday–Saturday · 10am–7pm IST</span></div><form className="contact-form" onSubmit={submit}><label htmlFor="newsletter-email">A LITTLE SOMETHING GOOD, IN YOUR INBOX.</label><div><input id="newsletter-email" name="email" placeholder="Your email address" type="email" required /><button aria-label="Subscribe"><FiArrowRight /></button></div><small>No noise. Just new things, nice offers, and the occasional hello.</small></form></section>;
}

export function Footer({ onOpenWishlist }) {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="wordmark" href="#home"><img className="brand-icon" src="/istore-mark.svg" alt="" /><span>iStore</span></a><p>Your world.<br />One store.</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://youtube.com" aria-label="YouTube">▶</a></div></div><div className="footer-links"><div><span>EXPLORE</span><a href="#products">Shop everything</a><a href="#categories">Collections</a><a href="#offers">Offers</a><a href="#about">Our story</a></div><div><span>HERE TO HELP</span><a href="#faq">FAQs</a><a href="#contact">Contact us</a><a href="#contact">Delivery & returns</a><a href="#contact">Track your order</a><button type="button" onClick={onOpenWishlist}>Wishlist</button></div><div><span>THE LITTLE DETAILS</span><a href="#about">About iStore</a><a href="#contact">Privacy</a><a href="#contact">Terms</a><a href="#contact">Careers</a></div></div></div><div className="footer-bottom"><span>© 2026 iSTORE. MADE WITH A LITTLE MORE CARE.</span><span>MADE FOR INDIA <i>✳</i></span><a href="#home">BACK TO THE BEGINNING ↑</a></div></footer>;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return visible ? <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><FiArrowUpRight /></button> : null;
}

export function StoreSections({ onExplore, onCategory, onToast, onWishlist, wishlist, onOpenWishlist }) {
  useReveal();
  return <>
    <Hero onExplore={onExplore} />
    <CategorySection onCategory={onCategory} />
    <OfferSection onExplore={onExplore} />
    <ProductSection onExplore={onExplore} onWishlist={onWishlist} wishlist={wishlist} />
    <AboutSection />
    <TestimonialsSection />
    <GallerySection />
    <StepsSection />
    <FAQSection />
    <ContactSection onToast={onToast} />
    <Footer onOpenWishlist={onOpenWishlist} />
    <BackToTop />
  </>;
}
