import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Layers, X } from "lucide-react";
import data from "../data/masjid.json";
import MapComponent from "../components/MapComponent.jsx";

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [selectedMasjid, setSelectedMasjid] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const kategoriList = [...new Set(data.map((d) => d.kategori))];

  const filteredData = data.filter((masjid) => {
    const matchSearch =
      masjid.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      masjid.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = selectedKategori
      ? masjid.kategori === selectedKategori
      : true;
    return matchSearch && matchKategori;
  });

  return (
    <div className="h-[calc(100vh-5rem)] relative flex">
      {/* Sidebar */}
      <div
        className={`absolute lg:relative z-30 h-full bg-card border-r border-border shadow-elegant transition-all duration-300 ${
          showSidebar ? "w-full lg:w-96 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-secondary/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-lg text-foreground">
                Daftar Masjid
              </h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari masjid..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border font-body text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setSelectedKategori(null)}
                className={`px-3 py-1 text-xs font-body rounded-full transition-colors ${
                  selectedKategori === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                Semua
              </button>
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setSelectedKategori(kat)}
                  className={`px-3 py-1 text-xs font-body rounded-full transition-colors ${
                    selectedKategori === kat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <p className="text-xs text-muted-foreground font-body px-2 py-2">
                {filteredData.length} masjid ditemukan
              </p>
              <div className="space-y-2">
                {filteredData.map((masjid) => (
                  <button
                    key={masjid.id}
                    onClick={() => setSelectedMasjid(masjid.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      selectedMasjid === masjid.id
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-secondary/50 hover:bg-secondary border-2 border-transparent"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={masjid.foto}
                        alt={masjid.nama}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-body font-semibold text-foreground text-sm line-clamp-1">
                          {masjid.nama}
                        </h3>
                        <span className="inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs font-body rounded-full mt-1 mb-1">
                          {masjid.kategori}
                        </span>
                        <p className="text-xs text-muted-foreground font-body line-clamp-1">
                          {masjid.alamat}
                        </p>
                      </div>
                    </div>
                    {selectedMasjid === masjid.id && (
                      <Link
                        to={`/persebaran/${masjid.id}`}
                        className="inline-block mt-3 w-full text-center px-3 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-emerald-light transition-colors"
                      >
                        Lihat Detail
                      </Link>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapComponent
          data={filteredData}
          selectedId={selectedMasjid}
        />

        {/* Toggle sidebar button */}
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-card shadow-elegant rounded-xl font-body text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <Layers className="w-4 h-4" />
            Daftar Masjid
          </button>
        )}

        {/* Legend */}
        <div className="absolute bottom-6 right-6 z-20 bg-card/95 backdrop-blur-sm p-4 rounded-xl shadow-elegant border border-border">
          <h3 className="font-body font-semibold text-sm text-foreground mb-2">
            Legenda
          </h3>
          <div className="space-y-2">
            {kategoriList.map((kat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  idx === 0 ? "bg-primary" : idx === 1 ? "bg-teal" : "bg-gold"
                }`} />
                <span className="text-xs font-body text-muted-foreground">
                  {kat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
