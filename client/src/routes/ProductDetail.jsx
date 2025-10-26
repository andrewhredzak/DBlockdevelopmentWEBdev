import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpectroSection from '../components/SpectroSection.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to load product');
        const data = await res.json();
        if (!cancelled) setItem(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!item) return <p>Not found.</p>;

  return (
    <article className="product-detail">
      <SpectroSection className="hero" height={180} bands={20}>
        <div className="hero-inner">
          <img
            className="hero-logo"
            src="/assets/images/dblock_logo_Final.svg"
            alt="D Block Development logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="hero-copy">
            <h1>{item.name}</h1>
            <p>{item.shortDescription || 'Details and specifications'}</p>
          </div>
        </div>
      </SpectroSection>
      <Link to="/products" className="back-link">&larr; Back to Products</Link>
      <div className="detail-layout">
        <div className="detail-media">
          <img src={item.image || '/assets/images/TEST111.png'} alt={item.name} />
        </div>
        <div className="detail-body">
          <p>{item.description}</p>
          <div className="detail-price">${item.price?.toFixed?.(2)}</div>
        </div>
      </div>
    </article>
  );
}
