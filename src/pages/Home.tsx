import React, { useState, useRef, useEffect } from "react";
import { BsCloudUpload, BsCloudDownload } from "react-icons/bs";



const Home= () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pixelDensity, setPixelDensity] = useState<number>(50);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setUploadedImage(result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL();
      link.download = "pixelated_image.png";
      link.click();
    }
  };

  useEffect(() => {
    if (uploadedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const image = new Image();
        image.onload = () => {
          const pixelSize = canvas.width / pixelDensity;



          context.clearRect(0, 0, canvas.width, canvas.height);
          context.imageSmoothingEnabled = false;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          context.fillStyle = `rgba(0, 0, 0, 0.1)`;
          for (let y = 0; y < canvas.height; y += pixelSize) {
            for (let x = 0; x < canvas.width; x += pixelSize) {
              const imageData = context.getImageData(x, y, pixelSize, pixelSize);
              const data = imageData.data;
              const [r, g, b] = getAverageRGB(data);

              context.fillStyle = `rgb(${r}, ${g}, ${b})`;
              context.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        };

        image.src = uploadedImage;
      }
    }
  }, [uploadedImage, pixelDensity]);

  function getAverageRGB(data: Uint8ClampedArray) {
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    const pixelCount = data.length / 4;
    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    return [r, g, b];
  }

  return (
    <div className="home-container">
      <header>PIXELATOR</header>
      <div className="content-wrapper">
      {uploadedImage ? (

           <div className="content">
            <canvas
              className="image"
              style={{
                width: "400px",
                height: "auto",
              }}
              ref={canvasRef}
            />

                <div className="Slider-input">
                  <label>Pixels Density</label>
                  <input
                    type="range"
                    value={pixelDensity}
                    step={1}
                    min={1}
                    max={50}
                    onChange={(event) => {
                      const value = parseInt(event.target.value);
                      setPixelDensity(value);
                    }}
                  />
                </div>

              <button className="primary-btn" onClick={handleDownloadImage}>
                <BsCloudDownload />
                Download Image
              </button>
           </div>
      ) : (

          <>
            <label
            className="primary-btn"
            htmlFor="img">
              <BsCloudUpload />
              Upload Image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </>


      )}
</div>
    </div>
  );
};

export default Home;
