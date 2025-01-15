import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { username } = useParams();
  
  // This would normally come from an API/database
  const profile = {
    fullName: "John Doe",
    description: "Selamat datang di halaman pembayaran saya!",
    whatsapp: "+6281234567890",
    bankAccounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "John Doe"
      },
      {
        bank: "GoPay",
        accountNumber: "081234567890",
        accountName: "John Doe"
      }
    ]
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${profile.whatsapp.replace(/\+/g, '')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c1e] to-[#2a2d31] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{profile.fullName}</h1>
          <p className="text-gray-400">{profile.description}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => copyToClipboard(window.location.href, "Link profil berhasil disalin!")}
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Bagikan
          </Button>
          <Button
            onClick={openWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Hubungi via WhatsApp
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Informasi Pembayaran</h2>
          {profile.bankAccounts.map((account, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-white">{account.bank}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(account.accountNumber, "Nomor rekening berhasil disalin!")}
                    className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Salin
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    Nomor Rekening: <span className="text-white">{account.accountNumber}</span>
                  </p>
                  <p className="text-gray-400">
                    Atas Nama: <span className="text-white">{account.accountName}</span>
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