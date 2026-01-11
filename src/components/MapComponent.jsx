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
  iconUrl: "https://cdn-icons-png.flaticon.com/512/10073/10073969.png",
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
          <Popup maxWidth={260}>
            <div className="min-w-[240px]">
              {/* Foto */}
              <div className="relative mb-3">
                <img
                  src={item.foto || "https://via.placeholder.com/260x120?text=Masjid"}
                  alt={item.nama}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow">
                  {item.kategori}
                </span>
              </div>

              {/* Nama */}
              <h3 className="font-bold text-gray-800 text-base mb-2 leading-tight">
                {item.nama}
              </h3>

              {/* Info */}
              <div className="space-y-2 text-xs text-gray-600 mb-3">
                {/* Alamat */}
                <div className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="leading-snug">{item.alamat}</span>
                </div>

                {/* Telepon */}
                {item.telp && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{item.telp}</span>
                  </div>
                )}

                {/* Kapasitas & Tahun */}
                <div className="flex items-center gap-3">
                  {item.kapasitas && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="font-medium">{item.kapasitas} Jamaah</span>
                    </div>
                  )}
                  
                  {item.tahun_berdiri && (
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{item.tahun_berdiri}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fasilitas */}
              {item.fasilitas && item.fasilitas.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {item.fasilitas.slice(0, 3).map((fas, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-full border border-blue-200"
                      >
                        {fas}
                      </span>
                    ))}
                    {item.fasilitas.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full">
                        +{item.fasilitas.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Button */}
              <Link
                to={`/persebaran/${item.id}`}
                className="block w-full text-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold rounded-lg transition-colors shadow-sm"
                style={{ color: '#ffffff' }}
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