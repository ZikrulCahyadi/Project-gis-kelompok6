import { useState } from "react";
import { MapPin, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if credentials match admin account
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      // Redirect to admin dashboard
      window.location.href = "https://pesebaran-masjid.vercel.app";
    } else {
      // Show error message for invalid credentials
      alert("Email atau password salah! Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center p-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card - Horizontal Layout */}
      <div className="relative w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          
          {/* Left Section - Branding */}
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-12 flex flex-col justify-center items-center text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <MapPin className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              SIG Masjid Pekanbaru
            </h1>
            <p className="text-emerald-50 text-lg mb-6">
              Sistem Informasi Geografis
            </p>
            <div className="w-24 h-1 bg-white/30 rounded-full mb-6"></div>
            <p className="text-white/90 text-base max-w-sm leading-relaxed">
              Temukan informasi lengkap tentang masjid-masjid di Kota Pekanbaru. 
              Lokasi, fasilitas, jadwal sholat, dan kegiatan keagamaan dalam satu platform.
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Selamat Datang
              </h2>
              <p className="text-gray-600 text-base">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-14 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Ingat saya</span>
                </label>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Lupa password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl text-base font-semibold hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Masuk</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Belum punya akun?{" "}
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Daftar sekarang
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <button className="text-white hover:text-emerald-100 text-sm font-medium inline-flex items-center space-x-1">
            <span>← Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
}