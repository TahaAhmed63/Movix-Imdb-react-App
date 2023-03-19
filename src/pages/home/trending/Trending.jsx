import {React,useState} from 'react'

import ContentWrapper from '../../../components/contentwrap/ContentWraper';
import  SwitchTabs  from '../../../components/switchTabs/SwitchTabs';
 
import useFetch from "../../../Hooks/UseFetch"

import Crousal from "../../../components/crousal/Crousal"

export const Trending = () => {
  const [endpoint,setEndpoint]=useState("day")

 const { data, loading }=useFetch(`/trending/movie/${endpoint}`)
console.log("startdata"+data)
    const onTabChange=(tab)=>{
      setEndpoint(tab === "Day" ? "day" : "week");
console.log("afterdata"+Object.values(data))
    }

  return (
    <div className='CrousalSection'>
    <ContentWrapper>
        <span className='CrousalTitle'>Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>

    </ContentWrapper>
    <Crousal data={data?.results} loading={loading}/>

</div>
  )
}
