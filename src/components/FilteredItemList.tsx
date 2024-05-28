import { Grid, List, Paper, Typography } from "@mui/material";
import Item from "./Item";
import { NewData } from "../types/NewData";
type ItemList = {
  itemList: NewData[];
  length: number;
  type: string;
  deleteItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function FilteredItemList({ itemList, length, type, deleteItem }: ItemList) {
  const filteredItem = itemList.filter(
    (value) => value.type === type && value.isActive === true
  );
  return (
    <Grid item xs={12 / length} md={12 / length}>
      <Typography>{type}</Typography>
      <Paper sx={{ height: "550px" }}>
        <List>
          {filteredItem.map((value) => (
            <Item key={value.name} name={value.name} deleteItem={deleteItem} />
          ))}
        </List>
      </Paper>
    </Grid>
  );
}

export default FilteredItemList;
