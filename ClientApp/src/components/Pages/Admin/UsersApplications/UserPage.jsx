import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Auth/AuthProvider';
import {
    Card,
    CardImg,
    CardTitle,
    CardBody,
    Button,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    CardHeader,
    CardText,
    ModalFooter,
    Modal,
    ModalBody
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const ApplicationStatus = Object.freeze(
    {
        Submitted: 0,
        Review: 1,
        InProgress: 2,
        Completed: 3,
        Closed: 4,
        Pending: 5,
        Rejected: 6
    });

export default function UserPage() {


    const { token } = useAuth();
    const [applicationId, setApplicationId] = useState('');
    const [userData, setUserData] = useState({});
    const [profileprevimage, setProfileprevimage] = useState(null);
    const [idprevimage, setIdprevimage] = useState(null);
    const [passprevimage, setPassprevimage] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState(ApplicationStatus.Submitted);
    const [appComment, setappComment] = useState("");
    const [submiting, setSubmiting] = useState(true);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggle = () => setModal(!modal);
    useEffect(() => {
        const id = sessionStorage.getItem("xpuserpginf");
        setApplicationId(id);
        
        const getDataus = async (tkn) => {
            try {
                const uId = sessionStorage.getItem("xpuserpginf");
                const option = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },
                }
                const response = await fetch('api/UserApplication/get-user-application?' + new URLSearchParams({
                    userid: uId,
                }), option);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
                else {
                    console.log('Failed to get Data please Refersh');
                }
            } catch (e) {
                console.log(e)
                console.log('Failed to get Data please Refersh');
            }
        }
        getDataus(token);
    }, [token]);
    useEffect(() => {
        setApplicationStatus(userData.user?.applicationStatus);
        setappComment(userData.user?.applicationComments);
        setSubmiting(false);
        const getImage = async (path,tkn) => {
            if (path) {
                try {

                    const option = {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tkn}` },
                    }
                    const response = await fetch('api/UserApplication/getimg?' + new URLSearchParams({
                        path,
                    }), option);

                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    return url;
                } catch (error) {
                    console.error('Error loading image:', error);
                }
            }
        };
        const loadImages = async () => {
            if (userData.user) {
                setProfileprevimage(await getImage(userData.user.profilePicture,token))
                setPassprevimage(await getImage(userData.user.passportPicture,token))
                setIdprevimage(await getImage(userData.user.idPicture,token))
            }
        }
        loadImages();
    }, [userData,token]);

    // const getData = async () => {
    //     try {
    //         const uId = sessionStorage.getItem("xpuserpginf");
    //         const option = {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    //         }
    //         const response = await fetch('api/UserApplication/get-user-application?' + new URLSearchParams({
    //             userid: uId,
    //         }), option);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setUserData(data);
    //         }
    //         else {
    //             console.log('Failed to get Data please Refersh');
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         console.log('Failed to get Data please Refersh');
    //     }
    // }
    // const loadImages = async () => {
    //     if (userData.user) {
    //         setProfileprevimage(await getImage(userData.user.profilePicture))
    //         setPassprevimage(await getImage(userData.user.passportPicture))
    //         setIdprevimage(await getImage(userData.user.idPicture))
    //     }
    // }
    const updateApplication = async () => {
        setSubmiting(true);
        var datatosend = {
            id: applicationId,
            applicationStatus,
            applicationComments: appComment
        }
        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(datatosend)

        }
        const response = await fetch("api/UserApplication/update-Application", option);
        if (response.ok) {
            // Status code is in the range 200-299
            const data = await response.json();
            console.log(data)
        } else {
            // Status code is outside the range 200-299
            console.log('Error:', response.status, response.messge);
        }

        setSubmiting(false);
    }
    const deleteappliaction = async () => {
        setSubmiting(true);
        var datatosend = {
            id: applicationId,
        }
        const option = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(datatosend)

        }
        const response = await fetch("api/UserApplication/delete-Application?" + new URLSearchParams({
            Id: applicationId,
        }), option);
        if (response.ok) {
            // Status code is in the range 200-299

            // const data = await response.json();
            navigate('/users-applications');
        } else {
            // Status code is outside the range 200-299
            console.log('Error:', response.status, response.messge);
        }

        setSubmiting(false);
    }

    return (
        <Card className="mx-auto mt-4" style={{ Width: '800px' }}>
            <Row className='p-4'>
                {/* Pictures Row */}
                <Col>
                    <CardTitle tag="h5">Profile Picture</CardTitle>
                    <CardImg top width="100%" src={profileprevimage ? profileprevimage : ''}
                        alt="Image 1"
                        style={{ height: '100px', objectFit: 'contain' }}
                    />

                    {/* <Button color="primary" className="mt-2">
                Download
            </Button> */}
                </Col>
                <Col>
                    <CardTitle tag="h5">Passport Picture</CardTitle>
                    <CardImg top width="100%" src={passprevimage ? passprevimage : ''}
                        alt="Image 1"
                        style={{ height: '100px', objectFit: 'contain' }}
                    />

                    {/* <Button color="primary" className="mt-2">
                Download
            </Button> */}
                </Col>
                <Col>
                    <CardTitle tag="h5">Id Picture</CardTitle>
                    <CardImg top width="100%" src={idprevimage ? idprevimage : ''}
                        alt="Image 1"
                        style={{ height: '100px', objectFit: 'contain' }}
                    />

                    {/* <Button color="primary" className="mt-2">
                Download
            </Button> */}
                </Col>
            </Row>

            {/* Heading and Information */}
            <CardBody>
                <Row>
                    <Col xs="8"  className='pr-1'>
                        <Card>
                            <CardHeader>{userData.user?.firstName} {userData.user?.lastName}</CardHeader>
                            <CardBody>
                                <CardText>Email: {userData.user?.email}</CardText>
                                <CardText>Number: {userData.user?.number}</CardText>
                                <CardText>Nationality: {userData.user?.nationality}</CardText>
                                <CardText>Passport Number:{userData.user?.passportNumber}</CardText>
                                <CardText>Profession:{userData.user?.profession}</CardText>
                                <CardText>Purpose:{userData.user?.purpose}</CardText>
                                <CardText>Transaction Id:{userData.user?.transactionId}</CardText>
                                <CardText>Travel Date:{userData.user?.travelDate}</CardText>
                                <CardText>Visited Before: {userData.user?.visitedBefore?"YES":"NO"}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4" className='pl-1'>
                        <Card>
                            <CardHeader>Visa Plan | {userData.visaPlandata?.stayDuration} | {userData.visaPlandata?.visaType === 0 ? "Single Entry" : "Multiple Entry"}</CardHeader>
                            <CardBody>
                                <CardText>{userData.visaPlandata?.usdPrice} USD</CardText>
                                <CardText>{userData.visaPlandata?.aedPrice} AED</CardText>
                                <CardText>{userData.visaPlandata?.usdDescription}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    
                    {
                    
                    userData.addons?.map((addon,index)=>{
                        return (<Col key={index}>
                        <Card>
                            <CardHeader>Add On | {addon.title}</CardHeader>
                            <CardBody>
                                <CardText>{addon.usdPrice} USD</CardText>
                                <CardText>{addon.aedPrice} AED</CardText>
                                <CardText>{addon.usdDescription}</CardText>
                            </CardBody>
                        </Card>
                    </Col>)})}
                </Row>
                {/* Dropdown */}
                <FormGroup>
                    <Label for="exampleDropdown">Select Option</Label>
                    <Input
                        id="exampleSelect"
                        name="VisaType"
                        type="select"
                        value={applicationStatus}
                        onChange={(e) => { setApplicationStatus(Number(e.target.value)) }}
                        disabled={submiting}
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
                </FormGroup>

                {/* Comment Input */}
                <FormGroup>
                    <Label for="exampleText">Comments</Label>
                    <Input type="textarea" name="text" id="exampleText" value={appComment}
                        onChange={(e) => { setappComment(e.target.value) }} disabled={submiting} />
                </FormGroup>

                {/* Submit and Delete Buttons */}
                <Row>
                    <Col sm={{
                        offset: 0,
                        order: 1,
                        size: 1
                    }} >
                        <Button color="primary" onClick={updateApplication} disabled={submiting}>
                            Submit
                        </Button></Col>
                    <Col sm={{
                        offset: 9,
                        order: 2,
                        size: 1
                    }} >
                        <Button color="danger" className='ml-3' disabled={submiting} onClick={toggle}>Delete</Button></Col></Row>
            </CardBody>

            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalBody>
                    Are you Sure to you want to delete Application?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteappliaction} disabled={submiting}>
                        Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle} disabled={submiting}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Card>
    );
};