import React from 'react';
import FaqItem from './FaqItem';
import './faqs.css';


const faqQA = [
  {
    question: 'When should I apply for my Dubai Visa?',
    answer: 'Ideally, you need to apply 30 to 40 days before your intended travel date. <br/> All UAE visas are valid for 60 days from the date of its issuance. <br/> To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'I applied my visa with an airline, can you help?',
    answer: 'This situation is just as like buying a coffee from a burger or pizza place and expecting it to be "the coffee". <br/>  An airline is good for flights, they earn money by selling their flights, they are not visa experts. They will never take an interest in the minute processing technicalities. Expecting their seriousness on this is not their fault. No one can help you once the visa application has been processed. <br/> Just wait and sip "the coffee"'
  },
  {
    question: 'How do I verify my visa online?',
    answer: 'To verify your visa online just visit: <br/>   <br/>  https://smart.gdrfad.gov.ae/Public_Th/StatusInquiry_New.aspx?GdfraLocale=en-US'
  },
  {
    question: 'How many days will it take to get the UAE Visa approval?',
    answer: 'Normal processing takes around 3 to 4 working days. <br/>  Express service processing gets an approval within 24 hours <br/>  Exclusions apply: Applications made on weekends (Friday & Saturday) and public holidays may take longer to process. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'What is the difference between Single Entry and Multiple Entry Dubai Visa?',
    answer: 'Single Entry Dubai Visa is entitled to be used for 1 entry and 1 exit. <br/>  Multiple Entry Dubai Visa is entitled to use for as many entries and exits to/from UAE from any airports. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'Can I book my ticket before applying for Dubai visa?',
    answer: 'Yes, you can. However, it\'s always smart to obtain your UAE visa approval in hand before making a purchase of non-refundable flight tickets or hotel bookings. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'How can I track my Dubai Visa application status?',
    answer: 'Just visit https://www.dubaivisa.com/track and enter your valid order reference. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'My UAE visa was not approved, will I get a Refund?',
    answer: 'Please be clear, that not a single government of any country in the world makes a refund to the rejected visa applications be it for any reason. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'Do infants and kids require to apply for a visa to enter into UAE?',
    answer: 'All travelers (of any age) non-UAE citizen or GCC nationals will require a UAE visa to enter the UAE.'
  },
  {
    question: 'Can I travel to Abu Dhabi with my Dubai Visa?',
    answer: 'Yes, you can travel to Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah or even to Fujairah with your Dubai visa. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'My Visa is approved, but I changed my mind to travel, can I get a refund?',
    answer: 'As per UAE immigration rule, there are NO REFUNDS for any visa application that has been processed regardless it is approved or rejected. <br/>  Is it necessary for me to obtain a UAE visa to enter Dubai? <br/>  UAE Visa is mandatory for all non-UAE citizens to travel to the UAE. It does not apply to the citizens of the GCC nations, such as Saudi Arabia, Bahrain, Qatar, Kuwait, and Oman. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'Can I take a flight with any airline?',
    answer: 'Yes, our UAE visas have no such restrictions. The applicant can travel with any airline they like. <br/>  I don\'t have scanned copy of documents? <br/>  No problem, you can take snaps from the mobile phone of your passport (make sure there are no flashes or cropping of the barcodes). The picture of the applicant can also be taken on a plain wall (make sure you are not wearing any hats or caps or sunglasses). <br/>  As long as the documents are clear and readable, you are good to go. <br/>  PASSPORT VALIDITY Passenger colour copy of passport (must be valid for six / 6 months)to proceed any type of entry visas'
  },
  {
    question: 'My visa is approved, but they are asking for more money?',
    answer: 'If you\'ve clicked this, our sympathies are with you. <br/>  You are just another victim that fell in their trap. Only if a little effort of online research was done all this could have been avoided. <br/>  No dear, no one can help you at this time. You are just too late to look for the right help now! <br/>  At dubaivisa.com we have a very strict policy of transparency. We will never ask for extra money. <br/>  Do I need to submit Flight Ticket and Hotel booking for my Dubai Visa approval? <br/>  No flight tickets and hotel bookings are not required for your UAE visa approval.  <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'How to check visa validity ?',
    answer: 'All visa is valid for 60 days to enter in UAE upon issued except for transit visa which is valid for 30 days only ... visa validity is showing on the visa copy we have sent to the passengers.'
  }
  ,
  {
    question: 'Can I get Dubai Visa approval within 12 hours?',
    answer: 'Yes, you can just click here to know more about it'
  },
  {
    question: 'I will be on transit to Dubai, will I need a Dubai Visa?',
    answer: 'Yes, you will need a Dubai visa if you will be going out of the airport.'
  },
  {
    question: 'I am a Travel agent can I have contracted agency rates?',
    answer: 'Yes, you will need to write to us at sales@dubaivisa.com  <br/>  A corporate salesperson will attend to you.'
  },
  {
    question: 'GCC residents needs to apply Dubai Visa?',
    answer: 'As of 29 April 2016, GCC residence permit holders will need to apply for a UAE visa before arriving in Dubai.'
  },
  {
    question: 'How can I trust Dubaivisa.com?',
    answer: 'The concern is valid for any online buyer. However, dubaivisa.com is backed by a legally registered entity "World Tours LLC" since 2009 and is physically based in the heart of Dubai. <br/>  You may want to send your friends or relatives to our office to confirm that we are not a virtual online company like many other websites that are not even based in UAE, that will take your order and will not reply back or will hold your visa for a ransom. <br/>  Dubaivisa.com is the name you can trust. Click here to know what our customers say about us. <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'Can my Dubai visa application be rejected?',
    answer: 'Rejections only occur if you have any one of the 2 following conditions: <br/>  You have a criminal history  <br/>  You were deported from UAE previously. <br/> *approvals and rejections are at the sole discretion of the UAE Government. <br/> To start your Dubai visa application now <a href="/">click here</a>  <br/>  How can I apply for a Dubai visa?  <br/>  Steps to Apply or to know the rates of the visa at www.dubaivisa.com  <br/>  1- Enter your nationality (your passport)  <br/>  2- Select the visa type  <br/>  3- Upload your Documents (Passport copy must be valid for 6 months + Picture on plain Background + ID card)  <br/>  4- Make Payment (by Visa or MasterCard). <br/>  Note: Dont forget to select the Express Service before check out to get your approval within 12 hours!  <br/>  To start your Dubai visa application now <a href="/">click here</a>'
  },
  {
    question: 'What is the minimum age required to apply for Dubai Visa?',
    answer: 'An individual applicant must be of at least 18 years old to be able to apply for their UAE visa on a self basis. <br/>  Any minor (under the age of 18) will need to apply with their parents/relatives (that are adult).'
  }
]

const Faqs = () => {
  return (
    <section className="faqs container container-cus section-cus-m-pad">

      <div className="secTitle">
        <h3 className="title">
            Everything you need to know about UAE visas
        </h3>
      </div>
      {
        faqQA.map(({ question, answer }) => {
          return (
            <div className="secContent flex">
              <div className="optionSelection">
                <FaqItem
                  question={question}
                  answer={answer}
                />
              </div>
            </div>)
        })
      }
    </section>
  );
};

export default Faqs;
