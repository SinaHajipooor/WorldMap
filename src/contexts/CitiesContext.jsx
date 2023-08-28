import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    cconst[isLoading, setIsLoading] = useState(false);

    // fetch cities list 
    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:9000/cities');
                const data = await response.json();
                setCities(data);
            } catch (error) {
                alert('Failed to fetch all the cities');
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
}