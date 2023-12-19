import React, { useEffect, useState } from "react";
import './footer.css'
import { FiChevronRight } from "react-icons/fi";
import moment from 'moment-timezone';
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import footerleftimg from "../../Assets/casepng.png";
// import footerleftimg from "../../Assets/beachpng.png";
// import footerleftimg from "../../Assets/mappng.png";

const Footer= () => {
    const [dubaiTime, setDubaiTime] = useState('');

        useEffect(() => {
            const intervalId = setInterval(() => {
            setDubaiTime(moment().tz('Asia/Dubai').format('h:mm a'));
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);
        // const scrollToSection = () => {
        //     const sectionId = 'serchiddd';
        //     const section = document.getElementById(sectionId);
        
        //     if (section) {
        //       section.scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'start',
        //       });
        //     }
        //   };
    return (
        <section className="footer">
            {/* <div className="videoDiv">

            </div> */}
            <div className="secContent container container-cus">
                <div className="contactDiv flex">
                    <div className="text">
                        <small>Dubai Local Time</small>
                        <h2>{dubaiTime}</h2>
                    </div>

                    <div className="bnDiv flex">

                        {/* <input type="text" placeholder="Enter Email Address" /> */}
                        {/* <button className="btn-cus flex" type="submit" >
                            SEND<FiSend className='icon' />
                        </button> */}
                        <img  src={footerleftimg} width="100px" alt="" ></img>
                    </div>
                </div>
                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="/" className="logo flex">
                                <MdOutlineTravelExplore className="icon" />
                                Travel
                            </a>
                        </div>
                        <div className="footerParagraph">
                            dsdsdsc dsikmc slmdcls lmsdm eoslmc  lokds dlsk ldmslmdslm lmdlsmsd lmdlmsd lmdlms lmkdlsmds lmdsl dsmlsmd mlmsdlmds
                        </div>
                        <div className="footerSocials">
                            <AiOutlineTwitter className="icon" />
                            <AiFillYoutube className="icon" />
                            <AiFillInstagram className="icon" />
                            <FaTripadvisor className="icon" />
                        </div>
                    </div>
                    <div className="footerLinks grid">
                        {/* one group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Our Agency
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Service
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                tourism
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                payment
                            </li>
                        </div>
                        {/* two group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Our Agency
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Service
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                tourism
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                payment
                            </li>
                        </div>
                        {/* three group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Our Agency
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Service
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                tourism
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                payment
                            </li>
                        </div>
                        {/* four group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Our Agency
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Service
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                tourism
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                payment
                            </li>
                        </div>
                    </div>
                    <div className="footerDiv flex">
                        <small>Beast travel website</small>
                        <small>CopyRIGht - abc 2023</small>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Footer