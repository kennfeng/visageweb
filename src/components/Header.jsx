import React from 'react';
import { Button } from '@/components/ui/button';

function Header() {
    return (
        <header className="flex justify-between items-center p-4 text-primary-foreground">
            <h1 className="text-xl font-semibold">My App</h1>
            <nav>
                <Button variant="link">Home</Button>
                <Button variant="link">About</Button>
                <Button variant="link">Contact</Button>
            </nav>
        </header>
    );
}

export default Header;