import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!item) return <p>Not found.</p>;

  return (
    <article className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>
      <div className="detail-layout">
        <div className="detail-media">
          <img src={item.image || '/assets/placeholder.png'} alt={item.name} />
        </div>
        <div className="detail-body">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="detail-price">${item.price?.toFixed?.(2)}</div>
        </div>
      </div>
    </article>
  );
}

