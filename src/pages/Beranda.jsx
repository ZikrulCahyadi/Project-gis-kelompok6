import { Link } from "react-router-dom";
import { MapPin, Users, Building2, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { masjidService } from "../lib/masjidService";
import StatCard from "../components/StatCard.jsx";
import MosqueCard from "../components/MosqueCard.jsx";

export default function Beranda() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const result = await masjidService.getAllMasjid();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Kalau masih loading
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Kalau ada error
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Gagal memuat data</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const totalMasjid = data.length;
  const totalKapasitas = data.reduce((acc, d) => acc + d.kapasitas, 0);
  const kategori = [...new Set(data.map((d) => d.kategori))];
  const featuredMasjid = data.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-body mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              Sistem Informasi Geografis
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Peta Persebaran Masjid
              <br />
              <span className="text-gold-light">Kota Pekanbaru</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "200ms" }}>
              Temukan informasi lengkap tentang masjid-masjid di Kota Pekanbaru. 
              Lokasi, fasilitas, jadwal sholat, dan kegiatan keagamaan dalam satu platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Link 
                to="/peta"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light text-accent-foreground font-semibold font-body shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Buka Peta Interaktif
              </Link>
              <Link 
                to="/persebaran"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold font-body rounded-lg transition-all"
              >
                Lihat Semua Masjid
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={Building2}
              value={totalMasjid}
              label="Total Masjid"
              gradient
              delay={0}
            />
            <StatCard
              icon={Users}
              value={totalKapasitas.toLocaleString()}
              label="Total Kapasitas Jamaah"
              delay={100}
            />
            <StatCard
              icon={MapPin}
              value={kategori.length}
              label="Kategori Masjid"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Featured Mosques */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Masjid <span className="text-gradient">Unggulan</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Jelajahi masjid-masjid terbesar dan bersejarah di Kota Pekanbaru
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMasjid.map((masjid, index) => (
              <MosqueCard key={masjid.id} masjid={masjid} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/persebaran"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold font-body rounded-lg transition-all"
            >
              Lihat Semua Masjid
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 shadow-glow">
            <MapPin className="w-16 h-16 text-gold mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Jelajahi Peta Interaktif
            </h2>
            <p className="text-primary-foreground/80 font-body text-lg mb-8 max-w-xl mx-auto">
              Lihat persebaran masjid di seluruh Kota Pekanbaru dengan peta interaktif yang mudah digunakan
            </p>
            <Link 
              to="/peta"
              className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light text-accent-foreground font-semibold font-body shadow-lg rounded-lg transition-all"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Buka Peta Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-background font-heading font-semibold">
                SIG Masjid Pekanbaru
              </span>
            </div>
            <p className="text-background/60 font-body text-sm text-center">
              © 2025 Sistem Informasi Geografis Masjid Kota Pekanbaru. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}