
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Heart } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { profileData } = location.state || { profileData: null };

  useEffect(() => {
    if (!profileData) {
      navigate(`/not-found?username=${username}`, { replace: true });
    }
  }, [profileData, navigate, username]);

  const copyProfileLink = () => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link berhasil disalin! 📋");
  };

  const shareProfile = async () => {
    try {
      await navigator.share({
        title: `${profileData?.fullName} - Kirim.ke Payment Profile`,
        text: profileData?.description,
        url: `${window.location.origin}/${username}`,
      });
    } catch (err) {
      console.log("Share failed:", err);
      copyProfileLink();
    }
  };

  const funDescriptions = [
    "Link pembayaran yang simpel! 🔗",
    "Semua rekening dalam satu link 💫",
    "Bagikan link, terima pembayaran! ⚡️",
    "Praktis tanpa ribet 🎯",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Profile Header with Updated Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#1EAEDB] flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-white">
                {profileData?.username?.charAt(0).toUpperCase() || "K"}
              </span>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-bold text-[#1EAEDB]">
                kirim.ke/{profileData?.username || 'kukuh'}
              </h2>
            </div>
          </div>

          <h1 className="text-4xl font-black text-[#221F26] mb-3 hover:text-[#1EAEDB] transition-colors">
            {profileData?.fullName || 'Kukuh'}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className="text-sm px-3 py-1 border-[#1EAEDB] text-[#1EAEDB] animate-pulse"
            >
              Personal
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-[#1EAEDB] hover:bg-[#1EAEDB]/10"
              onClick={copyProfileLink}
            >
              <Copy className="h-4 w-4 mr-1" />
              Salin
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-[#1EAEDB] hover:bg-[#1EAEDB]/10"
              onClick={shareProfile}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Bagikan
            </Button>
          </div>

          <p className="text-[#403E43] text-lg max-w-xl mx-auto mb-6">
            {profileData?.description || 'Hai! Welcome to my payment page ✨'}
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {funDescriptions.map((desc, index) => (
              <p
                key={index}
                className="text-sm text-[#403E43] bg-white/70 px-4 py-2 rounded-full shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {desc}
              </p>
            ))}
          </div>
        </div>

        {/* Bank Accounts Section - Improved Responsiveness */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#221F26] flex items-center justify-center gap-2">
              Detail Rekening
              <span className="animate-bounce">💳</span>
            </h2>
            <p className="text-[#403E43] mt-2">
              Pilih rekening untuk transfer pembayaran
            </p>
          </div>
          
          <div className="space-y-4">
            {profileData?.bankAccounts.map((account, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur border-2 border-[#1EAEDB]/10 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white px-3 py-1 text-lg">
                      {account.bank}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-[#403E43] font-medium">
                      Nomor Rekening
                    </p>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <p className="text-xl font-bold text-[#221F26] font-mono tracking-wider">
                        {account.accountNumber}
                      </p>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="ml-2 border-[#1EAEDB] text-[#1EAEDB] hover:bg-[#1EAEDB]/10"
                        onClick={() => {
                          navigator.clipboard.writeText(account.accountNumber);
                          toast.success("Nomor rekening berhasil disalin! 📋");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-[#403E43] font-medium">
                      Atas Nama
                    </p>
                    <p className="text-xl font-bold text-[#221F26] bg-gray-50 p-3 rounded-lg">
                      {account.accountName}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* WhatsApp Share Section */}
        <div className="mt-16 max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#221F26]">Konfirmasi Pembayaran</h3>
            <p className="text-[#403E43] mt-2">
              Kirim bukti pembayaran langsung ke WhatsApp dengan mudah ✨
            </p>
          </div>
          <WhatsAppShare
            accountName={profileData?.bankAccounts[0]?.accountName || ''}
            accountNumber={profileData?.bankAccounts[0]?.accountNumber || ''}
            bankName={profileData?.bankAccounts[0]?.bank || ''}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-[#403E43]">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Kirim.ke
          </p>
          <p className="mt-2">Satu link untuk semua rekening kamu ✨</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
