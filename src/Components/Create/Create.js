import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  // const { user } = useContext(AuthContext);
  // const history = useHistory();
  // let [name, setName] = useState("");
  let [category, setCategory] = useState("");
  // let [price, setPrice] = useState("");
  // let [description, setDescription] = useState("");
  // let [image, setImage] = useState();
  let [loading,setLoading]=useState(false);
  // const handleSubmit = () => {
  //   setLoading(true);
  //   let date = new Date().toDateString();
  //   Firebase.storage()
  //     .ref(`/image/${image.name}`)
  //     .put(image)
  //     .then(({ ref }) => {
  //       ref.getDownloadURL().then((url) => {
  //         Firebase.firestore()
  //           .collection("products")
  //           .add({
  //             name,
  //             category,
  //             price,
  //             description,
  //             url,
  //             userId: user.uid,
  //             createdAt: date,
  //           })
  //           .then(() => {
  //             history.push("/");
  //           });
  //       });
  //     });
  // };
  
  return (
    <Fragment className='app'>
      <Header />
    { loading && <GoLoading/> }
    <div className="center">
    <div className="centerDiv">
      
        <br />
        <label>Category:</label>
        <select
          name="Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="input"
        > <option >Select Category</option>
          <option value="Cars">Cars</option>
          <option value="Cameras & Lenses">Cameras & Lenses</option>
          <option value="Computers & Laptops">Computers & Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Motorcycles">Motorcycles</option>
          <option value="Furniture">Furniture</option>
          
        </select>
        <br />
        {/* <label>Price</label>
        <br />
        <input
          className="input"
          type="number"
          name="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          className="input"
          type="text"
          name="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />

        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        ></img>

        <br />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>
          upload and Submit
        </button> */}
        {
          category== "Cars" && <Link to= '/Cars'>Submit</Link>
        }
        {
          category== "Motorcycles" && <Link to = '/Bikes'>Submit</Link>
        }
        {
          category =="Computers & Laptops"  && <Link to ='/Laptop'>Submit</Link>
        }
        {
          category =="Mobile Phones" && <Link to ='/Mobile'>Submit</Link>
        }
        {
          category =="Cameras & Lenses" && <Link to ='/Camera'>Submit</Link>
        }
        {
          category=="Furniture" && <Link to ='/Furniture'>Submit</Link>
        }
      </div> 
    </div>
      
    </Fragment>
  );
};

export default Create;
