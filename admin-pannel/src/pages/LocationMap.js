import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 30.3753, // Center of Pakistan
  lng: 69.3451,
};

const LocationMap = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const [dropRes, needRes, pickupRes] = await Promise.all([
          axios.get("http://localhost:5000/api/drop"),
          axios.get("http://localhost:5000/api/need"),
          axios.get("http://localhost:5000/api/pickup"),
        ]);

        const drops = dropRes.data.map((d) => ({
          lat: d.coordinates?.lat,
          lng: d.coordinates?.lng,
          label: "Drop",
        }));

        const needs = needRes.data.map((n) => ({
          lat: n.coordinates?.lat,
          lng: n.coordinates?.lng,
          label: "Need",
        }));

        const pickups = pickupRes.data.map((p) => ({
          lat: p.coordinates?.lat,
          lng: p.coordinates?.lng,
          label: "Pickup",
        }));

        const allMarkers = [...drops, ...needs, ...pickups].filter(
          (m) => m.lat && m.lng
        );

        setMarkers(allMarkers);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };

    fetchAllLocations();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBU4Iq91VPWwpwCFT7TW_AD2PTpEBg1siU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.label}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;
