import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        if (!cancelled) setItems(data);
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
  }, []);

  return (
    <section className="products">
      <h1>Products</h1>
      {loading && <p>Loading…</p>}
      {error && <p role="alert">{error}</p>}
      <div className="products-grid">
        {items.map((p) => (
          <ProductCard key={p._id || p.id || p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

