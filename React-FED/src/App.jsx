import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, settodos] = useState([]);
  const [todoperpage, setTodosperPage] = useState(20);
  const [currentpage, setCurrentPage] = useState(1);

  const totoalPages = Math.ceil(todos.length / todoperpage);
  console.log(totoalPages, "totoalPages");

  //items
  const pages = [...Array(totoalPages + 1).keys()].slice(1);
  console.log(pages, "pages");

  const indexLast = currentpage * todoperpage; //10
  //console.log(indexLast, "indexLast");
  const indexFirst = indexLast - todoperpage; //10

  const visiblerTodo = todos.slice(indexFirst, indexLast);
  console.log(visiblerTodo, "visiblerTodo");

  const fetchdata = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await data.json();
    //console.log(res);
    settodos(res);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const perveHandler = () => {
    if (currentpage !== 1) setCurrentPage(currentpage - 1);
  };
  const nextHandler = () => {
    if (currentpage !== totoalPages) setCurrentPage(currentpage + 1);
  };

  return (
    <div className="App">
      {/* <CountryList country={countries} /> */}
    
      <div>
        {visiblerTodo.map((page) => (
          <p key={page.id}>{page.title}</p>
        ))}

        <p>
          <span onClick={perveHandler}>prev</span>
          {pages.map((page, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentPage(page)}
              className={`${currentpage === page ? "active" : ""}`}
            >{`${page} | `}</span>
          ))}
          <span onClick={nextHandler}>next</span>
        </p>
      </div>
    </div>
  );
}

export default App
