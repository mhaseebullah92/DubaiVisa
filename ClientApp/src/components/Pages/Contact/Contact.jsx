import React from "react";
import './contact.css';
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    return (
        <section className="contact container container-cus section-cus-m-pad">

            <div className="secTitle">
                <h3 className="title">
                    Get in Touch
                </h3>
                <span className="smallText">
                    Reach out to our muiltilingual and friendly team
                </span>
            </div>
            <div className="secContent grid">
                <div className="singleDestination">
                    <div className="recicon">
                        <FaWhatsapp className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                                Contact on Whatsapp
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>Send us a message now</p>
                        </div>
                        {/* <button className="btn flex">
                            DETAILS<HiOutlineClipboardCheck />
                        </button> */}
                    </div>
                </div>
                <div className="singleDestination">
                    <div className="recicon">
                        <MdOutlineMailOutline className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                            Email US
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>Email us any Query you have.</p>
                        </div>
                        {/* <button className="btn flex">
                            DETAILS<HiOutlineClipboardCheck />
                        </button> */}
                    </div>
                </div>
                <div className="singleDestination">
                    <div className="recicon">
                        <FaRegCircleCheck className="icon" />
                    </div>

                    <div className="cardInfo">
                        <div className="cardHeading flex">
                            <div className="grade">
                                freaquently Ask Question
                            </div>
                            {/* <div className="price"><h5>5000</h5></div> */}
                        </div>
                        <div className="desc">
                            <p>Advices and Answers from our team</p>
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

export default Contact;