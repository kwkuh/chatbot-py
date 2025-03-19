
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Send, MessageCircle } from "lucide-react";

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface WhatsAppShareProps {
  bankAccounts: BankAccount[];
}

export const WhatsAppShare = ({ bankAccounts }: WhatsAppShareProps) => {
  const [whatsappNumbers, setWhatsappNumbers] = useState<string[]>(['']);
  const [amount, setAmount] = useState('');
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const handleAddNumber = () => {
    setWhatsappNumbers([...whatsappNumbers, '']);
  };

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...whatsappNumbers];
    newNumbers[index] = value;
    setWhatsappNumbers(newNumbers);
  };

  const generateMessage = () => {
    const selectedAccount = bankAccounts[selectedAccountIndex];
    
    let message = `Halo! Saya ingin melakukan pembayaran sebesar Rp${amount} ke rekening berikut:%0a%0a`;
    message += `Bank: ${selectedAccount.bank}%0a`;
    message += `Nomor Rekening: ${selectedAccount.accountNumber}%0a`;
    message += `Atas Nama: ${selectedAccount.accountName}%0a%0a`;
    
    message += `Terima kasih! 🙏`;
    
    return message;
  };

  const handleShare = (number: string) => {
    if (!amount) {
      toast.error("Masukkan jumlah pembayaran terlebih dahulu!");
      return;
    }

    if (!bankAccounts || bankAccounts.length === 0) {
      toast.error("Tidak ada data rekening untuk dibagikan!");
      return;
    }

    const formattedNumber = number.startsWith('0') ? `62${number.slice(1)}` : number;
    const message = generateMessage();
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
  };

  return (
    <Card className="p-6 space-y-6 glass-effect hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 text-xl font-bold text-[#1EAEDB]">
        <MessageCircle className="w-6 h-6" />
        <h3>Share via WhatsApp</h3>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p>✨ Kirim detail pembayaran langsung ke WhatsApp</p>
        <p>🔒 Aman dan praktis</p>
        <p>⚡️ Proses cepat dan mudah</p>
      </div>

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

        {bankAccounts && bankAccounts.length > 1 && (
          <div className="space-y-2">
            <Label htmlFor="bank-account">Pilih Rekening</Label>
            <Select
              value={selectedAccountIndex.toString()}
              onValueChange={(value) => setSelectedAccountIndex(Number(value))}
            >
              <SelectTrigger className="h-11 border-2 border-[#1EAEDB]/30 focus:border-[#1EAEDB] focus:ring-[#1EAEDB]/20">
                <SelectValue placeholder="Pilih Rekening" />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.map((account, index) => (
                  <SelectItem key={index} value={index.toString()} className="font-medium">
                    {account.bank} - {account.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
              className="mt-8 bg-[#1EAEDB] hover:bg-[#0FA0CE] animate-pulse"
              disabled={!number || !amount || !bankAccounts || bankAccounts.length === 0}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddNumber}
          className="w-full border-2 border-dashed border-[#1EAEDB] hover:border-[#0FA0CE] text-[#1EAEDB] hover:text-[#0FA0CE] group"
        >
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> 
          Tambah Nomor WhatsApp
        </Button>
      </div>
    </Card>
  );
};
