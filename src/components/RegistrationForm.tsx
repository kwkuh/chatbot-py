import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    whatsapp: "",
    description: "",
    bankAccounts: [
      {
        bank: "BCA",
        accountNumber: "",
        accountName: "",
      }
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast.success("Profil berhasil dibuat! Mengalihkan ke halaman pembayaran Anda...");
    
    setTimeout(() => {
      navigate(`/${formData.username}`);
    }, 1500);
  };

  const addBankAccount = () => {
    setFormData({
      ...formData,
      bankAccounts: [...formData.bankAccounts, { bank: "BCA", accountNumber: "", accountName: "" }]
    });
  };

  const updateBankAccount = (index: number, field: string, value: string) => {
    const newBankAccounts = [...formData.bankAccounts];
    newBankAccounts[index] = { ...newBankAccounts[index], [field]: value };
    setFormData({ ...formData, bankAccounts: newBankAccounts });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Buat Profil Pembayaran</h3>
        <p className="text-gray-400">Bagikan semua rekening bank Anda dalam satu link</p>
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
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-300">Username untuk Link</Label>
          <Input
            id="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
          <p className="text-sm text-gray-400">kirim.ke/{formData.username || 'username'}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-gray-300">Nomor WhatsApp</Label>
          <Input
            id="whatsapp"
            placeholder="+62812345678"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">Deskripsi Profil</Label>
          <Input
            id="description"
            placeholder="Selamat datang di halaman pembayaran saya!"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-gray-300">Rekening Bank</Label>
          {formData.bankAccounts.map((account, index) => (
            <div key={index} className="space-y-3 p-4 border border-gray-700 rounded-lg">
              <div className="space-y-2">
                <Label className="text-gray-300">Bank</Label>
                <Select
                  value={account.bank}
                  onValueChange={(value) => updateBankAccount(index, 'bank', value)}
                >
                  <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                    <SelectValue placeholder="Pilih Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {["BCA", "Mandiri", "BNI", "BRI", "DANA", "GoPay", "OVO", "ShopeePay"].map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Nomor Rekening</Label>
                <Input
                  placeholder="Masukkan nomor rekening"
                  value={account.accountNumber}
                  onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Nama Pemilik Rekening</Label>
                <Input
                  placeholder="Nama sesuai rekening"
                  value={account.accountName}
                  onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            onClick={addBankAccount}
            variant="outline"
            className="w-full border-dashed border-gray-700 hover:border-gray-500 text-gray-400"
          >
            + Tambah Rekening Bank
          </Button>
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