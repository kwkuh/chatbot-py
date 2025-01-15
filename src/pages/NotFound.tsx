import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] to-white flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-[#1EAEDB] animate-bounce">404</h1>
          <h2 className="text-2xl font-bold text-[#221F26]">
            Waduh! Profile Tidak Ditemukan 😅
          </h2>
        </div>

        {username && (
          <p className="text-lg text-gray-600">
            Profile <span className="font-bold text-[#1EAEDB]">kirim.ke/{username}</span> tidak tersedia.
          </p>
        )}

        <p className="text-gray-500">
          Kamu akan dialihkan ke halaman utama dalam{" "}
          <span className="font-bold text-[#1EAEDB]">{countdown}</span> detik...
        </p>

        <Button
          onClick={() => navigate("/")}
          className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white"
        >
          <Home className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <p className="text-sm text-gray-400">
          Mau bikin link pembayaran kamu sendiri? Yuk ke{" "}
          <a href="/" className="text-[#1EAEDB] hover:underline font-medium">
            kirim.ke
          </a>
          ! ✨
        </p>
      </div>
    </div>
  );
};

export default NotFound;