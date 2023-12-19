import React, { useEffect, useState } from "react";
import { Table, Input, Spinner, PaginationLink, PaginationItem, Pagination } from "reactstrap";
import { useAuth } from "../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const ApplicationStatus=Object.freeze(
{
    Submitted:0,
    Review:1,
    InProgress:2,
    Completed:3,
    Closed:4,
    Pending:5,
    Rejected:6
});

const UsersApplications = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    // const [modal, setModal] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [tabelStateText, setTabelStateText] = useState('');
    const [tabelLoading, setTabelLoading] = useState(true);
    const [pageSize, setpageSize]=useState(5);
    const [pageNumber, setpageNumber]=useState(1);
    const [totaldata,setTotaldata]=useState(0);
    const [filterVisatype, setFilterVisatype]=useState(ApplicationStatus.Submitted);

 useEffect(() => {
    setpageSize(5);
 },[])
    // useEffect(() => {
        
    // const getData = async (tkn) => {
    //     try {
    //         const option = {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },

    //         }
    //         const response = await fetch('api/UserApplication/paginated-filtered?' + new URLSearchParams({
    //             page: pageNumber,
    //             pageSize: pageSize,
    //             visaTypeFilter:filterVisatype
    //         }), option);
    //         if(response.ok){
    //             const data = await response.json();
    //             setTabelStateText('');
    //             setCountryData(data.data);
    //             setTotaldata(data.totalItems);
    //             setTabelLoading(false);
    //         }
    //         else{
    //             setTabelStateText('Failed to get Data please Refersh');
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         setTabelStateText('Failed to get Data please Refersh');
    //         setTabelLoading(false);
    //     }
    // }
    //     getData(token);
    //     setpageSize(5);
    // }, [token]);
    useEffect(() => {
        
    const getData = async (tkn) => {
        try {
            const option = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },

            }
            const response = await fetch('api/UserApplication/paginated-filtered?' + new URLSearchParams({
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
        getData(token);
    }, [pageNumber,filterVisatype,token,pageSize]); 
    // const resetdata=()=>{
    //     setpageNumber(1)
    //     getData();
    // }

    // const toggle = () => setModal(!modal);
    // const editCoutry = (record) => {
    //     setEditdata(record);
    //     toggle();
    // }


    const handleUserApplication = (id) =>{
        sessionStorage.setItem('xpuserpginf',id);
        navigate("/user-application-detail");
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
                        <h2>Users Applications</h2>
                        <p className="mb-0">Add Packages based for your Coustomers to select</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between mt-4">
                <div className="col-md-2">
                    {/* <div>
                        <Button onClick={toggle} className="ad-cus-btn">
                            Add Package
                        </Button>
                    </div> */}
                </div>
                <div className="col-md-2 d-flex">
                    <Input
                    id="exampleSelect"
                    name="VisaType"
                    type="select"
                    value={filterVisatype}
                    onChange={(e)=>{setFilterVisatype(e.target.value)}}
                    >
                    <option value={ApplicationStatus.Submitted}>
                    Submitted
                    </option>
                    <option value={ApplicationStatus.Review}>
                    Review
                    </option>
                    <option value={ApplicationStatus.InProgress}>
                    InProgress
                    </option>
                    <option value={ApplicationStatus.Completed}>
                    Completed
                    </option>
                    <option value={ApplicationStatus.Closed}>
                    Closed
                    </option>
                    <option value={ApplicationStatus.Pending}>
                    Pending
                    </option>
                    <option value={ApplicationStatus.Rejected}>
                    Rejected
                    </option>
                    </Input>
                    
                </div>

            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Nationality
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                tabelLoading ?
                                    (
                                        <tr><th></th><td/><td colSpan="2"><Spinner
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
                                        (countryData.map((record, index) => {
                                            return (
                                                <tr key={record.id} onClick={()=>handleUserApplication(record.id)}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        {record.firstName} {record.lastName}
                                                    </td>
                                                    <td>
                                                        {record.email}
                                                    </td>
                                                    <td>
                                                        {record.nationality}
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
        </div>
    );


}

export default UsersApplications;