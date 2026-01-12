import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Calendar,
  Users,
  Clock,
  ArrowLeft,
  Building2,
  CheckCircle,
} from "lucide-react";
import { masjidService } from "../lib/masjidService";
import MapComponent from "../components/MapComponent.jsx";

export default function PersebaranDetail() {
  const { id } = useParams();
  const [masjid, setMasjid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMasjid();
  }, [id]);

  async function loadMasjid() {
    try {
      setLoading(true);
      const result = await masjidService.getMasjidById(Number(id));
      setMasjid(result);
    } catch (err) {
      setError(err.message);
      console.error('Error loading masjid:', err);
    } finally {
      setLoading(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data masjid...</p>
        </div>
      </div>
    );
  }

  // Error or not found
  if (error || !masjid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Data tidak ditemukan
          </h1>
          <p className="text-muted-foreground font-body mb-6">
            Masjid yang Anda cari tidak tersedia
          </p>
          <Link 
            to="/persebaran"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-body rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    );
  }

  const jadwalSholat = [
    { nama: "Subuh", waktu: masjid.jadwal_sholat?.subuh || "-" },
    { nama: "Dzuhur", waktu: masjid.jadwal_sholat?.dzuhur || "-" },
    { nama: "Ashar", waktu: masjid.jadwal_sholat?.ashar || "-" },
    { nama: "Maghrib", waktu: masjid.jadwal_sholat?.maghrib || "-" },
    { nama: "Isya", waktu: masjid.jadwal_sholat?.isya || "-" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-80 md:h-96">
        <img
          src={masjid.foto || "https://via.placeholder.com/1200x400?text=Masjid"}
          alt={masjid.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

        {/* Back button */}
        <Link
          to="/persebaran"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-xl text-foreground font-body text-sm hover:bg-card transition-colors shadow-elegant"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        {/* Title */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 bg-gold text-accent-foreground text-xs font-semibold rounded-full font-body mb-3">
              {masjid.kategori}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground animate-fade-up">
              {masjid.nama}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card p-5 rounded-2xl border border-border shadow-elegant animate-fade-up">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Alamat</span>
                  </div>
                  <p className="font-body text-foreground">{masjid.alamat}</p>
                </div>

                <div className="bg-card p-5 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "100ms" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-teal/10 rounded-lg">
                      <Phone className="w-5 h-5 text-teal" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Telepon</span>
                  </div>
                  <p className="font-body text-foreground">{masjid.telp}</p>
                </div>

                <div className="bg-card p-5 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "200ms" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                      <Users className="w-5 h-5 text-gold" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Kapasitas</span>
                  </div>
                  <p className="font-body text-foreground">{masjid.kapasitas?.toLocaleString() || "-"} Jamaah</p>
                </div>

                <div className="bg-card p-5 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "300ms" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-light/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-emerald-light" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">Tahun Berdiri</span>
                  </div>
                  <p className="font-body text-foreground">{masjid.tahun_berdiri || "-"}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card p-6 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "400ms" }}>
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Tentang Masjid
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {masjid.deskripsi || "Tidak ada deskripsi"}
                </p>
              </div>

              {/* Fasilitas */}
              {masjid.fasilitas && masjid.fasilitas.length > 0 && (
                <div className="bg-card p-6 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "500ms" }}>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Fasilitas
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {masjid.fasilitas.map((fas, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full"
                      >
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="font-body text-sm text-foreground">{fas}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jadwal Kegiatan */}
              {masjid.jadwal_kegiatan && masjid.jadwal_kegiatan.length > 0 && (
                <div className="bg-card p-6 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "600ms" }}>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Jadwal Kegiatan
                  </h2>
                  <div className="space-y-3">
                    {masjid.jadwal_kegiatan.map((kegiatan, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                      >
                        <div>
                          <p className="font-body font-semibold text-foreground">
                            {kegiatan.kegiatan}
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            {kegiatan.hari}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-body text-sm font-medium text-primary">
                            {kegiatan.waktu}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Jadwal Sholat */}
              <div className="bg-gradient-primary p-6 rounded-2xl shadow-glow animate-fade-up">
                <h2 className="text-xl font-heading font-bold text-primary-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Jadwal Sholat
                </h2>
                <div className="space-y-3">
                  {jadwalSholat.map((jadwal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-primary-foreground/10 rounded-xl"
                    >
                      <span className="font-body text-primary-foreground/80">
                        {jadwal.nama}
                      </span>
                      <span className="font-body font-bold text-primary-foreground">
                        {jadwal.waktu}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-card p-4 rounded-2xl border border-border shadow-elegant animate-fade-up" style={{ animationDelay: "200ms" }}>
                <h2 className="text-lg font-heading font-bold text-foreground mb-4">
                  Lokasi di Peta
                </h2>
                <div className="h-64 rounded-xl overflow-hidden">
                  <MapComponent
                    data={[masjid]}
                    center={[masjid.lat, masjid.lng]}
                    zoom={16}
                  />
                </div>
              </div>

              {/* Navigation */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${masjid.lat},${masjid.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gold hover:bg-gold-light text-accent-foreground font-body font-semibold rounded-xl transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}