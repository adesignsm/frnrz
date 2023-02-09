import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import sanityClient from "../../client";

import bullHead from "../../Assets/media/static_media/about/bullhead.png";
import dragon from "../../Assets/media/static_media/about/dragon.png";
import peacockHead from "../../Assets/media/static_media/about/peacockhead.png";
import galleryVideo from "../../Assets/media/static_media/gallery/video-reel.mp4";

const Home = () => {
    const [imageCount, setImageCount] = useState(0);
    const imageArray = [bullHead, dragon, peacockHead];
    const [projectData, setProjectData] = useState([]);

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ufskghtn/production/${strUrl}`;
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "projects"]{
                project_title,
                project_media,
                video_embed,
                video_file,
                project_description
              }`
        ).then((data) => {
            setProjectData(data);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setImageCount((imageCount) => imageCount >= 2 ? imageCount - imageCount : imageCount + 1);
        }, 3000);

        return () => {
            clearInterval(imageInterval);
        }
    }, []);

    return (
        <>
                <div className="page">
                <div className="home">
                    <div className="column">
                        <section className="about-section">
                            <Link to="/about">
                                <img src={imageArray[imageCount]} />
                                <article className="about-preview-info">
                                    <h1>
                                    FOREIGNERZ is an art and production house focused on pushing boundaries in film, music, art and culture. 
                                    </h1>
                                </article>
                            </Link>
                        </section>
                    </div>
                    <div className="column">
                        <section className="projects-section">
                            <ul>
                                <Link to="/projects">
                                    <li>
                                        <div className="project-row">
                                            <h1> Projects </h1>
                                        </div>
                                    </li>
                                </Link>
                                {projectData.map((media) => {
                                    return (
                                        <li>
                                            <div className="projects-row">
                                                <span className="video-time">{media.project_media[0].video_time_duration}</span>
                                                <span> {media.project_title} </span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="services-section">
                            <ul>
                                <li>
                                    <h1> Services </h1>
                                </li>
                                <li> service </li>
                                <li> service </li>
                                <li> service </li>
                                <li> service </li>

                            </ul>
                            <div className="service-preview"></div>
                        </section>
                    </div>
                    <div className="column">
                        <section className="vision-section">
                            <div className="vision-title">
                                <marquee width="130%" direction="left" vspace="20" scrollamount="25">
                                    <h1> 2023 VISION : WE ARE ALL FOREIGNERZ. ONLY ART FROM THE GLOBAL UNDERGROUND WILL MOVE US FORWARD. </h1>
                                </marquee> 
                            </div>
                        </section>
                        <section className="gallery-section">
                            <div className="gallery-preview-container">
                                {/*Using Link rather than 'a tag elements. Refer to App.js to ensure 'Link' corresponds to what is in App.js */}
                                <Link to="/gallery">
                                    <video autoPlay muted loop>
                                        <source src={galleryVideo} type="video/mp4" />
                                    </video>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
                </div>
    </>
    )
}
export default Home;