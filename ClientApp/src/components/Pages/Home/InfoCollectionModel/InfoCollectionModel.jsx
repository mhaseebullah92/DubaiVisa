import React, { useEffect, useState } from 'react';
import './infoCollectionModel.css'; // Make sure to create a CSS file for styling
import { GiPassport } from "react-icons/gi";
import { FaIdCard } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdNavigateNext,MdNavigateBefore } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Input from './InputField/InputField';
import { Card, CardBody, CardFooter, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { CheckboxCard } from '../CheckboxCard/CheckboxCard';
import Payment from '../Payment/Payment';

const InfoCollectionModel = ({ isOpen, onClose, national = "", selectedPlan, moneyt }) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedPassImage, setSelectedPassImage] = useState(null);
  const [selectedIdImage, setSelectedIdImage] = useState(null);
  const [profileImageF, setProfileImageF] = useState(null);
  const [passImageF, setPassImageF] = useState(null);
  const [idImageF, setIdImageF] = useState(null);
  const [activeSection, setActiveSection] = useState(1);
  const [finalcheckout, setFinalcheckout] =useState(false);
  // const [visitedBefore, setVisitedBefore] = useState(false);
  const [totalCost, setTotalCost] = useState(moneyt === 'usd' ? selectedPlan.usdPrice:selectedPlan.aedPrice)
  const [addonlist, setAddon] = useState([]);
  const [infoInputFields, setInfoInputFields] = useState({
    number: '',
    email: '',
    firstName: '',
    lastName: '',
    nationality: national,
    destination: 'UAE',
    passportNumber: '',
    profession: '',
    travelDate: '',
    purpose: '',
    visitedBefore: false,
  });
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [infoError, setInfoError] = useState({});
  useEffect(()=>{
    packagesgetting();
  },[])
  const handleClosemode = () => {
    // setSelectedProfileImage(null);
    // setSelectedPassImage(null);
    // setSelectedIdImage(null);
    // setActiveSection(1);
    // setInfoInputFields({
    //   number:'',email:'',firstName:'',lastName:'',nationality:national,destination:'UAE',
    //   passportNumber:'',profession:'',travelDate:'',purpose:'',visitedBefore:false,
    // });
    onClose();
  }
  const validationinfoForm = () => {
    let emailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorCount = 0;
    setInfoError({
      numberMessage: '',
      emailMessage: '',
      firstNameMessage: '',
      lastNameMessage: '',
      passportNumberMessage: '',
      professionMessage: '',
      travelDateMessage: '',
      purposeMessage: ''
    })
    if (infoInputFields.number.toString().length < 10) {
      setInfoError((prevObject) => ({
        ...prevObject,
        numberMessage: 'Contact number should be at least 10 digits',
      }));
      errorCount++;
    }
    if (!(emailreg.test(infoInputFields.email))) {
      setInfoError((prevObject) => ({ ...prevObject, emailMessage: 'Please enter a valid email address' }));
      errorCount++;
    }
    if (infoInputFields.firstName.length < 2) {
      setInfoError((prevObject) => ({
        ...prevObject,
        firstNameMessage: 'First name should be at least 2 characters',
      }));
      errorCount++;
    }
    if (infoInputFields.lastName.length < 2) {
      setInfoError((prevObject) => ({
        ...prevObject,
        lastNameMessage: 'Last name should be at least 2 characters',
      }));
      errorCount++;
    }
    if (infoInputFields.passportNumber.length < 6) {
      setInfoError((prevObject) => ({
        ...prevObject,
        passportNumberMessage: 'Passport number should be at least 6 characters',
      }));
      errorCount++;
    }
    if (infoInputFields.profession.length < 3) {
      setInfoError((prevObject) => ({
        ...prevObject,
        professionMessage: 'Profession should be at least 3 characters',
      }));
      errorCount++;
    }
    if (infoInputFields.travelDate === '') {
      setInfoError((prevObject) => ({
        ...prevObject,
        travelDateMessage: 'Travel Date is required',
      }));
      errorCount++;
    }
    if (infoInputFields.purpose.length < 3) {
      setInfoError((prevObject) => ({
        ...prevObject,
        purposeMessage: 'Travel purpose should be at least 3 characters',
      }));
      errorCount++;
    }
    return errorCount > 0 ? true : false;
  }
  const handleNext = () => {
    let flag = false;
    if (activeSection === 2) {
      flag = validationinfoForm();
    }
    if (activeSection === 3) {
      setFinalcheckout(true);
    }
    if (!flag) {
      setActiveSection((prevSection) => Math.min(prevSection + 1, 4));
    }
  };

  const handleBack = () => {
    setActiveSection((prevSection) => Math.max(prevSection - 1, 1));
    if(finalcheckout){
      setFinalcheckout(false);
    }
  };
  const handleChangevisitbefore = ()=>{
    setInfoInputFields({ ...infoInputFields, visitedBefore: !infoInputFields.visitedBefore });
  }
  const handleChange = (e) => {
    setInfoInputFields({ ...infoInputFields, [e.target.name]: e.target.value });

  };

  const handleprofileFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfileImageF(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlepassFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPassImageF(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPassImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleIdFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIdImageF(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedIdImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleApplicationSubmit = async () => {
    // setSubmiting(true);
    let formData = new FormData();
    // setTimeout(()=>{setSubmiting(false)},3*1000);
    for (const key in infoInputFields) {
      if (infoInputFields.hasOwnProperty(key)) {
        formData.append(key, infoInputFields[key]);
      }
    }
    if (profileImageF) {
      formData.append("ProfilePicture", profileImageF);
    }
    if (passImageF) {
      formData.append("PassportPicture", passImageF);
    }
    if (idImageF) {
      formData.append("IdPicture", idImageF);
    }
    // formData.append("VisitedBefore", false);
    // formData.append("TransactionId", "5131ACDB-7kkksas");
    formData.append("VisaPlanId", selectedPlan.id);
    if(selectedAddons.length>0){
      // AddOnIds[]
      selectedAddons.forEach((addonId)=>{
        formData.append('addOnIds[]', addonId);
      });
    }
    const option = {
      method: 'POST',
      body: formData
    }
    const response = await fetch("api/UserApplication/add-application", option);
    if (response.ok) {
      // Status code is in the range 200-299
      const data = await response.json();
      return data.id;
    } else {
      // Status code is outside the range 200-299
      console.log('Error:', response.status, response.message, response);
      return "Error";
    }

    // setSubmiting(false);
  };

  const handleToggleselect = (addon) => {
    // Check if the value is already in the array
    const moneyp=moneyt==='usd'?addon.usdPrice:addon.aedPrice;
    if (selectedAddons.includes(addon.id)) {
      // If yes, remove it
      setSelectedAddons(selectedAddons.filter(item => item !== addon.id));
      setTotalCost(totalCost-moneyp);
    } else {
      // If not, add it
      setSelectedAddons([...selectedAddons, addon.id]);
      setTotalCost(totalCost+moneyp);
    }
  };
  const packagesgetting=async () =>{
    
    try {
      const response = await fetch('api/AddOn');
      if(response.ok){
          const data = await response.json();
          setAddon(data);
      }else{
          console.log('error while fetching country list');
      }
          
    } catch (e) {
        console.log(e)
    }
  }
  return (
    <div className={`cusmodal modal ${isOpen ? 'open' : ''}`}>
      <div className="cusmodal-content modal-content">
        <div className="cusmodal-header modal-header">
          <h2>Application</h2>
          <button onClick={handleClosemode}>&times;</button>
        </div>
        <div className="cusmodal-body modal-body">
          <div className="priceandhead flex">
            <div className="tital">
              {/* Application */}
            </div>
            {
              activeSection!==4?<div className="orderTotal">
              order Total: {totalCost} {moneyt === 'usd' ? `USD` : `AED`}
            </div>:''}
          </div>
          <div className={`section ${activeSection === 1 ? 'active' : ''}`}>
            <div className="sectionheading">Upload your Documnets</div>
            <div className='filesSection flex'>
              <div className={`file-input-container`}>
                <div className="svg-icon-container">
                  {selectedPassImage ? (
                    <img src={selectedPassImage} alt="Uploaded" className="uploaded-image" />
                  ) : (
                    <GiPassport />
                  )}
                </div>
                <label className="upload-icon" htmlFor="fileInput">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <MdOutlineFileUpload />
                  </svg>
                </label>
                <div className="label">Passport image</div>


                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handlepassFileChange}
                  className="file-input"
                />
              </div>
              <div className={`file-input-container`}>
                <div className="svg-icon-container">
                  {selectedProfileImage ? (
                    <img src={selectedProfileImage} alt="Uploaded" className="uploaded-image" />
                  ) : (
                    <IoMdPerson />
                  )}
                </div>
                <label className="upload-icon" htmlFor="fileInput">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <MdOutlineFileUpload />
                  </svg>
                </label>
                <div className="label">Photograph</div>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleprofileFileChange}
                  className="file-input"
                />
              </div>
              <div className={`file-input-container`}>
                <div className="svg-icon-container">
                  {selectedIdImage ? (
                    <img src={selectedIdImage} alt="Uploaded" className="uploaded-image" />
                  ) : (
                    <FaIdCard />
                  )}
                </div>
                <label className="upload-icon" htmlFor="fileInput">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <MdOutlineFileUpload />
                  </svg>
                </label>
                <div className="label">ID</div>


                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleIdFileChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>
          <div className={`section ${activeSection === 2 ? 'active' : ''}`}>

            <div className="sectionheading">Insert your information</div>
            <div className='InfoFields grid'>
              {/* <input type='text' name='name' onChange={handleChange} /> */}
              <div className="inpRow grid">
                <div className="singleInp">
                  <Input type="number" name='number' placeholder="Enter Phone Number" onChange={handleChange} error={infoError.numberMessage ? true : false} />
                  {infoError.numberMessage ? (<span className='errorMessage'>{infoError.numberMessage}</span>) : ""}
                </div>
                <div className="singleInp secondCol">
                  <Input type="email" name='email' placeholder="Enter email" onChange={handleChange} error={infoError.emailMessage ? true : false} />
                  {infoError.emailMessage ? (<span className='errorMessage'>{infoError.emailMessage}</span>) : ""}
                </div>
              </div>
              <div className="inpRow">
                <div className="singleInp">
                  <Input type="text" name='firstName' placeholder="Enter First Name" onChange={handleChange} error={infoError.firstNameMessage ? true : false} />
                  {infoError.firstNameMessage ? (<span className='errorMessage'>{infoError.firstNameMessage}</span>) : ""}
                </div>
                <div className="singleInp secondCol">
                  <Input type="text" name='lastName' placeholder="Enter Last Name" onChange={handleChange} error={infoError.lastNameMessage ? true : false} />
                  {infoError.lastNameMessage ? (<span className='errorMessage'>{infoError.lastNameMessage}</span>) : ""}
                </div>
              </div>
              <div className="inpRow">
                <div className="singleInp">
                  <Input type="text" name='nationality' placeholder={national} disable={true} />
                </div>
                <div className="singleInp secondCol">
                  <Input type="text" name='destination' placeholder="UAE" disable={true} />
                </div>
              </div>
              <div className="inpRow">
                <div className="singleInp">
                  <Input type="text" name='passportNumber' placeholder="Enter Passport Number" onChange={handleChange} error={infoError.passportNumberMessage ? true : false} />
                  {infoError.passportNumberMessage ? (<span className='errorMessage'>{infoError.passportNumberMessage}</span>) : ""}
                </div>
                <div className="singleInp secondCol">
                  <Input type="text" name='profession' placeholder="Enter Profession" onChange={handleChange} error={infoError.professionMessage ? true : false} />
                  {infoError.professionMessage ? (<span className='errorMessage'>{infoError.professionMessage}</span>) : ""}
                </div>
              </div>
              <div className="inpRow">
                <div className="singleInp">
                  <Input type="date" name='travelDate' placeholder="Enter Visiting Date" onChange={handleChange} error={infoError.travelDateMessage ? true : false} />
                  {infoError.travelDateMessage ? (<span className='errorMessage'>{infoError.travelDateMessage}</span>) : ""}
                </div>
                <div className="singleInp secondCol">
                  <Input type="text" name='purpose' placeholder="Enter Purpose of Visit" onChange={handleChange} error={infoError.purposeMessage ? true : false} />
                  {infoError.purposeMessage ? (<span className='errorMessage'>{infoError.purposeMessage}</span>) : ""}
                </div>
              </div>
              <div className="inpRow">
                <div className="singleInp">
                {/* <Label check> */}
                    <input
                      type="checkbox"
                      name="visitedBefore"
                      checked={infoInputFields.visitedBefore}
                      onChange={handleChangevisitbefore}
                    />
                    {' '} {/* Adding a space for better alignment */}
                    Visited Before
                  {/* </Label> */}
                </div>
              </div>
            </div>
          </div>
          <div className={`section ${activeSection === 3 ? 'active' : ''}`}>
            <div className="container mt-4">
              <Row>
            <Col lg="6">
                  <Card>
                    <CardBody>
                      <CardTitle> 
                        <div className="cusmodal-footer">
                              <p className="flex">
                                  {selectedPlan.visaType===0?"Single Entry":"Multiple Entry"} | {selectedPlan.stayDuration}
                              </p>
                            
                              <p className="flex" >
                                {moneyt==='usd'?selectedPlan.usdPrice:selectedPlan.aedPrice} {moneyt==='usd'?"USD":"AED"}
                              </p>
                          </div>
                          
                      <Col className='d-flex justify-content-center align-items-center pb-2'><div className='top-b text-center' /></Col>
                      </CardTitle>
                      <CardText>
                          <div className=' d-flex flex-wrap'>
                        {
                        addonlist.map((record) => {
                            return (<div key={record.id} className='m-1'>
                            <CheckboxCard  value={record.id} record={record} moneytype={moneyt} onToggle={handleToggleselect} isChecked={selectedAddons.includes(record.id)} />
                            
                            </div>)})
                        }
                            </div>
                      </CardText>
                      <CardText>This is the content of Card 1.</CardText>
                      <Col className='d-flex justify-content-center align-items-center'><div className='top-b text-center' /></Col>
                        <div className="cusmodal-footer pb-1">
                            <div className="">
                              Total 
                            </div>
                          
                            <div className="" >
                                {totalCost}{moneyt==='usd'?"USD":"AED"}
                            </div>
                        </div>
                    </CardBody>
                  </Card>
                </Col>
              <Col lg="6">
                <div className="card">
                {/* <div className='card-header cusmodal-header '>
                  sssssss
                </div> */}
                <div className="card-body">
                  <div className="row">
                    {/* Profile Image */}
                    <div className="col-md-2">
                      <img src={selectedProfileImage} alt="Profile" className="img-fluid rounded-circle" />
                    </div>

                    {/* User Info */}
                    <div className="col-md-9">
                      <h2 className="card-title">{infoInputFields.firstName} {infoInputFields.lastName}</h2>
                      {/* Add other information as needed */}
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Email:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.email}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Phone:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.number}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Destination:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.destination}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Travel Date:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.travelDate}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Profession:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.travelDate}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Purpose:
                          </ListGroupItem>
                          <ListGroupItem>
                            {infoInputFields.purpose}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      <div className="mb-1">
                        <ListGroup horizontal >
                          <ListGroupItem color="secondary" >
                            Passport Number:
                          </ListGroupItem>
                          <ListGroupItem className='text-break' >
                            {infoInputFields.passportNumber}
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                      {/* Add more fields based on your dataobj structure */}
                    </div>
                    
                  </div>
                </div>
                <div className='card-footer-custom'>
                  <div className='top-b' />
                  <p className="text-danger">*Review your Information before Submitting</p>
                </div>
              </div></Col>
              </Row>
            </div>
          </div>
          <div className={`section ${activeSection === 4 ? 'active' : ''}`}>
            <div className="container mt-4">
              <Row className="align-items-stretch">
                
            <Col lg="6">
                  <Card style={{ height: '100%' }}>
                    <CardBody>
                      <CardTitle> 
                        <div className="cusmodal-footer">
                              <p className="flex">
                                  {selectedPlan.visaType===0?"Single Entry":"Multiple Entry"} | {selectedPlan.stayDuration}
                              </p>
                            
                              <p className="flex" >
                                {moneyt==='usd'?selectedPlan.usdPrice:selectedPlan.aedPrice} {moneyt==='usd'?"USD":"AED"}
                              </p>
                          </div>
                          
                      <Col className='d-flex justify-content-center align-items-center pb-2'><div className='top-b text-center' /></Col>
                      </CardTitle>
                      <CardText>
                          {/* <div className=' d-flex flex-wrap'> */}
                        {
                        addonlist.map((record) => {
                            if(selectedAddons.includes(record.id)){
                            return (<div key={record.id} className="cusmodal-footer">
                            <p className="flex">
                                {record.title}
                            </p>
                          
                            <p className="flex" >
                              {moneyt==='usd'?record.usdPrice:record.aedPrice} {moneyt==='usd'?"USD":"AED"}
                            </p>
                        </div>)}else{
                          return<></>
                        }
                            })
                        }
                            {/* </div> */}
                      </CardText>
                      {/* <CardText>This is the content of Card 1.</CardText> */}
                      {/* <Col className='d-flex justify-content-center align-items-center'><div className='top-b text-center' /></Col>
                        <div className="cusmodal-footer pb-1">
                            <div className="">
                              Total 
                            </div>
                          
                            <div className="" >
                                {totalCost}{moneyt==='usd'?"USD":"AED"}
                            </div>
                        </div> */}
                    </CardBody>
                    <CardFooter>
                      <div className="cusmodal-footer final-total pb-1">
                            <div className="">
                              Total 
                            </div>
                          
                            <div className="" >
                                {totalCost}{moneyt==='usd'?"USD":"AED"}
                            </div>
                        </div>
                      
                    </CardFooter>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <CardBody>
                      <CardTitle>Process Payment</CardTitle>
                      <CardText>{finalcheckout?<Payment  totalCost={totalCost} selectedPlanId={selectedPlan.id} addonIds={selectedAddons} moneyt={moneyt} formSubmit={handleApplicationSubmit}  />:''}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* <button onClick={handleApplicationSubmit}>Submit</button> */}
            </div>
          </div>
        </div>
        <div className="cusmodal-footer modal-footer">
          <button className="btn-cus flex" onClick={handleBack} disabled={activeSection === 1} >
            Back<MdNavigateBefore />
          </button>
          {/* <button onClick={handleBack} disabled={activeSection === 1}>
            Back
          </button> */}
          <button className="btn-cus flex" onClick={handleNext} disabled={(activeSection === 4) || ((activeSection === 1) && (selectedProfileImage === null || selectedPassImage === null || selectedIdImage === null))} >
            Next<MdNavigateNext />
          </button>
          {/* <button onClick={handleNext} disabled={activeSection === 3}>
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default InfoCollectionModel;
