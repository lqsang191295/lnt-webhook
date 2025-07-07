"use client";

import React from "react";
import Header from "../../_components/header";
import {
  Button,
  CheckBox,
  DatePicker,
  FlexBox,
  Input,
  Label,
  Tab,
  TabContainer,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/signature.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/attachment-text-file.js";
import "@ui5/webcomponents-icons/dist/message-information.js";
import "@ui5/webcomponents-icons/dist/attachment-text-file.js";

export default function ErmHsbaCanKy() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý tài liệu ký số" />

      <div className="flex flex-col flex-1 p-4 overflow-hidden">
        <TabContainer
          contentBackgroundDesign="Solid"
          headerBackgroundDesign="Solid"
          onMove={function Xs() {}}
          onMoveOver={function Xs() {}}
          onTabSelect={function Xs() {}}
          tabLayout="Standard"
          className="flex-1 overflow-hidden">
          {/* Tab tai lieu chua ky so */}
          <Tab
            additionalText="5"
            icon="signature"
            selected
            text="Tài liệu chờ ký"
            className="overflow-hidden">
            <div className="flex flex-col h-full overflow-hidden">
              <FlexBox
                alignItems="End"
                direction="Row"
                justifyContent="End"
                gap={".5rem"}
                className="flex bg-gray-100">
                <Input className="flex-1" placeholder="Search" />

                <FlexBox
                  alignItems="Center"
                  direction="Column"
                  justifyContent="Center"
                  gap={".5rem"}
                  className="">
                  <Label className="text-xs">Từ ngày</Label>
                  <DatePicker
                    onChange={function Xs() {}}
                    onClose={function Xs() {}}
                    onInput={function Xs() {}}
                    onOpen={function Xs() {}}
                    onValueStateChange={function Xs() {}}
                    primaryCalendarType="Gregorian"
                    valueState="None"
                  />
                </FlexBox>

                <FlexBox
                  alignItems="Center"
                  direction="Column"
                  justifyContent="Center"
                  gap={".5rem"}
                  className="">
                  <Label className="text-xs">Đến ngày</Label>
                  <DatePicker
                    onChange={function Xs() {}}
                    onClose={function Xs() {}}
                    onInput={function Xs() {}}
                    onOpen={function Xs() {}}
                    onValueStateChange={function Xs() {}}
                    primaryCalendarType="Gregorian"
                    valueState="None"
                  />
                </FlexBox>

                <Button design="Default" icon="search" className="border">
                  Tìm kiếm
                </Button>
              </FlexBox>
              <FlexBox
                alignItems="Start"
                direction="Column"
                justifyContent="Start"
                gap={".5rem"}
                className="flex overflow-hidden">
                <div className="flex items-center gap-4 mt-2">
                  <CheckBox
                    onChange={function Xs() {}}
                    text="Chọn tất cả"
                    valueState="None"
                  />
                  <Button
                    design="Positive"
                    icon="accept"
                    className="border bg-green-300">
                    Ký tài liệu
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 w-full overflow-y-scroll">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ].map((item) => (
                    <div
                      key={item}
                      className="w-full p-4 bg-white border border-gray-200">
                      <div className="flex gap-1 items-center justify-between">
                        <Label className="font-semibold text-sm">
                          Phiếu kết quả xét nghiệm
                        </Label>
                        <CheckBox
                          onChange={function Xs() {}}
                          valueState="None"
                        />
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">
                          Ngày gửi:
                        </Label>
                        <Label className="text-xs">01/01/2023</Label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">
                          Họ tên bệnh nhân:
                        </Label>
                        <Label className="text-xs">Nguyễn Văn A</Label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">Khoa:</Label>
                        <Label className="text-xs">Xét nghiệm</Label>
                      </div>
                      <div className="flex gap-2 mt-2 items-center">
                        <Button
                          design="Positive"
                          className="rounded-full"
                          title="Ký tài liệu"
                          icon="accept"></Button>
                        <Button
                          design="Emphasized"
                          className="rounded-full"
                          title="Xem chi tiết"
                          icon="message-information"></Button>
                        <Button
                          design="Attention"
                          className="rounded-full"
                          title="Xem chi tiết"
                          icon="attachment-text-file"></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </FlexBox>
            </div>
          </Tab>
          {/* Tab tai lieu da ky so */}
          <Tab
            additionalText="20"
            icon="attachment-text-file"
            text="Tài liệu đã ký"
            className="overflow-hidden">
            <div className="flex flex-col h-full overflow-hidden">
              <FlexBox
                alignItems="End"
                direction="Row"
                justifyContent="End"
                gap={".5rem"}
                className="flex bg-gray-100">
                <Input className="flex-1" placeholder="Search" />

                <FlexBox
                  alignItems="Center"
                  direction="Column"
                  justifyContent="Center"
                  gap={".5rem"}
                  className="">
                  <Label className="text-xs">Từ ngày</Label>
                  <DatePicker
                    onChange={function Xs() {}}
                    onClose={function Xs() {}}
                    onInput={function Xs() {}}
                    onOpen={function Xs() {}}
                    onValueStateChange={function Xs() {}}
                    primaryCalendarType="Gregorian"
                    valueState="None"
                  />
                </FlexBox>

                <FlexBox
                  alignItems="Center"
                  direction="Column"
                  justifyContent="Center"
                  gap={".5rem"}
                  className="">
                  <Label className="text-xs">Đến ngày</Label>
                  <DatePicker
                    onChange={function Xs() {}}
                    onClose={function Xs() {}}
                    onInput={function Xs() {}}
                    onOpen={function Xs() {}}
                    onValueStateChange={function Xs() {}}
                    primaryCalendarType="Gregorian"
                    valueState="None"
                  />
                </FlexBox>

                <Button design="Default" icon="search" className="border">
                  Tìm kiếm
                </Button>
              </FlexBox>

              <FlexBox
                alignItems="Start"
                direction="Column"
                justifyContent="Start"
                gap={".5rem"}
                className="flex overflow-hidden mt-4">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 w-full overflow-y-scroll">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ].map((item) => (
                    <div
                      key={item}
                      className="w-full p-4 bg-white border border-gray-200">
                      <div className="flex gap-1 items-center justify-between">
                        <Label className="font-semibold text-sm">
                          Phiếu kết quả xét nghiệm
                        </Label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">
                          Ngày gửi:
                        </Label>
                        <Label className="text-xs">01/01/2023</Label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">
                          Họ tên bệnh nhân:
                        </Label>
                        <Label className="text-xs">Nguyễn Văn A</Label>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Label className="font-semibold text-xs">Khoa:</Label>
                        <Label className="text-xs">Xét nghiệm</Label>
                      </div>
                      <div className="flex gap-2 mt-2 items-center">
                        <Button
                          design="Positive"
                          className="rounded-full"
                          title="Ký tài liệu"
                          icon="accept"></Button>
                        <Button
                          design="Emphasized"
                          className="rounded-full"
                          title="Xem chi tiết"
                          icon="message-information"></Button>
                        <Button
                          design="Negative"
                          className="rounded-full"
                          title="Xoá tài liệu"
                          icon="delete"></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </FlexBox>
            </div>
          </Tab>
        </TabContainer>
      </div>
    </div>
  );
}
