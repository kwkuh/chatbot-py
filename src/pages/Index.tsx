import { RegistrationForm } from "@/components/RegistrationForm";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentUsername, setCurrentUsername] = useState("anton");
  const usernames = ["anton", "kukuh", "siapaaja", "budi", "diana"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUsername((current) => {
        const currentIndex = usernames.indexOf(current);
        return usernames[(currentIndex + 1) % usernames.length];
      });
    }, 2000); // Change username every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c1e] to-[#2a2d31]">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Kirim.ke
          </h1>
          <div className="flex items-center justify-center space-x-1 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            <span>kirim.ke/</span>
            <span className="text-blue-400 font-semibold animate-fade-in" key={currentUsername}>
              {currentUsername}
            </span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Form Section */}
          <div className="w-full max-w-2xl mb-20">
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm animate-fade-in shadow-xl">
              <RegistrationForm />
            </div>
          </div>

          {/* Features and Instructions */}
          <div className="w-full max-w-3xl space-y-16">
            {/* Features */}
            <div className="space-y-6 animate-fade-in">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Pembuatan profil instan",
                  "Bagikan berbagai metode pembayaran",
                  "Pesan langsung via WhatsApp",
                  "Link profil kustom",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300 bg-gray-800/20 p-4 rounded-lg backdrop-blur-sm">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it Works */}
            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/20 backdrop-blur-sm animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-6">Cara Kerja</h3>
              <ol className="space-y-6 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">1.</span>
                  <span>Isi formulir dengan data Anda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">2.</span>
                  <span>Dapatkan link profil pembayaran unik Anda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">3.</span>
                  <span>Bagikan link Anda kepada siapa saja yang ingin membayar</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;