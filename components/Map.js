import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {useState} from "react";
import getCenter from "geolib/es/getCenter";

function Map({searchResults}) {
    
    const[selectedLocation, setSelectedLocation] = useState({});
    //Transform the searchResults object to getCenter obj
    // {latitude:52.12324, longitude: 13.72323} object
    const coordinates = searchResults.map(result =>({
        longitude: result.long,
        latitude: result.lat,
    }))
    //console.log(coordinates);
    const center= getCenter(coordinates);
    //console.log(center);

    const [viewport, setViewPort] = useState({
        width: "100%",
        height:"100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom:11,
    });

    return (
        <ReactMapGL 
                    mapStyle="mapbox://styles/netfreak29/cks1mge4d1oqk18o4togfe38t"
                    mapboxApiAccessToken={process.env.mapbox_key}
                    {...viewport}
                    onViewportChange={(nextViewport)=> setViewPort(nextViewport) }
                    >

                        {searchResults.map(result => (
                            <div key={result.long}>
                                <Marker longitude={result.long}
                                        latitude={result.lat}
                                        offsetTop={-10}
                                        >
                                            <p onClick={()=> setSelectedLocation(result)} 
                                            className="cursor-pointer text-2xl animate-bounce"
                                            aria-label="push-pin"
                                            >
                                                📍
                                            </p>
                                </Marker>

                                {/* Popup or label should comes up if we click on marker */}

                                {selectedLocation.long === result.long ? (
                                    <Popup closeOnClick={true} onClose={()=> setSelectedLocation({})} latitude={result.lat} longitude={result.long}>
                                        <div className="font-semibold p-1 text-gray-800">
                                        {result.title}
                                        </div>
                                    </Popup>
                                ) : (false)}
                            </div>
                        ))}
        </ReactMapGL>
    )
}

export default Map
