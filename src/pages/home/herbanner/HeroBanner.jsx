import React from 'react'
import { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import "./style.scss"
import useFetch from '../../../Hooks/UseFetch'
import {useSelector} from "react-redux"
import Img from '../../../components/Lazyloadimages/Img'
import ContentWrapper from "../../../components/contentwrap/ContentWraper"
import { VscChromeClose } from 'react-icons/vsc'


export const HeroBanner = () => {
const [background,setBackground]=useState("")
const [query,setQuery]=useState("")

const navigate=useNavigate();
const {url}=useSelector((state)=> state.home)
const {data,loading}=useFetch("/movie/upcoming")

useEffect(()=>{
    const bg =url.backdrop+data?.results[Math.floor(Math.random()*20)].backdrop_path
    setBackground(bg)
},[data])




const searchQueryHandler=(event)=>{
if(event.key==="Enter" && query.length>0){
    navigate(`/search/${query}`)

}
}

  return (
  <div className="herobanner">

{!loading && <div className="backdrop-img">
    <Img src={background}/>

</div>}
<div className="opacitylayer">
    
</div>


<ContentWrapper>

<div className="herobannercontent">
            <span className="tittle">welcome</span>
            <span className="subtitle">
                milion of movies, Tv shows and peaple to discover.
                Explore now.
            </span>
            <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
           <button>Search</button>
                    </div>
                </div>
    
</ContentWrapper>

</div>
 
  )
}
