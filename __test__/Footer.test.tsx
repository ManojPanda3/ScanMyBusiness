/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer"

describe("Footer", () => {
  it("renders the footer", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument();
  });
  it("rendering Copyright © 2025 - All right reserved by ScanMyBusiness Ltd.", () => {
    render(<Footer />);
    const copyright = screen.getByTestId("footer-copyright")
    expect(copyright).toBeInTheDocument()
  })
  it('rendering Pages', () => {
    render(<Footer />);
    const pages = screen.getByTestId("footer-pages")
    const home = screen.getByTestId("footer-pages-home")
    const about = screen.getByTestId("footer-pages-about")
    const contact = screen.getByTestId("footer-pages-contact")
    expect(pages).toBeInTheDocument()
    expect(home).toBeInTheDocument()
    expect(about).toBeInTheDocument()
    expect(contact).toBeInTheDocument()
  })
  it('rendering About', () => {
    render(<Footer />);
    const about = screen.getByTestId("footer-about")
    const aboutText = screen.getByTestId("footer-about-text")
    expect(about).toBeInTheDocument()
    expect(aboutText).toBeInTheDocument()
  })
  it('rendering Account', () => {
    render(<Footer />);
    const account = screen.getByTestId("footer-account"),
      login = screen.getByTestId("footer-login"),
      signup = screen.getByTestId("footer-singup")
    expect(account).toBeInTheDocument()
    expect(login).toBeInTheDocument()
    expect(signup).toBeInTheDocument()
  })
});
