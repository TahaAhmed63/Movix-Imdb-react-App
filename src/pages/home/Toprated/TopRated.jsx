import {React,useState} from 'react'

import ContentWrapper from '../../../components/contentwrap/ContentWraper';
import  SwitchTabs  from '../../../components/switchTabs/SwitchTabs';
 
import useFetch from "../../../Hooks/UseFetch"

import Crousal from "../../../components/crousal/Crousal"

export const TopRated = () => {
  const [endpoint,setEndpoint]=useState("movie")

 const { data, loading }=useFetch(`/${endpoint}/top_rated`)
console.log("startdata"+data)
    const onTabChange=(tab)=>{
      setEndpoint(tab === "Movies" ? "movie" : "tv");
console.log("afterdata"+Object.values(data))
    }

  return (
    <div className='CrousalSection'>
    <ContentWrapper>
        <span className='CrousalTitle'>Top Rated</span>
        <SwitchTabs data={["Movies", "Tv shows"]} onTabChange={onTabChange}/>

    </ContentWrapper>
    <Crousal data={data?.results} loading={loading} endpoint={endpoint}/>

</div>
  )
}
