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
      <div className="min-h-screen bg-gradient-to-br from-[#1a1c1e] to-[#2a2d31] flex items-center justify-center">
        <div className="text-center text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {profileData.fullName.charAt(0)}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-2">
            {profileData.fullName}
          </h1>
          <p className="text-lg text-gray-300 mb-4">{profileData.description}</p>
          <div className="inline-block p-1 bg-white/10 backdrop-blur-lg rounded-full">
            <p className="text-sm text-gray-300 px-4 py-1">@{username}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button
            onClick={() => copyToClipboard(window.location.href, "Link profil berhasil disalin!")}
            variant="outline"
            className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
          <Button
            onClick={openWhatsApp}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Hubungi via WhatsApp
          </Button>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              Informasi Pembayaran
            </span>
          </h2>
          {profileData.bankAccounts.map((account, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-1 rounded-full">
                    {account.bank}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(account.accountNumber, "Nomor rekening berhasil disalin!")}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Salin
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    Nomor Rekening: <span className="text-white font-medium">{account.accountNumber}</span>
                  </p>
                  <p className="text-gray-300">
                    Atas Nama: <span className="text-white font-medium">{account.accountName}</span>
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