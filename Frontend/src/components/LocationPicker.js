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

export default function LocationPicker({ location, setLocation }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBU4Iq91VPWwpwCFT7TW_AD2PTpEBg1siU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || defaultCenter}
        zoom={10}
        onClick={(e) =>
          setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
}
