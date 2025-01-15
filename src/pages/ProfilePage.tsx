import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/WhatsAppShare";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Heart } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const [profileData, setProfileData] = useState(location.state?.profileData || null);

  useEffect(() => {
    if (!profileData && username) {
      // Try to get profile data from localStorage
      const storedProfile = localStorage.getItem(`profile_${username}`);
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      } else {
        navigate(`/not-found?username=${username}`, { replace: true });
      }
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
    }
  };

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      <Card className="max-w-2xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">{profileData.fullName}</h1>
        <p className="text-center mb-4">{profileData.description}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={copyProfileLink} variant="outline" className="flex items-center">
            <Copy className="mr-2" /> Salin Link
          </Button>
          <Button onClick={shareProfile} variant="outline" className="flex items-center">
            <Share2 className="mr-2" /> Bagikan
          </Button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Rekening Bank:</h2>
          <ul className="mt-2">
            {profileData.bankAccounts.map((account, index) => (
              <li key={index} className="border-b py-2">
                <span className="font-bold">{account.bank}</span>: {account.accountNumber} ({account.accountName})
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Badge variant="outline" className="text-center">
            Username: {username}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
