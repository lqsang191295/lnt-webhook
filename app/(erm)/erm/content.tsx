"use client";

import React from "react";
import { FlexBox, Card, CardHeader } from "@ui5/webcomponents-react";
import Image from "next/image";
import Header from "../_components/header";
import Link from "next/link";

const LIST_ITEMS = [
  {
    title: "Quản lý hồ sơ bệnh án",
    additionalText: "",
    subtitleText: "Quản lý các Hồ sơ bệnh án",
    icon: "/icons/hsba.png",
    link: "erm/quan-ly-hsba",
  },
  {
    title: "Hồ sơ bệnh án chờ ký",
    additionalText: "5 bệnh án chờ ký",
    subtitleText: "Xem các Hồ sơ bệnh án chờ ký",
    icon: "/icons/pencil.png",
    link: "erm/quan-ly-tai-lieu-ky-so",
  },
  {
    title: "Bệnh án chờ duyệt",
    additionalText: "8 bệnh án chờ duyệt",
    subtitleText: "Xem các Bệnh án chờ duyệt",
    icon: "/icons/folder-1.png",
    link: "erm/quan-ly-hsba",
  },
  {
    title: "Bệnh án trả về",
    additionalText: "18 bệnh án trả về",
    subtitleText: "Xem các Bệnh án trả về",
    icon: "/icons/folder-3.png",
    link: "erm/quan-ly-hsba",
  },
];

export default function Content() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <FlexBox
        alignItems="Center"
        direction="Column"
        justifyContent="Center"
        gap={"3rem"}
        className="p-4 flex-1">
        {LIST_ITEMS.map((item, index) => (
          <Card
            key={index}
            className="w-full max-w-80"
            header={
              <Link href={item.link} className="overflow-hidden">
                <CardHeader
                  additionalText={item.additionalText}
                  avatar={
                    <Image src={item.icon} width={32} height={32} alt="User" />
                  }
                  subtitleText={item.subtitleText}
                  titleText={item.title}
                />
              </Link>
            }></Card>
        ))}
      </FlexBox>

      <FlexBox
        alignItems="Center"
        direction="Row"
        justifyContent="Center"
        gap={"1rem"}
        className="mt-4 bg-amber-200 p-4">
        <Link href={`erm/tai-khoan`}>
          <Image src="/icons/user.png" width={48} height={48} alt="User" />
        </Link>
        <Link href={`erm/chu-ky-so`}>
          <Image src="/icons/pencil.png" width={48} height={48} alt="User" />
        </Link>
        <Link href={`erm/quan-ly-hsba`}>
          <Image src="/icons/folder.png" width={48} height={48} alt="User" />
        </Link>
        <Image src="/icons/folder-1.png" width={48} height={48} alt="User" />
        <Image src="/icons/folder-2.png" width={48} height={48} alt="User" />
        <Image src="/icons/folder-3.png" width={48} height={48} alt="User" />
      </FlexBox>
    </div>
  );
}
