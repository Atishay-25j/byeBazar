import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import Cars from '../Components/Cars/Cars'

import Bikes from '../Components/Bikes/Bikes'
import Laptop from '../Components/Laptop/Laptop'
import Mobile from '../Components/Mobiles/Mobiles'
import Camera from '../Components/Camera/Camera'
import Furniture from '../Components/Furniture/Furniture'
function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/create">
               <CreatePost/>
           </Route>
    
           
           <Route path="/view">
               <ViewPost/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>

           <Route path="/Cars">
                <Cars/>
           </Route>
           <Route path="/Bikes">
                <Bikes/>
           </Route>
           <Route path="/Laptop">
                <Laptop/>
           </Route>
           <Route path="/Mobile">
                <Mobile/>
           </Route>
            <Route path='/Camera'>
                <Camera/>
            </Route>
            <Route path='/Furniture'>
                <Furniture/>
            </Route>
           

           
       </Router>
    )
}

export default MainRoutes
