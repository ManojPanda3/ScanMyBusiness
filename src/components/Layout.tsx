import Navbar from './Navbar';
import Footer from './Footer';
import { isLoggedIn } from '@/lib/user';
import { ClientAuthProvider } from '@/hooks/AuthProvider';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = await isLoggedIn()
  console.log(userLoggedIn)
  return (
    <ClientAuthProvider isLoggedIn={userLoggedIn}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ClientAuthProvider>
  );
};

export default Layout;
