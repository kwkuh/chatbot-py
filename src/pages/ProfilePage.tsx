import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const location = useLocation();
  const { profileData } = location.state || { profileData: null };

  console.log("Profile Data:", profileData);

  const copyProfileLink = () => {
    const url = `${window.location.origin}/kirim.ke/${profileData?.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link berhasil disalin!");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white font-black">
                {profileData?.fullName?.charAt(0) || "?"}
              </span>
            </div>
            <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2">
              <Badge variant="secondary" className="text-sm px-3 py-1 shadow-sm">
                {profileData?.type === "business" ? "Business" : "Personal"}
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl font-black text-[#221F26] mb-3">
            {profileData?.fullName}
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge 
              variant="outline" 
              className="text-sm px-3 py-1 border-[#1EAEDB] text-[#1EAEDB]"
            >
              kirim.ke/{profileData?.username}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-[#1EAEDB]"
              onClick={copyProfileLink}
            >
              <Copy className="h-4 w-4 mr-1" />
              Salin
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-[#1EAEDB]"
              onClick={shareProfile}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Bagikan
            </Button>
          </div>

          <p className="text-[#403E43] text-lg max-w-2xl mx-auto mb-6">
            {profileData?.description}
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {profileData?.tags?.map((tag: string, index: number) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-white/50 text-[#403E43]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bank Accounts Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-[#221F26] text-center mb-8">
            Metode Pembayaran
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
        <div className="mt-12 space-y-6">
          <div className="text-center">
            <p className="text-[#403E43]">
              WhatsApp untuk konfirmasi:{" "}
              <span className="font-bold text-[#221F26]">
                {profileData?.whatsapp}
              </span>
            </p>
          </div>

          {profileData?.businessHours && (
            <Card className="p-6 bg-white/80 backdrop-blur max-w-md mx-auto">
              <h3 className="font-bold text-[#221F26] mb-4">Jam Operasional</h3>
              <div className="space-y-2 text-[#403E43]">
                {profileData.businessHours.map((hours: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{hours.day}</span>
                    <span>{hours.hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;