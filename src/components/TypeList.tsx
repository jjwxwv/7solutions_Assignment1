import { Grid } from "@mui/material";
import FilteredItemList from "./FilteredItemList";
import { NewData } from "../types/NewData";
type TypeList = {
  dataType: string[];
  itemList: NewData[];
  deleteItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function TypeList({ dataType, itemList, deleteItem }: TypeList) {
  return (
    <Grid container spacing={2}>
      {dataType.map((type) => (
        <FilteredItemList
          itemList={itemList}
          length={dataType.length}
          type={type}
          key={type}
          deleteItem={deleteItem}
        />
      ))}
    </Grid>
  );
}

export default TypeList;
