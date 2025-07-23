import { BrowserRouter,Routes,Route } from "react-router-dom";
import CategoryButtons from "../componets/CategoryButtons";
import CategoryPage from "../pages/CategoryPage";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CategoryButtons />}/>
                <Route path="/category/:categoryName" element={<CategoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}