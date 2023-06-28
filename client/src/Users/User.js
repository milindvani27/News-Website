import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "./user.css";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { Navbar } from "../Components/Navbar";

function User() {
  
  const navigate = useNavigate();
  const [error1, setError] = useState({});
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [newsUrl, setNewsUrl] = useState("");

  const ftitle = useRef("");
  const fimage = useRef("");
  const fcontent = useRef("");
  const fnewsUrl = useRef("");

  const handleError = (event) => {
    if (event.target.value === "") {
      const err = "Input Field can-not be empty";
      setError((error1) => ({
        ...error1,
        [event.target.name]: err,
      }));
    }
  };

  const input_validation = (val) => {
    const err = "Input Field can-not be empty";
    setError((error1) => ({
      ...error1,
      [val]: err,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === "") {
      input_validation("title");
    }
    if (image === "") {
      input_validation("image");
    }
    if (content === "") {
      input_validation("content");
    }
    if (newsUrl === "") {
      input_validation("url");
    }

    Axios.post("http://localhost:3001/user_news", {
      title: title,
      image: image,
      content: content,
      newsUrl: newsUrl,
    }).then((response) => {
      console.log(response);
      navigate('/UserData')

    });
    ftitle.current.value = "";
    fimage.current.value = "";
    fcontent.current.value = "";
    fnewsUrl.current.value = "";
  };

  function Cancel(){
    navigate('/')
  }

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      Axios.get("http://localhost:3001/get_user_new/" + id)
        .then((res) => {
          console.log("update ", res);
          setTitle(res.data[0].title);
          setImage(res.data[0].image);
          setContent(res.data[0].content);
          setNewsUrl(res.data[0].newsUrl);
        })
        .catch((err) => console.log("update err ", err));
    }
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    Axios.put("http://localhost:3001/update_user_new/" + id , {
      title: title,
      image: image,
      content: content,
      newsUrl: newsUrl,
    }).then((res) => {
      console.log(res);
      navigate('/UserData')
    });
       
  }

  return (
    <div className="outer">
      <Navbar />

      <div className="create-news">
        <h2 className="card-heading">
          <b>ADD NEWS</b>
        </h2>
        <form action="" onSubmit={handleSubmit}></form>

        <div className="card-content form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            ref={ftitle}
            Placeholder="Title"
            id="title"
            className="form-control"
            name="title"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
              handleError(e);
            }}
          ></input>
          {error1.title && <span className="text-danger">{error1.title}</span>}
        </div>

        <div className="card-content form-group">
          <label htmlFor="img">Image</label>
          <input
            type="url"
            ref={fimage}
            Placeholder="Image Path"
            id="img"
            className="form-control"
            name="image"
            required
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              handleError(e);
            }}
          ></input>
          {error1.image && <span className="text-danger">{error1.image}</span>}
        </div>

        <div className="card-content form-group">
          <label htmlFor="con">Content</label>
          <textarea
            type="text"
            ref={fcontent}
            Placeholder="content"
            id="con"
            className="form-control"
            name="content"
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              handleError(e);
            }}
          ></textarea>
          {error1.content && (
            <span className="text-danger">{error1.content}</span>
          )}
        </div>

        <div className="card-content form-group">
          <label htmlFor="url">NEWS url</label>
          <input
            type="url"
            ref={fnewsUrl}
            Placeholder="News Url"
            id="url"
            className="form-control"
            name="url"
            required
            value={newsUrl}
            onChange={(e) => {
              setNewsUrl(e.target.value);
              handleError(e);
            }}
          ></input>
          {error1.url && <span className="text-danger">{error1.url}</span>}
        </div>

        <div className="card-btns">
          <button onClick={Cancel} className="btn btn-primary">
            Cancel
          </button>

          {id ? <button className="btn btn-success" onClick={handleUpdate}>update</button> :
          <button className="btn btn-success" onClick={handleSubmit}>submit</button>}
        
        </div>
      </div>
    </div>
  );
}
export default User;
