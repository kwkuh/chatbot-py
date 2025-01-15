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
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${profileData.whatsapp.replace(/\+/g, '')}`, '_blank');
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
          <div className="w-24 h-24 mx-auto mb-6 rounded-full tech-gradient flex items-center justify-center">
            <span className="text-4xl font-black text-white">
              {profileData.fullName.charAt(0)}
            </span>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] mb-2">
            {profileData.fullName}
          </h1>
          <p className="text-lg text-gray-600 mb-4 font-medium">{profileData.description}</p>
          <div className="inline-block p-1 glass-effect rounded-full">
            <p className="text-sm text-gray-600 px-4 py-1 font-medium">@{username}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 animate-fade-in">
          <Button
            onClick={() => copyToClipboard(window.location.href, "Link profile berhasil dicopy bestie! ✨")}
            variant="outline"
            className="glass-effect border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 transition-all duration-300 font-bold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          <Button
            onClick={openWhatsApp}
            className="tech-gradient hover:opacity-90 text-white transition-all duration-300 font-bold"
          >
            <Send className="w-4 h-4 mr-2" />
            Chat WA
          </Button>
        </div>

        <div className="space-y-4 animate-fade-in">
          <h2 className="text-2xl font-black text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE]">
              Payment Methods ✨
            </span>
          </h2>
          {profileData.bankAccounts.map((account, index) => (
            <Card key={index} className="glass-effect overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-black text-white tech-gradient px-4 py-1 rounded-full">
                    {account.bank}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(account.accountNumber, "Nomor rekening berhasil dicopy bestie! 🎉")}
                    className="glass-effect border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10 font-bold"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">
                    Nomor Rekening: <span className="text-gray-800 font-bold">{account.accountNumber}</span>
                  </p>
                  <p className="text-gray-600 font-medium">
                    Atas Nama: <span className="text-gray-800 font-bold">{account.accountName}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;