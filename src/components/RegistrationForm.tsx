import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    whatsapp: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Profil berhasil dibuat! Mengalihkan ke halaman pembayaran Anda...");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Buat Profil Anda</h3>
        <p className="text-gray-400">Dapatkan profil pembayaran dalam hitungan detik</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-300">Nama Lengkap</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-300">Username</Label>
          <Input
            id="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-gray-300">Nomor WhatsApp</Label>
          <Input
            id="whatsapp"
            placeholder="+62812345678"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">Deskripsi</Label>
          <Input
            id="description"
            placeholder="Selamat datang di halaman pembayaran saya!"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02]"
      >
        Buat Halaman Pembayaran Saya
      </Button>
    </form>
  );
};