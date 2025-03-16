import { LoginForm } from "@/components/ui/login-form"
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (user) {    
        navigate("/home");
    }
    
    return (
        <div className="flex h-full w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
    )
}


export default Login;