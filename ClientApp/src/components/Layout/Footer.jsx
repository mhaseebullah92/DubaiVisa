import React, { useEffect, useState } from "react";
import './footer.css'
import { FiChevronRight } from "react-icons/fi";
import moment from 'moment-timezone';
import { AiFillInstagram, AiOutlineWhatsApp, AiFillFacebook } from "react-icons/ai";
import logoImage from "../../Assets/logodubaitravelt.png";
import { FaTripadvisor } from "react-icons/fa";
import footerleftimg from "../../Assets/casepng.png";

const Footer= () => {
    const [dubaiTime, setDubaiTime] = useState('');

        useEffect(() => {
            const intervalId = setInterval(() => {
            setDubaiTime(moment().tz('Asia/Dubai').format('h:mm a'));
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);
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
                               <img  src={logoImage} width="50px" alt="website logo" />Online Dubai Visa
                            </a>
                        </div>
                        <div className="footerParagraph">
                            We’ll be with you every step of the way, when you apply with us. You’ll have a dedicated team of experts who will keep you updated with the progress of your application from start to finish, and will always be on the end of the phone or live chat to answer your questions.
                        </div>
                        <div className="footerSocials">
                            <a href="https://wa.link/9y6f5t" rel="noopener noreferrer" target="_blank">
                                <AiOutlineWhatsApp className="icon" />
                            </a>
                            <a href="https://www.facebook.com/DubaiTravelstour1?mibextid=kFxxJD" rel="noopener noreferrer" target="_blank">
                                <AiFillFacebook  className="icon" />
                            </a>
                            <a href="https://www.instagram.com/dubaitravelstour?igsh=MXdkbXNiaGtxdGxhcw%3D%3D&utm_source=qr" rel="noopener noreferrer" target="_blank">
                                <AiFillInstagram className="icon" />
                            </a>
                            <FaTripadvisor className="icon" />
                        </div>
                    </div>
                    <div className="footerLinks grid">
                        {/* one group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Get in touch
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                onlinedubaivisa.ae@gmail.com
                            </li>
                            <li className="footerList flex">
                                <a href="https://wa.link/9y6f5t" rel="noopener noreferrer" target="_blank">
                                    <FiChevronRight className="icon" />
                                    Whatsapp
                                </a>
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                +971521218403
                            </li>
                            {/* <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                tourism
                            </li>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                payment
                            </li> */}
                        </div>
                        {/* two group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Help & Support
                            </span>
                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                onlinedubaivisa.ae@gmail.com
                            </li>
                            <li className="footerList flex">
                                <a href="/faq" >
                                    <FiChevronRight className="icon" />
                                    FAQ
                                </a>
                            </li>
                        </div>
                        {/* three group */}
                        <div className="linkGroup">
                            <span className="groupTitle">
                                Hangout with Us
                            </span>
                            <li className="footerList flex">
                                <a href="https://www.facebook.com/DubaiTravelstour1?mibextid=kFxxJD" rel="noopener noreferrer" target="_blank">
                                    <FiChevronRight className="icon" />
                                    Facebook
                                </a>
                            </li>
                            <li className="footerList flex">
                                <a href="https://www.instagram.com/dubaitravelstour?igsh=MXdkbXNiaGtxdGxhcw%3D%3D&utm_source=qr" rel="noopener noreferrer" target="_blank">
                                    <FiChevronRight className="icon" />
                                    Instagram
                                </a>
                            </li>
                            <li className="footerList flex">
                                <a href="https://wa.link/9y6f5t" rel="noopener noreferrer" target="_blank">
                                    <FiChevronRight className="icon" />
                                    Whatsapp
                                </a>
                            </li>
                        </div>
                        {/* four group */}
                        {/* <div className="linkGroup">
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
                        </div> */}
                    </div>
                    <div className="footerDiv flex">
                        <small>Online Dubai Visa website</small>
                        <small>CopyRight - Online Dubai Visa 2023</small>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Footer