import { BrowserRouter,Routes,Route } from "react-router-dom";
import CategoryButtons from "../componets/CategoryButtons";
import CategoryPage from "../pages/CategoryPage";
import Write from "../Write"; 

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CategoryButtons />}/>
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/write" element={<Write />} /> 
                {/* loggedInUser 나중에 수정해야 함  */}
            </Routes>
        </BrowserRouter>
    );
}   