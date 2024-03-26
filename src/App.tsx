import "./App.css"
import AboutPage from "./components/AboutPage/AboutPage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import logo from "../gkvrealestate.svg"

function App() {
  return (
    <div className="h-screen overflow-x-hidden"> 
        <div className="flex items-center justify-center w-screen md:mt-12 z-2 h-24 3xl:h-0">
          <img src={logo} className="md:p-20 xl:mt-4 lg:p-36 xl:p-28 sm:mt-6 sm:p-12 2xl:p-52 3xl:w-3/6"/>
        </div>
        <div className="flex flex-col h-3/6 md:mt-14 sm:mt-8 2xl:justify-evenly z-3">
          <ImageGallery/>
      </div>
        <div 
        className="flex flex-col z-3 xl:mt-36 -mt-10 mobile-sm:mt-0 mobile-md:-mt-20 mobile-lg:-mt-32 md-2:mt-24 sm:mt-28 md:mt-18 2xl:mt-80 2xl:pt-12">
          <AboutPage/>
        </div>
    </div>
  )
}

export default App
