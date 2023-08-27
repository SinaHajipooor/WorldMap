import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
    // extract the query strings from the url 
    // useSearchParams is just like useState hook and it returns an array that has the current search params and a function to update the search params   
    const [searchparams, setSearchParams] = useSearchParams();
    // we can access the actual quesry string by get method
    const lat = searchparams.get('lat');
    const lng = searchparams.get('lng');

    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <h1>position : {lat} , {lng}</h1>
            {/* here we change the query string by the given method of the useSeachParams hook   */}
            <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>Change the position </button>
        </div>
    )
}

export default Map






