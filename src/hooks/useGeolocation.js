import { useState } from "react";

function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    function getPosition() {
        if (!navigator.geolocation) return setError('Your browser doesnt support geolocation')

        setIsLoading(false);
        navigator.geolocation.getCurrentPosition(
            pos => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false)
            },
            error => {
                setError(error.message);
                setIsLoading(false)
            }
        );
    }
    return { isLoading, position, error, getPosition };
}

