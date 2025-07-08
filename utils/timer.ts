export const sleeAsync = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatDate(input?: string): string {
  if (!input) {
    return "";
  }

  const date = new Date(input);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatDateToDDMMYYYY(dateStr: string): string {
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function formatDateTimeCT(input: string): string {
  const date = new Date(input);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${dd}-${mm}-${yyyy} ${hh}:${mi}:${ss}`;
}
