import { BrowserRouter,Routes,Route } from "react-router-dom";
import CategoryButtons from "../componets/CategoryButtons";
import CategoryPage from "../pages/CategoryPage";
import Write from "../pages/Write"; 
import Home from "../pages/Home"; 

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CategoryButtons />}/>
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/write" element={<Write loggedInUser="mirim123" />} />
                {/* id 는 db 로 다시 해야 함~ */}
            </Routes>
        </BrowserRouter>
    );
}   