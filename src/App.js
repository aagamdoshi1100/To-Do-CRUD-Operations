import "./App.css";
import { useToDoContext } from "./context/ToDoContext";

export default function App() {
  const {
    update,
    edit,
    addTask,
    unread,
    removeItem,
    read,
    activity,
    setActivity,
  } = useToDoContext();
  return (
    <div className="App">
      <div className="header">
        <h3>To Do App</h3>
        <p>CRUD Operations</p>
      </div>
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
              <div className="b1" onClick={() => removeItem(item)}>
                Delete
              </div>

              {activity.enableEdit && activity.indexofedit === index ? (
                <div className="b1" onClick={() => update(item)}>
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
                  Read
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
