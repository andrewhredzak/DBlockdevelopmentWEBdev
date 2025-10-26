import { Link } from 'react-router-dom';
import SpectroSection from '../components/SpectroSection.jsx';

export default function Home() {
  return (
    <section className="home">
      <SpectroSection className="hero" height={260} bands={26}>
        <div className="hero-inner">
          <img
            className="hero-logo"
            src="/assets/images/dblock_logo_Final.svg"
            alt="D Block Development logo"
            onError={(e) => {
              // Graceful fallback if the asset is missing
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="hero-copy">
            <h1>D Block Development</h1>
            <p>Reliable tools for everyday work.</p>
            <div className="hero-ctas">
              <Link to="/products" className="btn">Browse Products</Link>
            </div>
          </div>
        </div>
      </SpectroSection>

      <div className="home-grid" aria-label="Featured products">
        <article className="feature-card">
          <Link to="/products/stapler" className="feature-link">
            <div className="feature-media" aria-hidden="true">
              {/* TODO: Add an asset at /assets/stapler.png for real imagery */}
              <img src="/assets/images/TEST111.png" alt="Stapler" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            </div>
            <div className="feature-body">
              <h3>Stapler</h3>
              <p>A trusty metal stapler for daily use.</p>
            </div>
          </Link>
        </article>

        <article className="feature-card">
          <Link to="/products/scissors" className="feature-link">
            <div className="feature-media" aria-hidden="true">
              {/* TODO: Add an asset at /assets/scissors.png for real imagery */}
              <img src="/assets/images/Standard_household_scissors.PNG" alt="Scissors" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            </div>
            <div className="feature-body">
              <h3>Scissors</h3>
              <p>Sharp stainless scissors. Ambidextrous grip.</p>
            </div>
          </Link>
        </article>
      </div>
    </section>
  );
}
