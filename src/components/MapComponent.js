import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

function MapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_KEY
  })

  // Divido lat e lng e rimuovo le parentesi
  const center = {
    lat: parseFloat(props.coord.split(",")[0].replace("(","")),
    lng: parseFloat(props.coord.split(",")[1].replace(")",""))
  };
  
    const [map, setMap] = React.useState(null);
    const onLoad = React.useCallback(function callback(map) {
    const marker = new window.google.maps.Marker({
        position: center,
    });
    marker.setMap(map);
    setMap(map);    
}, []);


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // Renderizzo solo se ha già ricevuto le coordinate
  return isLoaded && props.coord ? (
      <GoogleMap
        mapTypeId={'hybrid'}
        center={center}
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)