import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const location = useLocation();
  const { profileData } = location.state || { profileData: null };

  console.log("Profile Data:", profileData); // Debug log

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#1EAEDB] to-[#0FA0CE] flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {profileData?.fullName?.charAt(0) || "?"}
            </span>
          </div>
          <h1 className="text-4xl font-black text-[#221F26] mb-2">
            {profileData?.fullName}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              kirim.ke/{profileData?.username}
            </Badge>
          </div>
          <p className="text-[#403E43] text-lg max-w-2xl mx-auto">
            {profileData?.description}
          </p>
        </div>

        {/* Bank Accounts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#221F26] text-center mb-8">
            Rekening Bank
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {profileData?.bankAccounts.map((account, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur border-2 border-[#1EAEDB]/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white px-3 py-1">
                        {account.bank}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-[#403E43] font-medium">Nomor Rekening</p>
                      <p className="text-lg font-bold text-[#221F26] font-mono">
                        {account.accountNumber}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-[#403E43] font-medium">Atas Nama</p>
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

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-[#403E43]">
            WhatsApp untuk konfirmasi:{" "}
            <span className="font-bold text-[#221F26]">{profileData?.whatsapp}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;