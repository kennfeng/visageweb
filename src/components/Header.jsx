import React from 'react';
import { Button } from '@/components/ui/button';

function Header() {
    return (
        <header className='bg-black'>
            <h1>Header</h1>
            <Button>Click Me</Button>
        </header>
    );
}

export default Header;