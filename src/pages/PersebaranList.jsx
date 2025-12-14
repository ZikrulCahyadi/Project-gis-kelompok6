import { useState, useMemo } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import data from "../data/masjid.json";
import MosqueCard from "../components/MosqueCard.jsx";

export default function PersebaranList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);

  const kategoriList = useMemo(() => {
    return [...new Set(data.map((d) => d.kategori))];
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((masjid) => {
      const matchSearch =
        masjid.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        masjid.alamat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchKategori = selectedKategori
        ? masjid.kategori === selectedKategori
        : true;
      return matchSearch && matchKategori;
    });
  }, [searchQuery, selectedKategori]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4 animate-fade-up">
              Daftar Masjid
            </h1>
            <p className="text-primary-foreground/80 font-body max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
              Temukan informasi lengkap tentang {data.length} masjid di Kota Pekanbaru
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary/30 sticky top-20 z-40 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari nama atau alamat masjid..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border font-body rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <button
                onClick={() => setSelectedKategori(null)}
                className={`px-4 py-2 text-sm font-body rounded-xl transition-colors ${
                  selectedKategori === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Semua
              </button>
              {kategoriList.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setSelectedKategori(kat)}
                  className={`px-4 py-2 text-sm font-body rounded-xl transition-colors ${
                    selectedKategori === kat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="flex items-center gap-2 mb-8">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-body text-muted-foreground">
              Menampilkan <span className="text-foreground font-semibold">{filteredData.length}</span> masjid
            </span>
          </div>

          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((masjid, index) => (
                <MosqueCard key={masjid.id} masjid={masjid} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-muted-foreground font-body">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
