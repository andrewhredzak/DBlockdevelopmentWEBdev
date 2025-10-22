import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { slug, name, description, price, image } = product;
  const imgSrc = image || '/assets/placeholder.png'; // TODO: add /assets/placeholder.png if desired

  return (
    <article className="product-card">
      <Link to={`/products/${slug}`} className="product-link" aria-label={`${name} details`}>
        <div className="product-media">
          <img src={imgSrc} alt={name} loading="lazy" />
        </div>
        <div className="product-body">
          <h3 className="product-title">{name}</h3>
          <p className="product-desc">{description}</p>
          <div className="product-price">${price?.toFixed?.(2)}</div>
        </div>
      </Link>
    </article>
  );
}

