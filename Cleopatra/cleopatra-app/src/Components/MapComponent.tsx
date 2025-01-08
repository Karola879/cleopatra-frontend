import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 50.291265297079036, // Szerokość geograficzna (np. Warszawa)
    lng: 18.68017492440775, // Długość geograficzna
  };
  

  return (
    <LoadScript googleMapsApiKey="AIzaSyAGwSM4nqzneTNAAJCx8871E3_tzvUV80E">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={17} // Skala mapy
      />
    </LoadScript>
  );
};

export default MapComponent;