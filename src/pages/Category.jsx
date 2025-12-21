import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import API_ENDPOINTS from "../util/apiEndpoints";
import toast from "react-hot-toast";
const Category = () => {
    useUser();
    const [loading,setLoading] = useState(false);
    const [categoryData,setCategoryData] = useState([]);
    const [openAddCategoryModal,setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal,setOpenEditCategoryModal] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                console.log("categories",response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong. Please try again. ", error);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    },[]);

    //10:05:15
    return (
        <Dashboard>
            <div className="my-5 mx-auto">
                {/*Add button to add cate */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                    
                        className="flex items-center gap-2 bg-green-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>
                {/*Category List */}
                <CategoryList categories={categoryData}/>
                {/*Adding cate modal */}

                {/*Updating cate modal */}
            </div>
        </Dashboard>
    )
}

export default Category;