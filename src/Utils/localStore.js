import React, { useEffect, useState } from "react";

export function Favorites() {
  const [favorites, setfavorites] = useState([]);
  // const [isInitialRender,setIsInitialRender]=useState(true)

  const getData = () => {
    return JSON.parse(localStorage.getItem("favoritos"));
  };
  useEffect(() => {
    setfavorites(getData());
  }, [favorites]);

  return favorites;
}

export const addLocalStoreFav = (e) => {
  e.preventDefault();
 
  let id = e.target.value;
  let storage_list = [];
 
  storage_list = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (storage_list.includes(id)) {
    return deletItemLocalStorage(id);
  }
  storage_list.push(id);

  localStorage.setItem("favoritos", JSON.stringify(storage_list));
};

function deletItemLocalStorage(e) {
  let id = e;
  let ls_data = JSON.parse(localStorage.getItem("favoritos"));
  let index = ls_data.indexOf(id);

  if (index === -1) {
  } else {
    ls_data.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(ls_data));
  }
}
