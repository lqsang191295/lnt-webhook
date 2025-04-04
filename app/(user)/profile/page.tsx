"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { getMessagingClient, getToken } from "@/utils/firebase";
import { toast } from "sonner";

const PageProfile = () => {
  const { user } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRenewPassword, setShowRenewPassword] = useState(false);

  const handle2FactorAuthentication = () => {
    Notification.requestPermission().then(async (permission) => {
      console.log("permission === ", permission);
      if (permission !== "granted") {
        toast("Cho phép gửi tin nhắn nếu có đăng nhập từ máy khác");
        return;
      }
      try {
        const messaging = await getMessagingClient();

        if (!messaging) {
          return;
        }

        const token = await getToken(messaging, {
          vapidKey:
            "BJRnJOsD5C6hxbK3DAVdzKFwebsi2sh36UakE4qRHALicyQ6mm_5t4npYD1TvzAjSGaRZNxvvkhlNlfEhHaeJPo",
        });
        console.log("FCM Token:", token);
      } catch (ex) {
        console.log("aaaaaaa ", ex);
      }
    });
  };

  const handleUpdateInfo = () => {
    //
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            disabled
            placeholder="Username"
            value={user?.username}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="userid">User ID</Label>
          <Input
            id="userid"
            disabled
            placeholder="User ID"
            value={user?.userId}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showNewPassword ? "text" : "New password"}
              placeholder="New password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Renew Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showRenewPassword ? "text" : "Renew password"}
              placeholder="Renew password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowRenewPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showRenewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handle2FactorAuthentication}
        >
          Enable 2-Factor Authentication
        </Button>
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleUpdateInfo}
        >
          Update info
        </Button>
      </div>
    </div>
  );
};

export default PageProfile;
