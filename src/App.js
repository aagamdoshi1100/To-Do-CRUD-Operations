import "./App.css";
import { useState } from "react";

export default function App() {
  const [activity, setActivity] = useState({
    myArray: [...JSON.parse(localStorage.getItem("Tasks"))],
    mytext: "",
    enableEdit: false,
    indexofedit: "",
    editVal: "",
    myNewText: "",
    readArray: [],
  });
  console.log(activity);
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
      { id: activity.myArray.length, value: activity.mytext },
    ];
    setActivity({
      ...activity,
      myArray: add,
      mytext: "",
    });
    localStorage.setItem("Tasks", JSON.stringify(add));
  };
  const removeItem = (itemId) => {
    const filterData = JSON.parse(localStorage.getItem("Tasks"))?.filter(
      (ele) => ele.id !== itemId
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
  const update = (id) => {
    const editedData = activity.myArray.map((ele) => {
      if (id === ele.id) {
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
    <div className="App">
      <h3>CRUD Operations</h3>
      <div className="boxes add">
        <input
          type="text"
          value={activity.mytext}
          placeholder="Add items"
          onChange={(e) => setActivity({ ...activity, mytext: e.target.value })}
        />
        <div className="b1" onClick={addTask}>
          Add
        </div>
      </div>

      {JSON.parse(localStorage.getItem("Tasks"))?.map((item, index) => {
        return (
          <div
            key={index}
            className="details"
            style={{
              backgroundColor:
                activity.enableEdit && activity.indexofedit === index
                  ? "white"
                  : "#ebe6f2",
            }}
          >
            {activity.enableEdit && activity.indexofedit === index ? (
              <input
                type="text"
                value={activity.myNewText}
                className="editinput"
                onChange={(e) =>
                  setActivity({ ...activity, myNewText: e.target.value })
                }
              />
            ) : (
              <p
                style={{
                  color: activity.readArray.find(
                    (ele) => ele.value === item.value
                  )
                    ? "black"
                    : "blue",
                }}
              >
                {item.value}
              </p>
            )}
            <div className="boxes">
              <div className="b1" onClick={() => removeItem(item.id)}>
                Delete
              </div>

              {activity.enableEdit && activity.indexofedit === index ? (
                <div className="b1" onClick={() => update(item.id)}>
                  Update
                </div>
              ) : (
                <div className="b1" onClick={() => edit(item, index)}>
                  Edit
                </div>
              )}

              {activity.readArray.find((ele) => ele.value === item.value) ? (
                <div className="b1" onClick={() => unread(item)}>
                  Unread
                </div>
              ) : (
                <div className="b1" onClick={() => read(item)}>
                  Mark as read
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
