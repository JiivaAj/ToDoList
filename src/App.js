import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState,useEffect } from "react";
import AddItem from "./AddItem";
import apiRequest from "./apiRequest";
function App() {
  const API_URL = 'http://localhost:3500/items';
  const[items,setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const[isLoading,setIsLoading] = useState(true)

 useEffect(() =>{
    const fetchitems = async () =>{
      try{
        const response = await fetch(API_URL)
        if(!response.ok) throw Error("Data not received");
        const listItems = await response.json();
        setItems(listItems)
        setFetchError(null)
        

      } catch (err){
          setFetchError(err.message)
      } finally{
        setIsLoading(false)
      }
  }
  setTimeout(()=>{
    (async () => await fetchitems())()
  },2000)
  
 },[])       
 
const addItem = async (item) =>{
     const id = items.length ? items[items.length-1].id + 1 : 1;
    
     const addNewItem = {id, checked:false, item}
     const listItems = [...items,addNewItem]
     setItems(listItems)

     const postOptions ={
      method: 'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
 }

//'it' is a object or parameter which is used to handle or traverse the array object

const handleCheck = async (id) =>{
   const listItems = items.map((it) => 
   it.id === id ? {...it,checked:!it.checked } :it)
   setItems(listItems)
  
   const myItem = listItems.filter((it)=>
   it.id === id)
   const updateOptions ={
    method: 'PATCH',
    headers : {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({checked:myItem[0].checked})
  }
 
  const reqUrl = `${API_URL}/${id}`
 
  const result = await apiRequest(reqUrl,updateOptions)
  if(result) setFetchError(result)
}
   

//filter will only keep the condition satisfied things remaining will be removed

 const handleDelete = async (id) =>{
  const listItems = items.filter((it) => 
  it.id!==id)
  setItems(listItems)
 
  const deleteOptions={method:'Delete'}
  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl,deleteOptions)
  if(result) setFetchError(result)
 }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
    <Header />
    <AddItem
      newItem = {newItem}
      setNewItem = {setNewItem}
      handleSubmit = {handleSubmit}
    />
    <main>
      {isLoading && <p>Loading Items</p>}
      {fetchError && <p>{`Error:  ${fetchError}`}</p>}
      {!isLoading && !fetchError && < Content 
        items = {items}
        handleCheck={handleCheck}
        handleDelete = {handleDelete}
      />}
    </main>
    <Footer
      length = {items.length}
    />
    </div>
  );
}

export default App;
