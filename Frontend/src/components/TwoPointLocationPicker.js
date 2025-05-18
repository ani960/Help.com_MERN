import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 24.8607, // Karachi
  lng: 67.0011,
};

export default function TwoPointLocationPicker({ pickup, setPickup, dropoff, setDropoff }) {
  const handleMapClick = (e) => {
    const clickedLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    // Choose whether to set pickup or dropoff
    if (!pickup) {
      setPickup(clickedLocation);
    } else {
      setDropoff(clickedLocation);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBU4Iq91VPWwpwCFT7TW_AD2PTpEBg1siU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pickup || defaultCenter}
        zoom={11}
        onClick={handleMapClick}
      >
        {pickup && <Marker position={pickup} label="P" />}
        {dropoff && <Marker position={dropoff} label="D" />}
      </GoogleMap>
    </LoadScript>
  );
}
