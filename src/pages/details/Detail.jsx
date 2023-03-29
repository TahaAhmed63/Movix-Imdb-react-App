import React from 'react'
import "./style.scss"
import useFetch from '../../Hooks/UseFetch'
import { useParams } from 'react-router-dom'
import DetailBanner from './DetailBanner/DetailBanner'

export const Detail = () => {
 const {mediaType, id}=useParams()
  const {data, loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits, loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div><DetailBanner video={data?.results[0]} crew={credits?.crew}/></div>
  )
}
