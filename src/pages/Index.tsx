import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-header text-white py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Kirim.ke
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Your all-in-one payment profile
          </p>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Create Your Payment Profile</h2>
            <p className="text-lg text-gray-600">
              Share all your payment methods in one simple link. No more juggling between different apps!
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-primary">✓</span>
                <span>Centralized payment information</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">✓</span>
                <span>Direct WhatsApp messaging</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">✓</span>
                <span>Custom profile link</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <RegistrationForm />
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 px-4">
        <div className="container max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2024 Kirim.ke. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;