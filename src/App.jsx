import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from './components/Form'

// base url
const URL = 'http://localhost:9000';

function App() {
    //     ----------- state ------------
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // ----------- lifecycle ------------
    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${URL}/cities`);
                const data = await response.json();
                setCities(data)
            } catch (err) {
                alert('Couldent fetch all the cities')
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities();
    }, [])
    // ----------- UI ------------


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route index element={<Navigate replace to='cities' />} />
                        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
