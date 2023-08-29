import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
                console.log(data)
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
    const getCity = useCallback(async function getCity(id) {
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
    }, [currentCity.id])
    // create new city
    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json()
            setCities(cities => [...cities, data])
        } catch (error) {
            alert('Failed to create new city')
        } finally {
            setIsLoading(false)
        }
    }
    // delete city
    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            setCities(cities => cities.filter(city => city.id !== id))
        } catch (error) {
            alert('Failed to delete city');
        } finally {
            setIsLoading(false)
        }
    }
    // assign the values 
    return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>{children}</CitiesContext.Provider>
}
// custom hook to use the cities context every where we need 
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('Failed to implement cities context');
    return context;
}
export { CitiesProvider, useCities }





