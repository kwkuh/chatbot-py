
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreditCard, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

interface BankAccountFormProps {
  accounts: BankAccount[];
  onChange: (accounts: BankAccount[]) => void;
}

export const BankAccountForm = ({ accounts, onChange }: BankAccountFormProps) => {
  const [copied, setCopied] = useState<number | null>(null);
  
  const availableBanks = [
    { id: "BCA", name: "BCA" },
    { id: "Mandiri", name: "Mandiri" },
    { id: "BNI", name: "BNI" },
    { id: "BRI", name: "BRI" },
    { id: "DANA", name: "DANA" },
    { id: "GoPay", name: "GoPay" },
    { id: "OVO", name: "OVO" },
    { id: "ShopeePay", name: "ShopeePay" },
    { id: "LinkAja", name: "LinkAja" },
    { id: "CIMB Niaga", name: "CIMB Niaga" },
    { id: "Permata", name: "Permata" },
    { id: "BTN", name: "BTN" },
  ];

  const updateBankAccount = (index: number, field: string, value: string) => {
    const newAccounts = [...accounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    onChange(newAccounts);
  };

  const addBankAccount = () => {
    onChange([...accounts, { bank: "BCA", accountNumber: "", accountName: "" }]);
  };

  const removeBankAccount = (index: number) => {
    if (accounts.length === 1) {
      toast.error("Minimal harus ada 1 rekening bank");
      return;
    }
    const newAccounts = [...accounts];
    newAccounts.splice(index, 1);
    onChange(newAccounts);
  };

  const copyAccountNumber = (index: number) => {
    navigator.clipboard.writeText(accounts[index].accountNumber);
    setCopied(index);
    toast.success("Nomor rekening berhasil disalin!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#1EAEDB] flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Detail Rekening Bank
        </h3>
      </div>

      {accounts.map((account, index) => (
        <Card key={index} className="p-5 border-2 border-[#1EAEDB]/20 hover:border-[#1EAEDB]/50 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-[#221F26]">Rekening {index + 1}</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeBankAccount(index)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Hapus rekening</span>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`bank-${index}`} className="font-medium text-[#403E43]">
                Bank / E-Wallet
              </Label>
              <Select
                value={account.bank}
                onValueChange={(value) => updateBankAccount(index, 'bank', value)}
              >
                <SelectTrigger className="h-11 border-2 border-[#1EAEDB]/30 focus:border-[#1EAEDB] focus:ring-[#1EAEDB]/20">
                  <SelectValue placeholder="Pilih Bank" />
                </SelectTrigger>
                <SelectContent>
                  {availableBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id} className="font-medium">
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`account-number-${index}`} className="font-medium text-[#403E43]">
                Nomor Rekening
              </Label>
              <div className="flex">
                <Input
                  id={`account-number-${index}`}
                  value={account.accountNumber}
                  onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                  placeholder="Contoh: 1234567890"
                  className="h-11 border-2 border-r-0 rounded-r-none border-[#1EAEDB]/30 focus:border-[#1EAEDB] focus:ring-[#1EAEDB]/20"
                />
                <Button
                  type="button"
                  variant="outline"
                  className={`h-11 rounded-l-none border-2 border-l-0 border-[#1EAEDB]/30 ${
                    copied === index 
                      ? 'bg-green-50 text-green-600 border-green-300' 
                      : 'hover:bg-[#1EAEDB]/10 text-[#1EAEDB]'
                  }`}
                  onClick={() => copyAccountNumber(index)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`account-name-${index}`} className="font-medium text-[#403E43]">
                Atas Nama
              </Label>
              <Input
                id={`account-name-${index}`}
                value={account.accountName}
                onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                placeholder="Nama pemilik rekening"
                className="h-11 border-2 border-[#1EAEDB]/30 focus:border-[#1EAEDB] focus:ring-[#1EAEDB]/20"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addBankAccount}
        className="w-full h-12 border-2 border-dashed border-[#1EAEDB] hover:border-[#1EAEDB] text-[#1EAEDB] hover:text-[#1EAEDB] hover:bg-[#1EAEDB]/5 font-bold"
      >
        + Tambah Rekening Bank
      </Button>
    </div>
  );
};
