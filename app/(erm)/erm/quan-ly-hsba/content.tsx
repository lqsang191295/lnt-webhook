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
  MessageBox,
  Option,
  Select,
  Table,
  TableCell,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  FlexBoxJustifyContent,
  CheckBox,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons-tnt/dist/user.js";
import PdfGallery from "../../_components/pdf-gallery";
import { trpc } from "@/trpc/client";
import { formatDate } from "@/utils/timer";

export default function Content() {
  const [openDialog, setOpenDiaglog] = React.useState<boolean>(false);
  const [openMessage, setOpenMessage] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const { data, isFetching } = trpc.BV_QlyCapThe.getAll.useQuery({
    page,
    limit: 20,
  });

  if (isFetching || !data) {
    return <div>Loading...</div>;
  }

  const { items } = data;
  console.log(" == data == ", data);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý hồ sơ bệnh án" />

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
                <span>Đối tượng</span>
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
          {items &&
            items.map((item, idx) => (
              <TableRow className="border-b border-gray-200 px-4" key={idx}>
                <TableCell className="text-center">
                  <span>{idx + 1}</span>
                </TableCell>
                <TableCell>
                  <span>{item.Ma}</span>
                </TableCell>
                <TableCell>
                  <span>Nội trú</span>
                </TableCell>
                <TableCell>
                  <span>{item.Ma}</span>
                </TableCell>
                <TableCell>
                  <span>123456</span>
                </TableCell>
                <TableCell>
                  <span>Xét nghiệm</span>
                </TableCell>
                <TableCell>
                  <span>{item.Hoten}</span>
                </TableCell>
                <TableCell>
                  <span>
                    {item.Ngaysinh ? `${item.Ngaysinh}/` : ""}
                    {item.Thangsinh ? `${item.Thangsinh}/` : ""}
                    {item.Namsinh}
                  </span>
                </TableCell>
                <TableCell>
                  <span>{item.Gioitinh}</span>
                </TableCell>
                <TableCell>
                  <span>{item.SoCMND}</span>
                </TableCell>
                <TableCell>
                  <span>{item.Ngay && formatDate(item.Ngay)}</span>
                </TableCell>
                <TableCell>
                  <CheckBox
                    text={item.Doituong || ""}
                    valueState="None"
                    checked={item.Doituong === "BHYT" ? true : false}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => setOpenDiaglog(true)}>
                    <Icon name="edit" />
                  </Button>
                  <Button onClick={() => setOpenMessage(true)}>
                    <Icon name="delete" />
                  </Button>
                  <Button onClick={() => setOpenDiaglog(true)}>
                    <Icon name="search" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </Table>

        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          className="p-2 gap-2 flex justify-center items-center">
          <Button
            className="border border-gray-200"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}>
            Trước
          </Button>
          <Label className="flex justify-center items-center px-4">
            Trang {page} / {data?.totalPages || 1}
          </Label>
          <Button
            className="border border-gray-200"
            disabled={page === data?.totalPages || data?.totalPages === 0}
            onClick={() => setPage(page + 1)}>
            Sau
          </Button>
        </FlexBox>

        {/* Dialog add, edit */}
        <Dialog
          className="w-full h-full"
          open={openDialog}
          footer={
            <FlexBox
              fitContainer
              justifyContent="End"
              style={{ paddingBlock: "0.25rem" }}>
              <Button onClick={() => setOpenDiaglog(false)}>Lưu</Button>
              <Button onClick={() => setOpenDiaglog(false)}>Đóng</Button>
            </FlexBox>
          }
          headerText="Xem hồ sơ bệnh án"
          onBeforeClose={function Xs() {}}
          onBeforeOpen={function Xs() {}}
          onClose={function Xs() {}}
          onOpen={function Xs() {}}>
          <main className="gap-2 overflow-auto h-full">
            <PdfGallery />
          </main>
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
