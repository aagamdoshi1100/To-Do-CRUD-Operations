import { createContext, useContext, useEffect, useState } from "react";

const ToDoContext = createContext();

const ToDoContextProvider = ({ children }) => {
  const [activity, setActivity] = useState({
    myArray:
      localStorage.getItem("Tasks") === null
        ? []
        : [...JSON.parse(localStorage.getItem("Tasks"))],
    mytext: "",
    enableEdit: false,
    indexofedit: "",
    editVal: "",
    myNewText: "",
    readArray: [],
  });
  console.log(activity, JSON.parse(localStorage.getItem("Tasks")), "a");

  const unread = (item) => {
    const removefromread = activity.readArray.filter(
      (ele) => ele.value !== item.value
    );
    setActivity({ ...activity, readArray: removefromread });
  };
  const read = (item) => {
    setActivity({ ...activity, readArray: [...activity.readArray, item] });
  };
  const addTask = () => {
    const add = [
      ...activity.myArray,
      { id: Math.floor(Math.random() * 100), value: activity.mytext },
    ];
    setActivity({
      ...activity,
      myArray: add,
      mytext: "",
    });
    localStorage.setItem("Tasks", JSON.stringify(add));
  };
  const removeItem = (item) => {
    const filterData = JSON.parse(localStorage.getItem("Tasks"))?.filter(
      (ele) => ele.id !== item.id
    );
    setActivity({ ...activity, myArray: filterData });
    localStorage.setItem("Tasks", JSON.stringify(filterData));
  };
  const edit = (item, ii) => {
    setActivity({
      ...activity,
      enableEdit: true,
      indexofedit: ii,
      myNewText: item.value,
    });
  };
  const update = (item) => {
    const editedData = activity.myArray.map((ele) => {
      if (item.id === ele.id) {
        return { ...ele, value: activity.myNewText };
      }
      return ele;
    });
    setActivity({
      ...activity,
      enableEdit: false,
      myNewText: "",
      myArray: editedData,
    });
    localStorage.setItem("Tasks", JSON.stringify(editedData));
  };

  return (
    <ToDoContext.Provider
      value={{
        update,
        edit,
        addTask,
        unread,
        removeItem,
        read,
        activity,
        setActivity,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDoContext = () => useContext(ToDoContext);
export default ToDoContextProvider;
