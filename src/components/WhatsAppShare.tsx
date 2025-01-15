import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Send } from "lucide-react";

interface WhatsAppShareProps {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export const WhatsAppShare = ({ accountName, accountNumber, bankName }: WhatsAppShareProps) => {
  const [whatsappNumbers, setWhatsappNumbers] = useState<string[]>(['']);
  const [amount, setAmount] = useState('');

  const handleAddNumber = () => {
    setWhatsappNumbers([...whatsappNumbers, '']);
  };

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...whatsappNumbers];
    newNumbers[index] = value;
    setWhatsappNumbers(newNumbers);
  };

  const generateMessage = () => {
    return `Halo! Saya ingin melakukan pembayaran sebesar Rp${amount} ke rekening berikut:%0a%0aBank: ${bankName}%0aNomor Rekening: ${accountNumber}%0aAtas Nama: ${accountName}%0a%0aTerima kasih! 🙏`;
  };

  const handleShare = (number: string) => {
    if (!amount) {
      toast.error("Masukkan jumlah pembayaran terlebih dahulu!");
      return;
    }

    const formattedNumber = number.startsWith('0') ? `62${number.slice(1)}` : number;
    const message = generateMessage();
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-bold text-[#1EAEDB]">Share via WhatsApp</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Jumlah Pembayaran</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Masukkan jumlah pembayaran"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 border-[#1EAEDB] focus:ring-[#1EAEDB]"
          />
        </div>

        {whatsappNumbers.map((number, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`whatsapp-${index}`}>Nomor WhatsApp {index + 1}</Label>
              <Input
                id={`whatsapp-${index}`}
                placeholder="Contoh: 081234567890"
                value={number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className="border-2 border-[#1EAEDB] focus:ring-[#1EAEDB]"
              />
            </div>
            <Button
              type="button"
              onClick={() => handleShare(number)}
              className="mt-8 bg-[#1EAEDB] hover:bg-[#0FA0CE]"
              disabled={!number || !amount}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddNumber}
          className="w-full border-2 border-dashed border-[#1EAEDB] hover:border-[#0FA0CE] text-[#1EAEDB] hover:text-[#0FA0CE]"
        >
          <Plus className="w-4 h-4 mr-2" /> Tambah Nomor WhatsApp
        </Button>
      </div>
    </Card>
  );
};