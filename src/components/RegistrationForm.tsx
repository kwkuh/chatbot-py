import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
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
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        console.log("Form submitted:", formData);
        toast.success("Profile berhasil dibuat! 🚀 Mengalihkan ke halaman pembayaran kamu...");
        navigate(`/${formData.username}`, { 
          state: { 
            profileData: formData 
          } 
        });
      }
    }, 50);
  };

  const handleKeyPress = (e: React.KeyboardEvent, nextStep: boolean = true) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextStep) {
        setCurrentStep(prev => prev + 1);
      }
    }
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

  const steps = [
    {
      title: "Nama Lengkap",
      message: "Hai! 👋 Siapa nama lengkap kamu?",
      input: (
        <Input
          placeholder="Cth: John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
        />
      )
    },
    {
      title: "Username",
      message: "Nama yang keren! 🌟 Yuk bikin username buat link pembayaran kamu~",
      input: (
        <div className="space-y-2">
          <Input
            placeholder="Cth: johndoe"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e)}
            className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
          />
          <p className="text-lg text-[#403E43] font-bold">kirim.ke/{formData.username || 'username'}</p>
        </div>
      )
    },
    {
      title: "WhatsApp",
      message: "Username yang keren! 💅 Kasih tau nomor WA kamu dong buat konfirmasi pembayaran~",
      input: (
        <Input
          placeholder="Cth: +62812345678"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
        />
      )
    },
    {
      title: "Deskripsi",
      message: "Sip! 🌈 Tulis deskripsi singkat buat halaman pembayaran kamu~",
      input: (
        <Input
          placeholder="Cth: Hai! Welcome to my payment page ✨"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
        />
      )
    },
    {
      title: "Rekening Bank",
      message: "Nah, sekarang bagian penting nih! 🏦 Yuk masukin detail rekening bank kamu~",
      input: (
        <div className="space-y-6">
          {formData.bankAccounts.map((account, index) => (
            <Card key={index} className="p-6 border-4 border-[#1EAEDB] bg-white space-y-4">
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
                  onKeyPress={(e) => handleKeyPress(e, false)}
                  className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[#221F26] font-black text-lg">Nama Pemilik Rekening</Label>
                <Input
                  placeholder="Nama sesuai rekening"
                  value={account.accountName}
                  onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, false)}
                  className="border-4 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-4 focus:ring-[#1EAEDB] font-bold text-lg h-14"
                />
              </div>
            </Card>
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
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-black text-[#1EAEDB] mb-4">Buat Profil Pembayaran</h3>
        <p className="text-[#403E43] font-bold text-xl">Bagikan semua rekening bank kamu dalam satu link ✨</p>
      </div>

      {isLoading ? (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-[#1EAEDB]">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col space-y-6">
            {steps.slice(0, currentStep + 1).map((step, index) => (
              <Card key={index} className={`p-6 glass-effect transform transition-all duration-300 ${index === currentStep ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full tech-gradient flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black text-[#1EAEDB] mb-2">{step.title}</h4>
                      <p className="text-[#403E43] font-bold mb-4">{step.message}</p>
                      {step.input}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                variant="outline"
                className="border-4 border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 font-black text-lg px-8 py-6"
              >
                ← Kembali
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="ml-auto bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-black text-lg px-8 py-6"
              >
                Lanjut →
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-black text-lg px-8 py-6"
              >
                Buat Halaman Payment ✨
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};