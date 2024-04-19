import { useEffect, useState } from 'react';
import './App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import apiRequest from './apiRequest';


function App() {
  const API_URL = `http://localhost:3500/items`
  const [items, setItems] = useState([])
  const [todo, setTodo] = useState("")
  const [search, setSearch] = useState("")
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data Not received")
        const data = await response.json()
        setItems(data)
        setFetchErr(null)
      } catch (err) {
        setFetchErr(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      fetchData()
    }, 1000);
  }, [])

  const handleCheck = async (id) => {
    const newItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    handleStore(newItems)

    const curItem = newItems.filter(item => item.id === id)
    const updateObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: curItem[0].checked })
    }
    const curUrl = `${API_URL}/${id}`
    // console.log(curUrl)
    const result = await apiRequest(curUrl, updateObj)
    if (result) setFetchErr(result)
  }

  const handleDelete = async (id) => {
    const newItems = items.filter(item => item.id !== id)
    handleStore(newItems)

    const curItem = items.filter(item => item.id === id)
    const deleteOpt = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curItem)
    }
    const curUrl = `${API_URL}/${id}`
    const result = await apiRequest(curUrl, deleteOpt)
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!todo) {
      alert("Please Enter something")
      return
    };
    let maxID = 0
    for (let i = 0; i < items.length; i++) {
      maxID = Math.max(items[i].id, maxID)
    }
    const newTodo = { id: String(maxID + 1), checked: false, item: todo }
    const newItems = [...items, newTodo]
    handleStore(newItems)
    setTodo("")

    const postObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    }
    const result = await apiRequest(API_URL, postObject)
    if (result) setFetchErr(result)
  }

  const handleStore = (finalItem) => {
    setItems(finalItem)
    localStorage.setItem("todos", JSON.stringify(finalItem))
  }

  return (
    <div className="App">
      <Header
        title="To Do List"
      />
      {fetchErr && !isLoading && <p className='info'>{fetchErr}</p>}
      {isLoading && <p className='info'>Loading...</p>}
      {!fetchErr && !isLoading &&
        <Content
          items={items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          todo={todo}
          setTodo={setTodo}
          handleAddItem={handleAddItem}
          search={search}
          setSearch={setSearch}
        />
      }
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
