import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 30.3753,
  lng: 69.3451,
};

const EnhancedMap = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dropsRes, needsRes, pickupsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/drop"),
          axios.get("http://localhost:5000/api/need"),
          axios.get("http://localhost:5000/api/pickup"),
        ]);

        const formatMarker = (item, type) => ({
          lat: item.coordinates?.lat,
          lng: item.coordinates?.lng,
          type,
          info: item,
        });

        const dropMarkers = dropsRes.data.map((d) => formatMarker(d, "Drop"));
        const needMarkers = needsRes.data.map((n) => formatMarker(n, "Need"));
        const pickupMarkers = pickupsRes.data.map((p) => formatMarker(p, "Pickup"));

        const all = [...dropMarkers, ...needMarkers, ...pickupMarkers].filter(
          (m) => m.lat && m.lng
        );

        setMarkers(all);
      } catch (err) {
        console.error("Error fetching tracking data:", err);
      }
    };

    fetchData();
  }, []);

  const getColor = (type) => {
    if (type === "Drop") return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    if (type === "Need") return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Pickup
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBU4Iq91VPWwpwCFT7TW_AD2PTpEBg1siU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{ url: getColor(marker.type) }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div style={{ maxWidth: "220px" }}>
              <h4>{selectedMarker.type}</h4>

              {selectedMarker.type === "Pickup" && (
                <>
                  <p><strong>Volunteer Phone:</strong> {selectedMarker.info.phoneNumber || "N/A"}</p>
                  <p><strong>Item Count:</strong> {selectedMarker.info.itemCount || "N/A"}</p>
                </>
              )}

              {selectedMarker.type === "Need" && (
                <>
                  <p><strong>Needy Name:</strong> {selectedMarker.info.name || "N/A"}</p>
                  <p><strong>Item Needed:</strong> {selectedMarker.info.itemNeeded || "N/A"}</p>
                  <p><strong>Phone:</strong> {selectedMarker.info.phoneNumber || "N/A"}</p>
                </>
              )}

              {selectedMarker.type === "Drop" && (
                <>
                  <p><strong>Condition:</strong> {selectedMarker.info.condition}</p>
                  <p><strong>Quantity:</strong> {selectedMarker.info.quantity}</p>
                  <p><strong>Phone:</strong> {selectedMarker.info.phoneNumber || "N/A"}</p>
                </>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default EnhancedMap;
