import { List } from "@mui/material";
import Item from "./Item";
import { NewData } from "../types/NewData";

type Data = {
  itemList: NewData[];
  deleteItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function MainList({ itemList, deleteItem }: Data) {
  const inActivedItem = itemList.filter((value) => value.isActive === false);
  return (
    <List>
      {inActivedItem.map((value) => (
        <Item name={value.name} key={value.name} deleteItem={deleteItem} />
      ))}
    </List>
  );
}

export default MainList;
