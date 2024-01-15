import React, { Fragment, useState, useContext } from "react";
import './Camera.css'; // Import your stylesheet
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Camera = () => {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [model, setModel] = useState("");
    let category = "Cameras & Lenses"
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState();
    let [loading, setLoading] = useState(false);
    let [weight, setWeight] = useState(4);
    
    let [pixels, setPixels] = useState();
    let [zoom, setZoom] = useState();
    let [focus, setFocus] = useState('');
    let [age, setAge] = useState(100);
    let [storage, setStorage] = useState('');
    let [orgpr, setOrgpr] = useState();
    const [formData, setFormData] = useState(
        {
            Brand: "",
            Model: '',
            Pixels : 0,
            Zoom : 0,
            Focus : '',
            Storage : '',
            Weight : 0,
            Age: 0,
            orgPrice: 0,
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        description = description + "  DETAILS::  Model:" + model + " ,Age:" + age + " ,pixels:"+pixels + " ,zoom:" + zoom + " ,storage:"+storage;
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
            Brand: name,
            Model: model,
            Pixels : pixels,
            Zoom : zoom,
            Focus : focus,
            Storage : storage,
            Weight : weight,
            Age: age,
            orgPrice: orgpr,

        })
        console.log(formData)
        fetch('http://localhost:5000/predictCam', {
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
            <div className='camera' >
                <form preventDefault className="CAMI">
                    <h2>Post Your Camera and Lense Ad</h2>


                    <label htmlFor="lapiName">Enter Brand </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiComapny"
                        value={name}
                        onChange={(e) => { setName(e.target.value); }}
                        required
                    />

                    <label htmlFor="model">Enter Model </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="model"
                        value={model}
                        onChange={(e) => { setModel(e.target.value); }}
                        required
                    />

                    <label htmlFor="age">Age :</label>
                    <input
                        type="number"
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

                    

                    <label htmlFor="Inches">Enter Pixels:</label>
                    <input
                        type="number"
                        id="inches"
                        name="inches"
                        value={pixels}
                        className='INPUT'
                        onChange={(e) => {
                            setPixels(e.target.value);
                        }}
                        required
                    />
                    <label htmlFor="reso">Zoom_Wide</label>
                    <input name="reso" type="number" id="second" required="required" className='INPUT' value={zoom}

                        onChange={
                            (e) => {
                                setZoom(e.target.value);
                            }
                        }
                    />

                    <label htmlFor="reso">Focus</label>
                    <input name="reso" type="text" id="second" required="required" className='INPUT' value={focus}

                        onChange={
                            (e) => {
                                setFocus(e.target.value);
                            }
                        }
                    />


                    <label htmlFor="Ram">Enter Storage </label>
                    <input name="Ran" type="text" id="ram" required="required" className='INPUT' value={storage}

                        onChange={
                            (e) => {
                                setStorage(e.target.value);
                            }
                        }
                    />

                    <label htmlFor="weight">Enter Weight</label>
                    <input name="weight" type="number" id="weight" required="required" className='INPUT' value={weight}

                        onChange={
                            (e) => {
                                setWeight(e.target.value);
                            }
                        }
                    />
                    <label htmlFor="Opr">Enter Orginal Price</label>
                    <input name="Opr" type="number" id="Opr" required="required" className='INPUT' value={orgpr}

                        onChange={
                            (e) => {
                                setOrgpr(e.target.value);
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
                    <button onClick={handlePredict} className="BT BTn">Predict Price</button>
                    <br />
                    <button onClick={handleSubmit} className='BT BTn' >Submit</button>
                </form>
            </div>
        </Fragment>

    );
};

export default Camera;