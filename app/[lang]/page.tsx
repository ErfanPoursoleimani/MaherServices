import About from "./components/Home/About"
import Footer from "./components/Home/Footer"
import MainAdvertiseSec from "./components/Home/MainAdvertiseSec"
import ServicesSec from "./components/Home/ServicesSec"

const Home = () => {
  return (
    <div className="max-md:mb-10 overflow-clip flex flex-col items-center relative top-[103px] max-md:top-[60px]">
      <MainAdvertiseSec />
      <ServicesSec />
      <About/>
      <Footer />
    </div>
  )
}

export default Home
