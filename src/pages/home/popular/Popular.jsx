import {React,useState} from 'react'

import ContentWrapper from '../../../components/contentwrap/ContentWraper';
import  SwitchTabs  from '../../../components/switchTabs/SwitchTabs';
 
import useFetch from "../../../Hooks/UseFetch"

import Crousal from "../../../components/crousal/Crousal"

export const Popular = () => {
  const [endpoint,setEndpoint]=useState("movie")

 const { data, loading }=useFetch(`/${endpoint}/popular`)
console.log("startdata"+data)
    const onTabChange=(tab)=>{
      setEndpoint(tab === "Movies" ? "movie" : "tv");
console.log("afterdata"+Object.values(data))
    }

  return (
    <div className='CrousalSection'>
    <ContentWrapper>
        <span className='CrousalTitle'>What's popular</span>
        <SwitchTabs data={["Movies", "Tv shows"]} onTabChange={onTabChange}/>

    </ContentWrapper>
    <Crousal data={data?.results} loading={loading} endpoint={endpoint}/>

</div>
  )
}
