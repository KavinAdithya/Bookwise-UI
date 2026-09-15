import '../../css/General/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <p>© 2026 BookWise</p>

            <div className="footer-links">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy</a>
            </div>
        </footer>
    );
}

export default Footer;