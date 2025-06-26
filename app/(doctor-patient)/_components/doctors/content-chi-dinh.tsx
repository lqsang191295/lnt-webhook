'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SquarePen, Trash2, Save, ClipboardList, PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

const sampleData = [
  {
    id: 'KB_100',
    name: 'Khám Ngoại',
    type: '',
    sl: 1,
    price: 100000,
    bhyt: 39800,
    patientPay: 100000,
  },
  {
    id: 'CLS_10002',
    name: 'Chụp XQuang mặt thẳng + nghiêng',
    type: 'DX',
    sl: 1,
    price: 130000,
    bhyt: 105300,
    patientPay: 130000,
  },
  {
    id: 'CLS_10108',
    name: 'CT sọ não không tiêm thuốc cản quang',
    type: '',
    sl: 1,
    price: 700000,
    bhyt: 550100,
    patientPay: 700000,
  },
];
const phongList = ['101', '102', '103'];
const bsList = ['BS.TRẦN THƯỢNG HẢI', 'BS.NGUYỄN VĂN A'];
const ddList = ['Test thu ngân', 'Điều dưỡng A'];

export default function ContentChiDinh() {
  const [data, setData] = useState(sampleData);

  const [form, setForm] = useState({
    phong: '101',
    bsKham: 'BS.TRẦN THƯỢNG HẢI',
    dd: 'Test thu ngân',
    bsGt: 'BS.TRẦN THƯỢNG HẢI',
    ddGt: 'Test thu ngân',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline"><SquarePen size={16} className="mr-1" /> Sửa</Button>
        <Button variant="destructive"><Trash2 size={16} className="mr-1" /> Xóa</Button>
        <Button><Save size={16} className="mr-1" /> Lưu</Button>
        <Button variant="outline"><ClipboardList size={16} className="mr-1" /> In chỉ định</Button>
      </div>

      {/* Card - Thông tin chuẩn đoán & kết quả */}
      <div className='flex w-full bg-amber-50 p-0.5'>
        <div className="p-4 space-y-4 flex-1 border">
          <div className="flex flex-col gap-4">
            <div className='flex'>
              <Label>Chuẩn đoán chính</Label>
              <Input placeholder="Chẩn đoán chính" defaultValue="Bệnh tả (A00)" />
            </div>
            <div className='flex'>
              <Label>Chẩn đoán phụ</Label>
              <Input placeholder="Chẩn đoán chính" defaultValue="Bệnh tả (A00)" />
            </div>
            <Input placeholder="" />
            <Input placeholder="Phương pháp điều trị" />
            <Input placeholder="Loại xuất viện" defaultValue="Ra_viện" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Kết quả điều trị" defaultValue="Khỏi" />
            <Input placeholder="Tóm tắt CLS" />
          </div>
          <div>
            <Button variant="outline" size="sm">Cập nhật SL khám</Button>
            <Button variant="destructive" size="sm" className="ml-2">Tổng hợp chẩn đoán</Button>
          </div>
        </div>
        <div className="p-4 space-y-4 bg-amber-50 border">
          <div className="space-y-2">
            <Label>Số phòng</Label>
            <div className="flex items-center gap-2">
              <Select value={form.phong} onValueChange={(val) => handleChange('phong', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phongList.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm">Lưu</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>BS Khám</Label>
            <Select value={form.bsKham} onValueChange={(val) => handleChange('bsKham', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bsList.map((bs) => (
                  <SelectItem key={bs} value={bs}>{bs}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Điều dưỡng</Label>
            <Select value={form.dd} onValueChange={(val) => handleChange('dd', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ddList.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-red-600">BS giới thiệu</Label>
            <Select value={form.bsGt} onValueChange={(val) => handleChange('bsGt', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bsList.map((bs) => (
                  <SelectItem key={bs} value={bs}>{bs}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-blue-600">ĐD giới thiệu</Label>
            <Select value={form.ddGt} onValueChange={(val) => handleChange('ddGt', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ddList.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <span className="font-semibold">Tổng đã khám:</span> <span className="text-red-600 font-bold ml-1">0</span>
            <span className="ml-4 font-semibold">BHYT :</span>
          </div>

          <div className="font-bold text-xl text-indigo-700">CCAA XXYY</div>

          <div className="text-sm space-y-1">
            <div><span className="font-semibold">Năm sinh:</span> 1992 - Khám Ngoại</div>
            <div><span className="font-semibold">Giới tính:</span> Nam - <span className="font-semibold">Đối tượng:</span> Dịch vụ</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="chidinh" className="w-full">
        <TabsList className="grid grid-cols-6 mb-2">
          <TabsTrigger value="thongtin">THÔNG TIN</TabsTrigger>
          <TabsTrigger value="nhatky">NHẬT KÝ</TabsTrigger>
          <TabsTrigger value="chidinh">CHỈ ĐỊNH CLS</TabsTrigger>
          <TabsTrigger value="ketqua">KẾT QUẢ CLS</TabsTrigger>
          <TabsTrigger value="xuly">XỬ TRÍ</TabsTrigger>
          <TabsTrigger value="nghi">NGHỈ BHXH</TabsTrigger>
        </TabsList>

        <TabsContent value="chidinh">
          <Card className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">In</th>
                  <th className="p-2 text-left">Mã</th>
                  <th className="p-2 text-left">Tên</th>
                  <th className="p-2 text-left">Loại XQ</th>
                  <th className="p-2 text-center">SL</th>
                  <th className="p-2 text-right">Đơn giá</th>
                  <th className="p-2 text-right">BHYT</th>
                  <th className="p-2 text-right">BN đóng</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2"><input type="checkbox" defaultChecked /></td>
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <select defaultValue={item.type} className="border rounded px-2 py-1">
                        <option value="">--</option>
                        <option value="DX">DX</option>
                        <option value="CT">CT</option>
                        <option value="MRI">MRI</option>
                      </select>
                    </td>
                    <td className="p-2 text-center">
                      <Input type="number" className="w-16 text-center" defaultValue={item.sl} />
                    </td>
                    <td className="p-2 text-right">
                      <Input type="text" className="w-24 text-right" defaultValue={item.price.toLocaleString()} />
                    </td>
                    <td className="p-2 text-right">{item.bhyt.toLocaleString()}</td>
                    <td className="p-2 text-right">{item.patientPay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right p-2 font-semibold">
              Tổng cộng: {data.reduce((sum, i) => sum + i.patientPay, 0).toLocaleString()} ₫
            </div>
          </Card>

          {/* Bottom Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline"><PlusCircle size={16} className="mr-1" /> Thêm người giới thiệu</Button>
            <Button variant="outline">Clear</Button>
          </div>
        </TabsContent>

        <TabsContent value="thongtin">
          <Card className="p-4">Thông tin hành chính</Card>
        </TabsContent>
        <TabsContent value="nhatky">
          <Card className="p-4">Nhật ký</Card>
        </TabsContent>
        <TabsContent value="ketqua">
          <Card className="p-4">Kết quả CLS</Card>
        </TabsContent>
        <TabsContent value="xuly">
          <Card className="p-4">Xử trí và tư vấn</Card>
        </TabsContent>
        <TabsContent value="nghi">
          <Card className="p-4">Nghỉ BHXH</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
