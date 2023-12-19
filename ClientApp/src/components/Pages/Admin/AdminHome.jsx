import React from "react";
import adminpic from "../../../Assets/admin.jpg";

const AdminHome =()=>{
 
return(
    <>
    <div className="container m-5 ">
      <div className="row">

        <div className="col-md-9">
          {/* Additional Content */}
          <div className="custom-box p-4">
            <h2>Admin Panle</h2>
            <p>This is admin Panel to review and progress user applications. you can also add or remove Plans </p>
          </div>
        </div>
        <div className="col-md-3">
          {/* Profile Card */}
          <div className="custom-box p-4">
            <h2>Profile</h2>
            <img
              src={adminpic}
              alt="Profile"
              className="rounded-circle mb-3 img-custom"
            />
            <p>Name: Admin</p>
            <p>Email: admin@visa.com</p>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="custom-box">
          <h2>Box Content</h2>
          <p>This is a box with a shadow effect and a 5rem margin from its parent.</p>
        </div>
      </div>
    </div>
  </div> */}
    
    {/* <div id="content">

<nav class="navbar navbar-default">
    <div class="container-fluid">

        <div class="navbar-header">
            <button type="button" id="sidebarCollapse" class="navbar-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
            </ul>
        </div>
    </div>
</nav>

<h2>Collapsible Sidebar Using Bootstrap 3</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="line"></div>

<h2>Lorem Ipsum Dolor</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="line"></div>

<h2>Lorem Ipsum Dolor</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="line"></div>

<h3>Lorem Ipsum Dolor</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div> */}
    {/* <Row>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
</Row> */}
    </>
);
}

export default AdminHome;