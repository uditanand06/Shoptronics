import React from 'react'
import CarouselItem from './carouseItem';


const Carousel = () => {
    const Items = [
        {
          Id: 1,
          Badge: "UPCOMING",
          Date: "Tue, Feb 01",
          Title: "DOPE: Dawn of the Pixel Empire",
          Author: "Dope",
      
          ImageSrc: "/images/slider/2.png",
        },
        {
          Id: 2,
          Badge: "SOLD OUT",
          Date: "Wed, Nov 15",
          Title: "Spirits of Light",
          Author: "Arseniy Valter",
      
          ImageSrc: "/images/slider/3.jpeg",
        },
        {
          Id: 3,
          Badge: "LIVE NOW",
          Date: "Tue, Feb 01",
          Title: "DARE TO ENTER",
          Author: "Bored Ape",
      
          ImageSrc: "/images/slider/4.jpg",
        },
      ];
    
  return (
    <>
      {/* <div className="carousel w-[75vw] h-[50vh] rounded-lg shadow-all shadow-primary mt-2 ">
          {Items.map((item) => (
              <CarouselItem item={item} />
          ))}
      </div> */}
      <div id="carouselExampleIndicators" data-bs-ride="carousel" className="carousel slide relative w-[75vw] h-[50vh] rounded-lg shadow-all shadow-primary mt-2 ">
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          {Items.map((item) => (
                    <CarouselItem key={item.Id} id={item.Id} item={item} />
                ))}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      
    </>
    
  )
}

export default Carousel