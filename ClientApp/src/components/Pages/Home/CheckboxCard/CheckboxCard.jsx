import React from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { MdOutlineAddComment } from "react-icons/md";
import './checkbox.css';

export const CheckboxCard = ({ value,record,moneytype, onToggle, isChecked }) => {
  return (
    <Card
      className={`addoncard ${isChecked? 'active' : ''}`}
      onClick={() => onToggle(record)}
    >
        <CardHeader className='cusmodal-footer'>
          <div><MdOutlineAddComment /></div>
          <div>{moneytype==='usd'?record.usdPrice:record.aedPrice} {moneytype==='usd'?"USD":"AED"}</div>
          </CardHeader>
      <CardBody>
        <CardTitle>{record.title}</CardTitle>
        <CardText className='cardtextcustom'>{moneytype==='usd'?record.usdDescription:record.aedDescription}</CardText>
      </CardBody>
    </Card>
  );
};
