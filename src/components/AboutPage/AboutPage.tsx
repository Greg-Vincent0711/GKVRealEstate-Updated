/**
 * @author Gregory Vincent
 * @date 3/6/24
 */
import "./AboutPage.css";
import {useRef, useEffect, useState, MutableRefObject} from "react"
const AboutPage = () => {
    const observedPoint: MutableRefObject<HTMLHeadingElement | null> = useRef<HTMLHeadingElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const observedElement = observedPoint.current as Element; 
      // we only want one observer on first render of the about page
        const observer = new IntersectionObserver((entries) => {
            const scrollPoint = entries[0];
            setVisible(scrollPoint.isIntersecting);
        }, {
            root: null, 
            threshold: .6
        })
        observer.observe(observedElement);
        return () => observer.unobserve(observedElement)
    }, [])
    const fadeEffect =`fade ${visible ? 'fade-in' : 'fade-out'}`
  return (
    <div className="flex flex-col mt-8 mobile-md:mt-12 sm:mt-0 w-10/12 mx-auto text-white pb-8">
      <div className={`border-b-2 mb-6 ${fadeEffect}`}>
        <h1 className={`text-2xl mb-2 md:text-4xl xl:text-5xl lg:mb-4 ${fadeEffect}`}>
            Behind GKVRealEstate
          </h1>
          <p className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 ${fadeEffect}`}>
            GKVRealEstate is the collective effort of two highly educated people
            looking to build long-term wealth for their family far into the future.
          </p>
      </div>
      <div>
        <h1 className={`text-2xl mb-2 md:text-4xl xl:text-5xl lg:mb-4 ${fadeEffect}`}>
          What's most Important
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl ${fadeEffect}`} ref={observedPoint}> 
          {" "}
          Real Estate Investing can serve as a way to secure yourself and family
          financially. However, it is not solely about collecting passive income. 
          At the end of the day, people's livelihoods are tied to your decisions, which is why it is
          more important to form honest and amicable relationships with tenants,
          so that both parties are satisfied.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;