
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.202.434-2.541 1.83-2.541.879 0 1.599.563 1.859 1.313l.842 2.516 2.431-.81c1.02-.33 2.131.21 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.431.81 1.62 4.822 2.431-.809c1.203-.402 2.541.434 2.541 1.831 0 .881-.564 1.601-1.314 1.86z"></path></svg>
          <p>ScanMyBusiness Ltd.<br/>Providing reliable tech since 2024</p>
        </aside>
        <nav>
          <h6 className="footer-title">About</h6>
          <p className="w-60">ScanMyBusiness is a website to scan your business for possible improvement and analyze your rivals for their best pointers which you can implement to improve your business.</p>
        </nav>
        <nav>
          <h6 className="footer-title">Pages</h6>
          <Link href="/" className="link link-hover">Home</Link>
          <Link href="/about" className="link link-hover">About</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
          <Link href="/dashboard" className="link link-hover">Dashboard</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Account</h6>
          <Link href="/login" className="link link-hover">Login</Link>
          <Link href="/signup" className="link link-hover">Signup</Link>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2025 - All right reserved by ScanMyBusiness Ltd.</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
