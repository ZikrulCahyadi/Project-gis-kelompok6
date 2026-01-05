import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MapPin, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Beranda" },
    { path: "/persebaran", label: "Daftar Masjid" },
    { path: "/peta", label: "Peta Interaktif" }
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full">
              <MapPin className="text-white w-6 h-6" />
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
                className={`px-4 py-2 rounded-lg font-medium transition ${isActive(link.path)
                    ? "bg-white text-emerald-600 shadow"
                    : "text-white hover:bg-white/20"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Login Button - Desktop */}
            <Link
              to="/login"
              className="ml-4 px-5 py-2 bg-white text-emerald-600 rounded-lg font-medium shadow-lg hover:bg-emerald-50 transition flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
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
              className={`block px-4 py-2 rounded-lg font-medium ${isActive(link.path)
                  ? "bg-white text-emerald-600"
                  : "text-white hover:bg-white/20"
                }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Login Button - Mobile */}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium shadow"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>
      )}
    </nav>
  );
}