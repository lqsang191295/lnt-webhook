"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModelAIStore } from "@/store/ModelAIStore";
import CommonCombobox from "@/components/common-combobox";
import { ChevronsUpDown } from "lucide-react";
import { useComboboxStore } from "@/store/ComboboxStore";
import { generateQuiz } from "@/app/actions/generate-question";
import { useState } from "react";

type TypeInputVal = {
  model: string;
  api_key: string;
  amount: number;
  department: string;
};

export function SidebarRight() {
  const modelAI = useModelAIStore((state) => state.modelAI);
  const { open, selectedValue } = useComboboxStore();
  const [inputVal, setInputVal] = useState<TypeInputVal>({
    model: "",
    api_key: "",
    amount: 0,
    department: "",
  });

  const generateQuestion = async () => {
    const data = await generateQuiz(
      inputVal.api_key,
      selectedValue?.key as string,
      inputVal.amount,
      inputVal.department
    );

    console.log("aaaaaaaaaaaaaaaa ---------- ", data);
  };

  return (
    <div className="flex flex-col">
      <header className="w-full h-15 border-b-1 flex flex-row gap-x-4 items-center">
        <div className="flex flex-row justify-between items-center gap-x-2 ml-2">
          <Badge variant="secondary">
            <Image
              src={modelAI.icon}
              width={24}
              height={24}
              alt={modelAI.name}
            />
            <span>{modelAI.name}</span>
          </Badge>
        </div>

        <div className="flex flex-row justify-between items-center gap-x-2">
          <Label htmlFor="model">Model</Label>
          <CommonCombobox data={modelAI.models}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedValue ? (selectedValue.value as string) : "Chọn model"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </CommonCombobox>
        </div>

        <div className="flex flex-row justify-between items-center gap-x-2">
          <Label htmlFor="api_key">Api key</Label>
          <Input
            id="api_key"
            type="text"
            placeholder="Api key"
            value={inputVal?.api_key}
            onChange={(e) =>
              setInputVal((prev) => ({ ...prev, api_key: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-x-2">
          <Label htmlFor="model">Phòng ban</Label>
          <Input
            id="model"
            type="text"
            placeholder="Phòng ban"
            value={inputVal?.department}
            onChange={(e) =>
              setInputVal((prev) => ({ ...prev, department: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-x-2">
          <Label htmlFor="model">Số lượng câu hỏi</Label>
          <Input
            className="w-20"
            id="model"
            type="number"
            placeholder="Số lượng câu hỏi"
            value={inputVal?.amount}
            onChange={(e) =>
              setInputVal((prev) => ({
                ...prev,
                amount: parseInt(e.target.value),
              }))
            }
          />
        </div>

        <Button className="cursor-pointer" onClick={generateQuestion}>
          Generate questions
        </Button>
      </header>
      <main className="w-full flex-1 mx-2">
        {[
          {
            question:
              "Trong xử trí bệnh nhân ngừng tim tại khoa cấp cứu, phương pháp nào được ưu tiên hàng đầu?",
            options: [
              "A. Sốc điện ngay lập tức",
              "B. Thực hiện ép ngực CPR và sử dụng AED nếu có",
              "C. Dùng thuốc Epinephrine trước khi ép ngực",
              "D. Đưa bệnh nhân đi chụp CT não khẩn cấp",
            ],
            correctAnswer: "B. Thực hiện ép ngực CPR và sử dụng AED nếu có",
            explanation:
              "Trong trường hợp ngừng tim, thực hiện ép ngực CPR sớm và sử dụng máy khử rung tim tự động (AED) nếu có là biện pháp ưu tiên hàng đầu để tăng cơ hội sống sót cho bệnh nhân.",
          },
        ].map((q) => {
          return (
            <div className="">
              <div>
                <span>Câu 1:</span> <span>{q.question}</span>
              </div>
              {q.options.map((op) => {
                return <div>{op}</div>;
              })}
              <div>Explanation: {q.explanation}</div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
