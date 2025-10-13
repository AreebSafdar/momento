'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './sidebar/page';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    console.log(pathname)
    // Define paths where Navbar should be hidden
    const hiddenNavbarPaths = ['/signup', '/otp', '/login'];

    const showNavbar = !hiddenNavbarPaths.includes(pathname);
    
    return (
        <>
            {showNavbar && <Sidebar />}
            {children}``
        </>
    );
}
