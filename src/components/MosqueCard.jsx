import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, ChevronRight } from "lucide-react";

export default function MasjidCard({ masjid, index = 0 }) {
    console.log("Data masjid:", masjid);
  return (
    <Link
      to={`/persebaran/${masjid.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={masjid.foto}
            alt={masjid.nama}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-accent-foreground text-xs font-semibold rounded-full font-body">
            {masjid.kategori}
          </span>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-primary-foreground font-heading font-bold text-lg line-clamp-1">
              {masjid.nama}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-4">
            {masjid.deskripsi}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body line-clamp-1">{masjid.alamat}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal" />
                <span className="font-body">{masjid.kapasitas.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                  <span className="font-body">{masjid.tahun_berdiri}</span>
                
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-primary font-semibold text-sm font-body group-hover:text-emerald-light transition-colors">
              Lihat Detail
            </span>
            <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
