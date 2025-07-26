'use client'

import { useClientAuth } from '@/hooks/AuthProvider';
import { User } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const { loggedIn } = useClientAuth();

  return (
    <nav className="navbar bg-base-100" id="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          ScanMyBusiness
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {loggedIn ? (<User />) : (<>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </>)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
