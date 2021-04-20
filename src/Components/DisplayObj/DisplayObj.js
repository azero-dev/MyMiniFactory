import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from '../Loading/Loading';
import './DisplayObj.css';
import logosmall from '../../img/logosmall.png';


export const DisplayObj = () => {

  let [page, setPage] = useState(18);
  let url = `https://www.myminifactory.com/api/v2/users/MyMiniFactory/objects?page=${page}&per_page=20`;
  const key = process.env.REACT_APP_API_KEY;
  const [totalData, setTotalData] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Off")


  // Manage data
  useEffect(() => {
    getItems();
  }, [page])


  const getItems = async () => {
    setLoading(true)

    const dataFetched = await axios.get(url, { headers: { 'Key': key } })
    const dataArray = dataFetched.data.items;

    setTotalData(dataArray)
    setLoading(false)
  }


  // Navigate pages
  const prevPage = () => {
    setPage(page - 1);
  }
  const nextPage = () => {
    setPage(page + 1)
  }


  // Filter
  const handlefilterClick = (e) => {

    if (filter === "Off") {
      setFilter("On");
    } else {
      setFilter("Off")
    }

    if (filter === "On") {
      document.getElementById("filter-button").style.backgroundColor = "red";
    } else if (filter === "Off") {
      document.getElementById("filter-button").style.backgroundColor = "rgb(4, 187, 4)";
    }
  }

  return (
    <>
      <div className="header">
        <a href="https://www.myminifactory.com/">
          <img src={logosmall} alt="Logo" />
        </a>
      </div>
      <div id="filter">
        <div>
          <p>Filter by featured: </p>
          <button onClick={handlefilterClick} id="filter-button">{filter}</button>
        </div>
        <p id="pageNumber">Page: {page}</p>
      </div>
      {loading === false ? (
        <div className="body_content">
          <div className="body_bg">
            {totalData.map(elem => {
              if (filter === "Off") {
                return (
                  <div>
                    <div className="container">
                      <img src={elem.images[0].thumbnail.url} alt={elem.name} />
                      <div className="bg-gradient"></div>
                      <p className="e1">Showing picture 1/10</p>
                      <div className="arrows-canvas">
                        <div className="box-bg bb-left">
                          <i className="box_arrow a-left"></i>
                        </div>
                        <div className="box-bg bb-right">
                          <i className="box_arrow a-right"></i>
                        </div>
                      </div>
                      <div className="subcontainer">
                        <p className="e2">{elem.name}</p>
                        <p className="e3">£xx,xx</p>
                      </div>
                    </div>
                  </div>
                )
              } else if (filter === "On" && elem.featured === true) {
                return (
                  <div>
                    <div className="container">
                      <img src={elem.images[0].thumbnail.url} alt={elem.name} />
                      <div className="bg-gradient"></div>
                      <p className="e1">Showing picture 1/10</p>
                      <div className="arrows-canvas">
                        <div className="box-bg bb-left">
                          <i className="box_arrow a-left"></i>
                        </div>
                        <div className="box-bg bb-right">
                          <i className="box_arrow a-right"></i>
                        </div>
                      </div>
                      <div className="subcontainer">
                        <p className="e2">{elem.name}</p>
                        <p className="e3">£xx,xx</p>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          <div>
            <div className="arrows-canvas body-arrow">
              <div className="box-bg bb-left b-a-left" id="prev-pag" onClick={prevPage}>
                <i className="box_arrow a-left b-a-pos-left">
                </i>
              </div>
              <div className="box-bg bb-right b-a-right" id="next-pag" onClick={nextPage}>
                <i className="box_arrow a-right b-a-pos-right">
                </i>
              </div>
            </div>
          </div>
        </div>
      ) : <Loading />}
    </>
  );
}