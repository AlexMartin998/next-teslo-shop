import { Slide } from 'react-slideshow-image';

import styles from './ProductSlidesShow.module.css';

interface ProductSlidesShowProps {
  images: string[];
}

const ProductSlidesShow: React.FC<ProductSlidesShowProps> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map(url => {
        // const imgUrl = `/products/${url}`;
        const imgUrl = url.startsWith('https') ? url : `/products/${url}`;
        return (
          <div key={imgUrl} className={`${styles['each-slide']}`}>
            <div
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};

export default ProductSlidesShow;
