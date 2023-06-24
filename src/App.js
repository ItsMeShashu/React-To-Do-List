import React, { useState, useEffect } from "react";
import "./App.css";

const getLocalData = () => {
  const list = localStorage.getItem("myList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const App = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItemsData] = useState(getLocalData());
  const [editedItem, setEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Function to add item in the list........
  const addItem = () => {
    if (!inputData) {
      alert("Please Enter a Task first !!");
    } else if (toggleButton === true && inputData) {
      setItemsData(
        items.map((curElem) => {
          if (curElem.id === editedItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setToggleButton(false);
    } else {
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItemsData([...items, newData]);
      setInputData("");
    }
  };

  // function to  delete the item from the list...
  const deleteItem = (id) => {
    const updatedList = items.filter((curElem) => {
      return curElem.id !== id;
    });

    setItemsData(updatedList);
  };

  // Clear the list of items.....
  const clearList = () => {
    setItemsData([]);
  };

  // Storing our data into the local storage......
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  // Edit the item which is displayed ...........
  const editItem = (id) => {
    const itemToEdit = items.find((curElem) => {
      return curElem.id === id;
    });
    setInputData(itemToEdit.name);
    setEditedItem(id);
    setToggleButton(true);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={require("./images/newtodo.png")} alt="todo-logo"></img>
            <figcaption>Add Your To-Do's Here ✌️✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Task"
              className="form-control "
              value={inputData}
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            ></input>
            {toggleButton ? (
              <i className="fa-solid fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa-solid fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((currElement) => {
              return (
                <div className="eachItem" key={currElement.id}>
                  <h3>{currElement.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa-solid fa-edit add-btn"
                      onClick={() => editItem(currElement.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-alt add-btn"
                      onClick={() => deleteItem(currElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04 "
              data-sm-link-text="Remove All"
              onClick={clearList}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
