import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1c1e] to-[#2a2d31]">
      <header className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 container max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Kirim.ke
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Halaman Pembayaran Web3 Anda - Bagikan Semua Metode Pembayaran dengan Satu Link
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Buat Profil Pembayaran Anda</h2>
              <p className="text-lg text-gray-300">
                Bagikan semua metode pembayaran dalam satu link sederhana. Tanpa perlu registrasi!
              </p>
              <ul className="space-y-4">
                {[
                  "Pembuatan profil instan",
                  "Bagikan berbagai metode pembayaran",
                  "Pesan langsung via WhatsApp",
                  "Link profil kustom",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm animate-fade-in">
              <h3 className="text-xl font-semibold text-white mb-4">Cara Kerja</h3>
              <ol className="space-y-4 text-gray-300">
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

          <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm animate-fade-in shadow-xl">
            <RegistrationForm />
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 Kirim.ke. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;