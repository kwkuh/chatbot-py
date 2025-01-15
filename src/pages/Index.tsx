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
              Your Web3 Payment Profile - Share All Payment Methods with One Simple Link
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-white">Create Your Payment Profile</h2>
              <p className="text-lg text-gray-300">
                Share all your payment methods in one simple link. No registration needed!
              </p>
              <ul className="space-y-4">
                {[
                  "Instant profile generation",
                  "Share multiple payment methods",
                  "Direct WhatsApp messaging",
                  "Custom profile link",
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
              <h3 className="text-xl font-semibold text-white mb-4">How it works</h3>
              <ol className="space-y-4 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">1.</span>
                  <span>Fill out the form with your details</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">2.</span>
                  <span>Get your unique payment profile link</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-400">3.</span>
                  <span>Share your link with anyone who needs to pay you</span>
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
          <p>© 2024 Kirim.ke. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;