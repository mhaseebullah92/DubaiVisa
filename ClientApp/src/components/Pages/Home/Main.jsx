import React, { useEffect, useRef, useState } from "react";
import './main.css';
import CountrySearchBar from "./CountrySearchBar/CountrySearchBar";
import InfoCollectionModel from "./InfoCollectionModel/InfoCollectionModel";
import { CiCircleCheck, CiClock2, CiFaceSmile } from "react-icons/ci"
import PlanCards from "./PlanCards/PlanCards";
const Main = () => {
    const [openModel, setOpenModel] = useState(false);
    const [selectedCountry,setSelectedCountry] = useState('');
    const [selectedPlan,setselectedPlan]=useState(null);
    const [selcurrency,setselcurrency]=useState('usd');
    const componentRef = useRef(null);
    useEffect(() => {
        if (selectedCountry && componentRef.current) {
            getToTheSearchbar();
        }
      }, [selectedCountry]);

    const getToTheSearchbar=()=>{
         // Get the position of the component
         const { top } = componentRef.current.getBoundingClientRect();
    
         // Scroll to the top of the component
         window.scrollTo({
           top: window.scrollY + top - 150,
           behavior: 'smooth', // You can use 'auto' or 'smooth' for smooth scrolling
         });
    };

    const handleCloseModel=()=>{
        setOpenModel(false);
        setselectedPlan(null);
    };
    const handleplanselection=(plan,currency)=>{
        setselcurrency(currency);
        setselectedPlan(plan);
        setOpenModel(true);
    };

    return (
        <section className="main container container-cus section-cus" ref={componentRef}>
            

            <CountrySearchBar id='serchiddd' setCountry={setSelectedCountry} />
            {
                selectedPlan?<InfoCollectionModel isOpen={openModel} onClose={handleCloseModel} national={selectedCountry} selectedPlan={selectedPlan} moneyt={selcurrency} />
                :''
            }
            
            {/* {selectedCountry?(
           ):''} */}
             {selectedCountry?<PlanCards dataArray={[]} openproces={(plan,currency)=>{handleplanselection(plan,currency);}} />:''}
            <div className="secTitle">
                <div className="title">
                    <h3 className="title-txt">
                        Apply for Dubai Visa with a peace of mind
                    </h3>
                </div>
                <span className="smallText">
                    Application in minutes with 24/7 live customer support
                </span>
            </div>
            <div className="secContent grid">
                <div className="singleDestination">
                    <div className="recicon">
                        <CiCircleCheck className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                            Apply Online  with Most Secure System 
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>We make it super simple and extra secure to apply for your UAE visa online. Taking your privacy seriously, the data processing is encrypted with industry-leading 256-bit encryption.</p>
                        </div>
                    </div>
                </div>
                <div className="singleDestination">
                    <div className="recicon">
                        <CiFaceSmile className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                            Exceptional Customer Care  24x7
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>Our team is always available online to assist with all your questions related to UAE visa services. You will be guided on every single step of your Dubai Visa application.</p>
                        </div>
                    </div>
                </div>
                <div className="singleDestination">
                    <div className="recicon">
                        <CiClock2 className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                            Express Service  within 12 hours
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>Forgot to apply for your visa? <br /> Worry no more, just apply your Dubai visa application with our Express Service and get the approval in the next 12 hours*</p>
                        </div>
                        {/* <button className="btn flex">
                            DETAILS<HiOutlineClipboardCheck />
                        </button> */}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Main