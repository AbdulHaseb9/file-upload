import { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [file, setfile] = useState()
  const [img, setimg] = useState("")

  const changefile = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert('please choose file')
    }
    const formData = new FormData()

    formData.append('file', file)

    // change PORT according to your PORT 
    const api = await axios.post('http://localhost:5000/fileupload', formData)

    setimg(api.data.image.url)

  }

  return (
    <div>
      <form onSubmit={changefile}>
        <input type="file" name='file' onChange={e => setfile(e.target.files[0])} />
        <input type="submit" />
      </form>
      <img src={img} alt="" style={{ height: '300px', width: "300px", marginTop: "50px" }} />
    </div>
  )
}

export default App
