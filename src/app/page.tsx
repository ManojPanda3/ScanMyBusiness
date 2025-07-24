import Link from "next/link";

const HomePage = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to ScanMyBusiness</h1>
          <p className="mb-5">Scan your business for possible improvement and analyze your rivals for their best pointers which you can implement to improve your business.</p>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;