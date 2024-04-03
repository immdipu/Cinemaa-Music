import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SongsList, LoadingSpinner } from "../components";
import { useMusicContext } from "../Context/MusicContext";
import { ImageFetch, FollowersCount } from "../Utils/Helper";
import Skeleton from "@mui/material/Skeleton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RippleButton from "ripple-effect-reactjs";
import { useQuery } from "@tanstack/react-query";
import musicApi from "../Api/Api";

const SinglePlayLists = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["SinglePlaylist", id],
    queryFn: () => musicApi.SinglePlaylist(id),
  });

  if (isLoading) {
    return (
      <div className="text-2xl font-bold fixed inset-0 w-full h-full flex place-items-center justify-center bg-darkBlue -z-20 max-md:pr-0 pr-32 ">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  const HandleDownloadAll = () => {
    const btns = document.querySelectorAll(".btnss");
    btns.forEach((btn) => {
      btn.click();
    });
  };

  return (
    <div className={"bg-darkBlue  overflow-hidden "}>
      <div className="gradient flex flex-col gap-8 w-full pt-3 px-16 max-md:px-5 pb-7 Artistbackground ">
        <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1  max-md:place-items-center gap-5">
          {ImageLoading && (
            <Skeleton
              width={160}
              height={170}
              sx={{ bgcolor: "#545454" }}
              variant="rounded"
            />
          )}
          <img
            src={ImageFetch(currentPlaylists)}
            alt={currentPlaylists.name}
            onLoad={handleImageLoad}
            className={
              "w-56 shadow-xl max-md:w-34 rounded-md " +
              (ImageLoading ? "hidden" : "block")
            }
          />

          <div className="flex place-content-end max-md:place-items-center flex-col">
            <h2 className="font-bold text-4xl max-md:text-2xl max-md:text-center text-white tracking-wider">
              {currentPlaylists.name}
            </h2>
            <div className="flex max-md:flex-col items-center gap-3 my-2 max-md:mt-4">
              <p className="text-slate-200 text-sm max-md:text-xs">
                {FollowersCount(currentPlaylists.followerCount)} followers
              </p>
              <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
              <p className="text-slate-200 text-sm">
                {currentPlaylists.songCount} songs
              </p>

              <div
                className="w-[38px] ml-3 max-md:mt-4"
                onClick={HandleDownloadAll}
                tiltle="Download all "
              >
                <RippleButton height={36} radius={50} color={"#5454548c"}>
                  <CloudDownloadIcon
                    sx={{ fontSize: 35 }}
                    className="text-neutral-300 cursor-pointer"
                  />
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mx-12 mt-6 max-md:mx-2 mb-14">
        {currentPlaylists.songs && (
          <SongsList songs={currentPlaylists.songs} current={"Playlist"} />
        )}
      </section>
    </div>
  );
};

export default SinglePlayLists;
