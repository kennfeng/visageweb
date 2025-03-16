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
// Example usage
import { UserProvider } from '@/contexts/UserContext';
import { useUser } from '@/hooks/useUser';
function Header() {
    const { user } = useUser();
    
    return (
        <header className="flex justify-between items-center p-4 py-2 text-primary-foreground box-border sticky top-0 bg-white z-10">
            {/* <h1 className="text-xl font-semibold text-black">Visage</h1> */}
            <img src="/logo.svg" alt="Visage" className="h-7 w-auto" />
            <nav className='text-black'>
                <ul className="flex gap-4 items-center">
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="cursor-pointer" src={user.avatar} alt={user.username} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem as={Link} to="/profile">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem as={Link} to="/logout">
                                        <Button variant="outline bg-black" onclick={UserProvider.logout}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                        </Button>
                                        {/* Logout */}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button as={Link} to="/login" className="cursor-pointer" variant="outline">
                                <LogIn className="w-4 h-4 mr-2" />
                            </Button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;