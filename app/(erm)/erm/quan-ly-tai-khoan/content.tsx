"use client";

import React from "react";
import Header from "../../_components/header";
import {
  Bar,
  Button,
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
import "@ui5/webcomponents-icons/dist/save.js";
import "@ui5/webcomponents-icons-tnt/dist/user.js";

export default function ErmTaiKhoan() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý tài khoản" />

      <div className="flex flex-col flex-1 overflow-hidden p-4">
        <Bar
          className="bg-gray-100 border border-gray-200 h-16"
          design="Header"
          startContent={<span>Quản lý tài khoản</span>}
          endContent={
            <FlexBox
              alignItems="Center"
              direction="Row"
              justifyContent="Center"
              gap={".5rem"}
              className="py-2">
              <Button design="Default" icon="tnt/user" className="border">
                Nhóm quyền
              </Button>
              <Button design="Default" icon="add" className="border">
                Thêm
              </Button>
            </FlexBox>
          }></Bar>
        <FlexBox
          alignItems="End"
          direction="Row"
          justifyContent="End"
          gap={".5rem"}
          className="flex mt-4 p-4 bg-gray-100">
          <Input className="flex-1" placeholder="Search" />

          <FlexBox
            alignItems="Center"
            direction="Column"
            justifyContent="Center"
            gap={".5rem"}
            className="">
            <Label className="text-xs">Loại tài khoản</Label>
            <Select>
              <Option>Tất cả</Option>
              <Option>Thường</Option>
              <Option>Vip</Option>
            </Select>
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
        </FlexBox>
        <Table
          headerRow={
            <TableHeaderRow
              sticky
              className="border-b border-gray-200 bg-gray-100 px-4">
              <TableHeaderCell minWidth="200px" width="200px">
                <span>STT</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Họ tên</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Tài khoản</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Loại tài khoản</span>
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
          {[1, 2, 3, 4].map((i) => (
            <TableRow className="border-b border-gray-200 px-4" key={i}>
              <TableCell>
                <span>{i}</span>
              </TableCell>
              <TableCell>
                <span>Nguyễn Văn A</span>
              </TableCell>
              <TableCell>
                <span>Thường</span>
              </TableCell>
              <TableCell>
                <span>Nhân viên</span>
              </TableCell>
              <TableCell>
                {i <= 2 ? <Icon name="accept" /> : <Icon name="decline" />}
              </TableCell>
              <TableCell>
                <Button>
                  <Icon name="edit" />
                </Button>
                <Button>
                  <Icon name="save" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
}
