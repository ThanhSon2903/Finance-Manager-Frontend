import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";

const Home = () => {
    useUser();
    return (
        <div>
            <Dashboard>
                This is Home page
            </Dashboard>

        </div>
    )
}

export default Home;