import React, { useState, useEffect } from "react";
import axios from "axios";
import "./videos.css";
import "./videomodal.css";
import { VideoCard, Pagination, FormCard } from "../../components";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPerPage] = useState(6);
  const [videoId, setVideoId] = useState("");

  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  const key = "AIzaSyB7ziOIvPMungYqhwnyFx2SXITKHYqPO9o";
  const playlistId = "PLl-sQjnM6CuurLs_iI5-2dOj6BIkv6ljI";

  const getPlaylist = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`
    );
    setVideos(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    /*const getVideos = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://valorantfa-api.herokuapp.com/api/videos"
      );
      setVideos(res.data);
      setLoading(false);
    };

    getVideos();*/
    getPlaylist();
  }, []);

  const indexOfLastVideo = currentPage * videoPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videoPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => {
    if (
      pageNumber <= Math.ceil(videos.length / videoPerPage) &&
      pageNumber >= 1
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
    <>
        {modal ? (
          <section className="modal__bg">
            <div className="modal__align">
              <div className="modal__content">
                <i
                  className="fa-solid fa-xmark modal__close"
                  arial-label="Close modal"
                  onClick={openModal}
                ></i>

                <div className="modal__video-align">
                  {videoLoading ? (
                    <div className="modal__spinner">
                      <i className="fa-solid fa-hand modal__spinner-style"></i>
                    </div>
                  ) : null}
                  <iframe
                    className="modal__video-style"
                    
                    onLoad={spinner}
                    loading="lazy"
                    width="1135"
                    height="640"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        ) : null}
    </>
      {/* <div className="catergories">
        <button> guias</button>
        <button> consejos</button>
      </div> */}
      <div className="videos-section">
        {currentVideos.map((video, index) => {
          const item = video.snippet;
          //console.log('item', item);
          return (
            <div
              key={index}
              onClick={() => {
                setVideoId(item.resourceId.videoId);
                openModal();
              }}
            >
              <VideoCard
                title={item.title}
                autor={item.videoOwnerChannelTitle}
                img={
                  item.thumbnails.maxres === undefined
                    ? item.thumbnails.medium.url
                    : item.thumbnails.maxres.url
                }
              />
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          videosPerPage={videoPerPage}
          totalVideos={videos.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <FormCard/>
    </>
  );
}
