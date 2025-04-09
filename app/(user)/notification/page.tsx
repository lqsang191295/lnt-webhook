"use client";

// import { EventSourcePolyfill } from "event-source-polyfill";
// import { useCallback, useEffect, useState } from "react";

// const getCookie = () => {
//   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW5nc2FuZyIsInVzZXJJZCI6InF1YW5nc2FuZyIsInJvbGVzIjoiUXXhuqNuX1Ry4buLIiwiZW1wSWQiOiJOVjI1XzAwNyIsImlhdCI6MTc0NDAxODQ4NywiZXhwIjoxNzQ0NjIzMjg3fQ.rcgMp5Ud6SXNpp6ec-DEP7VQdgjCAXUBmDFocskrEuM";
//   //   const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
//   //   if (match) return match[2];
//   //   return null;
// };

export default function NotificationListener() {
  // const [newData, setNewData] = useState();
  // const [eventSource, setEventSource] = useState<EventSourcePolyfill>();

  // const handleNotificationSse = useCallback(async () => {
  //   console.log("eventSource handleNotificationSse ==== ", eventSource);

  //   if (eventSource) return;

  //   const token = getCookie();

  //   console.log("token= ===== ", token);

  //   const event = new EventSourcePolyfill(
  //     `${process.env.NEXT_PUBLIC_API}/notification/sse`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   event.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     console.log("Received notification:", data);
  //     // TODO: Hiển thị thông báo trong UI
  //     setNewData(data);
  //   };

  //   setEventSource(event);
  // }, [eventSource]);

  // useEffect(() => {
  //   handleNotificationSse();

  //   return () => {
  //     eventSource?.close();
  //   };
  // }, [eventSource, handleNotificationSse]);

  return (
    <div>
      Listening for notifications...
      {/* {JSON.stringify(newData)} */}
    </div>
  );
}
