import { createContext, useContext, useEffect, useState } from "react";
// initialize the context
const CitiesContext = createContext();
// states and logic of context
function CitiesProvider({ children }) {
    // states
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
    // assign the values 
    return <CitiesContext.Provider value={{ cities, isLoading }}>{children}</CitiesContext.Provider>
}
// custom hook to use the cities context every where we need 
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('Failed to implement cities context');
    return context;
}
export { CitiesProvider, useCities }



