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
  IllustratedMessage,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import "@ui5/webcomponents-icons/dist/delete.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons-tnt/dist/user.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js";
import PdfGallery from "../../_components/pdf-gallery";
import { trpc } from "@/trpc/client";
import { formatDate, formatDateToDDMMYYYY } from "@/utils/timer";
import Spinner from "@/components/spinner";
import { format } from "date-fns";
import SapUi5DatePicker from "@/components/custom/sap-ui5-date-picker";

interface iSearchBoxProps {
  onSearch: () => void;
  setTextSearch: (value: string) => void;
  tuNgay: Date;
  setTuNgay: (value: Date) => void;
  denNgay: Date;
  setDenNgay: (value: Date) => void;
}

const SearchBox = ({
  onSearch,
  setTextSearch,
  tuNgay,
  setTuNgay,
  denNgay,
  setDenNgay,
}: iSearchBoxProps) => {
  return (
    <FlexBox
      alignItems="End"
      direction="Row"
      justifyContent="End"
      gap={".5rem"}
      className="flex bg-gray-100 p-4">
      <Input
        className="flex-1"
        placeholder="Lọc theo Mã bệnh nhân, Số vào viện, Họ tên, CCCD"
        onChange={(e) => setTextSearch(e.target.value)}
      />

      <FlexBox
        alignItems="Center"
        direction="Column"
        justifyContent="Center"
        gap={".5rem"}
        className="">
        <Label className="text-xs">Từ ngày</Label>
        <SapUi5DatePicker value={tuNgay} onChange={setTuNgay} />
      </FlexBox>
      <FlexBox
        alignItems="Center"
        direction="Column"
        justifyContent="Center"
        gap={".5rem"}
        className="">
        <Label className="text-xs">Đến ngày</Label>
        <DatePicker
          onChange={(e) => {
            const newDateStr = e.detail.value;
            const newDate = new Date(newDateStr);

            if (!isNaN(newDate.getTime())) {
              console.log("newDate === ", newDate);
              setDenNgay(newDate);
            }
          }}
          primaryCalendarType="Gregorian"
          valueState="None"
          value={formatDateToDDMMYYYY(denNgay)}
        />
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

      <Button
        design="Default"
        icon="search"
        className="border"
        onClick={onSearch}>
        Tìm kiếm
      </Button>
    </FlexBox>
  );
};

export default function Content() {
  const [selectedData, setSelectedData] =
    React.useState<Record<string, unknown>>();
  const [textSearch, setTextSearch] = React.useState<string>("");
  const [tuNgay, setTuNgay] = React.useState<Date>(new Date());
  const [denNgay, setDenNgay] = React.useState<Date>(new Date());
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [openDialog, setOpenDiaglog] = React.useState<boolean>(false);
  const [openMessage, setOpenMessage] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = trpc.BV_Master.getAllByFilter.useQuery(
    {
      page,
      textSearch,
      tuNgay: new Date(format(tuNgay, "yyyy-MM-dd")).toISOString(),
      denNgay: new Date(format(denNgay, "yyyy-MM-dd")).toISOString(),
      limit: 20,
    },
    {
      enabled: isSearch,
    }
  );

  console.log(" == data == ", data, isFetching);

  const handleSearch = () => {
    setIsSearch(true);
    console.log("textSearch === ", textSearch);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header bearcums="Quản lý hồ sơ bệnh án" />

      <SearchBox
        onSearch={handleSearch}
        setTextSearch={setTextSearch}
        tuNgay={tuNgay}
        setTuNgay={setTuNgay}
        denNgay={denNgay}
        setDenNgay={setDenNgay}
      />

      <div className="flex flex-col flex-1 overflow-hidden p-4">
        {!isSearch && (
          <IllustratedMessage
            name="NoData"
            titleText="Không có dữ liệu"
            subtitleText="Nhấn nút tìm kiếm để lọc dữ liệu"
          />
        )}

        {isSearch && (isFetching || !data) && (
          <div className="flex items-center justify-center h-full">
            <Spinner />
            <Label className="text-center text-xs font-semibold">
              Đang tải dữ liệu...
            </Label>
          </div>
        )}

        {isSearch && !isFetching && data && data.items && (
          <>
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
                    <span>Ngày ra viện</span>
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
              {data.items.map((item, idx) => (
                <TableRow className="border-b border-gray-200 px-4" key={idx}>
                  <TableCell className="text-center">
                    <span>{idx + 1}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.MaBN}</span>
                  </TableCell>
                  <TableCell>
                    <span>Nội trú</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.MaBN}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.Sovaovien}</span>
                  </TableCell>
                  <TableCell>
                    <span>Xét nghiệm</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.TTQLyCapThe?.Hoten}</span>
                  </TableCell>
                  <TableCell>
                    <span>
                      {item.TTQLyCapThe?.Ngaysinh
                        ? `${item.TTQLyCapThe?.Ngaysinh}/`
                        : ""}
                      {item.TTQLyCapThe?.Thangsinh
                        ? `${item.TTQLyCapThe?.Thangsinh}/`
                        : ""}
                      {item.TTQLyCapThe?.Namsinh}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{item.TTQLyCapThe?.Gioitinh}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.TTQLyCapThe?.SoCMND}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.TGVao && formatDate(item.TGVao)}</span>
                  </TableCell>
                  <TableCell>
                    <span>{item.TGRa && formatDate(item.TGRa)}</span>
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
                    <Button
                      onClick={() => {
                        setSelectedData(item as Record<string, unknown>);
                        setOpenDiaglog(true);
                      }}>
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
          </>
        )}

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
            {selectedData && (
              <PdfGallery
                MaBN={selectedData.MaBN as string}
                Sovaovien={selectedData.Sovaovien as string}
              />
            )}
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
