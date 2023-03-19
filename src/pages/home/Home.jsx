import React from 'react'
import "./style.scss"
import { HeroBanner } from './herbanner/HeroBanner'

import { Trending } from './trending/Trending'
import { Popular } from './popular/Popular'
import { TopRated } from './Toprated/TopRated'

export const Home = () => {
  return (
    <div className="home-page">
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
      <div></div>
    </div>
  )
}
