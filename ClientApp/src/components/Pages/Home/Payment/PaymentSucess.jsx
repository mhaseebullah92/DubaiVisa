import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Spinner } from "reactstrap";

export default function PaymentSucess() {
  
  // const { id } = useParams();
    // const pam={ formid:'', payment_intent:'',payment_intent_client_secret:'',redirect_status:'' };
    const [isloading,setIsloading]= useState(true);
    const [failedsubmit,setFailedsubmit]= useState(false);
    const [formid, setformid]=useState('');
    const [payment_intent, setpayment_intent]=useState('');
    // const [payment_intent_client_secret, setpayment_intent_client_secret]=useState('');
    // const [redirect_status, setredirect_status]=useState('');
    useEffect(() => {

        // setpayment_intent_client_secret( new URLSearchParams(window.location.search).get(
        //   "payment_intent_client_secret"
        // ));
        setformid(new URLSearchParams(window.location.search).get(
          "formid"
        ));
        setpayment_intent ( new URLSearchParams(window.location.search).get(
          "payment_intent"
        ));
        // setredirect_status(new URLSearchParams(window.location.search).get(
        //   "redirect_status"
        // ));
        if(new URLSearchParams(window.location.search).get("redirect_status") ==="succeeded"){
          fetch("api/UserApplication/update-application-ps", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Id: new URLSearchParams(window.location.search).get(
              "formid"
            ) ,TransactionId:new URLSearchParams(window.location.search).get(
              "payment_intent"
            ) }),
          })
            // .then((res) => res.json())
            .then((response) => {
              if (response.ok) {
                setIsloading(false);
                return;
              }
              throw new Error('Something went wrong');
            })
            .catch((error) => {
              setFailedsubmit(true);
              setIsloading(false);
              console.log(error)
            });
        }

    },[]);

    const selectrespones=()=>{
      if(!isloading && failedsubmit){
        return(
          <div className="text-center">
            <h2>Application Submition Error</h2>
            <p>We are Facing some issue with your Application please Contact our Help Center with below info to support Thanks.</p>
            <br/>
            <p>Application Id:{formid}</p>
            <p>Payment Id:{payment_intent}</p>
            {/* <Link to="/">
              <Button color="primary">Go Back to Home</Button>
            </Link> */}
          </div>
        )
      }else{
        return(
          <div className="text-center">
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase.</p><br/>
            <p>Please save your Application Id to Track your Progress</p><br/>
            <p>Application ID:<h2>{formid}</h2></p>
            <Link to={'/track/'+formid}>
              <Button  className="btn-cus">Track Your Application</Button>
            </Link>
          </div>
        )
      }
    }



  return (
    <section className="container container-cus section-cus py-5" >
      
      <Row className="py-5 mt-5">
        <Col sm="12" md={{ size: 6, offset: isloading?6:3 }}>
          {isloading?<Spinner />:selectrespones()
          }
        </Col>
      </Row>
    </section>
  );
}