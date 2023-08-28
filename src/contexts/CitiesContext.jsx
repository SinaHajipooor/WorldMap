import { createContext, useContext, useEffect, useState } from "react";
// initialize the context
const CitiesContext = createContext();
// base url 
const BASE_URL = 'http://localhost:9000';
// states and logic of context
function CitiesProvider({ children }) {
    // states
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    // fetch cities list 
    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`);
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
    // fetch the current city data 
    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        } catch (error) {
            alert('failed to fetch city details')
        } finally {
            setIsLoading(false);
        }
    }
    // assign the values 
    return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>{children}</CitiesContext.Provider>
}
// custom hook to use the cities context every where we need 
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('Failed to implement cities context');
    return context;
}
export { CitiesProvider, useCities }





