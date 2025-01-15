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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] text-transparent bg-clip-text">
            Kirim.ke
          </h1>
          <div className="flex items-center justify-center space-x-1 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            <span>kirim.ke/</span>
            <span className="text-[#1EAEDB] font-semibold animate-fade-in" key={currentUsername}>
              {currentUsername}
            </span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full max-w-2xl mb-20">
            <div className="glass-effect p-8 rounded-2xl shadow-xl animate-fade-in">
              <RegistrationForm />
            </div>
          </div>

          <div className="w-full max-w-3xl space-y-16">
            <div className="space-y-6 animate-fade-in">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Pembuatan profil instan",
                  "Bagikan berbagai metode pembayaran",
                  "Pesan langsung via WhatsApp",
                  "Link profil kustom",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-600 glass-effect p-4 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full tech-gradient text-white">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-effect p-6 rounded-lg animate-fade-in">
              <h3 className="text-xl font-semibold text-[#1EAEDB] mb-6">Cara Kerja</h3>
              <ol className="space-y-6 text-gray-600">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-[#1EAEDB]">1.</span>
                  <span>Isi formulir dengan data Anda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-[#1EAEDB]">2.</span>
                  <span>Dapatkan link profil pembayaran unik Anda</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-[#1EAEDB]">3.</span>
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