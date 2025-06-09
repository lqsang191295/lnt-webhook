import { memo, useState } from "react";
import { Label } from "../ui/label";
import dayjs from "dayjs";
import { Bell, BookmarkCheck } from "lucide-react";
import { readNotifications } from "@/actions/notificatiton";
import { useNotificationStore } from "@/store/notification-store";
import { useAlertDialog } from "../global-alert-dialog";

interface iNotificationItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    readed: boolean;
    created_at: Date;
  };
}

const NotificationItem = ({ item }: iNotificationItemProps) => {
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const { markAsRead } = useNotificationStore();
  const { showAlert } = useAlertDialog();

  const handleMarkAsRead = async () => {
    try {
      await readNotifications(item.id);

      markAsRead(item.id);
    } catch (ex) {
      console.log("error ", ex);
    }
  };

  const handleClick = () => {
    try {
      readNotifications(item.id);

      markAsRead(item.id);

      showAlert(
        item.title,
        `${item.description} (Ngày ${dayjs(item.created_at).format(
          "DD-MM-YYYY"
        )} | ${dayjs(item.created_at).format("HH:mm:ss")})`
      );
    } catch (ex) {
      console.log("error ", ex);
    }
  };

  return (
    <div
      className="w-full border-b-1 border-gray-200 cursor-pointer hover:bg-gray-50 relative"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      onClick={handleClick}>
      <div className="p-4 relative">
        <div className="">
          <Label className="text-md">{item.title}</Label>
          <Label className="mt-4 text-xs text-gray-500">
            {item.description}
          </Label>
        </div>
        <Label className="absolute top-5 right-2 text-xs text-gray-500">
          {dayjs(item.created_at).format("DD-MM-YYYY")}
        </Label>
        <Label className="absolute top-10 right-2 text-[10px] text-gray-500">
          {dayjs(item.created_at).format("HH:mm:ss")}
        </Label>
        {!item.readed && (
          <div className="bg-red-500 w-1.5 h-1.5 rounded-full absolute bottom-5 right-2" />
        )}
      </div>
      {showIcons && (
        <div className="absolute flex gap-1 py-1 px-2 border-1 border-gray-300 rounded-xs top-5 right-2 bg-white text-gray-500">
          <Bell size={18} />
          <BookmarkCheck size={18} onClick={handleMarkAsRead} />
        </div>
      )}
    </div>
  );
};

export default memo(NotificationItem);
