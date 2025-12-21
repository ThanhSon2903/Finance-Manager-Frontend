
import { useContext } from "react";
import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar";
import { AppContext } from "../Context/AppContext";

const Dashboard = ({children}) => {
    const {user} = useContext(AppContext);
    return (
       <div>
            <MenuBar>
                
            </MenuBar>
            
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <Sidebar>
                            
                        </Sidebar> 
                    </div>

                    <div className="grow mx-5">
                        {children}
                    </div>
                </div> 
            )}
       </div> 
    )
}

export default Dashboard;