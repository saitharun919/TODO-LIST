import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([
    { text: "gym", category: "Health" },
    { text: "milk", category: "Shopping" },
  ]);

  const [inputfield, setInputfield] = useState("");
  const [category, setCategory] = useState("General");
  const [filtreCategory, setFiltreCategory] = useState("All");

  const categories = ["General", "Health", "Shopping", "Work"];

  const changeHandle = (e) => {
    setInputfield(e.target.value);
  };

  const categoryChangeHandle = (e) => {
    setCategory(e.target.value);
  };

  const addHandle = () => {
    if (inputfield.trim()) {
      setTodos([...todos, { text: inputfield, category }]);
      setInputfield("");
    }
  };

  const deleteHandle = (index) =>{
    setTodos(todos.filter((_,i) =>i !== index ))
  }

  const upHandle = (index) =>{
    if(index > 0){
        const update = [...todos];

        [update[index],update[index-1]]=[update[index-1],update[index]];
        setTodos(update);
    }
  }

  const downHandle = (index) =>{
    if(index < todos.length -1){
        const update = [...todos];
        [update[index], update[index + 1]] = [update[index+1],update[index]];
        setTodos(update);
    }
  }

  const filteredTodos =
    filtreCategory === "All"
      ? todos
      : todos.filter((todo) => todo.category === filtreCategory);

  return (
    <div>
      <h1>TODO LIST</h1>
      <input className="border" onChange={changeHandle}></input>
      <select
        value={category}
        onChange={categoryChangeHandle}
        className="border"
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <button className="border">ADD</button>

      {/* filtre */}
      <div>
        <label>FILTER BY CATEGORY</label>
        <select
          className="border"
          value={filtreCategory}
          onChange={(e)=>setFiltreCategory(e.target.value)}
        >
          <option className="border" value="All">
            ALL
          </option>
          {categories.map((cat, index) => (
            <option className="border" key={index}>{cat}</option>
          ))}
        </select>
      </div>

      {/* display todo */}

      <div>
        <ol>
          {filteredTodos.map((list, index) => (
            <li key={index}>
              <span>
                {list.text} - <strong>{list.category}</strong>
              </span>
              <button className="border" onClick={() =>deleteHandle(index)}>DELETE</button>
              <button className="border" onClick={()=>upHandle(index)} >UP</button>
              <button className="border" onClick={()=>downHandle(index)}>DOWN</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Todo;
