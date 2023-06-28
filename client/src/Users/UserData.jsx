import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from "axios";
import { Navbar } from "../Components/Navbar";
import Footer from "../Components/Footer";

import "./userdata.css";

function UserData() {

    const [Data, setData] = useState(); 
    const token = localStorage.getItem('token')

    React.useEffect(() => {
      getUsers()
    }, []);

    function getUsers() {

      Axios.get("http://localhost:3001/user_news").then((response) => {
      console.log("in a userdata", response.data);
      setData(response.data);
      console.log("Dletet");
    });
    }

    var [visible, setVisible] = useState({});
    const [change, setChange] = useState({})

    const showMoreItems = (i, len)=> {
      
      console.log(change[i],"12345")
      console.log(i,"12345")

  
      if(!change[i]){
        setVisible({...visible, [i]: 100 + len})
        setChange({...change,[i]:true}) 
      }
      else {
      setVisible({...visible, [i]: 100 - len})
      setChange({...change,[i]:false}) 

      }
    };

    const handleDelete = (id) => {
      Axios.delete("http://localhost:3001/delete_user_new/" + id)
      .then((res) => {
        console.log(res);
        getUsers();
      });
    }

  return (

      <div>
      <Navbar />
      
    <div className="container my-4">
      <div className="container d-flex justify-content-center align-items-center">
        <h3>
          <u>TOP HEADLINES</u>
        </h3>
      </div>
      <div className="heading d-flex justify-content-center align-items-center">
        <h1>News</h1>
      </div>
      
       <div className="parent">
        {Data
          ? Data.map((items, index) => (
              <div className="parent-layout" key={index}>
                <div>
                  <div className="title">
                    <h5>
                      <b>{items.title}</b>
                    </h5>
                  </div>
                  <div className="image">
                    <img
                      src={items.image}
                      alt="Not found!!!!"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    ></img>
                  </div>
                  <div className="content"  >
                    <p id='para' className="my-2">{items.content.slice(0, visible[index])}  
                      <span onClick={() => showMoreItems(index, (items.content.length))}> 
                      <b>{change[index] ? " Show Less" : " Show More"}</b></span>
                      <b>{change.index}</b>
                    </p>
                    
                  </div>

                  <div className="user-link">
                    <a href={items.newsUrl} target="blank">
                        View more
                      </a>
                  </div> 
                

                <div className="user-btns">
                  { token &&  <>
                  <button className="editBtn btn btn-success"><Link to={`/user/${items.id}`} >Edit </Link></button>
                  <button  className="btn btn-primary" onClick={() => handleDelete(items.id)} >Delete</button>
                  </>}
                </div>
               
                </div>
              </div>
            ))
          : "Loading...."}
         
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserData;