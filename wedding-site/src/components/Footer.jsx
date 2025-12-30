import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Pour toute question, contactez-nous à{' '}
          <a href="mailto:contact@aliceetmarc.fr">contact@aliceetmarc.fr</a>
        </p>
        <p className="footer-copyright">
          © 2025 Alice & Marc - Avec tout notre amour
        </p>
      </div>
    </footer>
  );
}

export default Footer;
