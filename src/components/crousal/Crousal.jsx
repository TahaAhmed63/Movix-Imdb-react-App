
import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentwrap/ContentWraper";
import Img from "../Lazyloadimages/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRatting from "../circleratting/CircleRatting";
import  Genres  from "../Genres/Genres";

const Crousal = ({ data,loading,endpoint }) => {
  const crousalContainer = useRef()

  const { url } = useSelector((state) => state.home)
  const navigate = useNavigate();
  const navigation = (dir) => {

    const container=crousalContainer.current;
    const scrollAmmount = dir ==="left" ? container.scrollLeft - (container.offsetWidth + 20):container.scrollLeft + (container.offsetWidth + 20)
    container.scrollTo({
      left:scrollAmmount,
      behavior :"smooth"
    })
  }
  const skItem =()=>{
    return(
      <div className="skeletonItem">
        <div className="posterBlock">    </div>
          <div className="textBlock"> 
          <div className="title skeleton">         
          
           </div>
 <div className="date skeleton">

 </div>
          </div>

          </div>

         
  
    )
  }
  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={crousalContainer}>
            
            {data?.map((item) => {

                   const posterUrl = item.poster_path
                    ? url.poster + item.poster_path
                     : PosterFallback;


              return (
                <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>

                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRatting rating={item.vote_average.toFixed(1)}/>
                    <Genres data={item.genre_ids.slice(0,2)}/>

                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>

                </div>
              )

            })}
          </div>

        ) : (

       <div className="loadingSkeleton">
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}

       </div>
        )}
      </ContentWrapper>
    </div>
  )
}
export default Crousal