import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Heart, Verified } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const location = useLocation();
  const { profileData } = location.state || { profileData: null };

  console.log("Profile Data:", profileData);

  const copyProfileLink = () => {
    const url = `${window.location.origin}/kirim.ke/${profileData?.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link berhasil disalin! 📋");
  };

  const shareProfile = async () => {
    try {
      await navigator.share({
        title: `${profileData?.fullName} - Kirim.ke Payment Profile`,
        text: profileData?.description,
        url: window.location.href,
      });
    } catch (err) {
      console.log("Share failed:", err);
      copyProfileLink();
    }
  };

  const funDescriptions = [
    "Pembayaran jadi lebih seru! 🎉",
    "Transfer gampang, hidup senang 💫",
    "Bayar apa aja, kapan aja! ⚡️",
    "Simple, aman, terpercaya 🔒",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-4xl text-white font-black">
                {profileData?.fullName?.charAt(0) || "?"}
              </span>
            </div>
            <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2">
              <Badge 
                variant="secondary" 
                className="text-sm px-3 py-1 shadow-sm animate-bounce"
              >
                {profileData?.type === "business" ? (
                  <div className="flex items-center gap-1">
                    Business <Verified className="w-4 h-4 text-[#1EAEDB]" />
                  </div>
                ) : "Personal"}
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl font-black text-[#221F26] mb-3 hover:text-[#1EAEDB] transition-colors">
            {profileData?.fullName}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className="text-sm px-3 py-1 border-[#1EAEDB] text-[#1EAEDB] animate-pulse"
            >
              kirim.ke/{profileData?.username}
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

          <p className="text-[#403E43] text-lg max-w-2xl mx-auto mb-6">
            {profileData?.description}
          </p>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {profileData?.tags?.map((tag: string, index: number) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-white/50 text-[#403E43] hover:bg-[#1EAEDB]/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-center gap-3 flex-wrap mb-8">
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

        {/* Bank Accounts Section */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#221F26] text-center mb-8 flex items-center justify-center gap-2">
            Metode Pembayaran
            <span className="animate-bounce">💳</span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {profileData?.bankAccounts.map((account, index) => (
              <div 
                key={index} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur border-2 border-[#1EAEDB]/10 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge 
                        className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white px-3 py-1"
                      >
                        {account.bank}
                      </Badge>
                      {account.verified && (
                        <Badge variant="outline" className="border-green-500 text-green-500">
                          Terverifikasi
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-[#403E43] font-medium">
                        Nomor Rekening
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-[#221F26] font-mono">
                          {account.accountNumber}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-[#1EAEDB] opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            navigator.clipboard.writeText(account.accountNumber);
                            toast.success("Nomor rekening berhasil disalin!");
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-[#403E43] font-medium">
                        Atas Nama
                      </p>
                      <p className="text-lg font-bold text-[#221F26]">
                        {account.accountName}
                      </p>
                    </div>

                    <WhatsAppShare
                      accountName={account.accountName}
                      accountNumber={account.accountNumber}
                      bankName={account.bank}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Business Hours Section */}
        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-[#403E43] mb-2">
              WhatsApp untuk konfirmasi:{" "}
              <span className="font-bold text-[#221F26]">
                {profileData?.whatsapp} 📱
              </span>
            </p>
            <p className="text-sm text-[#403E43]">
              (Nomor ini berbeda dengan builder WhatsApp di atas)
            </p>
          </div>

          {profileData?.businessHours && (
            <Card className="p-6 bg-white/80 backdrop-blur max-w-md mx-auto">
              <h3 className="font-bold text-[#221F26] mb-4 flex items-center gap-2">
                Jam Operasional <span className="animate-pulse">⏰</span>
              </h3>
              <div className="space-y-2 text-[#403E43]">
                {profileData.businessHours.map((hours: any, index: number) => (
                  <div key={index} className="flex justify-between hover:bg-[#1EAEDB]/5 p-2 rounded-md transition-colors">
                    <span>{hours.day}</span>
                    <span>{hours.hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-[#403E43] animate-fade-in">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Kirim.ke
          </p>
          <p className="mt-2">Simplifying payments, one transfer at a time ✨</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;