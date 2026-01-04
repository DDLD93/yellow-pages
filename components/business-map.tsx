'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack/Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface BusinessMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  businessName: string;
  address?: string;
}

export default function BusinessMap({ coordinates, businessName, address }: BusinessMapProps) {
  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full rounded-xl z-0"
      style={{ minHeight: '256px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
        <Popup>
          <div className="font-sans">
            <p className="font-bold text-slate-900 mb-1">{businessName}</p>
            {address && <p className="text-sm text-slate-600">{address}</p>}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

