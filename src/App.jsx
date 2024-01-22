import { useState, useEffect } from 'react'
import './App.css';
import axios from "axios";

function App() {

  const [img, setImg] = useState({});
  const [images, setImages] = useState([]);

  const handleImg = (e) => {
    const imgFile = URL.createObjectURL(e.target.files[0]);
    const formData = new FormData();
    formData.append("fileUpload", imgFile);
    setImg(formData);
  };

  const upload = async (e) => {
    e.preventDefault()
    const { data } = await axios.post("/api/uploadImg", img).catch((err) => {
      console.log(err);
      return;
    });

    console.log(data.message);
    setImages(data)
  };

  const getImages = async () => {
    const { data } = await axios.get("/api/images").catch((err) => {
      console.log(err);
      return;
    });

    setImages(data);
  };

  const eachImage = images.map(image => <img style={{maxHeight: "200px"}} src={image.image} alt="img" />);

  useEffect(() => {
    getImages();
  }, [])

  console.log(images);
  return (
    <>
      <h1>Image Uploader</h1>
      <form onSubmit={upload}>
        <input type="file" onChange={handleImg}/>
        <br />
        <img style={{maxHeight: "300px"}}src={img} alt="img" />
        <br />
        <button>upload</button>
      </form>
      {eachImage}
    </>
  )
}

export default App
