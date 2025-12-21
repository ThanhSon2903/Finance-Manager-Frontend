import { Label } from "recharts";
import login_bg from "./login-bg.jpg";
import logo from "./logo.png";
import { Coins, Filter, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";

export const assets = {
    login_bg,
    logo
}
export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category", 
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income", 
    },
    {
        id: "04",
        label: "Expenese",
        icon: Coins,
        path: "/expense", 
    },
    {
        id: "05",
        label: "Filter",
        icon: FunnelPlus,
        path: "/filter", 
    },
];