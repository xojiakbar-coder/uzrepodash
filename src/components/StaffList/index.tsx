import { FC, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button, Heading, Table } from "@chakra-ui/react";
import {
  ActionBarRoot,
  ActionBarContent,
  ActionBarSeparator,
  ActionBarSelectionTrigger,
} from "../ui/action-bar";
import GenericEmptyState from "../Generic/EmptyState";

interface ListType {
  id: number;
  name: string;
  category: string;
  price: number;
}

const StaffList: FC = () => {
  const initialItems: ListType[] = [
    { id: 1, name: "Qilichbek", category: "Video editor", price: 3.5e2 },
    { id: 2, name: "Komila", category: "Grafik designer", price: 4e2 },
    { id: 3, name: "Imona", category: "SEO", price: 3e2 },
    {
      id: 4,
      name: "Abdulaziz",
      category: "UI designer",
      price: 4e2,
    },
    { id: 5, name: "Navruz", category: "Admin", price: 5e2 },
    { id: 6, name: "Qilichbek", category: "Video editor", price: 3.5e2 },
    {
      id: 7,
      name: "Komila",
      category: "Grafik designer",
      price: 4e2,
    },
    { id: 8, name: "Imona", category: "SEO", price: 3e2 },
    { id: 9, name: "Abdulaziz", category: "UI designer", price: 4e2 },
    { id: 10, name: "Navruz", category: "Admin", price: 5e2 },
  ];

  const [items, setItems] = useState<ListType[]>(initialItems);
  const [selection, setSelection] = useState<number[]>([]);
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const onRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setSelection((prev) => prev.filter((selectedId) => selectedId !== id));
  };

  const rows = items.map((item) => (
    <Table.Row key={item.id}>
      <Table.Cell className="h-[50px] border-b px-[18.3px] min-h-[50px] border-gray-color">
        <Checkbox
          size="lg"
          variant="outline"
          className="flex items-center justify-center w-max h-max border border-gray-color rounded-sm bg-body-bg-color"
          aria-label="Select row"
          checked={selection.indexOf(item.id) !== -1}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : prev.filter((selectedId) => selectedId !== item.id)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell className="h-[50px] border-b px-[18.3px] min-h-[50px] py-[5px] border-gray-color">
        {item.name}
      </Table.Cell>
      <Table.Cell className="h-[50px] text-yellow-500 border-b px-[18.3px] py-[5px] min-h-[50px] border-gray-color">
        {item.category}
      </Table.Cell>
      <Table.Cell className="h-[50px] text-teal-500 border-b px-[18.3px] min-h-[50px] border-gray-color py-[5px]">
        {"$" + item.price}
      </Table.Cell>
      <Table.Cell
        className="h-[50px] border-b px-[18.3px] min-h-[50px] border-gray-color py-[5px]"
        textAlign="end"
      >
        <Button
          className="bg-danger px-[14px] py-[16px] lowercase text-light font-semibold"
          onClick={() => onRemove(item.id)}
        >
          o'chirish
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <div className="overflow-y-auto h-full w-full px-[15px] py-[20px]">
      {items.length > 0 ? (
        <div>
          <Heading className="font-mont font-[600] text-center py-[20px] text-[24px]">
            Xodimlar ma'lumotlari
          </Heading>
          <Table.Root
            size="lg"
            variant="outline"
            colorScheme="gray"
            className="w-full rounded-md"
          >
            <Table.Header className="h-[70px] max-h-[70px] min-h-[70px]">
              <Table.Row>
                <Table.ColumnHeader className="h-[54px] px-[18px] py-[16px] min-[54px]">
                  <Checkbox
                    top="1"
                    size="lg"
                    className="border border-gray-color rounded-sm bg-body-bg-color"
                    variant="outline"
                    aria-label="Tanlash"
                    checked={
                      indeterminate
                        ? "indeterminate"
                        : selection.length === items.length
                    }
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked ? items.map((item) => item.id) : []
                      );
                    }}
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader className="h-[54px] px-[18px] py-[16px] min-[54px]">
                  Ism
                </Table.ColumnHeader>
                <Table.ColumnHeader className="h-[54px] px-[18px] py-[16px] min-[54px]">
                  Kasb
                </Table.ColumnHeader>
                <Table.ColumnHeader className="h-[54px] px-[18px] py-[16px] min-[54px]">
                  Maosh
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  className="h-[54px] px-[18px] py-[16px] min-[54px]"
                  textAlign="end"
                >
                  Xodimni o'chirish
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body className="h-full">{rows}</Table.Body>
          </Table.Root>

          <ActionBarRoot open={hasSelection}>
            <ActionBarContent className="px-[20px] py-[12px]">
              <ActionBarSelectionTrigger>
                {selection.length} selected
              </ActionBarSelectionTrigger>
              <ActionBarSeparator />
              <Button variant="outline" size="sm">
                Deleted
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </ActionBarContent>
          </ActionBarRoot>
        </div>
      ) : (
        <div className="h-full">
          <GenericEmptyState
            title="Hozircha xodimlar ma'lumotlari topilmadi"
            description="Agar siz yangi xodim qo'shishni xohlasangiz xodimlarni qo'shish sahifasiga o'ting"
            button={true}
            buttonContent="Yangi xodim qo'shish"
          />
        </div>
      )}
    </div>
  );
};

export default StaffList;