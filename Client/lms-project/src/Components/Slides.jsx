function CarouselSlide({image,name,quote,slidenumber,totalSlides}){
return(<div id={`slide${slidenumber}`}className="carousel-item relative w-full text-center">
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-[10%] lg:px-[15%] py-8 sm:py-12 lg:py-16">
         <img
     src={image}
      className="w-28 sm:w-36 md:w-40 lg:w-44 xl:w-48 rounded-full border-2 border-gray-400 object-cover shadow-md" />
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-yellow-400">{name}</h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl">{quote}</p>
    <div className="absolute left-3 sm:left-5 right-3 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href={`#slide${slidenumber==1?totalSlides:(slidenumber-1)}`}className="btn btn-circle btn-sm sm:btn-md bg-gray-700 hover:bg-gray-600 border-none">❮</a>
      <a href={`#slide${(slidenumber)%totalSlides+1}`} className="btn btn-circle btn-sm sm:btn-md bg-gray-700 hover:bg-gray-600 border-none">❯</a>
    </div>
   
    </div>
  </div>)
}

export default CarouselSlide;