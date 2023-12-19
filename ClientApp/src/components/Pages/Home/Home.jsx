import React from "react";
import './home.css';
import backgroundImage from '../../../Assets/traveling.jpg';
import Main from './Main';

const Home = () => {
    return (
        <>
            <section className="home">
                <div className="overlay"></div>
                <img src={backgroundImage} alt='background'></img>
                <div className="homeContent container container-cus">
                    <div className="textDiv">
                        <span className="smallText">
                            Our Packages
                        </span>
                        <h1 className="homeTitle">
                            Search yout Holidays
                        </h1>
                    </div>
                    {/* <div className="homeFooterIcons flex">
                        <div className="rightIcons">
                            <FiFacebook className="icon" />
                            <AiOutlineInstagram className="icon" />
                            <SiTripadvisor className="icon" />
                        </div>

                        <div className="leftIcons">
                            <BsListTask className="icon" />
                            <TbApps className="icon" />
                        </div>
                    </div> */}
                </div>

            </section>
            <Main />
        </>
    )
}

export default Home