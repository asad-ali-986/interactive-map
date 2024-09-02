import React, { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import PolygonDrawer from './PolygonDraw'; // Import MapSetup component

interface MapProps {
  children?: ReactNode; // Allows the Map component to accept children
}

const Map:React.FC<MapProps> = () => (
  <MapContainer
    center={[51.505, -0.09]} // Default center of the map
    zoom={13}
    style={{ height: '100vh', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <PolygonDrawer /> {/* Use PolygonDrawer as a child of MapContainer */}
  </MapContainer>
);

export default Map;
