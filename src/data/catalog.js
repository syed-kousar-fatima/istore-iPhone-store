const collections = [
  {
    id: 'phones',
    name: 'iPhone',
    eyebrow: 'Made to move you',
    image: 'https://i.pinimg.com/736x/0d/51/c9/0d51c92c584fd689054db51cddaeacf9.jpg',
    productImages: ['https://i.pinimg.com/736x/b6/d9/00/b6d900175c277971d4ce65a6670f580d.jpg', 'https://i.pinimg.com/736x/92/e9/71/92e971e08df24a85c3f6e3cc16470295.jpg', 'https://i.pinimg.com/1200x/72/cf/f5/72cff5f64d1ef3c215164e581a76d21e.jpg', 'https://i.pinimg.com/1200x/15/2f/c4/152fc4f7bf5cc9ef6586f1e476dd9744.jpg', 'https://i.pinimg.com/1200x/2f/48/a0/2f48a02c34bc4967731eac0fb2e80ae6.jpg'],
    products: [
      ['iPhone 17 Pro Max', 164900, 'A19 Pro · Pro camera system'],
      ['iPhone 17 Pro', 144900, 'A19 Pro · 6.3-inch display'],
      ['iPhone 17', 82900, 'A19 · All-day battery'],
      ['iPhone 16 Pro Max', 154900, 'A18 Pro · Pro camera system'],
      ['iPhone 16', 69900, 'A18 · Built for Apple Intelligence'],
    ],
  },
  {
    id: 'laptops',
    name: 'MacBook',
    eyebrow: 'Power, beautifully done',
    image: 'https://i.pinimg.com/736x/e0/d1/bb/e0d1bb6094115f2a3bbbcde447e53cf1.jpg',
    productImages: ['https://i.pinimg.com/736x/70/c1/eb/70c1ebbebf28d9031b29b2de9543a83f.jpg', 'https://i.pinimg.com/736x/a8/2c/1b/a82c1b7f0973a0baabce8ed3760d7c6d.jpg', 'https://i.pinimg.com/736x/18/8f/7a/188f7aae6483d5ac4a76397c72b7715f.jpg', 'https://i.pinimg.com/1200x/ec/40/d0/ec40d09d164005dbc7f7e35db17bb121.jpg', 'https://i.pinimg.com/736x/62/36/94/623694baf67b84135634a411034a3321.jpg'],
    products: [
      ['MacBook Pro 14', 199900, 'M4 Pro · Liquid Retina XDR'],
      ['MacBook Air 15', 134900, 'M4 · Up to 18 hours battery'],
      ['MacBook Air 13', 99900, 'M3 · Incredibly light'],
      ['MacBook Pro 16', 249900, 'M4 Pro · Built for big ideas'],
      ['MacBook Air 13 M2', 89900, 'M2 · Thin, light, lovely'],
    ],
  },
  {
    id: 'tablets',
    name: 'iPad',
    eyebrow: 'Your ideas, unleashed',
    image: 'https://i.pinimg.com/1200x/bd/e4/b5/bde4b5dea7e8b591df1f76b47bb50db3.jpg',
    productImages: ['https://i.pinimg.com/736x/db/52/ef/db52ef618057da1a5fb12c5d001e5f98.jpg', 'https://i.pinimg.com/736x/96/fb/26/96fb26c4e0b9d07e60eec5efbf0f0223.jpg', 'https://i.pinimg.com/736x/07/2e/21/072e212ddf510d66f632ad91899af580.jpg', 'https://i.pinimg.com/736x/f1/03/28/f10328768dcb10c121aae69ece63e136.jpg', 'https://i.pinimg.com/736x/8f/c4/48/8fc448b568b2ba6a1ed5d45491dff8a4.jpg'],
    products: [
      ['iPad Pro 13', 129900, 'M4 · Ultra Retina XDR'],
      ['iPad Air 11', 69900, 'M2 · All-screen design'],
      ['iPad mini', 49900, 'A17 Pro · Pocket-sized power'],
      ['iPad Pro 11', 99900, 'M4 · Ultra Retina XDR'],
      ['iPad 10th generation', 34900, 'A14 Bionic · Made for everyone'],
    ],
  },
  {
    id: 'watches',
    name: 'Apple Watch',
    eyebrow: 'A healthier you, every day',
    image: 'https://i.pinimg.com/736x/c3/f2/0d/c3f20db6ef725b9524989cc2cec9a4a4.jpg',
    productImages: ['https://i.pinimg.com/1200x/84/b5/8f/84b58f309052b559e616f833b08f8918.jpg', 'https://i.pinimg.com/736x/24/75/06/247506f75bc4ea333df469d507249d0e.jpg', 'https://i.pinimg.com/736x/e9/86/a3/e986a320f92f51a85e8b68fa1beb60e8.jpg', 'https://i.pinimg.com/236x/24/ce/08/24ce086e99b186a313a25782e3570e10.jpg', 'https://i.pinimg.com/736x/0a/ae/47/0aae47305733b55edf3c64fd22556a94.jpg'],
    products: [
      ['Apple Watch Ultra 2', 89900, 'Titanium · Built for adventure'],
      ['Apple Watch Series 10', 46900, 'Thinnest Apple Watch ever'],
      ['Apple Watch SE', 24900, 'Essential health features'],
      ['Apple Watch Series 9', 39900, 'A brilliant everyday companion'],
      ['Apple Watch Ultra', 79900, 'Rugged titanium · Ready for more'],
    ],
  },
  {
    id: 'buds',
    name: 'AirPods',
    eyebrow: 'Sound that surrounds you',
    image: 'https://i.pinimg.com/736x/99/3c/ea/993cea2fccc9b122dc208dbaf31df65d.jpg',
    productImages: ['https://i.pinimg.com/1200x/03/40/1a/03401aab308f0567621159f808edc743.jpg', 'https://i.pinimg.com/1200x/99/c7/95/99c79525891b8fc7f89594e9684a4b80.jpg', 'https://i.pinimg.com/1200x/7c/e2/5a/7ce25a0ecf3efd36d4aa324458a5db69.jpg', 'https://i.pinimg.com/736x/f9/c0/10/f9c010a1563cf203b24812abcac84753.jpg', 'https://i.pinimg.com/236x/97/95/f8/9795f873db16ccacdd84380f8ad4295e.jpg'],
    products: [
      ['AirPods Pro 2', 24900, 'Adaptive Audio · USB-C'],
      ['AirPods 4', 12900, 'Spatial Audio · H2 chip'],
      ['AirPods 4 ANC', 17900, 'Active Noise Cancellation'],
      ['AirPods Pro (USB-C)', 22900, 'Personalized spatial audio'],
      ['Beats Studio Buds +', 16900, 'Rich sound · Pocket-sized case'],
    ],
  },
  {
    id: 'headphones',
    name: 'Headphones',
    eyebrow: 'Hear every detail',
    image: 'https://i.pinimg.com/236x/a5/8e/68/a58e6842baef84030a7848f275e60447.jpg',
    productImages: ['https://i.pinimg.com/736x/32/af/61/32af6197fa1a2bc67088876bfdcfef5b.jpg', 'https://i.pinimg.com/736x/57/84/74/57847481513684978cf16b2668d170a2.jpg', 'https://i.pinimg.com/1200x/26/aa/66/26aa66473b7419acba3beb69e7e56539.jpg', 'https://i.pinimg.com/236x/cd/3a/50/cd3a508fa12bd057fd4d17c1f775d2af.jpg', 'https://i.pinimg.com/1200x/38/71/be/3871bef3d1abbb70c6c5ef185bc18988.jpg'],
    products: [
      ['AirPods Max', 59900, 'High-fidelity audio · USB-C'],
      ['Beats Studio Pro', 34900, 'Immersive sound · 40 hours'],
      ['Beats Solo 4', 22900, 'Personalized spatial audio'],
      ['Beats Studio Buds', 14900, 'Big sound, small package'],
      ['Beats Flex', 6990, 'Wireless all day · Magnetic earbuds'],
    ],
  },
  {
    id: 'pouches',
    name: 'Pouches',
    eyebrow: 'The perfect finishing touch',
    image: 'https://i.pinimg.com/736x/98/d7/a1/98d7a1782f950ca9e5f7f5848806b14c.jpg',
    productImages: ['https://i.pinimg.com/736x/9b/37/9f/9b379f47df98f4d1a5b10796f6fec9d1.jpg', 'https://i.pinimg.com/1200x/12/7d/e0/127de049d2cc593c768d43d88fe45b21.jpg', 'https://i.pinimg.com/1200x/d2/c3/9f/d2c39facd5a9bb1c6267496ba3eb7e61.jpg', 'https://i.pinimg.com/1200x/0c/02/cf/0c02cf5914c87347cbf863b888f80a24.jpg', 'https://i.pinimg.com/1200x/5d/e9/26/5de92676a27dc9ac463b7049b2a60a42.jpg'],
    products: [
      ['FineWoven Case', 5900, 'Soft touch · MagSafe'],
      ['Crossbody Phone Pouch', 7900, 'Hands-free · Made for the everyday'],
      ['Clear Case', 4900, 'Crystal clear · MagSafe'],
      ['iPhone Sleeve', 8900, 'Soft-lined · A snug little home'],
      ['MagSafe Wallet', 6900, 'Your cards, right where you need them'],
    ],
  },
  {
    id: 'audio',
    name: 'More to love',
    eyebrow: 'Little things, big joy',
    image: 'https://i.pinimg.com/736x/ec/bb/c7/ecbbc725e2effa6efdb4da3429fcd2e0.jpg',
    productImages: ['https://i.pinimg.com/1200x/76/d5/32/76d532bfc835968b9d67be8e0d734756.jpg', 'https://i.pinimg.com/736x/84/67/fa/8467fa22f0e530e59b9d9500544e677a.jpg', 'https://i.pinimg.com/736x/b7/dd/7e/b7dd7ed1878dd26425212fe510555407.jpg', 'https://i.pinimg.com/1200x/a1/eb/7b/a1eb7b3ff878b59aa6752ef7a9fb8770.jpg', 'https://i.pinimg.com/236x/9f/c4/bb/9fc4bb1a8d35f028a2b9c5d25f901c3b.jpg'],
    products: [
      ['Beats Fit Pro', 19900, 'Secure-fit · Active noise cancelling'],
      ['USB-C Power Adapter', 1900, 'Compact 20W fast charging'],
      ['AirTag 4-pack', 11900, 'Keep track of what matters'],
      ['Beats Pill', 19900, 'Room-filling sound, ready to go'],
      ['AirTag', 3900, 'Find your things with one tap'],
    ],
  },
];

const colors = ['Midnight', 'Starlight', 'Natural Titanium', 'Blue'];
const storages = ['128 GB', '256 GB', '512 GB', '1 TB'];

function getImageUrl(image, options) {
  if (/^https?:\/\//i.test(image)) return image;
  return `https://images.unsplash.com/${image}?${options}`;
}

export const products = collections.flatMap((collection) =>
  collection.products.map(([name, price, description], index) => ({
    id: `${collection.id}-${index + 1}`,
    name,
    category: collection.id,
    categoryName: collection.name,
    description,
    price,
    originalPrice: Math.round(price * 1.12 / 100) * 100,
    image: getImageUrl(collection.productImages[index], 'auto=format&fit=crop&w=1000&q=85'),
    colors,
    storages,
    ram: ['8 GB', '16 GB', '24 GB'],
    badge: index === 0 ? 'BESTSELLER' : index === 1 ? 'NEW' : '',
  })),
);

export const categories = collections.map((collection) => ({
  ...collection,
  image: getImageUrl(collection.image, 'auto=format&fit=crop&w=1200&q=85'),
}));
