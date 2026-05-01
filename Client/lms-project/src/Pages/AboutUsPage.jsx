import CarouselSlide from "../Components/Slides";
import HomeLayout from "../Layouts/HomeLayout";
import AboutMainImage from "../assets/aboutMainImage.png"
import apj from "../assets/apj.png"
import billGates from "../assets/billGates.png"
import einstein from "../assets/einstein.png"
import elon from '../assets/elon-musk.png'
import nelsonMandela from "../assets/nelsonMandela.png"
import steveJobs from "../assets/steveJobs.png"

function AboutUs(){

const quotesData = [
  {
    slidenumber: 1,
    image: billGates,
    name: "Bill Gates",
    quote:
      "If you give people tools, and they use their natural abilities and curiosity, they will develop things in ways that will surprise you very much beyond what you might have expected.",
  },
  {
   slidenumber: 2,
    image: einstein,
    name: "Albert Einstein",
    quote:
      "Education is not the learning of facts, but the training of the mind to think.",
  },
  {
   slidenumber: 3,
    image: apj,
    name: "Dr. A.P.J. Abdul Kalam",
    quote:
      "The purpose of education is to make good human beings with skill and expertise. Enlightened human beings can be created by teachers.",
  },
  {
   slidenumber: 4,
    image: nelsonMandela,
    name: "Nelson Mandela",
    quote:
      "The power of education extends beyond the development of skills we need for economic success. It can contribute to nation-building and reconciliation.",
  },
  {
   slidenumber: 5,
    image: steveJobs,
    name: "Steve Jobs",
    quote:
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
  },
  {
   slidenumber: 6,
    image: elon,
    name: "Elon Musk",
    quote:
      "Education is essentially downloading data and algorithms into your brain. The faster and better you learn, the more capable you become.",
  },
];


return(
<HomeLayout>
    <div className="pl-20 px-6 sm:px-10 md:px-16 pt-20 text-white flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 max-w-7xl w-full">
            <section className="w-full md:w-1/2 space-y-6 text-center md:text-left">
<h1 className="text-3xl sm:text-4xl lg:text-5xl text-yellow-500 font-semibold leading-snug">
    Affordable and quality education
</h1>
< p className="text-base sm:text-lg text-gray-200 leading-relaxed">
    We are dedicated to providing high-quality education through innovation and technology. Our platform is built to make learning engaging, accessible, and effective for every student. We believe that true education goes beyond textbooks — it’s about understanding, growth, and practical knowledge. That’s why we collaborate with experienced educators and use modern learning tools to deliver well-structured courses, interactive lessons, and real-time progress tracking. Our mission is to empower learners with the skills and confidence they need to succeed in an ever-evolving world, ensuring that quality learning is just a click away.
</p>
            </section>
            <div className="w-full md:w-1/2 flex justify-center">
< img className="w-3/4 sm:w-2/3 md:w-full max-w-md drop-shadow-2xl rounded-2xl" src={AboutMainImage} id="test1" style={{filter:"drop-shadow(0px 10px 10px rgb(0,0,0)"}} alt="about min-image"/>
            </div>
        </div>

<div className="carousel w-full max-w-4xl mx-auto my-20">
{quotesData && quotesData.map(celebrity=>(<CarouselSlide {...celebrity} key={celebrity.slidenumber} totalSlides={quotesData.length}/>))}
</div>

</div>
    
</HomeLayout>
)
}
export default AboutUs;