import { Grid } from "@mui/material";
import { useState } from "react";
import TypeList from "./components/TypeList";
import MainList from "./components/MainList";
import { NewData } from "./types/NewData";
import { data } from "./data";

function App() {
  const dataType: string[] = Array.from(
    new Set(data.map((value) => value.type))
  );
  const newData: NewData[] = data.map((value) => {
    return {
      type: value.type,
      name: value.name,
      isActive: false,
      timeOutId: -1,
    };
  });
  const [itemList, setItemList] = useState<NewData[]>(newData);

  function handleDeleteMainItem(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //refactor callback function
    const filteredOutCallback = (value: NewData, itemToFilter: string) =>
      value.name !== itemToFilter;
    //refactor callback function
    const findCallback = (value: NewData, itemToFind: string) =>
      value.name === itemToFind;
    //get clicked item
    const clickedItem = itemList.find((value) =>
      findCallback(value, e.currentTarget.textContent!)
    )!;
    //refactor callback function
    const setItemListCallback = (prevState: NewData[], setItem: NewData) => {
      const filteredOutList = prevState.filter((value) =>
        filteredOutCallback(value, clickedItem.name)
      );
      return [...filteredOutList, setItem];
    };
    //main feature
    const id = setTimeout(() => {
      const itemToRollBack = itemList.find((value) =>
        findCallback(value, clickedItem.name)
      )!;
      const setInActivedItem = {
        ...itemToRollBack,
        isActive: false,
        timeoutId: -1,
      };
      setItemList((prev) => setItemListCallback(prev, setInActivedItem));
    }, 5000);
    const setActivedItem = { ...clickedItem, isActive: true, timeOutId: id };
    setItemList((prev) => setItemListCallback(prev, setActivedItem));
  }

  function handleDeleteFilteredItem(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    //get clicked item
    const clickedItem = itemList.find(
      (value) => value.name === e.currentTarget.textContent!
    )!;
    //main feature
    const setInActivedItem = {
      ...clickedItem,
      isActive: false,
      timeoutId: -1,
    };
    setItemList((prev) => {
      const filteredOutList = prev.filter(
        (value) => value.name !== clickedItem.name
      );
      return [...filteredOutList, setInActivedItem];
    });
    //cancel setTimeoutId when click on filteredList
    clearTimeout(clickedItem.timeOutId);
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
