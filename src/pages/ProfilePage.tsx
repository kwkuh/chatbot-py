import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Share2, Send } from "lucide-react";
import { toast } from "sonner";

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface ProfileData {
  fullName: string;
  description: string;
  whatsapp: string;
  bankAccounts: BankAccount[];
}

const ProfilePage = () => {
  const { username } = useParams();
  const location = useLocation();
  const profileData = location.state?.profileData as ProfileData;

  console.log("Profile data received:", profileData);

  if (!profileData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p>The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    }).catch(() => {
      toast.error("Gagal menyalin teks. Coba lagi ya!");
    });
  };

  const openWhatsApp = (account: BankAccount) => {
    const message = `Hai kak ${profileData.fullName}! 👋\n\n` +
      `Saya mau konfirmasi untuk pembayaran ke rekening:\n\n` +
      `Bank: ${account.bank}\n` +
      `No. Rekening: ${account.accountNumber}\n` +
      `Atas Nama: ${account.accountName}\n\n` +
      `Mohon konfirmasi apakah data rekening di atas sudah benar ya kak ✨\n` +
      `Saya akan segera kirim bukti transfer setelah melakukan pembayaran 💖\n\n` +
      `Link pembayaran: ${window.location.href}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 relative overflow-hidden">
      {/* 3D Emoji Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-20 text-8xl animate-bounce">💳</div>
        <div className="absolute top-40 right-40 text-8xl animate-pulse">💸</div>
        <div className="absolute bottom-40 left-60 text-8xl animate-bounce delay-300">💎</div>
        <div className="absolute top-60 right-20 text-8xl animate-pulse delay-200">✨</div>
        <div className="absolute bottom-20 right-40 text-8xl animate-bounce delay-100">💫</div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full tech-gradient flex items-center justify-center transform hover:scale-110 transition-all duration-300">
            <span className="text-6xl font-black text-white">
              {profileData.fullName.charAt(0)}
            </span>
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] mb-4 hover:scale-105 transition-transform">
            {profileData.fullName}
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-bold">{profileData.description}</p>
          <div className="inline-block p-2 glass-effect rounded-full transform hover:scale-105 transition-all">
            <p className="text-lg text-gray-600 px-6 py-2 font-bold">✨ @{username} ✨</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 animate-fade-in">
          <Button
            onClick={() => copyToClipboard(window.location.href, "Link profile berhasil dicopy! ✨")}
            variant="outline"
            className="glass-effect border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 transition-all duration-300 font-bold text-lg py-6 px-8"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Link
          </Button>
        </div>

        <div className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-black text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE]">
              Payment Methods ✨
            </span>
          </h2>
          {profileData.bankAccounts.map((account, index) => (
            <Card key={index} className="glass-effect overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border-4 border-[#1EAEDB]">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-black text-white tech-gradient px-6 py-2 rounded-full">
                    {account.bank} 🏦
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(account.accountNumber, "Nomor rekening berhasil dicopy! 🎉")}
                      className="glass-effect border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 font-bold text-lg px-6 py-6"
                    >
                      <Copy className="w-5 h-5 mr-2" />
                      Copy Rekening
                    </Button>
                    <Button
                      onClick={() => openWhatsApp(account)}
                      className="tech-gradient hover:opacity-90 text-white transition-all duration-300 font-bold text-lg px-6 py-6"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Konfirmasi WA
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 font-bold text-lg">
                    Nomor Rekening: <span className="text-[#1EAEDB] font-black text-xl">{account.accountNumber}</span>
                  </p>
                  <p className="text-gray-600 font-bold text-lg">
                    Atas Nama: <span className="text-[#1EAEDB] font-black text-xl">{account.accountName}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-lg text-gray-600 font-bold">
            Made with 💖 by <span className="text-[#1EAEDB] font-black">kirim.ke</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;