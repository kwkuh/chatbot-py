import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";

const ProfilePage = () => {
  const location = useLocation();
  const { profileData } = location.state || { profileData: null };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1EAEDB]">Profil Pembayaran</h1>
          <p className="text-lg text-gray-600">Berikut adalah detail rekening bank kamu:</p>
        </header>

        <div className="max-w-2xl mx-auto space-y-6">
          {profileData?.bankAccounts.map((account, index) => (
            <div key={index} className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-bold">{account.bank}</h2>
                <p>Nomor Rekening: {account.accountNumber}</p>
                <p>Atas Nama: {account.accountName}</p>
              </Card>
              <WhatsAppShare
                accountName={account.accountName}
                accountNumber={account.accountNumber}
                bankName={account.bank}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
