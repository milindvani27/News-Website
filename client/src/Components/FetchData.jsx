/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Axios from "axios";
import "./fetchdata.css";

const FetchData = ({ cat = "Trending News" }) => {
  const [Data, setData] = useState("");
  const fetchData = async () => {
    await axios
      .get(
        cat !== "Trending News"
          ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=0dc531c7c433434585da914ab56c4f5d`
          : "https://newsapi.org/v2/top-headlines?country=in&apiKey=0dc531c7c433434585da914ab56c4f5d"
      )

      .then((res) => {
        const dataone = res.data.articles;
        console.log("this is a ", dataone);

        Axios.post("http://localhost:3001/new", {
          data: res.data.articles,
          cat: cat,
        }).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  for (let i = 0; i < Data.length; i++) {
    if (Data[i].urlToImage === null) {
      Data[i].urlToImage =
        "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=";
    }
  }

  return (
    <div className="container my-4">
      <div className="container d-flex justify-content-center align-items-center">
        <h3>
          <u>TOP HEADLINES</u>
        </h3>
      </div>
      <div className="heading d-flex justify-content-center align-items-center">
        <h1>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h1>
      </div>
      
      
      <div className="parent">
        {Data
          ? Data.map((items, index) => (
              <div className="parent-layout">
               
                <div>
                  <div className="title">
                    <h5>
                      <b>{items.title}</b>
                    </h5>
                  </div>
                  <div className="image">
                    <img
                      src={items.urlToImage}
                      alt="Not found!!!!"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    ></img>
                  </div>
                  <div className="content">
                    <p className="my-2">{items.content}</p>
                    <a href={items.url} target="blank">
                      View more
                    </a>
                  </div>
                </div>
              </div>
            ))
          : "Loading...."}
      </div>
    </div>
  );
};

export default FetchData;
