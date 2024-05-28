import { ListItem, ListItemButton, ListItemText } from "@mui/material";
type Item = {
  name: string;
  deleteItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
function Item({ name, deleteItem }: Item) {
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton divider={true} onClick={(e) => deleteItem(e)}>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export default Item;
