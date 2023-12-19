import { useEffect, useState } from 'react';
import './planCards.css';
// import { GrLocation } from "react-icons/gr";
import { BiSolidSelectMultiple } from "react-icons/bi";
import Switch from '../Switch/Switch';

const PlanCards = ({showArray, openproces}) => {
    const [planLoading,setPlanLoading]=useState(true);
    const [currency, setCurrency]=useState('usd');
    const [defaultType,setDefaultType]=useState([]);
    const [allPackages,setAllPackages]=useState({}); 
    const [currentListType, setCurrentListType] = useState('single');

    useEffect(()=>{
        // setTimeout(()=>{
            getPlansData();
        // 
    },[]);

    const switchCurrency=()=>{
        currency==='usd'?setCurrency('aed'):setCurrency('usd');
    }
    const changeList=(type)=>{
        if(type!==currentListType && type ==='single'){
            setCurrentListType(type);
            setDefaultType(allPackages.singleRecords);
        }else if(type!==currentListType && type ==='multiple'){
            setCurrentListType(type);
            setDefaultType(allPackages.multipleRecords);
        }
    }
      
    const getPlansData = async () => {
        try {
            const response = await fetch('api/Packages/seprate-plans');
            if(response.ok){
                const data = await response.json();
                setTimeout(()=>{
                setPlanLoading(false);
                setDefaultType(data.singleRecords);
                setAllPackages(data);},1*1000);
            }else{
                console.log('error while fetching country list');
            }

            
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <><div className="secTitle">
        <h3 className="title">
            Most visiting destination
        </h3>
    </div>
    <div className="secContent flex">
        <div className="optionSelection">
            <div className="radioSec">
                <input type="radio"  value="Single" name="entryType" checked={currentListType==="single"?true:false}  onClick={()=>changeList('single')} /> <span className="radioInp" >Single Entry</span>
                <input type="radio"  value="Multiple" name="entryType" checked={currentListType==="multiple"?true:false}  onClick={()=>changeList('multiple')}  /> <span className="radioInp" >Muiltipe Entry</span>
            </div>
            <div className="switchSection">
                <span className="usdlabel">USD</span>
                <Switch changecruncy={switchCurrency} />
                <span className="usdlabel">AED</span>
            </div>
        </div>
    </div>
        <section className="secContent grid">
            {
                planLoading?(<div className="singleDestination loading-card">
                    <div className="loading-shadow"></div>
                </div>):
            
                 defaultType.map((record) => {
                    return (
                        <div className="singleDestination" key={record.id}>
                            <div className="durationplan">{record.stayDuration}</div>

                            <div className="cardInfo">
                                <div className="cardHeading flex">
                                    <div className="grade">
                                        {record.visaType===0?"Single Entry":"Multiple Entry"}Visa
                                    </div>

                                </div>
                                <div className="cardPrice">
                                    {currency==='usd'?record.usdPrice:record.aedPrice}<span className="pow">{currency==='usd'?"USD":"AED"}</span>
                                </div>
                                <div className="desc">
                                    <p> {currency==='usd'?record.usdDescription:record.aedDescription} </p>
                                </div>
                                <button className="btn-cus flex" onClick={()=>openproces(record,currency)} >
                                    Process<BiSolidSelectMultiple />
                                </button>
                            </div>
                        </div>)
                })
            }
        </section></>
    )
}

export default PlanCards;