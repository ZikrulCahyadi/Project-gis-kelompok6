import { Link } from "react-router-dom";
import { Home, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow animate-float">
            <MapPin className="w-16 h-16 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-heading font-bold text-gradient mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
          Maaf, halaman yang Anda cari tidak tersedia. Silakan kembali ke beranda atau gunakan navigasi untuk menemukan yang Anda butuhkan.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground font-body font-semibold rounded-xl shadow-glow hover:shadow-lg transition-all"
        >
          <Home className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
