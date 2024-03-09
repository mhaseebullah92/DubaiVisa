import React, { useState } from "react";
import './track.css';
import Input from "../Home/InfoCollectionModel/InputField/InputField";
import { MdOutlineTrackChanges } from "react-icons/md";
import { Badge, Progress, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";

const Track = () => {
    // const [openModel, setOpenModel] = useState(false);
    
    let { id } = useParams();
    // const [trackStatus,setTrackStatus] =useState(true);
    const [trackId,setTrackId] =useState(id?id:'');
    const [response,setResponse]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError] = useState('');

    const ApplicationStatus=Object.freeze(
        [
            "Submitted",
            "Review",
            "InProgress",
            "Completed",
            "Closed",
            "Pending",
            "Rejected"
        ]);
    const getData = async () => {
        try {
            setError('');
            setLoading(true);
            setResponse(null);
            const response = await fetch('api/UserApplication/track-application?' + new URLSearchParams({
                trackid: trackId,
            }));
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setResponse(data);
            }
            else {
                setError('Failed to retrive your Application please check your tracking Id and retry')
                console.log('Failed to get Data please Refersh');
            }
            
            setLoading(false);
        } catch (e) {
            console.log(e)
            console.log('Failed to get Data please Refersh');
            
            setLoading(false);
        }
    }
    const getcolorForProgres=()=>{
        if(response.applicationStatus<3){
            return "primary";
        }else if(response.applicationStatus===3) return "success"
        else if(response.applicationStatus===4) return "success"
        else if(response.applicationStatus===5) return "secondary"
        else return "danger"
    }

    return (
        <section className="trackmain container container-cus section-cus-m-pad">
            {/* <CountrySearchBar /> */}
            {/* <InfoCollectionModel isOpen={openModel} onClose={() => { setOpenModel(false) }} /> */}

            <div className="secTitle">
                <h3 className="title">
                    Track Your Application
                </h3>
            </div>
            <div className="secContent flex">
                <div className="optionSelection">
                    <div className="radioSec">
                        {/* <input type="radio"  value="Single" name="entryType" /> <span className="radioInp" >Single Entry</span>
                        <input type="radio"  value="Multiple" name="entryType" /> <span className="radioInp" >Muiltipe Entry</span> */}

                        <Input name="trackingId" placeholder="Enter your tracking ID" type='text' value={trackId} onChange={(e)=>setTrackId(e.target.value)} />
                    </div>
                    <div className="switchSection">
                        
                        <button className="btn-cus flex" onClick={getData}>
                            Track<MdOutlineTrackChanges />
                        </button>
                        {/* <span className="usdlabel">USD</span>
                        <Switch/>
                        <span className="usdlabel">AED</span> */}
                    </div>
                </div>
            </div>
            {loading?<><Spinner></Spinner></>:''}
            {error?<p>{error}</p>:''}
            {response?<><div className="secTitle">
                <h3 className="title">
                    Application Status
                </h3>
            </div>
            <div className="secContent flex">
                <div className="optionSelection">
                    <div className="radioSec">
                        <div><Badge color="primary"> Status </Badge>: {ApplicationStatus[response.applicationStatus]}</div>
                    </div>
                    <div className="radioSec">
                        <Progress
                                className="my-2"
                                color={getcolorForProgres()}
                                value={response.applicationStatus<4?(response.applicationStatus+1)*25:100}
                            >
                                {response.applicationStatus<4?(response.applicationStatus+1)*25+'%':''}
                            </Progress>
                    </div>
                    {
                        response.applicationComments?<div className="radioSec">
                        Comments: {response.applicationComments}
                    </div>:''}
                </div>
            </div></>:''}
        </section>
    )
}

export default Track