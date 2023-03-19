import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss"
import Genres from "../../../components/Genres/Genres";
import ContentWrapper from "../../../components/contentwrap/ContentWraper";
import useFetch from "../../../Hooks/UseFetch";
import CircleRatting from "../../../components/circleratting/CircleRatting";
import Img from "../../../components/Lazyloadimages/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from "../PlayBtn";


const DetailBanner = ({ video, crew }) => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}
  `);
    const { url } = useSelector((state) => state.home)
    const _genres = data?.genres?.map((g) => g.id)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>

                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer">

                            </div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg"
                                                src={url.backdrop + data.poster_path}
                                            />
                                        ) : (
                                            <Img className="posterImg"
                                                src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} ${dayjs(data.release_date).format("YYYY")}`}
                                        </div>

                                    </div>
                                    <div className="subtitle">
                                        {data.tagline}
                                    </div>
                                    <Genres data={_genres} />
                                    <div className="row">
                                        <CircleRatting rating={data?.vote_average?.toFixed(1)} />
                                        <div className="playbtn" onClick={()=>{}}>
                                            <PlayBtn />
                                            <span className="text">
                                                watch trailer
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overview" style={{
                                    marginBottom:"25px"
                                    }}>
                                        <div className="heading" 
                                        style={{
                                            fontSize:"24px",
                                            marginBottom:"10px"
                                        }}>
                                            Overview
                                        </div>
                                        <div className="description">
                                            {data.overview}

                                        </div>
                                    </div>
                                </div>
                            </ContentWrapper>

                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                    
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailBanner;