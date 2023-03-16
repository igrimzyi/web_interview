import React, {useState, useEffect}from "react";
import ReactDOM from "react-dom";
import cntl from "cntl";
import Button from "./stories/Components/Button/Button";
import CollapsibleSection from "./stories/Components/CollapsibleSection/CollapsibleSection";
import Input from "./stories/Components/Input/Input";
import Dropdown from "./stories/Components/Dropdown/Dropdown";
import ProgressTracker from "./stories/Components/ProgressTracker/ProgressTracker";
import NavBar from "./stories/Components/NavBar/NavBar";

const containerCN = cntl`
  mt-3
  p-3
  border
  rounded
`;



const App = () => {

  // Declare states in order to be merged into one object
  const [information, setInformation] = useState({
    eSpaceName: undefined,
    companyName: "",
    subscription:undefined,
    location:{

    }
  })

  const [ownerInformation, setOwnerInformation] = useState({
    name:'',
    phone:'',
    email:''
  })

  const [locationInformation, setLocationInformation] = useState({
    street:'', 
    suite:'',
    city:'',
    country:'',
    postalCode:''
  })

  // Declare options for dropdowns
  const country_list = [{"value":"United States","label":"United States"},{"value":"Afghanistan","label":"Afghanistan"},{"value":"Albania","label":"Albania"},{"value":"Algeria","label":"Algeria"},{"value":"American Samoa","label":"American Samoa"},{"value":"Andorra","label":"Andorra"},{"value":"Angola","label":"Angola"},{"value":"Anguilla","label":"Anguilla"},{"value":"Antarctica","label":"Antarctica"},{"value":"Antigua and Barbuda","label":"Antigua and Barbuda"},{"value":"Argentina","label":"Argentina"},{"value":"Armenia","label":"Armenia"},{"value":"Aruba","label":"Aruba"},{"value":"Australia","label":"Australia"},{"value":"Austria","label":"Austria"},{"value":"Azerbaijan","label":"Azerbaijan"},{"value":"Bahamas","label":"Bahamas"},{"value":"Bahrain","label":"Bahrain"},{"value":"Bangladesh","label":"Bangladesh"},{"value":"Barbados","label":"Barbados"},{"value":"Belarus","label":"Belarus"}]

  const subscriptionOptions = [{"label":"Elite","value":"Elite"},{"label":"Professional","value":"Professional"},{"label":"Starter","value":"Starter"}]

  const companyNameOptions = [{"label":"Company 1","value":"Company 1"},{"label":"Company 2","value":"Company 2"},{"label":"Company 3","value":"Company 3"}]

  // This function will format the phone number as the user types it in.
  function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
  
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
  
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const updateNumber = (e) => {
   setOwnerInformation({...ownerInformation,phone:formatPhoneNumber(e)})

  }

  // This function will save all the information into one object


  const saveInformation = () => {
    const data = {
      eSpaceName: information.eSpaceName,
      companyName: information.companyName,
      subscription: information.subscription,
      owner:ownerInformation,
      location:locationInformation
    }
    console.log(data)


  }
  
  return (
    <div  className="bg-black h-full w-full">
        <NavBar/>

        <div style={{'marginLeft':'10%', 'marginTop':'5%'}} className="lg:w-3/5 sm:w-3/5 md:w-3/5"> 
         
            <h1>ADD NEW CLIENT</h1>
            <ProgressTracker steps={["Client Info", "Logo", "Branding", "App Store"]} />
         
          {/* Overview */}
          <CollapsibleSection 
            children={
              <div className="bg-black w-full flex flex-wrap justify-between  h-1/4">
                {/* Dropdown for Company Name */}
                <Dropdown isClearable={false} onChange={(e)=>{setInformation({...information,companyName:e.value})}} 
                value={{"label":information.companyName,"value":information.companyName}} 
                options={companyNameOptions} className="w-5/12" label={'Company Name'}/>
                
                {/* Input for eSpace Name */}
                <Input onChange={(e)=>{setInformation({...information,eSpaceName:e}); console.log(information)}} 
                value={information.eSpaceName} isRequired={true} className="w-5/12" label={'eSpace Name'}/>

                {/* Dropdown for Subscription */}
                <Dropdown isClearable={false} onChange={(e)=>{setInformation({...information,subscription:e.value})}} 
                value={{"label":information.subscription,"value":information.subscription}} options={subscriptionOptions} 
                className="w-5/12" label={'Subscription'}/>
              </div>
            } 
            className="border-b-1 border-inherit"
            title={'Overview'}
          />

          {/* Owner Information */}
          <CollapsibleSection
            children={
              <div className="bg-black w-full flex flex-wrap justify-between h-1/4">
                {/* Input for Primary Owner's name */}
                <Input isRequired={true} onChange={(e)=>{setOwnerInformation({...ownerInformation,name:e})}} 
                value={ownerInformation.name} className="w-5/12 strColor" label={'Primary Owner'}/>

                {/* Input for Primary Owner's Email */}
                <Input isRequired={true} onChange={(e)=>{setOwnerInformation({...ownerInformation,email:e})}}  type="email" 
                value={ownerInformation.email} className="w-5/12" label={'Primary Owner Email'}/>

                {/* Input for Primary Owner's Phone */}
                <Input isRequired={true} onChange={updateNumber} className="w-5/12" 
                value={ownerInformation.phone} label={'Primary Owner Phone'}/>
              </div>
            } 
            title={'Owner Informaton'}
            />

        {/* Location Information */}  
        <CollapsibleSection
            children={
              <div className="bg-black w-full flex flex-wrap justify-between h-2/4">

                {/* Input for Address */}
                <Input isRequired={true}  onChange={(e)=>{setLocationInformation({...locationInformation,street:e})}} 
                value={locationInformation.street} className="w-5/12" label={'Street Address'}/>
                
                 {/* Input for City */}
                <Input isRequired={true}  onChange={(e)=>{setLocationInformation({...locationInformation,city:e})}} 
                value={locationInformation.city} className="w-5/12" label={'City'}/>

                 {/* Input for Suite/Apt no. */}
                <Input className="w-5/12" onChange={(e)=>{setLocationInformation({...locationInformation,suite:e})}} 
                value={locationInformation.suite} label={'Suite/Unit'}/>
                
                 {/* Input for Country */}
                <Dropdown isClearable={false} onChange={(e)=>{setLocationInformation({...locationInformation,country:e.value})}} 
                value={{"label":locationInformation.country,"value":locationInformation.country}} options={country_list} className="w-5/12" label={'Country'}/>
                
                {/* Input for postal code */}
                <Input isRequired={true} onChange={(e)=>{setLocationInformation({...locationInformation,postalCode:e})}} 
                value={locationInformation.postalCode} className="w-5/12" label={'Postal Code'}/>
          
              </div>
            } 
            title={'Local Informaton'}
        />

        <Button onClick={saveInformation} title={'Save'} className="w-1/12"/>
       


        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
