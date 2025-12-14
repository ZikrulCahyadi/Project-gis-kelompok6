import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom mosque icon
const mosqueIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2642/2642335.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({
  data,
  center = [0.5071, 101.4478],
  zoom = 13,
  selectedId = null,
}) {
  const mapCenter = selectedId
    ? [
        data.find((m) => m.id === selectedId)?.lat ?? center[0],
        data.find((m) => m.id === selectedId)?.lng ?? center[1],
      ]
    : center;

  const mapZoom = selectedId ? 16 : zoom;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      className="w-full h-full rounded-2xl shadow-elegant z-0"
      scrollWheelZoom={true}
    >
      <MapUpdater center={mapCenter} zoom={mapZoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={mosqueIcon}
        >
          <Popup>
            <div className="min-w-[200px]">
              <img
                src={item.foto}
                alt={item.nama}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <h3 className="font-heading font-bold text-foreground text-base mb-1">
                {item.nama}
              </h3>
              <p className="text-xs text-muted-foreground mb-1">{item.kategori}</p>
              <p className="text-xs text-muted-foreground mb-2">{item.alamat}</p>
              <Link
                to={`/persebaran/${item.id}`}
                className="inline-block w-full text-center px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-emerald-light transition-colors"
              >
                Lihat Detail
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
