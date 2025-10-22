export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <p>© {year} D Block Development</p>
      </div>
    </footer>
  );
}

