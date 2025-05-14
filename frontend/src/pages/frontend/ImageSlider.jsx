import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../assests/1.jpg";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.jpg";

function ImageSlider() {
  const images = [img1, img2, img3];

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={img}
            alt={`Screenshot ${index + 1}`}
            className="max-h-60 object-contain"
          />
        </div>
      ))}
    </Slider>
  );
}

export default ImageSlider;
