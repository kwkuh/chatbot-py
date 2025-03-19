
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { BankAccountForm } from "./BankAccountForm";
import { Textarea } from "@/components/ui/textarea";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const loadingRef = useRef<HTMLDivElement>(null);
  
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

  // Check localStorage for saved username during initialization
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedProfileData = localStorage.getItem("profileData");
    
    if (savedUsername && savedProfileData) {
      try {
        const parsedData = JSON.parse(savedProfileData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved profile data", error);
      }
    }
  }, []);

  const checkUsername = async (username: string) => {
    // Simulate API call to check username availability
    const takenUsernames = ["kukuh", "admin", "test", "demo"];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(!takenUsernames.includes(username.toLowerCase()));
      }, 500);
    });
  };

  const handleUsernameChange = async (value: string) => {
    setFormData({ ...formData, username: value });
    
    if (value.length < 5) {
      setUsernameError("Username minimal 5 karakter. Untuk username premium hubungi team@kirim.ke 💎");
      return;
    }

    setUsernameError("Mengecek ketersediaan username... 🔍");
    const isAvailable = await checkUsername(value);
    
    if (!isAvailable) {
      setUsernameError("Username sudah digunakan 😔");
    } else {
      setUsernameError("Username tersedia! 🎯");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsTyping(true);
    
    // Scroll to loading indicator
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    setTimeout(() => {
      setIsTyping(false);
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          console.log("Form submitted:", formData);
          
          // Save data to localStorage for persistence
          localStorage.setItem("username", formData.username);
          localStorage.setItem("profileData", JSON.stringify(formData));
          
          toast.success("Profile berhasil dibuat! 🎯 Mengalihkan ke halaman pembayaran kamu...");
          navigate(`/${formData.username}`, { 
            state: { 
              profileData: formData 
            } 
          });
        }
      }, 50);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, nextStep: boolean = true) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextStep) {
        // Only proceed if username is valid when on username step
        if (currentStep === 1 && (formData.username.length < 5 || usernameError.includes("digunakan"))) {
          toast.error("Username tidak valid atau sudah digunakan!");
          return;
        }
        setCurrentStep(prev => prev + 1);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
      }
    }
  };

  const steps = [
    {
      title: "Nama Lengkap",
      message: "Hai! 🎯 Siapa nama lengkap kamu?",
      input: (
        <Input
          placeholder="Nama lengkap kamu"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="bg-transparent border-none shadow-none text-[#221F26] placeholder:text-gray-400 focus:ring-0 font-medium text-lg"
        />
      )
    },
    {
      title: "Username",
      message: "Nama yang keren! 🎯 Yuk bikin username buat link pembayaran kamu~",
      input: (
        <div className="space-y-2">
          <Input
            placeholder="Cth: kukuh"
            value={formData.username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            className="bg-transparent border-none shadow-none text-[#221F26] placeholder:text-gray-400 focus:ring-0 font-medium text-lg"
          />
          <div className="flex items-center space-x-2">
            <p className="text-lg text-[#403E43] font-bold">kirim.ke/{formData.username || 'kukuh'}</p>
            {usernameError && (
              <span className={`text-sm ${
                usernameError.includes("tersedia") ? "text-green-600" : "text-red-500"
              }`}>
                {usernameError}
              </span>
            )}
          </div>
        </div>
      )
    },
    {
      title: "WhatsApp",
      message: "Username yang keren! 🎯 Kasih tau nomor WA kamu dong buat konfirmasi pembayaran~",
      input: (
        <Input
          placeholder="Cth: +62812345678"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium text-lg h-12 max-w-md"
        />
      )
    },
    {
      title: "Deskripsi",
      message: "Sip! 🎯 Tulis deskripsi singkat buat halaman pembayaran kamu~",
      input: (
        <Textarea
          placeholder="Cth: Hai! Welcome to my payment page 🎯"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          onKeyPress={(e) => handleKeyPress(e)}
          className="border-2 border-[#1EAEDB] bg-white text-[#221F26] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1EAEDB] font-medium min-h-[80px] max-w-md"
        />
      )
    },
    {
      title: "Rekening Bank",
      message: "Nah, sekarang bagian penting nih! 🏦 Yuk masukin detail rekening bank kamu~",
      input: (
        <BankAccountForm 
          accounts={formData.bankAccounts}
          onChange={(accounts) => setFormData({...formData, bankAccounts: accounts})}
        />
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-black text-[#1EAEDB] mb-4 [text-shadow:_2px_2px_0_rgb(0_0_0_/_20%)]">
          Buat Profil Pembayaran
        </h3>
        <p className="text-[#403E43] font-bold text-xl">
          Bagikan semua rekening bank kamu dalam satu link 🎯
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 mb-8" ref={loadingRef}>
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
              <div key={index} className={`transform transition-all duration-300 ${index === currentStep ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1EAEDB] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#F0F7FF] rounded-2xl p-4 inline-block max-w-[80%]">
                      <p className="text-[#403E43] font-medium">{step.message}</p>
                      {isTyping && index === currentStep && (
                        <div className="flex space-x-2 mt-2">
                          <div className="w-2 h-2 bg-[#1EAEDB] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#1EAEDB] rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-[#1EAEDB] rounded-full animate-bounce delay-200"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {(formData[step.title.toLowerCase().replace(' ', '') as keyof typeof formData] || index === currentStep) && (
                  <div className="flex items-start space-x-4 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-white rounded-2xl p-4 inline-block max-w-[80%] shadow-sm">
                        {step.input}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#1EAEDB] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">👤</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                variant="outline"
                className="border-2 border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 font-bold text-lg px-6 h-12"
              >
                ← Kembali
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => {
                  // Check username validity before proceeding
                  if (currentStep === 1 && (formData.username.length < 5 || usernameError.includes("digunakan"))) {
                    toast.error("Username tidak valid atau sudah digunakan!");
                    return;
                  }
                  setCurrentStep(prev => prev + 1);
                  setIsTyping(true);
                  setTimeout(() => setIsTyping(false), 1000);
                }}
                className="ml-auto bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-bold text-lg px-6 h-12"
              >
                Lanjut →
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white font-bold text-lg px-6 h-12"
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
