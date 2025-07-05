"use client";

import React from "react";
import Header from "../../_components/header";
import {
  Button,
  DatePicker,
  Dialog,
  FlexBox,
  Icon,
  Input,
  Label,
  MediaGallery,
  MediaGalleryItem,
  MessageBox,
  Option,
  Select,
  Table,
  TableCell,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons-tnt/dist/user.js";
import Image from "next/image";

export default function Content() {
  const [openDialog, setOpenDiaglog] = React.useState<boolean>(false);
  const [openMessage, setOpenMessage] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý bệnh án chờ duyệt" />

      <div className="flex flex-col flex-1 overflow-hidden p-4">
        <FlexBox
          alignItems="End"
          direction="Row"
          justifyContent="End"
          gap={".5rem"}
          className="flex bg-gray-100 p-4">
          <Input
            className="flex-1"
            placeholder="Lọc theo Mã bệnh nhân, Số vào viện, Họ tên, CCCD"
          />

          <FlexBox
            alignItems="Center"
            direction="Column"
            justifyContent="Center"
            gap={".5rem"}
            className="">
            <Label className="text-xs">Hiệu lực từ ngày</Label>
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

          <FlexBox
            alignItems="Center"
            direction="Column"
            justifyContent="Center"
            gap={".5rem"}
            className="">
            <Label className="text-xs">Trạng thái</Label>
            <Select>
              <Option>Tất cả</Option>
              <Option>Có hiệu lực</Option>
              <Option>Tạm dừng</Option>
            </Select>
          </FlexBox>

          <FlexBox
            alignItems="Center"
            direction="Column"
            justifyContent="Center"
            gap={".5rem"}
            className="">
            <Label className="text-xs">Loại bệnh án</Label>
            <Select>
              <Option>Tất cả</Option>
              <Option>Nội trú</Option>
              <Option>Ngoại trú</Option>
              <Option>Thận nhân tạo</Option>
            </Select>
          </FlexBox>

          <Button design="Default" icon="search" className="border">
            Tìm kiếm
          </Button>
        </FlexBox>
        <Table
          className="flex-1 overflow-hidden"
          headerRow={
            <TableHeaderRow
              sticky
              className="border-b border-gray-200 bg-gray-100 px-4">
              <TableHeaderCell width="64px">
                <span>STT</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Mã bệnh án</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Loại bệnh án</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Mã bệnh nhân</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Số vào viện</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Khoa/phòng</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Họ tên</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Ngày sinh</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Giới tính</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>CCCD</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Ngày vào viện</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Trạng thái</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>#</span>
              </TableHeaderCell>
            </TableHeaderRow>
          }
          onMove={function Xs() {}}
          onMoveOver={function Xs() {}}
          onRowActionClick={function Xs() {}}
          onRowClick={function Xs() {}}>
          {[
            1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3,
            4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4,
          ].map((i, idx) => (
            <TableRow className="border-b border-gray-200 px-4" key={idx}>
              <TableCell className="text-center">
                <span>{idx + 1}</span>
              </TableCell>
              <TableCell>
                <span>123456</span>
              </TableCell>
              <TableCell>
                <span>Nội trú</span>
              </TableCell>
              <TableCell>
                <span>123456</span>
              </TableCell>
              <TableCell>
                <span>123456</span>
              </TableCell>
              <TableCell>
                <span>Xét nghiệm</span>
              </TableCell>
              <TableCell>
                <span>Nguyễn Văn A</span>
              </TableCell>
              <TableCell>
                <span>01/01/2025</span>
              </TableCell>
              <TableCell>
                <span>Nam</span>
              </TableCell>
              <TableCell>
                <span>099999999999</span>
              </TableCell>
              <TableCell>
                <span>01/01/2025</span>
              </TableCell>
              <TableCell>
                {i <= 2 ? <Icon name="accept" /> : <Icon name="decline" />}
              </TableCell>
              <TableCell>
                <Button onClick={() => setOpenDiaglog(true)}>
                  <Icon name="edit" />
                </Button>
                <Button onClick={() => setOpenMessage(true)}>
                  <Icon name="delete" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        {/* Dialog add, edit */}
        <Dialog
          className="w-full h-full overflow-auto"
          open={openDialog}
          footer={
            <FlexBox
              fitContainer
              justifyContent="End"
              style={{ paddingBlock: "0.25rem" }}
              className="gap-2 flex">
              <Button
                design="Emphasized"
                onClick={() => setOpenDiaglog(false)}
                icon="accept">
                Duyệt
              </Button>
              <Button
                design="Negative"
                onClick={() => setOpenDiaglog(false)}
                icon="decline">
                Trả về
              </Button>
              <Button className="border" onClick={() => setOpenDiaglog(false)}>
                Đóng
              </Button>
            </FlexBox>
          }
          headerText="Bệnh án"
          onBeforeClose={function Xs() {}}
          onBeforeOpen={function Xs() {}}
          onClose={function Xs() {}}
          onOpen={function Xs() {}}>
          <MediaGallery
            layout="Auto"
            menuHorizontalAlign="Left"
            menuVerticalAlign="Bottom"
            onDisplayAreaClick={function Xs() {}}
            onOverflowClick={function Xs() {}}
            onSelectionChange={function Xs() {}}>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
            <MediaGalleryItem>
              <Image
                src="/icons/user.png"
                width={100}
                height={100}
                alt="icon"
              />
            </MediaGalleryItem>
          </MediaGallery>
        </Dialog>

        {/* Message box for delete */}
        <MessageBox
          titleText="Thông báo"
          open={openMessage}
          onBeforeClose={function Xs() {}}
          onBeforeOpen={function Xs() {}}
          onClose={(action) => {
            console.log("Người dùng chọn:", action);
            if (action === "Yes") {
              console.log("Người dùng chọn Yes");
            } else if (action === "Cancel") {
              console.log("Người dùng chọn Cancel");
            }

            setOpenMessage(false);
          }}
          onOpen={function Xs() {}}
          type="Confirm">
          Bạn có muốn xoá chữ ký số này không?
        </MessageBox>
      </div>
    </div>
  );
}
