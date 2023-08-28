import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0])
    const { cities } = useCities();
    // extract the query strings from the url 
    // useSearchParams is just like useState hook and it returns an array that has the current search params and a function to update the search params   
    const [searchparams, setSearchParams] = useSearchParams();
    // we can access the actual quesry string by get method
    const mapLat = searchparams.get('lat');
    const mapLng = searchparams.get('lng');
    // get the navigate method
    const navigate = useNavigate();

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng])



    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.emoji}
                            <span>{city.cityName}</span>
                        </span>
                    </Popup>
                </Marker>)}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div >
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}


function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map






