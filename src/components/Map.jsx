import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';

function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0])
    // extract the query strings from the url 
    // useSearchParams is just like useState hook and it returns an array that has the current search params and a function to update the search params   
    const [searchparams, setSearchParams] = useSearchParams();
    // we can access the actual quesry string by get method
    const lat = searchparams.get('lat');
    const lng = searchparams.get('lng');
    // get the navigate method
    const navigate = useNavigate();

    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div >
    )
}

export default Map






