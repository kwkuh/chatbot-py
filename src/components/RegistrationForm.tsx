import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setIsLoading(true);
    
    // Simulate progress with rocket animation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        console.log("Form submitted:", formData);
        toast.success("Profil berhasil dibuat! Mengalihkan ke halaman pembayaran Anda...");
        navigate(`/${formData.username}`, { 
          state: { 
            profileData: formData 
          } 
        });
      }
    }, 50);
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
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto bg-white p-12 rounded-xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-black text-[#1EAEDB] mb-4">Buat Profil Pembayaran</h3>
        <p className="text-[#403E43] font-bold text-xl">Bagikan semua rekening bank Anda dalam satu link ✨</p>
      </div>

      {isLoading && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-[#1EAEDB]">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="fullName" className="text-[#221F26] font-black text-xl">Nama Lengkap</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="username" className="text-[#221F26] font-black text-xl">Username untuk Link</Label>
          <Input
            id="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
          />
          <p className="text-lg text-[#403E43] font-bold">kirim.ke/{formData.username || 'username'}</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="whatsapp" className="text-[#221F26] font-black text-xl">Nomor WhatsApp</Label>
          <Input
            id="whatsapp"
            placeholder="+62812345678"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
            className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-[#221F26] font-black text-xl">Deskripsi Profil</Label>
          <Input
            id="description"
            placeholder="Selamat datang di halaman pembayaran saya!"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
          />
        </div>

        <div className="space-y-6">
          <Label className="text-[#221F26] font-black text-xl">Rekening Bank</Label>
          {formData.bankAccounts.map((account, index) => (
            <div key={index} className="space-y-4 p-6 border-4 border-[#1EAEDB] rounded-lg bg-white">
              <div className="space-y-3">
                <Label className="text-[#221F26] font-black text-lg">Bank</Label>
                <Select
                  value={account.bank}
                  onValueChange={(value) => updateBankAccount(index, 'bank', value)}
                >
                  <SelectTrigger className="border-4 border-[#1EAEDB] bg-white text-[#221F26] font-bold h-14">
                    <SelectValue placeholder="Pilih Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {["BCA", "Mandiri", "BNI", "BRI", "DANA", "GoPay", "OVO", "ShopeePay"].map((bank) => (
                      <SelectItem key={bank} value={bank} className="font-bold">{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-[#221F26] font-black text-lg">Nomor Rekening</Label>
                <Input
                  placeholder="Masukkan nomor rekening"
                  value={account.accountNumber}
                  onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                  required
                  className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[#221F26] font-black text-lg">Nama Pemilik Rekening</Label>
                <Input
                  placeholder="Nama sesuai rekening"
                  value={account.accountName}
                  onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                  required
                  className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            onClick={addBankAccount}
            variant="outline"
            className="w-full border-4 border-dashed border-[#1EAEDB] hover:border-[#0FA0CE] text-[#1EAEDB] hover:text-[#0FA0CE] font-black text-xl h-14"
          >
            + Tambah Rekening Bank
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-black text-2xl py-8 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-xl disabled:opacity-50"
      >
        {isLoading ? "Membuat Halaman... 🚀" : "Buat Halaman Pembayaran Saya ✨"}
      </Button>
    </form>
  );
};