import React, { Fragment, useState, useContext } from "react";
import './Mobiles.css'; // Import your stylesheet
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Mobile = () => {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [type, setType] = useState("");
    let category = "Mobile Phones"
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState();
    let [loading, setLoading] = useState(false);
    let [weight, setWeight] = useState(4);
    let [G, setG] = useState('4G');
    let [inches, setInches] = useState('');
    let [rear, setRear] = useState('');
    let [front, setFront] = useState('');
    let [age, setAge] = useState(100);
    let [ram, setRam] = useState('');
    let [mem, setMem] = useState('');
    let [orgpr, setOrgpr] = useState();
    let [battery, setBattery] = useState('');
    const [formData, setFormData] = useState(
        {
            Brand: '',
            Os: '',
            Screen : '',
            g : '',
            Rear : '',
            Front : '',
            Mem : '',
            Ram : '',
            Battery : '',
            Weight : '',
            Age: 100,
            orgPrice: 1000,
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        description = description + "DETAILS:::  Os : " + type + " ,Screen : " + inches + " ," + G + " : phone ,RAM : "+ ram + " ,Memory : " + mem + " ,battery : " + battery;
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
            Os: type,
            Screen : inches,
            g : G,
            Rear : rear,
            Front : front,
            Mem : mem,
            Ram : ram,
            Battery : battery,
            Weight : weight,
            Age: age,
            orgPrice: orgpr,

        })
        console.log(formData)
        fetch('http://localhost:5000/predictMobi', {
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
            <div className='mobiles' >
                <form preventDefault className="MOBI">
                    <h2>Post Your Mobile Or Tablet Ad</h2>


                    <label htmlFor="lapiName">Enter Brand </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiComapny"
                        value={name}
                        onChange={(e) => { setName(e.target.value); }}
                        required
                    />

                    <label htmlFor="brand_name">Enter Os </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiName"
                        value={type}
                        onChange={(e) => { setType(e.target.value); }}
                        required
                    />

                    <label htmlFor="age">Days Used:</label>
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

                    <label htmlFor="brand_name">4G/5G </label>
                    <select name="brand_name" id="fifth" required="required" value={G} onChange={(e) => { setG(e.target.value); }} className="INPUT">
                        <option value="4G" >4G</option>
                        <option value="5G">5G</option>
    
                    </select>

                    <label htmlFor="Inches">Screen Size:</label>
                    <input
                        type="text"
                        id="inches"
                        name="inches"
                        value={inches}
                        className='INPUT'
                        onChange={(e) => {
                            setInches(e.target.value);
                        }}
                        required
                    />
                    <label htmlFor="reso">Rear Camera [MP]</label>
                    <input name="reso" type="text" id="second" required="required" className='INPUT' value={rear}

                        onChange={
                            (e) => {
                                setRear(e.target.value);
                            }
                        }
                    />

                    <label htmlFor="reso">Front Camera [MP]</label>
                    <input name="reso" type="text" id="second" required="required" className='INPUT' value={front}

                        onChange={
                            (e) => {
                                setFront(e.target.value);
                            }
                        }
                    />


                    <label htmlFor="Ram">Ram in GB (Enter only no.)</label>
                    <input name="Ran" type="number" id="ram" required="required" className='INPUT' value={ram}

                        onChange={
                            (e) => {
                                setRam(e.target.value);
                            }
                        }
                    />
                    <label htmlFor="Mem">Memory in GB (Enter only no.)</label>
                    <input name="Mem" type="number" id="ram" required="required" className='INPUT' value={mem}

                        onChange={
                            (e) => {
                                setMem(e.target.value);
                            }
                        }
                    />

                    <label htmlFor="Ops">Battery [mAH]</label>
                    <input name="Ops" type="text" id="Ops" required="required" className='INPUT' value={battery}

                        onChange={
                            (e) => {
                                setBattery(e.target.value);
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
                    <button onClick={handlePredict} className="BTC BTCn">Predict Price</button>
                    <br />
                    <button onClick={handleSubmit} className='BTC BTCn' >Submit</button>
                </form>
            </div>
        </Fragment>

    );
};

export default Mobile;