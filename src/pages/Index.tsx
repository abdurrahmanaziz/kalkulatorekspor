
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [hargaPokok, setHargaPokok] = useState<string>("");
  const [biayaPengemasan, setBiayaPengemasan] = useState<string>("");
  const [biayaLogistik, setBiayaLogistik] = useState<string>("");
  const [biayaLainLain, setBiayaLainLain] = useState<string>("");
  const [margin, setMargin] = useState<string>("");
  const [totalHarga, setTotalHarga] = useState<number>(0);

  const hitungHarga = () => {
    if (!hargaPokok || !biayaPengemasan || !biayaLogistik || !biayaLainLain || !margin) {
      toast({
        title: "Error",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    const biayaLainLainNominal = (parseFloat(hargaPokok) * parseFloat(biayaLainLain)) / 100;
    
    const total =
      parseFloat(hargaPokok) +
      parseFloat(biayaPengemasan) +
      parseFloat(biayaLogistik) +
      biayaLainLainNominal +
      (parseFloat(hargaPokok) * parseFloat(margin)) / 100;

    setTotalHarga(total);
    toast({
      title: "Berhasil",
      description: "Harga jual ekspor telah dihitung",
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="/lovable-uploads/03560cba-67cc-4dd4-bbae-4bfdc9a7777f.png"
            alt="Ekspor Yuk Logo"
            className="h-20 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Kalkulator Harga Jual Ekspor
        </h1>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hargaPokok">Harga Pokok (Rp)</Label>
              <Input
                id="hargaPokok"
                type="number"
                value={hargaPokok}
                onChange={(e) => setHargaPokok(e.target.value)}
                placeholder="Masukkan harga pokok"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biayaPengemasan">Biaya Pengemasan (Rp)</Label>
              <Input
                id="biayaPengemasan"
                type="number"
                value={biayaPengemasan}
                onChange={(e) => setBiayaPengemasan(e.target.value)}
                placeholder="Masukkan biaya pengemasan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biayaLogistik">Biaya Logistik (Rp)</Label>
              <Input
                id="biayaLogistik"
                type="number"
                value={biayaLogistik}
                onChange={(e) => setBiayaLogistik(e.target.value)}
                placeholder="Masukkan biaya logistik"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biayaLainLain">Biaya Lain-lain (%)</Label>
              <Input
                id="biayaLainLain"
                type="number"
                value={biayaLainLain}
                onChange={(e) => setBiayaLainLain(e.target.value)}
                placeholder="Masukkan biaya lain-lain dalam persen"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margin (%)</Label>
              <Input
                id="margin"
                type="number"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                placeholder="Masukkan margin dalam persen"
              />
            </div>

            <Button
              onClick={hitungHarga}
              className="w-full"
            >
              Hitung Harga Jual
            </Button>

            {totalHarga > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">
                  Total Harga Jual Ekspor:
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
