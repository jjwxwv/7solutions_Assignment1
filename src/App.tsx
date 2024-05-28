import { Grid } from "@mui/material";
import { useState } from "react";
import TypeList from "./components/TypeList";
import MainList from "./components/MainList";
import { NewData } from "./types/NewData";
import { data } from "./data";

const dataType: string[] = Array.from(new Set(data.map((value) => value.type)));
const newData: NewData[] = data.map((value) => {
  return {
    type: value.type,
    name: value.name,
    isActive: false,
    timeOutId: -1,
  };
});
function App() {
  const [itemList, setItemList] = useState<NewData[]>(newData);

  function setItemListRefactor(
    textContent: string,
    isActive: boolean,
    id: number = -1
  ) {
    const item = itemList.find((value) => value.name === textContent)!;
    const setItem = { ...item, isActive, timeOutId: id };
    setItemList((prev) => {
      const filteredOutList = prev.filter((value) => value.name !== item.name);
      return [...filteredOutList, setItem];
    });
  }

  function handleDeleteMainItem(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const clickedItem = e.currentTarget.textContent!;
    const id = setTimeout(() => {
      //move filteredlist to mainlist after 5 seconds
      setItemListRefactor(clickedItem, false);
    }, 5000);
    //move mainlist to filteredlist when we click on main list
    setItemListRefactor(clickedItem, true, id);
  }

  function handleDeleteFilteredItem(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const clickedItem = e.currentTarget.textContent!;
    const item = itemList.find((value) => value.name === clickedItem)!;
    //move filteredlist to mainlist when that item is clicked
    setItemListRefactor(clickedItem, false);
    //cancel setTimeoutId when click on filteredList
    clearTimeout(item.timeOutId);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <MainList itemList={itemList} deleteItem={handleDeleteMainItem} />
      </Grid>
      <Grid item xs={6} md={8}>
        <TypeList
          dataType={dataType}
          itemList={itemList}
          deleteItem={handleDeleteFilteredItem}
        />
      </Grid>
    </Grid>
  );
}

export default App;
