"use client";

import React, { useCallback, useEffect } from "react";
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
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons-tnt/dist/user.js";
import { dbService } from "@/store/db-cache";
import Ui5CustomComboBox from "@/components/custom/sap-ui5-combobox-custom";

export default function ErmTaiKhoan() {
  const [openDialog, setOpenDiaglog] = React.useState<boolean>(false);
  const [openMessage, setOpenMessage] = React.useState<boolean>(false);
  const [NS_NhanVienData, setNS_NhanVienData] = React.useState([]);

  const fetctData = useCallback(async () => {
    const data = await dbService.NS_NhanVien.get();

    setNS_NhanVienData(data);
  }, []);

  useEffect(() => {
    fetctData();
  }, [fetctData]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý chữ ký số" />

      <div className="flex flex-col flex-1 overflow-hidden p-4">
        <FlexBox
          alignItems="End"
          direction="Row"
          justifyContent="End"
          gap={".5rem"}
          className="flex bg-gray-100 p-4">
          <Input className="flex-1" placeholder="Search" />

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

          <Button design="Default" icon="search" className="border">
            Tìm kiếm
          </Button>
          <Button
            design="Default"
            icon="add"
            className="border"
            onClick={() => setOpenDiaglog(true)}>
            Thêm
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
                <span>ID</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Họ tên</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Khoa/phòng</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Ngày hiệu lực</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Ngày hết hạn</span>
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
                <span>Nguyễn Văn A</span>
              </TableCell>
              <TableCell>
                <span>Xét nghiệm</span>
              </TableCell>
              <TableCell>
                <span>01/01/2025</span>
              </TableCell>
              <TableCell>
                <span>01/12/2025</span>
              </TableCell>
              <TableCell>
                {i <= 2 ? <Icon name="accept" /> : <Icon name="decline" />}
              </TableCell>
              <TableCell>
                <Button onClick={() => setOpenDiaglog(false)}>
                  <Icon name="edit" />
                </Button>
                <Button>
                  <Icon name="locked" />
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
          className="w-full max-w-2xl"
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
          headerText="Thêm chữ ký"
          onBeforeClose={function Xs() {}}
          onBeforeOpen={function Xs() {}}
          onClose={function Xs() {}}
          onOpen={function Xs() {}}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full">
              <Label>Mã nhân viên (*)</Label>
              <Ui5CustomComboBox
                header={{
                  Ma: "Mã NV",
                  Ten: "Họ tên",
                  ChucVu: "Chức vụ",
                }}
                data={NS_NhanVienData}
                setSelected={() => {}}
              />
            </div>
            <div className="flex flex-row w-full gap-6">
              <div className="flex flex-1 flex-col w-full">
                <Label>Khoa/Phòng (*)</Label>
                <Input className="w-full" type="Text" />
              </div>
              <div className="flex flex-1 flex-col w-full">
                <Label>Chức vụ (*)</Label>
                <Input className="w-full" type="Text" />
              </div>
            </div>
            <div className="flex flex-row w-full gap-6">
              <div className="flex flex-1 flex-col w-full">
                <Label>Ngày hiệu lực (*)</Label>
                <DatePicker
                  onChange={function Xs() {}}
                  onClose={function Xs() {}}
                  onInput={function Xs() {}}
                  onOpen={function Xs() {}}
                  onValueStateChange={function Xs() {}}
                  primaryCalendarType="Gregorian"
                  valueState="None"
                />
              </div>
              <div className="flex flex-1 flex-col w-full">
                <Label>Ngày hết hạn (*)</Label>
                <DatePicker
                  onChange={function Xs() {}}
                  onClose={function Xs() {}}
                  onInput={function Xs() {}}
                  onOpen={function Xs() {}}
                  onValueStateChange={function Xs() {}}
                  primaryCalendarType="Gregorian"
                  valueState="None"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col w-full">
              <Label>File chữ ký (*)</Label>
              <div className="flex flex-col gap-2 border border-gray-200">
                <div className="flex flex-row items-center justify-between p-2 bg-gray-100">
                  <Button design="Emphasized" icon="add">
                    Chọn file
                  </Button>
                </div>
                <div className="p-2">
                  <Label>CKS_Bs_Le_Van_A.txt</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col w-full">
              <Label>File con dấu (*)</Label>
              <div className="flex flex-col gap-2 border border-gray-200">
                <div className="flex flex-row items-center justify-between p-2 bg-gray-100">
                  <Button design="Emphasized" icon="add">
                    Chọn file
                  </Button>
                </div>
                <div className="p-2">
                  <Label>CKS_Bs_Le_Van_A.txt</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col w-full">
              <Label className="font-bold">Thông tin chữ ký</Label>
              <div className="flex flex-row w-full gap-6 mt-1">
                <div className="flex flex-1 flex-col w-full">
                  <Label>API Key (*)</Label>
                  <Input className="w-full" type="Text" />
                </div>
                <div className="flex flex-1 flex-col w-full">
                  <Label>Mã bí mật (*)</Label>
                  <Input className="w-full" type="Text" />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col w-full">
              <Label>Uri (*)</Label>
              <Input className="w-full" type="Text" />
            </div>
          </div>
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
