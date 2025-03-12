import React, { useState } from "react";

const Todo = () => {
  const category = ["General", "Shopping", "Health", "Bills"];
  const [todo, setTodo] = useState([
    { text: "Milk", category: "General" },
    { text: "Shirt", category: "Shopping" },
    { text: "Tablets", category: "Health" },
  ]);
  const [inputField, setInputField] = useState("");
  const [currCategory, setCurrCategory] = useState("General");
  const [filteredCat, setFilteredCat] = useState("ALL");

  const addHandle = () => {
    if (inputField.trim()) {
      setTodo([...todo, { text: inputField, category: currCategory }]);
      setInputField("");
    }
  };

  const deleteHandle = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const upHandle = (index) =>{
    if(index > 0){
        const update = [...todo];
        [update[index],update[index -1]] = [update[index-1],update[index]];
        setTodo(update);
    }
  }

  const downHandle = (index) =>{
    if(index < todo.length -1){
        const update = [...todo];
        [update[index],update[index +1]] = [update[index+1],update[index]];
        setTodo(update);
    }
  }

  const filteredList = filteredCat === "ALL" ? todo : todo.filter((todo) => todo.category === filteredCat)
  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        className="border"
        value={inputField}
        onChange={(e) => setInputField(e.target.value)}
      ></input>
      <select
        value={currCategory}
        onChange={(e) => setCurrCategory(e.target.value)}
      >
        {category.map((list, index) => (
          <option key={index}>{list}</option>
        ))}
      </select>
      <button className="border" onClick={addHandle}>
        ADD
      </button>

      {/* filter */}
      <div className="flex">
        <h1>FILTERED LIST : </h1>
        <select
          value={filteredCat}
          onChange={(e) => setFilteredCat(e.target.value)}
        >
          <option>ALL</option>
          {category.map((list, index) => (
            <option key={index}>{list}</option>
          ))}
        </select>
      </div>

      {/* display */}

      <div>
        <ol>
          {filteredList.map((list, index) => (
            <li key={index}>
              <span>
                {list.text} - <strong>{list.category}</strong>
              </span>
              <button className="border" onClick={() => deleteHandle(index)}>
                Delete
              </button>
              <button className="border" onClick={()=>upHandle(index)}>UP</button>
              <button className="border" onClick={()=>downHandle(index)}>DOWN</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Todo;
