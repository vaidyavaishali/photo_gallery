import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"
// import Model from "reactstrap"
import { ModalHeader, Modal, ModalBody } from "reactstrap"
function App() {
  // const pass = prompt("Enter a password")
  const [data, setdata] = useState([])
  const [model, setmodel] = useState(false)
  const [input, setinput] = useState({ label: "", file: "" })
  const [search, setSearch] = useState("")
  const [filter_data, setFilterData] = useState([])
  const [id, setId] = useState("")
  const [prompt, setPrompt] = useState(false)
  const [inp, setIn] = useState("")
  useEffect(() => {
    axios.get("http://localhost:8000/gallery").then((res) => {
      setdata(res.data.photos.reverse())
    }).catch(e => {
      console.log(e)
    })
  }, [data])

  const FormSubmit = (e) => {
    axios.post("http://localhost:8000/addphoto", input).then((res) => {
      if (res.status === 200) {
        setmodel(!model)
      }
    })
  }

  const Handle_Delete = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:8000/delete/${id}`).then((res) => {
      if (res.status === 200) {
        console.log("deleted successfully")
      }
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    if (search === "") {
      setFilterData(data)
      return
    }
    let fs = data.filter((items, i) => (items.label.toLowerCase().includes(search)))
    setFilterData(fs)
  }, [search, data, filter_data, setFilterData])


  return (
    <div className="App">
      <nav id="header" className="flex">
        <span className="flex">
          <span className="material-symbols-outlined user-icon">
            person
          </span>
          <span className="heading">
            <h3>My Unsplash</h3>
            <p>devchallenge.io</p>
          </span>
        </span>
        <input type="text" placeholder="search by name" id="search-input" onChange={(e) => { setSearch(e.target.value) }} />
        <button id="add-photo-btn" onClick={() => { setmodel(true) }}>Add Photo</button>
      </nav>
      <div>

        <Modal
          isOpen={prompt}
          toggle={() => setPrompt(!prompt)}
        >
          <ModalHeader>
            Are You Sure ?
          </ModalHeader>
          <ModalBody>
            <form>
              <h7>Enter Password</h7>
              <input type="text" onChange={(e) => { setIn(e.target.value) }} />
              <button className='cancel' onClick={() => { setPrompt(!prompt) }}>Cancel</button>
              <button className='submit' onClick={(e) => { { Handle_Delete(e); setPrompt(false) } }} >Submit</button>
            </form>

          </ModalBody>
        </Modal>

        <Modal
          size="lg"
          isOpen={model}
          toggle={() => setmodel(!model)}>
          <ModalHeader>
            Add New Photo
          </ModalHeader>
          <ModalBody>
            <fieldset>
              <div>
                <label>Label</label>
                <input type='text' placeholder='Nature image' onChange={(e) => { setinput({ ...input, label: e.target.value }) }} />
              </div>
              <div>
                <label>Photo URL</label>
                <input type='text' placeholder='https://th.bing.com/th?id=OIP.1YM53mG10H_U25iPjop83QHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2' onChange={(e) => { setinput({ ...input, file: e.target.value }) }} />
              </div>
              <div id="sub-cancel">
                <button className='cancel' onClick={() => { setmodel(!model) }}>Cancel</button>
                <button className='submit' onClick={FormSubmit}>Submit</button>
              </div>
            </fieldset>
          </ModalBody>
        </Modal>



      </div>
      <div className='display-img flex'>
        {filter_data.map((items, i) => {
          return (
            <div key={i} className='container'>
              <div className='img-div'>
                <img src={items.file} />
              </div>
              <div className='label-div'>
                <img src={items.file} id='dlt-file' />
                <button className='delete-btn' onClick={(e) => { setPrompt(true); setId(items._id) }}>delete</button>
                <h3>{items.label}</h3>
              </div>

            </div>

          )
        })}
      </div>
    </div>


  );
}

export default App;
