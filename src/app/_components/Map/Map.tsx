// components/Map.js
"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SearchBar, { NominatimPlace } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";

function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13); // you can also use map.flyTo(position, 13)
    }
  }, [position, map]);

  return null;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number]>([15.4994, 121.0106])
  const handleSelect = (place: NominatimPlace) =>  setPosition([Number(place.lat), Number(place.lon)])

  return (
    <div>
        <SearchBar onSelect={handleSelect}/>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater position={position} />
        <Marker position={position}>
          <Popup>New York City</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
