import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { Link } from "react-router-dom";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import API_ENDPOINTS from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../Context/AppContext.jsx";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        if(!validateEmail(email)){
            setError("Please enter your email");
            setIsLoading(false);
            return;
        }

        setError("");

        //xử lý đăng nhập
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
                email,
                password,
            });
            const {token,user} = response.data;
            if(token != null){
                localStorage.setItem("token",token); //Lưu JWT token vào localStorage
                setUser(user);
                navigate("/dashboard");
            }
            if(response.status === 201){
                toast.success("Profile created successfully. ");
                navigate("/login");
            }
            
        }
        catch (er) {
            console.error(er);

            if (er.response) {
                if (er.response.status === 401 || er.response.status === 403) {
                    setError("Email or password is invalid");
                } else if (er.response.data?.message) {
                    setError(er.response.data.message);
                } else {
                    setError("Login failed");
                }
            } 
            else {
                setError("Network error, please try again");
            }
        } 
        finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img
                src={assets.login_bg}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover filter blur-sm "
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>

                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login in
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            label = "Email Address"
                            placeholder = "name@gmail.com"
                            type = "text"
                        />
                        <Input
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            label = "Password"
                            placeholder = "************"
                            type = "password"
                        />
                        
                                
                        {
                            error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </p>    
                            )
                        }

                        <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 ${isLoading ? 'bg-blue-600 opacity-60 cursor-not-allowed': 'bg-blue-600 hover:bg-blue-700'}`} type="submit">
                            {
                                isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5"/>
                                        Logging in...
                                    </>
                                ):(
                                    "LOG-IN"
                                )
                            }
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account? 
                            <Link to = "/signup" className = "font-medium text-primary underline hover:text-primary-dark transition-colors">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;