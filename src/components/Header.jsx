import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogOut, User, LogIn } from 'lucide-react';
import { Avatar } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Header() {
    const user = null;

    return (
        <header className="flex justify-between items-center p-4 py-2 text-primary-foreground box-border sticky top-0 bg-white z-10">
            <img src="/logo.svg" alt="Visage" className="h-7 w-auto cursor-pointer" onClick={() => window.location.href = '/home'} />
            <nav className='text-black'>
                <ul className="flex gap-4 items-center">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="cursor-pointer" src={
                                        "https://cdn.prod.website-files.com/6467b51d70ea9fec4ce1fd00/6467b51d70ea9fec4ce1fe9f_aiony-haust-3TLl_97HNJo-unsplash.jpg"
                                    } alt={user.username} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem as={Link} to="/profile">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Button variant="outline" onClick={() => alert('Logout clicked')}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button as={Link} to="/login" className="cursor-pointer" variant="outline">
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
