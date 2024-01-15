import React, { Fragment, useState, useContext } from "react";
import './Laptop.css'; // Import your stylesheet
import './Laptop.jpg'; // Import your image
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Laptop = () => {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [type, setType] = useState("");
    let category = "Computers & Laptops"
    let [price, setPrice] = useState("1000");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState();
    let [loading, setLoading] = useState(false);
    let [weight, setWeight] = useState(4);

    let [inches, setInches] = useState(0);
    let [reso, setReso] = useState('');
    let [age, setAge] = useState(5);
    let [cpu, setCpu] = useState('');
    let [ram, setRam] = useState(4);
    let [mem, setMem] = useState(1024);
    let [orgpr, setOrgpr] = useState(0);
    let [ops, setOps] = useState('');
    const [formData, setFormData] = useState(
        {
            Inches: 14,
            Weight: 10,
            Age: 2,
            orgPrice: 100,
            Ram :4,
            Cpu: ''
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        description = description + "  DETAILS:::  Type : "+ type + " ,inches : " + inches + " ,cpu : "+cpu +" ,RAM : "+ram + " ,Storage : "+ mem + " ,ops :" +ops;  
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
            Inches: inches,
            Weight: weight,
            Age: age,
            orgPrice: orgpr,
            Ram : ram,
            Cpu: cpu
        })
        console.log(formData)
        fetch('http://localhost:5000/predictLapi', {
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
            <div className='laptops' >
                <form preventDefault className="LAPI">
                    <h2>Post Your Laptop and Computer Ad</h2>


                    <label htmlFor="lapiName">Enter Company </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiComapny"
                        value={name}
                        onChange={(e) => { setName(e.target.value); }}
                        required
                    />

                    <label htmlFor="brand_name">Enter TypeName </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiName"
                        value={type}
                        onChange={(e) => { setType(e.target.value); }}
                        required
                    />

                    <label htmlFor="age">Age:</label>
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

                    <label htmlFor="Inches">Inches</label>
                    <input
                        type="number"
                        id="inches"
                        name="inches"
                        value={inches}
                        className='INPUT'
                        onChange={(e) => {
                            setInches(e.target.value);
                        }}
                        required
                    />
                    <label htmlFor="reso">Screen Resolution</label>
                    <input name="reso" type="text" id="second" required="required" className='INPUT' value={reso}

                        onChange={
                            (e) => {
                                setReso(e.target.value);
                            }
                        }
                    />


                    <label htmlFor="cpu">Cpu :</label>
                    <input name="cpu" type="text" id="cpu" required="required" className='INPUT' value={cpu}

                        onChange={
                            (e) => {
                                setCpu(e.target.value);
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

                    <label htmlFor="Ops">Enter OpSys</label>
                    <input name="Ops" type="text" id="Ops" required="required" className='INPUT' value={ops}

                        onChange={
                            (e) => {
                                setOps(e.target.value);
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
                    <button onClick={handlePredict} className="bTn bTnn">Predict Price</button>
                    <br />
                    <button onClick={handleSubmit} className='bTnn bTn' >Submit</button>
                </form>
            </div>
        </Fragment>

    );
};

export default Laptop;