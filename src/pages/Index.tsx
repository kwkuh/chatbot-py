import { RegistrationForm } from "@/components/RegistrationForm";
import { MainMenu } from "@/components/MainMenu";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 3D Emoji Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-20 text-8xl animate-bounce">💸</div>
        <div className="absolute top-40 right-40 text-8xl animate-pulse">💎</div>
        <div className="absolute bottom-40 left-60 text-8xl animate-bounce delay-300">💰</div>
        <div className="absolute top-60 right-20 text-8xl animate-pulse delay-200">✨</div>
        <div className="absolute bottom-20 right-40 text-8xl animate-bounce delay-100">💫</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <MainMenu />
        
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] text-transparent bg-clip-text">
            Kirim.ke
          </h1>
          <div className="flex items-center justify-center space-x-1 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            <span>kirim.ke/</span>
            <span className="text-[#1EAEDB] font-black animate-fade-in" key={currentUsername}>
              {currentUsername}
            </span>
          </div>
          <p className="mt-6 text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Bikin link pembayaran kamu jadi auto kece! 🚀
          </p>
          <p className="mt-2 text-lg text-gray-500">
            Ga perlu ribet share nomor rekening satu-satu, semua ada disini! ✨
          </p>
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
                  "Auto-setup profile kece dalam sekejap! ⚡️",
                  "Share semua payment method sekaligus! 💅",
                  "Chat langsung via WA, gercep banget! 📱",
                  "Username kustom biar makin aesthetic! ✨",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-600 glass-effect p-4 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full tech-gradient text-white">
                      ✓
                    </span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-effect p-6 rounded-lg animate-fade-in">
              <h3 className="text-xl font-black text-[#1EAEDB] mb-6">Caranya Gampang Banget!</h3>
              <ol className="space-y-6 text-gray-600">
                <li className="flex items-start space-x-3">
                  <span className="font-black text-[#1EAEDB]">1.</span>
                  <span className="font-medium">Isi data kamu yang aesthetic abis! ✍️</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-black text-[#1EAEDB]">2.</span>
                  <span className="font-medium">Dapetin link payment keren kamu! 🔥</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-black text-[#1EAEDB]">3.</span>
                  <span className="font-medium">Share ke semua teman kamu! 🚀</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;