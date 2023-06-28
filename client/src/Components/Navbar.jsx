import React from "react";
import "./navbar.css"

export const Navbar = () => {

  const token = localStorage.getItem("token")

  const deletetoken = () => {
    localStorage.removeItem("token");
  }
  
  return (
      <div>
        <ul className="card-ul">
          <li className="card-li"><a className="card-a" href="/">Home</a></li>
          <li className="card-li"><a className="card-a" href="/general">General</a></li>
          <li className="card-li"><a className="card-a" href="/business">Business</a></li>
          <li className="card-li"><a className="card-a" href="/health">Health</a></li>
          <li className="card-li"><a className="card-a" href="/science">Science</a></li>
          <li className="card-li"><a className="card-a" href="/sports">Sports</a></li>
          <li className="card-li"><a className="card-a" href="/technology">Technology</a></li>
          <li className="card-li"><a className="card-a" href="/UserData">News</a></li>
          { token && <li className="card-li"><a className="card-a" href="/user">Add-News</a></li>}
          <li className="aa">


          {!token && <><li className="card-li"><a className="card-a" href="/register">Sign-up</a></li>
          <li className="card-li"><a className="card-a" href="/login">Sign-In</a></li></>} 
            
          {token && <li className="card-li" onClick={deletetoken}><a className="card-a" href="/login">Logout</a></li>}
        
          </li>
        </ul>
      </div>
  );
};
