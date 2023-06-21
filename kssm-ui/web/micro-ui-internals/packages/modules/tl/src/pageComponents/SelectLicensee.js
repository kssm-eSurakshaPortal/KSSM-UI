import React, { useState,useEffect } from "react";
import { CardLabel, TypeSelectCard,Dropdown,TextInput, TextArea,LabelFieldPair } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";
import Timeline from "../components/TLTimeline";

const SelectLicensee = ({ t, config, onSelect, userType, formData }) => {
  let validation = {};
  const onSkip = () => onSelect();
  const citizentenantId = Digit.ULBService.getCitizenCurrentTenant();
  const empTenantId =Digit.ULBService.getCurrentUlb();
  let tenantId = "";
  if(citizentenantId !="kl"){
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  } else {
      tenantId =  empTenantId["code"];
    }
   console.log("userType"+ tenantId);
  console.log(tenantId);
  const stateId = Digit.ULBService.getStateId();
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "NatureOfInstitution");
  const { data: type = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TypeOfUnit");
  const { data: boundaryList = {}, isLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [value2, setValue2] = useState();
  const [LicenseeType, setLicenseeType] = useState(formData?.TradeDetails?.LicenseeType);
  const [LicensingUnitType, setLicensingUnitType] = useState(formData?.TradeDetails?.LicensingUnitType);
  const [LicensingInstitutionType, setLicensingInstitutionType] = useState(formData?.TradeDetails?.LicensingInstitutionType);
  const [Zonal, setZonal] = useState(formData.TradeDetails?.Zonal);
  const [WardNo, setWardNo] = useState(formData.TradeDetails?.WardNo);
  const [wards, setFilterWard] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderRadio, setIsInitialRenderRadio] = useState(true);
  const [LicenseUnitID, setLicenseUnitID] = useState(formData.TradeDetails?.LicenseUnitID);
  const [NoOfEmployees, setNoOfEmployees] = useState(formData.TradeDetails?.NoOfEmployees);
  const [LicenseUnitName, setLicenseUnitName] = useState(formData.TradeDetails?.LicenseUnitName);
  const [LicenseUnitNameMal, setLicenseUnitNameMal] = useState(formData.TradeDetails?.LicenseUnitNameMal);
  const [StreetName, setStreetName] = useState(formData.TradeDetails?.StreetName);
  const [LandMark, setLandMark] = useState(formData.TradeDetails?.LandMark);
  const [MobileNo, setMobileNo] = useState(formData.TradeDetails?.MobileNo);
  const [EmailID, setEmailID] = useState(formData.TradeDetails?.EmailID);
  const [LicensingInstitutionID, setLicensingInstitutionID] = useState(formData.TradeDetails?.LicensingInstitutionID);
  const [LicensingInstitutionName, setLicensingInstitutionName] = useState(formData.TradeDetails?.LicensingInstitutionName);  
  const [LicensingInstitutionAddress, setLicensingInstitutionAddress] = useState(formData.TradeDetails?.LicensingInstitutionAddress);
  const [InstitutionMobileNo, setInstitutionMobileNo] = useState(formData.TradeDetails?.InstitutionMobileNo);
  const [InstitutionEmailID, setInstitutionEmailID] = useState(formData.TradeDetails?.InstitutionEmailID);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const menu = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];
  let cmbPlace = [];
  place &&
  place["TradeLicense"] &&
  place["TradeLicense"].NatureOfInstitution.map((ob) => {
        cmbPlace.push(ob);
    });
  let cmbtype = [];
  type &&
  type["TradeLicense"] &&
  type["TradeLicense"].TypeOfUnit.map((ob) => {
    cmbtype.push(ob);
  });
  let cmbZonal = [];
  boundaryList &&
  boundaryList["egov-location"] &&
  boundaryList["egov-location"].TenantBoundary.map((ob) => {    
    cmbZonal.push(ob.boundary.children);
  });
  function setSelectLicenseUnitID(e) {
    setLicenseUnitID(e.target.value);
  }
  function setSelectLicenseUnitName(e) {
    setLicenseUnitName(e.target.value);
  }
  function setSelectLicenseUnitNameMal(e) {
    setLicenseUnitNameMal(e.target.value);
  }
  function setSelectZonalOffice(e) {
    setIsInitialRender(true);
    setZonal(e);
    setWardNo(null);
    setFilterWard(null);
  }
  function setSelectWard(e) {
    setWardNo(e);
  }
  function setSelectStreetName(e) {
    setStreetName(e.target.value);
  }
  function setSelectLandMark(e) {
    setLandMark(e.target.value);
  }
  function setSelectMobileNo(e) {
    setMobileNo(e.target.value);
  }
  function setSelectEmailID(e) {
    setEmailID(e.target.value);
  }
  function setSelectLicensingInstitutionID(e) {
    setLicensingInstitutionID(e.target.value);
  }
  function setSelectLicensingInstitutionName(e) {
    setLicensingInstitutionName(e.target.value);
  }
  function setSelectLicensingInstitutionAddress(e) {
    setLicensingInstitutionAddress(e.target.value);
  }
  function setSelectInstitutionMobileNo(e) {
    setInstitutionMobileNo(e.target.value);
  }
  function setSelectInstitutionEmailID(e) {
    setInstitutionEmailID(e.target.value);
  }
  function selectLicenseeType(value) {
    setLicenseeType(value);
    setValue2(value.code);
    setIsInitialRenderRadio(true);
  }
  function selectLicensingUnitType(value) {
    setLicensingUnitType(value);    
  }  
  function setSelectNoOfEmployees(e) {
    setNoOfEmployees(e.target.value);
  }
  function selectLicensingInstitutionType(value) {
    setLicensingInstitutionType(value);    
  }  
  
  useEffect(() => {
    
    if (isInitialRender) {
      if(Zonal){
        setIsInitialRender(false);
        setFilterWard(Zonal.children)
      }
    }
  }, [wards,isInitialRender]);

  useEffect(() => {
    
    if (isInitialRenderRadio) {
      if(LicenseeType){
        setIsInitialRenderRadio(false);
        setValue2(LicenseeType.code);
      }
    }
  }, [isInitialRender]);

  function goNext() {
    if(value2 === "INDIVIDUAL"){
      // sessionStorage.setItem("TL_COMMON_INDIVIDUAL", "TL_COMMON_INDIVIDUAL");
      sessionStorage.setItem("LicensingUnitType", LicensingUnitType.code);
      sessionStorage.setItem("LicenseeType", LicenseeType.code);
      sessionStorage.setItem("NoOfEmployees", NoOfEmployees);
      sessionStorage.setItem("LicenseUnitID", LicenseUnitID);
      sessionStorage.setItem("LicenseUnitName", LicenseUnitName);
      sessionStorage.setItem("LicenseUnitNameMal", LicenseUnitNameMal);
      sessionStorage.setItem("ZonalDet", Zonal.name);
      sessionStorage.setItem("WardDet", WardNo.name);
      sessionStorage.setItem("StreetName", StreetName);   
      sessionStorage.setItem("LandMark", LandMark);   
      sessionStorage.setItem("MobileNo", MobileNo);   
      sessionStorage.setItem("EmailID", EmailID); 
      onSelect(config.key, { LicensingUnitType,NoOfEmployees,LicenseeType,LicenseUnitID,LicenseUnitName,LicenseUnitNameMal,Zonal,WardNo,StreetName,LandMark,MobileNo,EmailID });  
    } else if(value2 === "INSTITUTION"){
      // sessionStorage.setItem("TL_COMMON_INSTITUTION", LicenseeType.code);
      sessionStorage.setItem("LicenseeType", LicenseeType.code);
      sessionStorage.setItem("NoOfEmployees", '');
      sessionStorage.setItem("LicensingInstitutionType", LicensingInstitutionType.code);
      sessionStorage.setItem("LicensingInstitutionID", LicensingInstitutionID);
      sessionStorage.setItem("LicensingInstitutionName", LicensingInstitutionName);
      sessionStorage.setItem("LicensingInstitutionAddress", LicensingInstitutionAddress);
      sessionStorage.setItem("InstitutionMobileNo", InstitutionMobileNo);
      sessionStorage.setItem("InstitutionEmailID", InstitutionEmailID);
      sessionStorage.setItem("LicensingUnitType", LicensingUnitType.code);
      sessionStorage.setItem("LicenseUnitID", LicenseUnitID);
      sessionStorage.setItem("LicenseUnitName", LicenseUnitName);
      sessionStorage.setItem("LicenseUnitNameMal", LicenseUnitNameMal);
      sessionStorage.setItem("ZonalDet", Zonal.name);
      sessionStorage.setItem("WardDet", WardNo.name);
      sessionStorage.setItem("StreetName", StreetName);   
      sessionStorage.setItem("LandMark", LandMark);   
      sessionStorage.setItem("MobileNo", MobileNo);   
      sessionStorage.setItem("EmailID", EmailID);
      onSelect(config.key, { LicenseeType,NoOfEmployees,LicensingInstitutionType,LicensingInstitutionID,LicensingInstitutionName,LicensingInstitutionAddress,InstitutionMobileNo,InstitutionEmailID,LicensingUnitType,LicenseUnitID,LicenseUnitName,LicenseUnitNameMal,Zonal,WardNo,StreetName,LandMark,MobileNo,EmailID }); 
    }
      
  }
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline /> : null}
    {window.location.href.includes("/employee") ? <Timeline /> : null}

    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}  isDisabled={!LicensingUnitType || !LicenseUnitName  || !LicenseUnitNameMal || !Zonal || !WardNo|| !StreetName || !LandMark }>        
          <LabelFieldPair style={{ display: "flex" }}><CardLabel style={{fontSize:"17px",width:"none !important"}}>{`${t("TL_LICENSEE_MSG")}`}</CardLabel>
           <RadioButtons t={t} optionsKey="i18nKey" isMandatory={config.isMandatory} options={menu} selectedOption={LicenseeType} onSelect={selectLicenseeType} disabled={isEdit} style={{ marginTop:"-8px",paddingLeft:"5px" ,height:"25px",display: "flex"}} /> 
          </LabelFieldPair>
      {value2 === "INDIVIDUAL" && (
      <div>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}>{`${t("TL_LICENSEE_UNIT_MSG")}`}</span></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={cmbtype} selected={LicensingUnitType} select={selectLicensingUnitType} disabled={isEdit} placeholder={`${t("TL_LICENSING_UNIT_TYPE")}`} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_NO_EMPLOYEES")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="NoOfEmployees" value={NoOfEmployees} onChange={setSelectNoOfEmployees} disable={isEdit} placeholder={`${t("TL_NO_EMPLOYEES")}`} {...(validation = { pattern: "^[0-9]{8}$", isRequired: true, type: "number", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
          </div>
        </div>
        <div className="row">         
          <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitName" value={LicenseUnitName} onChange={setSelectLicenseUnitName} disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitNameMal" value={LicenseUnitNameMal} onChange={setSelectLicenseUnitNameMal} disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = {  isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="name" isRequired="true" isMandatory={config.isMandatory} option={cmbZonal[0]} selected={Zonal} select={setSelectZonalOffice} disabled={isEdit} placeholder={`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`} {...(validation = { isRequired: true, title: t("TL_INVALID_ZONAL_NAME") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={wards} selected={WardNo} select={setSelectWard} disabled={isEdit} placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`} {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="StreetName" value={StreetName} onChange={setSelectStreetName} disable={isEdit} placeholder={`${t("TL_STREET_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.,0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LandMark" value={LandMark} onChange={setSelectLandMark} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_LAND_MARK")}`} {...(validation = { pattern: "^[a-zA-Z-.,0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="MobileNo" value={MobileNo} onChange={setSelectMobileNo} disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { type: "number", isRequired: false,title: t("TL_INVALID_MOBILE_NO") })} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="EmailID" value={EmailID} onChange={setSelectEmailID} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
          </div>
        </div>
        </div> )}

        {value2 === "INSTITUTION" && (
      <div>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}>{`${t("TL_LICENSING_INSTITUTION_HEADER")}*`}</span> </h1>
          </div>        
        </div>
        <div className="row">
          <div className="col-md-4" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={cmbPlace} selected={LicensingInstitutionType} select={selectLicensingInstitutionType} disabled={isEdit} placeholder={`${t("TL_LICENSING_INSTITUTION_TYPE")}`} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_ID")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicensingInstitutionID" value={LicensingInstitutionID} onChange={setSelectLicensingInstitutionID} disable={isEdit} placeholder={`${t("TL_LICENSING_INSTITUTION_ID")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "number", title: t("TL_INVALID_LICENSING_INSTITUTION_ID") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicensingInstitutionName" value={LicensingInstitutionName} onChange={setSelectLicensingInstitutionName} disable={isEdit} placeholder={`${t("TL_LICENSING_INSTITUTION_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_INSTITUTION_NAME") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" ><CardLabel>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicensingInstitutionAddress" value={LicensingInstitutionAddress} onChange={setSelectLicensingInstitutionAddress} disable={isEdit} placeholder={`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_INSTITUTION_ADDRESS") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="InstitutionMobileNo" value={InstitutionMobileNo} onChange={setSelectInstitutionMobileNo} disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = {type: "number", isRequired: false, title: t("TL_INVALID_MOBILE_NO") })} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="InstitutionEmailID" value={InstitutionEmailID} onChange={setSelectInstitutionEmailID} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
          </div>
        </div>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}>{`${t("TL_LICENSING_UNIT_HEADER")}*`}</span> </h1>
          </div>        
        </div>
        <div className="row"><div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="code" isMandatory={config.isMandatory} option={cmbtype} selected={LicensingUnitType} select={selectLicensingUnitType} disabled={isEdit} placeholder={`${t("TL_LICENSING_UNIT_TYPE")}`} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_ID")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitID" value={LicenseUnitID} onChange={setSelectLicenseUnitID} disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_ID")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("TL_INVALID_LICENSING_UNIT_ID") })} />
          </div>
          
        </div>
        <div className="row">
        <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitName" value={LicenseUnitName} onChange={setSelectLicenseUnitName} disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LicenseUnitNameMal" value={LicenseUnitNameMal} onChange={setSelectLicenseUnitNameMal} disable={isEdit} placeholder={`${t("TL_LICENSING_UNIT_NAME_ML")}`} {...(validation = {  isRequired: true, type: "text", title: t("TL_INVALID_LICENSING_UNIT_NAME") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey="name" isMandatory={config.isMandatory} option={cmbZonal[0]} selected={Zonal} select={setSelectZonalOffice} disabled={isEdit} placeholder={`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`} {...(validation = { isRequired: true, title: t("TL_INVALID_ZONAL_NAME") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown t={t} optionKey={"name"} isMandatory={config.isMandatory} option={wards} selected={WardNo} select={setSelectWard} disabled={isEdit} placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`} {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{`${t("TL_STREET_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="StreetName" value={StreetName} onChange={setSelectStreetName} disable={isEdit} placeholder={`${t("TL_STREET_NAME")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_STREET_NAME") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" ><CardLabel>{`${t("TL_LOCALIZATION_LAND_MARK")}`}<span className="mandatorycss">*</span></CardLabel>
          <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="LandMark" value={LandMark} onChange={setSelectLandMark} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_LAND_MARK")}`} {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_LAND_MARK") })} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" ><CardLabel>{`${t("TL_CONTACT_NO")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MobileNo" value={MobileNo} onChange={setSelectMobileNo} disable={isEdit} placeholder={`${t("TL_CONTACT_NO")}`} {...(validation = { pattern: "^[0-9]*$",type: "text", isRequired: false, title: t("TL_INVALID_MOBILE_NO") })} />
          </div>
          <div className="col-md-6" ><CardLabel>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardLabel>
            <TextInput t={t} isMandatory={false} type="email" optionKey="i18nKey" name="EmailID" value={EmailID} onChange={setSelectEmailID} disable={isEdit} placeholder={`${t("TL_LOCALIZATION_EMAIL_ID")}`} {...(validation = { isRequired: false, title: t("TL_INVALID_EMAIL_ID") })} />
          </div>
        </div>
        </div> )}
    </FormStep>
    </React.Fragment>
  );
};
export default SelectLicensee;
