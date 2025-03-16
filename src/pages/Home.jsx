import React, {useState} from "react";
import { 
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";


const sampleUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@mail.com",
    created_at: "2021-10-10"

}
function Home() {
    const [user, setUser] = useState(sampleUser); // just for testing purposes
    
    return (
        <div>
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-semibold ">Welcome back, {user.firstName}!</h1>
            <div className="dashboard-actions">
                <Button as={Link} to="/analysis" variant="primary" className="flex flex-col items-center gap-2">
                    <ScanFace className="w-6 h-6 text-black" />
                    Scan Face
                </Button>
            </div>
        </div>
        </div>
    );
}

export default Home;