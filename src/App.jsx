import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Income from "./pages/Income";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import PrivateRouter from "./components/PrivateRouter";

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRouter>
                                <Home/>
                            </PrivateRouter>
                        } 
                    />
                    <Route 
                        path="/income" 
                        element={
                            <PrivateRouter>
                                <Income />
                            </PrivateRouter>
                        } 
                    />
                    <Route 
                        path="/expense" 
                        element={
                            <PrivateRouter>
                                <Expense />
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path="/category"
                        element={
                            <PrivateRouter>
                                <Category />
                            </PrivateRouter>
                        }
                    />
                    <Route
                        path="/filter"
                        element={
                            <PrivateRouter>
                                <Filter />
                            </PrivateRouter>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;
