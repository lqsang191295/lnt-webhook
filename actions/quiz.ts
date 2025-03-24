import { TypeQuestion } from "@/store/types/question";

const mock = true;
const MockDataQuiz: TypeQuestion[] = [
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
  {
    question:
      "Thuốc nào sau đây thường được sử dụng để điều trị sốc phản vệ tại khoa cấp cứu?",
    options: ["A. Atropine", "B. Epinephrine", "C. Dopamine", "D. Amiodarone"],
    correctAnswer: "B. Epinephrine",
    explanation:
      "Epinephrine là thuốc điều trị chính trong sốc phản vệ, giúp giãn phế quản, co mạch và cải thiện huyết áp.",
  },
  {
    question:
      "Khi bệnh nhân bị chấn thương đầu và có dấu hiệu tăng áp lực nội sọ, dấu hiệu nào sau đây có thể xuất hiện?",
    options: [
      "A. Nhịp tim nhanh, huyết áp thấp, thở nhanh",
      "B. Huyết áp tăng, nhịp tim chậm, rối loạn nhịp thở",
      "C. Huyết áp thấp, nhịp tim nhanh, thở gấp",
      "D. Huyết áp bình thường, nhịp tim bình thường, thở đều",
    ],
    correctAnswer: "B. Huyết áp tăng, nhịp tim chậm, rối loạn nhịp thở",
    explanation:
      "Dấu hiệu Cushing (Cushing's triad) bao gồm tăng huyết áp, nhịp tim chậm và rối loạn nhịp thở, là dấu hiệu điển hình của tăng áp lực nội sọ.",
  },
  {
    question:
      "Bệnh nhân bị đau ngực cấp tính, điện tâm đồ cho thấy ST chênh lên. Xử trí đầu tiên nên là gì?",
    options: [
      "A. Chụp CT ngực",
      "B. Đo men tim và chờ kết quả",
      "C. Dùng Aspirin và Nitroglycerin",
      "D. Chuyển bệnh nhân đi can thiệp mạch vành cấp cứu",
    ],
    correctAnswer: "D. Chuyển bệnh nhân đi can thiệp mạch vành cấp cứu",
    explanation:
      "Bệnh nhân có ST chênh lên trên ECG là dấu hiệu của nhồi máu cơ tim cấp. Can thiệp mạch vành qua da (PCI) càng sớm càng tốt là phương pháp điều trị tối ưu để tái thông mạch vành.",
  },
];

export const getQuizs = (): TypeQuestion[] => {
  if (mock) {
    return MockDataQuiz;
  }

  return MockDataQuiz;
};
