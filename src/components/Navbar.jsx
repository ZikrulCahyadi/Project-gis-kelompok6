import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "🏠 Beranda" },
    { path: "/persebaran", label: "📋 Daftar Masjid" },
    { path: "/peta", label: "🗺️ Peta Interaktif" }
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                SIG Masjid Pekanbaru
              </h1>
              <p className="text-xs text-emerald-100">
                Sistem Informasi Geografis
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.path)
                    ? "bg-white text-emerald-600 shadow"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-600 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive(link.path)
                  ? "bg-white text-emerald-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
