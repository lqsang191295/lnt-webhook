"use client";

import { getMessagingClient, getToken } from "@/utils/firebase";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  memo,
} from "react";

type VariablesContextType = {
  deviceToken: string;
};

const GlobalVariablesContext = createContext<VariablesContextType | undefined>(
  undefined
);

export const useGlobalVariables = (): VariablesContextType => {
  const context = useContext(GlobalVariablesContext);
  if (!context) {
    throw new Error(
      "VariablesContext must be used within an GlobalVariablesProvider"
    );
  }
  return context;
};

const defaultTokenValue = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const GlobalVariablesProvider = ({ children }: { children: ReactNode }) => {
  const [deviceToken, setDeviceToken] = useState<string>(defaultTokenValue);

  const getDeviceToken = async () => {
    try {
      const messaging = await getMessagingClient();

      if (!messaging) {
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });

      setDeviceToken(token);
    } catch (ex) {
      console.log("ex global variables = ", ex);
    }
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  return (
    <GlobalVariablesContext.Provider value={{ deviceToken }}>
      {children}
    </GlobalVariablesContext.Provider>
  );
};

export default memo(GlobalVariablesProvider);
