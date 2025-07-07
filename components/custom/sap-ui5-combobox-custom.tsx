"use client";

import {
  Input,
  Popover,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell,
  Table,
  Label,
  Button,
  FlexBox,
  FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import { useState, useCallback, memo } from "react";

interface Ui5CustomComboBoxProps {
  header: Record<string, string>;
  data: any[];
  setSelected: (selected: any | null) => void;
}

function Ui5CustomComboBox({
  header,
  data,
  setSelected,
}: Ui5CustomComboBoxProps) {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const keysHeader = Object.keys(header);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const onSelect = useCallback(
    (item: any) => {
      setSelected(item);
      setSearchText(`${item.ma} - ${item.ten}`);
      setIsOpen(false);
    },
    [setSelected]
  );

  const onInputChange = (e: any) => {
    setSearchText(e.target.value);
    setPage(1);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <Input
        id="openPopoverBtn"
        placeholder="Tìm nhân viên..."
        value={searchText}
        onInput={onInputChange}
        onClick={() => setIsOpen(true)}
        className="w-full"
      />

      <Popover
        open={isOpen}
        opener={"openPopoverBtn"}
        onClose={() => setIsOpen(false)}
        placement="Bottom"
        style={{ maxWidth: "100%" }}>
        <Table
          headerRow={
            <TableHeaderRow
              sticky
              className="border-b border-gray-200 bg-gray-100 px-4">
              {keysHeader.map((key) => (
                <TableHeaderCell
                  key={key}
                  horizontalAlign="Center"
                  className="flex flex-col gap-1 py-1">
                  <span>{header[key]}</span>
                  <Input className="h-7" />
                </TableHeaderCell>
              ))}
            </TableHeaderRow>
          }>
          {paginatedData.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onSelect(item)}
              className="cursor-pointer border-b border-gray-200 px-4">
              {keysHeader.map((key) => (
                <TableCell key={key} horizontalAlign="Center">
                  <Label>{item[key]}</Label>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>

        {/* Pagination Controls */}
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
            Trang {page} / {totalPages || 1}
          </Label>
          <Button
            className="border border-gray-200"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}>
            Sau
          </Button>
        </FlexBox>
      </Popover>
    </div>
  );
}

export default memo(Ui5CustomComboBox);
