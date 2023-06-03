import React, { useState } from "react";
import Sample from "../assets/sample.svg";
import { BsCloudUpload, BsCloudDownload } from "react-icons/bs";
const Home = () => {
    const [uploadImage, setUploadImage] = useState(false);
    return (
        <div className="home-container">
            <h1 className="pixelator">Pixelator</h1>
            {uploadImage ? (
                <div className="container_wrapper">
                    <div className="uploaded_image_container">
                        <div className="image">
                            <img src={Sample} />
                        </div>
                        <div className="customise_section">
                            <h3>Customize</h3>
                            <div className="variable_values">
                                <label>Pixel Density</label>
                                <input className="custom-range" type="range" />
                            </div>
                            <div className="variable_values">
                                <label>Overlay Opacity</label>
                                <input className="custom-range" type="range" />
                            </div>
                            <div className="variable_values">
                                <label>Overlay Hue</label>
                                <input className="custom-range" type="range" />
                            </div>
                            <button onClick={() => setUploadImage(true)}>
                                <BsCloudDownload />
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container_wrapper">
                    <div className="upload_btn">
                        <button onClick={() => setUploadImage(true)}>
                            <BsCloudUpload />
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
