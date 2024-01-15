import React, { Fragment, useState, useContext, Suspense } from "react";
import './Furniture.css'; // Import your stylesheet
import Header from '../Header/Header';
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Furniture = () => {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    let [name, setName] = useState("");
    let [type, setType] = useState("");
    let category = "Furniture"
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState();
    let [loading, setLoading] = useState(false);

    let [style, setStyle] = useState('');
    let [age ,setAge] = useState();
    let [condition ,setCondition] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        description = description + " DETAILS:::: Style : " + style + ",material : "+type+" ,age : " + age + " ,condition : " + condition
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

    return (
        <Fragment>
            {/* <Header/> */}
            {loading && <GoLoading />}
            <div className='furni' >
                <form preventDefault className="FURNI">
                    <h2>Post Your Furniture Ad</h2>


                    <label htmlFor="lapiName">Enter Type </label>
                    <input
                        type="text"
                        id="selectCompany"
                        name="lapiComapny"
                        value={name}
                        placeholder="table"
                        onChange={(e) => { setName(e.target.value); }}
                        required
                    />

                    <label htmlFor="brand_name">Enter material </label>
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

                    <label htmlFor="Inches">Enter Style</label>
                    <input
                        type="text"
                        id="inches"
                        name="inches"
                        value={style}
                        className='INPUT'
                        onChange={(e) => {
                            setStyle(e.target.value);
                        }}
                        required
                    />
                    

                    <label htmlFor="cpu">Condition :</label>
                    <input name="cpu" type="text" id="cpu" required="required" className='INPUT' value={condition} placeholder="good/refurbished"

                        onChange={
                            (e) => {
                                setCondition(e.target.value);
                            }
                        }
                    />
                    <label htmlFor="Ram">Enter price</label>
                    <input name="Ran" type="number" id="ram" required="required" className='INPUT' value={price}

                        onChange={
                            (e) => {
                                setPrice(e.target.value);
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

                    <br />
                    <button onClick={handleSubmit} className='BTI BTIn' >Submit</button>
                </form>
            </div>
        </Fragment>

    );
};

export default Furniture;