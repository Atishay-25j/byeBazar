import React, { Fragment, useState, useContext } from "react";
import './Bikes.css'; // Import your stylesheet
import './bike2.png'; // Import your image
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Bikes = () => {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [brand, setBrand] = useState("");
    let category = "Motorcycles"
    let [price, setPrice] = useState("1000");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState();
    let [loading, setLoading] = useState(false);


    let [km, setKm] = useState(0);
    let [owner, setOwner] = useState(0);
    let [age, setAge] = useState('5');
    let [power, setPower] = useState('100');

    const [formData, setFormData] = useState(
        {
            Brand: '',
            Owner: 1,
            Age: 2000,
            Power: 100,
            Driven: 1000
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Enter");
        description = description+ "\n,DETAILS:::\n,  Age:" +age + "\nModel:" + name + "\n,KmsTravel:"+ km ;  
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
                            userId: user.uid, // or provide a default value

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
        // console.log(fuel);
        console.log("In predict");
        setFormData({
            Brand: brand,
            Power: power,
            Age: age,
            Owner: owner,
            Driven: km
        })
        console.log(formData)
        fetch('http://localhost:5000/BikePredict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => setPrice(data))
            .catch(error => console.error('Error:', error));
        console.log('Ended pre')
    }
    return (
        <Fragment>
            {/* <Header/> */}
            {loading && <GoLoading />}
            <div className='bikes' >
                <form preventDefault className="BIKES" >
                    <h2>Post Your Bike Ad</h2>


                    <label htmlFor="transmission">Enter Bike Name </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="bikeName"
                        value={name}
                        onChange={(e) => { setName(e.target.value); }}
                        required
                    />

                    <label htmlFor="brand_name">Enter Brand </label>
                    <select name="brand_name" id="fifth" required="required" value={brand} onChange={(e) => { setBrand(e.target.value); }}>
                        <option value="Royal Enfield" >Royal Enfield</option>
                        <option value="KTM">KTM</option>
                        <option value="Bajaj">Bajaj</option>
                        <option value="Harley">Harley-Davidson</option>
                        <option value="Yamaha">Yamaha</option>
                        <option value="Honda">Honda</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="TVS">TVS</option>
                        <option value="Kawasaki">Kawasaki</option>
                        <option value="Hyosung">Hyosung</option>
                        <option value="Benelli">Benelli</option>
                        <option value="Mahindra">Mahindra</option>
                        <option value="Triumph">Triumph</option>
                        <option value="Ducati">Ducati</option>
                        <option value="BMW">BMW</option>
                    </select>

                    <label htmlFor="year">Age:</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={age}
                        onChange={
                            (e) => {
                                setAge(e.target.value);
                            }
                        }
                        required
                    />

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
                    <label htmlFor="kmDriven">No. Owners used the bike</label>
                    <input name="owner" type="number" id="second" required="required" className='INPUT' value={owner}

                        onChange={
                            (e) => {
                                setOwner(e.target.value);
                            }
                        }
                    />


                    <label htmlFor="power">Enter Power :</label>
                    <input name="power" type="text" id="power" required="required" className='INPUT' value={power}

                        onChange={
                            (e) => {
                                setPower(e.target.value);
                            }
                        }
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
                    <button onClick={handlePredict} className="BTI BTin">Predict Price</button>
                    <br />
                    <button onClick={handleSubmit} className='BTIn BTI' >Submit</button>
                </form>
            </div>
        </Fragment>

    );
};

export default Bikes;