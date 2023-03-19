import { useState ,useEffect} from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguaration, getGenres } from './store/homeSlice';


import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { Detail } from './pages/details/Detail';
import { SearchResult } from './pages/searchresultpage/SearchResult';
import { Explore } from './pages/explore/Explore';
import { PageNotFound} from './pages/404/PageNotFound';
import Footer from "../src/components/footer/Footer"


function App() {
  const dispatch = useDispatch();
  const {url}=useSelector((state)=>
  
    state.home
  
  );
  console.log(url)

  useEffect(()=>{
    fetchApiConfig();
    genreCall()
  },[]);

const fetchApiConfig=()=>{
  fetchDataFromApi("/configuration")
      .then((res)=>{
            console.log(res)
            const url={
              backdrop: res.images.secure_base_url +"original",
              poster: res.images.secure_base_url +"original",
              profile: res.images.secure_base_url +"original",
            }


            dispatch(getApiConfiguaration(url));
  })
}
const genreCall =async() => {
  let promises=[];
  let endPoint = ['tv','movie'];
  let allGenre = {}
  endPoint.forEach((url)=>{
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })
const data = await Promise.all(promises);
console.log(data)
data.map(({genres})=>{
   return genres.map((item) => (allGenre[item.id] = item))
})
dispatch(getGenres(allGenre))
}
  return (

<BrowserRouter>
<Header/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/:mediaType/:id' element={<Detail/>}/>
<Route path='/search/:query' element={<SearchResult/>}/>
<Route path='/explore/:mediaType' element={<Explore/>}/>
<Route path='*' element={<PageNotFound/>}/>



</Routes>
<Footer/>

</BrowserRouter>
  )
}

export default App
