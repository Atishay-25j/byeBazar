import React, { Fragment, useState, useContext } from "react";
import './Cars.css'; // Import your stylesheet
import './image.png'; // Import your image
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Cars = () => {
  
  const { user } = useContext(AuthContext);
  const history = useHistory();
  let [name, setName] = useState("");
  let [comapny, setComapny] = useState("");
  let category = "Cars"
  let [price, setPrice] = useState("1000");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState();
  let [loading, setLoading] = useState(false);


  let [km, setKm] = useState(0);
  let [year, setYear] = useState(2000);
  let [transmission, setTransmission] = useState('');
  let [fuel, setFuel] = useState("");
  const [formData, setFormData] = useState(
    {
      company : '',
      car_model: '',
      year : 2000,
      fuel_type: '',
      driven : ''
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    description = description + " DETAILS:::  KmsTravel : " + km + " ,transmission : " + transmission + " ,Fuel : "+ fuel;
    console.log("Enter");
    console.log(user)
    console.log(user.uid)
    setLoading(true);
    let date = new Date().toDateString();
    console.log("submiii");
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              description,
              url,
              userId: user.uid , // or provide a default value

              createdAt: date,
            })
            .then(() => {
              history.push("/");
            });
        });
      });
    console.log('Ended Submit');
  };


  const handlePredict = (event) => {
    event.preventDefault();
    console.log(fuel);
    console.log("In predict");
    setFormData({
      company : comapny,
      car_model : name,
      year : year,
      fuel_type: fuel,
      driven : km
    })
    console.log(formData)
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => setPrice(data))
      .catch(error => console.error('Error:', error));
  }
  return (
    <Fragment>
      {/* <Header/> */}
      {loading && <GoLoading />}
      <div className='cars' >
        <form preventDefault className="CARS">
          <h2>Post Your Car Ad</h2>


          <label htmlFor="transmission">Enter Company </label>
          <input
            type="text"
            id="selectCompany"
            name="selectCompany"
            value={comapny}
            onChange={(e) => { setComapny(e.target.value); }}
            required
          />

          <label htmlFor="transmission">Select Model </label>
          <input
            type="text"
            id="selectModel"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}

            required
          />

          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={
              (e) => {
                setYear(e.target.value);
              }
            }
            required
          />

          <label htmlFor="fuel">Fuel *</label>
          <select
            id="fuel"
            name="fuel"
            value={fuel}
            onChange={
              (e) => { setFuel(e.target.value); }
            }
            required
          >
            <option value="CNG & Hybrids">CNG & Hybrids</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="LPG">LPG</option>
            <option value="Petrol">Petrol</option>
          </select>

          <label htmlFor="transmission">Transmission *</label>
          <select
            id="transmission"
            name="transmission"
            value={transmission}
            onChange={
              (e) => {
                setTransmission(e.target.value);
              }
            }
            required
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>

          <label htmlFor="kmDriven">KM driven *</label>
          <input
            type="text"
            id="kmDriven"
            name="kmDriven"
            value={km}
            min="0"
            className='INPUT'
            onChange={(e) => {
              setKm(e.target.value);
            }}
            required
          />


          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="Description"
            rows="4"
            maxLength="4096"
            className='INPUT'
            value={description}
            onChange={
              (e) => {
                setDescription(e.target.value);
              }
            }
            required
          ></textarea>

         

          <label htmlFor="photos">Upload Photos</label>
          <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        ></img>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            className='INPUT'
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            required
          />

          <h2>Price Prediction</h2>
          <input className='INPUT' style={{ width: '50%', marginRight: '10px' }} type="text" readOnly name='predictedPrice' value={price} />
          <button onClick={handlePredict} className="BTN BTNN">Predict Price</button>
          <br />
          <button onClick={handleSubmit} className='BTNN BTN' >Submit</button>
        </form>
      </div>
    </Fragment>

  );
};

export default Cars;