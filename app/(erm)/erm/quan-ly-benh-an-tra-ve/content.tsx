"use client";

import React from "react";
import Header from "../../_components/header";
import {
  Button,
  DatePicker,
  FlexBox,
  Icon,
  Input,
  Label,
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

export default function Content() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý bệnh án trả về" />

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
                <Button>
                  <Icon name="edit" />
                </Button>
                <Button>
                  <Icon name="delete" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}
