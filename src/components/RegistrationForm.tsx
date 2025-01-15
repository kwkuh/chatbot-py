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
    
    navigate(`/${formData.username}`, { 
      state: { 
        profileData: formData 
      } 
    });
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
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-[#1EAEDB] mb-2">Buat Profil Pembayaran</h3>
        <p className="text-[#403E43] font-medium">Bagikan semua rekening bank Anda dalam satu link</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-[#221F26] font-bold">Nama Lengkap</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-[#221F26] font-bold">Username untuk Link</Label>
          <Input
            id="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
          />
          <p className="text-sm text-[#403E43] font-medium">kirim.ke/{formData.username || 'username'}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-[#221F26] font-bold">Nomor WhatsApp</Label>
          <Input
            id="whatsapp"
            placeholder="+62812345678"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
            className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-[#221F26] font-bold">Deskripsi Profil</Label>
          <Input
            id="description"
            placeholder="Selamat datang di halaman pembayaran saya!"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-[#221F26] font-bold">Rekening Bank</Label>
          {formData.bankAccounts.map((account, index) => (
            <div key={index} className="space-y-3 p-4 border-2 border-[#1EAEDB] rounded-lg bg-white">
              <div className="space-y-2">
                <Label className="text-[#221F26] font-bold">Bank</Label>
                <Select
                  value={account.bank}
                  onValueChange={(value) => updateBankAccount(index, 'bank', value)}
                >
                  <SelectTrigger className="border-2 border-[#1EAEDB] bg-white text-[#221F26] font-medium">
                    <SelectValue placeholder="Pilih Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {["BCA", "Mandiri", "BNI", "BRI", "DANA", "GoPay", "OVO", "ShopeePay"].map((bank) => (
                      <SelectItem key={bank} value={bank} className="font-medium">{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#221F26] font-bold">Nomor Rekening</Label>
                <Input
                  placeholder="Masukkan nomor rekening"
                  value={account.accountNumber}
                  onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                  required
                  className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#221F26] font-bold">Nama Pemilik Rekening</Label>
                <Input
                  placeholder="Nama sesuai rekening"
                  value={account.accountName}
                  onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                  required
                  className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium"
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            onClick={addBankAccount}
            variant="outline"
            className="w-full border-2 border-dashed border-[#1EAEDB] hover:border-[#0FA0CE] text-[#1EAEDB] hover:text-[#0FA0CE] font-bold bg-white"
          >
            + Tambah Rekening Bank
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-black text-lg py-6 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg"
      >
        Buat Halaman Pembayaran Saya
      </Button>
    </form>
  );
};