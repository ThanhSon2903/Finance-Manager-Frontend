import { Children, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Menu, X,LogOut  } from "lucide-react";
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";
import { User, UserCircle, Camera, Image, Upload, Trash } from "lucide-react";

const MenuBar = () => {
    const [openSideMenu,setOpenSideMenu] = useState(false);
    const [showDropDown,setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const {user,clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropDown(false);
        navigate("/login");
    }   
    useEffect(() => {
        const handleClickOutSide = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropDown(false);
            }
        };
        if(showDropDown){
            document.addEventListener("mousedown",handleClickOutSide);
        }

        return () => {
            document.removeEventListener("mousedown",handleClickOutSide);
        }
    })
    return (
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 backdrop-blur-[2px] px-4 py-4 sm:px-7 sticky top-0 z-30">
            
            <div className="flex items-center gap-5">
                <button 
                    
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                    {openSideMenu ? (
                        <X className="text-2xl"/>
                    ):(
                        <Menu className="text-2xl"/>
                    )}
                </button>

                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-10 w-10"/>
                    <span className="text-lg font-medium text-black truncate">
                        Finance Manager
                    </span>
                </div>
            </div>

            <div className="relative" ref={dropDownRef}>
                <button 
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">
                    <User className="text-blue-500"></User>
                </button>

                {showDropDown && (

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 px-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bb-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-blue-600"></User>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-mediem text-gray-800 truncate">{user.fullName}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>

                        </div>     


                        <div className="py-1">
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                <LogOut className="w-4 h-4 text-gray-500"/>
                                <span>LogOut</span>
                            </button>
                        </div> 

                    </div>  
                )}

            </div>
            

            {/*Mobile Side Menu */}
            {openSideMenu && (
                <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                    <Sidebar></Sidebar>
                </div>

            )}
        </div>

    )
}

export default MenuBar;