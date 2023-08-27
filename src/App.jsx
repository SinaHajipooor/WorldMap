import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        {/* when we add the index property to a child route , it will become the default route that will render if none of the other child routes render  */}
                        <Route index element={<p>default path inside app route</p>} />
                        <Route path="cities" element={<p>List of cities</p>} />
                        <Route path="countries" element={<p>List of countries</p>} />
                        <Route path="form" element={<p>form</p>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
