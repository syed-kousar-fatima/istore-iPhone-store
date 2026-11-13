import { StoreSections } from '../sections/StoreSections';

export default function HomePage({ onExplore, onWishlist, wishlist, onCategory, onToast, onOpenWishlist }) {
  return (
    <StoreSections
      onExplore={onExplore}
      onWishlist={onWishlist}
      wishlist={wishlist}
      onCategory={onCategory}
      onToast={onToast}
      onOpenWishlist={onOpenWishlist}
    />
  );
}
