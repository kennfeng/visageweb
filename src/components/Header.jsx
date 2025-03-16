import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="flex justify-between items-center p-4 py-2 text-primary-foreground box-border sticky top-0 bg-white z-10">
            <h1 className="text-xl font-semibold text-black">Visage</h1>
            <nav className='text-black'>
                <ul className="flex gap-4 items-center">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Button as={Link} to="/login" className="cursor-pointer" variant="outline">Login</Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;