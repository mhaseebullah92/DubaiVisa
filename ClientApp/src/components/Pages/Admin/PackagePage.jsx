import React, { useEffect, useState } from "react";
// import {  } from "react-bootstrap";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table, Input, Label, Spinner, PaginationLink, PaginationItem, Pagination, Col, Row } from "reactstrap";
import { useAuth } from "../../Auth/AuthProvider";

const PackagePage = () => {
    const { token } = useAuth();
    const [modal, setModal] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [tabelStateText, setTabelStateText] = useState('');
    const [tabelLoading, setTabelLoading] = useState(true);
    const [editdata, setEditdata] = useState({});
    const [pageSize, setpageSize]=useState(5);
    const [pageNumber, setpageNumber]=useState(1);
    const [totaldata,setTotaldata]=useState(0);
    const [filterVisatype, setFilterVisatype]=useState(0);


    useEffect(() => {
        setpageSize(5);
    }, []);
    useEffect(() => {
        
        const getDatap = async (tkn) => {
            try {
                const option = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },

                }
                const response = await fetch('api/packages/paginated?' + new URLSearchParams({
                    page: pageNumber,
                    pageSize: pageSize,
                    visaTypeFilter:filterVisatype
                }), option);
                if(response.ok){
                    const data = await response.json();
                    setTabelStateText('');
                    setCountryData(data.data);
                    setTotaldata(data.totalItems);
                    setTabelLoading(false);
                }
                else{
                    setTabelStateText('Failed to get Data please Refersh');
                }
            } catch (e) {
                console.log(e)
                setTabelStateText('Failed to get Data please Refersh');
                setTabelLoading(false);
            }
        }
        getDatap(token);
    }, [pageNumber,filterVisatype,token,pageSize]); 
    const resetdata=()=>{
        setpageNumber(1)
        getData();
    }

    const toggle = () => setModal(!modal);
    const editCoutry = (record) => {
        setEditdata(record);
        toggle();
    }

    const getData = async () => {
        try {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            }
            const response = await fetch('api/packages/paginated?' + new URLSearchParams({
                page: pageNumber,
                pageSize: pageSize,
                visaTypeFilter:filterVisatype
            }), option);
            if(response.ok){
                const data = await response.json();
                setTabelStateText('');
                setCountryData(data.data);
                setTotaldata(data.totalItems);
                setTabelLoading(false);
            }
            else{
                setTabelStateText('Failed to get Data please Refersh');
            }
        } catch (e) {
            console.log(e)
            setTabelStateText('Failed to get Data please Refersh');
            setTabelLoading(false);
        }
    }

    const pagesreturn=()=>{
        const totalpage=Math.ceil(totaldata/pageSize);
        const pages=[];
        for (let i = 0; i < totalpage; i++) {
            pages.push(<PaginationItem key={i}>
                <PaginationLink onClick={()=>setpageNumber(i+1)}>
                {i+1}
                </PaginationLink>
            </PaginationItem>)
        }
        return pages;
    }
    return (
        <div className="container m-5 ">
            <div className="row">
                <div className="col-md-12">
                    {/* Additional Content */}
                    <div className="custom-box">
                        <h2>VisaPlans / packages</h2>
                        <p className="mb-0">Add Packages based for your Coustomers to select</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between mt-4">
                <div className="col-md-2">
                    <div>
                        <Button onClick={toggle} className="ad-cus-btn">
                            Add Package
                        </Button>
                    </div>
                </div>
                <div className="col-md-2 d-flex">
                    <Input
                    id="exampleSelect"
                    name="VisaType"
                    type="select"
                    value={filterVisatype}
                    onChange={(e)=>{setFilterVisatype(e.target.value)}}
                    >
                    <option value={0}>
                            Single Entry
                    </option>
                    <option value={1}>
                            Multipe Entry
                    </option>
                    </Input>
                    
                </div>

                {/* <div className="col-md-9">
            
          <div className="custom-box p-4">
            <h2>Admin Panle</h2>
            <p>This is admin Panel to review and progress user applications. you can also add or remove Plans </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="custom-box p-4">
            <h2>Profile</h2>
            <img
              src={adminpic}
              alt="Profile"
              className="rounded-circle mb-3"
            />
            <p>Name: Admin</p>
            <p>Email: admin@visa.com</p>
          </div>
        </div> */}
            </div>

            <div className="row mt-4">
                {/* <div className="col-md-1" /> */}
                <div className="col-md-12">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Visa Type
                                </th>
                                <th>
                                    Stay Duration
                                </th>
                                <th>
                                    price($)
                                </th>
                                <th>
                                    Price(AED)
                                </th>
                                <th>
                                    Description($)
                                </th>
                                <th>
                                    Description(AED)
                                </th>
                                <th>
                                    Is Active
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                tabelLoading ?
                                    (
                                        <tr><th/><td/><td/><td/><td/><td colSpan="8">
                                        <Spinner
                                            color="secondary"
                                            type="grow"
                                            style={{
                                                height: '4rem',
                                                width: '4rem',
                                            }}
                                        >
                                            Loading...
                                        </Spinner></td></tr>
                                    )
                                    : tabelStateText !== '' ?
                                        (
                                            <tr>
                                                <th></th><td>{tabelStateText}</td><td /><td /></tr>
                                        ) :
                                        (countryData.map((record, index) => {
                                            return (
                                                <tr key={record.id}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        {record.visaType===0?"Single Entry":"Multiple Entry"}
                                                    </td>
                                                    <td>
                                                        {record.stayDuration}
                                                    </td>
                                                    <td>
                                                        {record.usdPrice}
                                                    </td>
                                                    <td>
                                                        {record.aedPrice}
                                                    </td>
                                                    <td>
                                                        {record.usdDescription}
                                                    </td>
                                                    <td>
                                                        {record.aedDescription}
                                                    </td>
                                                    <td>
                                                        {record.isActive ? "Active" : "Deactivated"}
                                                    </td>
                                                    <td>
                                                        {/* <button onClick={()=>editCoutry(id,name,active)} >Edit</button> */}

                                                        <Button onClick={() => editCoutry(record)} className="ad-cus-btn">
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        }))
                            }


                        </tbody>
                    </Table>

                </div>
                <div>
                    <Pagination>
                       <PaginationItem>
                            <PaginationLink
                                onClick={()=>setpageNumber(pageNumber-1)}
                                disabled={pageNumber===1}
                                previous
                            />
                        </PaginationItem>
                            {
                                pagesreturn()
                            }
                        <PaginationItem>
                            <PaginationLink
                                onClick={()=>setpageNumber(pageNumber+1)}
                                disabled={pageNumber===Math.ceil(totaldata/pageSize)}
                                next
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
            {
                modal && (<ModelForm modal={modal} toggle={toggle} data={editdata} seteditData={setEditdata} token={token} restpage={resetdata} />)
            }
        </div>
    );


}

const ModelForm = ({ modal, toggle, data, seteditData, token, restpage}) => {
    // const [token]=useAuth();
    const [visaType, setVisaType] = useState(data.visaType || 0);
    const [stayDuration, setStayDuration] = useState(data.stayDuration|| "");
    const [usdPrice, setUsdPrice] = useState(data.usdPrice || "");
    const [aedPrice, setAedPrice] = useState(data.aedPrice || "");
    const [usdDescription, setUsdDescription] = useState(data.usdDescription || "");
    const [aedDescription, setAedDescription] = useState(data.aedDescription || "");
    const [isActives, setIsActives] = useState(data.isActive ?? true);
    const [visaplanId, setVisaplanId] = useState(data.id || null);
    const [submiting, setSubmiting] = useState(false);
    const closewithoutdata = () => {
        if (!submiting) {
            // setVisaType(0);
            // setActiveState(0);
            setVisaplanId(null);
            seteditData({});
            restpage();
            toggle();
        }
    }

    const handleSubmit = async () => {
        setSubmiting(true);
        // setTimeout(()=>{setSubmiting(false)},3*1000);
        var url="api/Packages/add-package";
        var datatosend = {
            visaType,
            stayDuration,
            usdPrice,
            aedPrice,
            usdDescription,
            aedDescription,
            isActive:isActives,
        }
        if (visaplanId) {
            url="api/Packages/update-package";
            datatosend = { ...datatosend, id: visaplanId , createdAt:data.createdAt};
        }
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datatosend)

        }
        const response = await fetch(url, option);
        if (response.ok) {
            // Status code is in the range 200-299
            console.log('response Success');

        } else {
            // Status code is outside the range 200-299
            console.log('Error:', response.status, response.messge);
        }

        setSubmiting(false);
        closewithoutdata();
        // const data = await response.json();
    }


    return (
        <Modal isOpen={modal} toggle={closewithoutdata}>
            <ModalHeader toggle={closewithoutdata}>Add Country  {submiting ? <Spinner color="secondary" size="sm" type="grow" /> : ''} </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col md={6}>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Visa Type
                        </Label>
                        <Input
                            id="inp-active"
                            name="active"
                            type="select"
                            onChange={(e) => { setVisaType(Number(e.target.value)) }}
                            value={visaType}
                            disabled={submiting}
                        >
                            <option value={0}>
                                Single
                            </option>
                            <option value={1}>
                                Muiltiple
                            </option>

                        </Input>


                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Duration
                        </Label>
                        <Input
                            id="inp-country"
                            name="stayDuration"
                            placeholder="stay Duration"
                            type="text"
                            onChange={(e) => { setStayDuration(e.target.value) }}
                            value={stayDuration}
                            disabled={submiting}
                        />
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                                    
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Aed Price
                                </Label>
                                <Input
                                    id="inp-country"
                                    name="usdPrice"
                                    placeholder="usd Price"
                                    type="number"
                                    onChange={(e) => { setUsdPrice(e.target.value) }}
                                    value={usdPrice}
                                    disabled={submiting}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                                    
                            <FormGroup>
                                <Label for="exampleEmail">
                                   Aed Price
                                </Label>
                                <Input
                                    id="inp-country"
                                    name="aedPrice"
                                    placeholder="usd Price"
                                    type="number"
                                    onChange={(e) => { setAedPrice(e.target.value) }}
                                    value={aedPrice}
                                    disabled={submiting}
                                />
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    
                    <FormGroup>
                        <Label for="exampleEmail">
                            USD Description
                        </Label>
                        <Input
                            id="inp-country"
                            name="usdDescription"
                            placeholder="Description for usd"
                            type="textarea"
                            onChange={(e) => { setUsdDescription(e.target.value) }}
                            value={usdDescription}
                            disabled={submiting}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">
                            AED Description
                        </Label>
                        <Input
                            id="inp-country"
                            name="aedDescription"
                            placeholder="Description for aed"
                            type="textarea"
                            onChange={(e) => { setAedDescription(e.target.value) }}
                            value={aedDescription}
                            disabled={submiting}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="exampleSelect">
                            Active Status
                        </Label>
                        <Input
                            id="inp-active"
                            name="active"
                            type="select"
                            onChange={(e) => {setIsActives(e.target.value==="true"?true:false)}}
                            value={isActives}
                            disabled={submiting}
                        >
                            <option value={true}>
                                Active
                            </option>
                            <option value={false}>
                                Deactive
                            </option>

                        </Input>


                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmit} disabled={submiting} className="ad-cus-btn">
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={closewithoutdata} disabled={submiting}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default PackagePage;