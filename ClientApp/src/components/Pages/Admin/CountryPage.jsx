import React, { useEffect, useState } from "react";
// import {  } from "react-bootstrap";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table, Input, Label, Spinner, PaginationLink, PaginationItem, Pagination } from "reactstrap";
import { useAuth } from "../../Auth/AuthProvider";

const CountryPage = () => {
    const { token } = useAuth();
    const [modal, setModal] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [tabelStateText, setTabelStateText] = useState('');
    const [tabelLoading, setTabelLoading] = useState(true);
    const [editdata, setEditdata] = useState({});
    const [pageSize, setpageSize]=useState(5);
    const [pageNumber, setpageNumber]=useState(1);
    const [totaldata,setTotaldata]=useState(0);


    useEffect(() => {
        setpageSize(5);
    }, []);
    useEffect(() => {
        
    const getData = async (tkn) => {
        try {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },

            }
            const response = await fetch('api/countries/country-pagination?' + new URLSearchParams({
                page: pageNumber,
                pageSize: pageSize,
            }), option);
            const data = await response.json();
            setTabelStateText('');
            setCountryData(data.data);
            setTotaldata(data.totalItems);
            setTabelLoading(false);
        } catch (e) {
            console.log(e)
            setTabelStateText('Failed to get Data please Refersh');
            setTabelLoading(false);
        }
    }
        getData(token);
    }, [pageNumber,token,pageSize]); 
    const resetdata=()=>{
        setpageNumber(1)
        getDatas();
    }
    const getDatas = async () => {
        try {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            }
            const response = await fetch('api/countries/country-pagination?' + new URLSearchParams({
                page: pageNumber,
                pageSize: pageSize,
            }), option);
            const data = await response.json();
            setTabelStateText('');
            setCountryData(data.data);
            setTotaldata(data.totalItems);
            setTabelLoading(false);
        } catch (e) {
            console.log(e)
            setTabelStateText('Failed to get Data please Refersh');
            setTabelLoading(false);
        }
    }
   // useEffect(()=>{
    //     alert("just modal");
    // },[modal]);

    const toggle = () => setModal(!modal);
    const editCoutry = (id, name, active) => {
        setEditdata(
            {
                id, name, active
            }
        );
        toggle();
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
                        <h2>Country</h2>
                        <p className="mb-0">Add or remove Country for users to search</p>
                    </div>
                </div>
            </div>
            <div className="row  mt-4">
                <div className="col-md-2">
                    <div>
                        <Button onClick={toggle} className="ad-cus-btn">
                            Add Country
                        </Button>
                    </div>
                </div>

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
                                    Country Name
                                </th>
                                <th>
                                    Active Status
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                tabelLoading ?
                                    ( <tr><th></th><td/><td colSpan="2">
                                        <Spinner
                                            color="secondary"
                                            type="grow"
                                            style={{
                                                height: '4rem',
                                                width: '4rem'
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
                                        (countryData.map(({ id, name, active, createdAt }, index) => {
                                            return (
                                                <tr key={id}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        {name}
                                                    </td>
                                                    <td>
                                                        {active ? "Active" : "Deactivated"}
                                                    </td>
                                                    <td>
                                                        {/* <button onClick={()=>editCoutry(id,name,active)} >Edit</button> */}

                                                        <Button onClick={() => editCoutry(id, name, active)} className="ad-cus-btn">
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
    const [countryName, setCountryName] = useState(data.name || "");
    const [activeState, setActiveState] = useState(data.active?.toString() || "true");
    const [countryId, setCountryId] = useState(data.id || null);
    const [submiting, setSubmiting] = useState(false);
    const closewithoutdata = () => {
        if (!submiting) {
            setCountryName('');
            setActiveState(0);
            setCountryId(null);
            seteditData({});
            restpage();
            toggle();
        }
    }

    const handleSubmit = async () => {
        // alert('mmmm');
        setSubmiting(true);
        // setTimeout(()=>{setSubmiting(false)},3*1000);
        var datatosend = {
            name: countryName,
            active: activeState === "true" ? true : false
        }
        if (countryId) {
            datatosend = { ...datatosend, id: countryId }
        }
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datatosend)

        }
        const response = await fetch('api/countries/add-county', option);
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
                    <FormGroup>
                        <Label for="exampleEmail">
                            Name
                        </Label>
                        <Input
                            id="inp-country"
                            name="name"
                            placeholder="Country Name"
                            type="text"
                            onChange={(e) => { setCountryName(e.target.value) }}
                            value={countryName}
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
                            onChange={(e) => { setActiveState(e.target.value) }}
                            value={activeState}
                            disabled={submiting}
                        >
                            <option value="true">
                                Active
                            </option>
                            <option value="false">
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

export default CountryPage;