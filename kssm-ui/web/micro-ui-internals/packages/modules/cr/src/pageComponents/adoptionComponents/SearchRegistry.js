import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const SearchRegistry = ({ config, onSelect, userType, formData }) => {
    const stateId = Digit.ULBService.getStateId();
    
    const { t } = useTranslation();
    let validation = {};
    const { data: Menu } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
    const [ChildDOB, setChildDOB] = useState(formData?.SearchRegistry?.ChildDOB);
    const [Gender, selectGender] = useState(formData?.SearchRegistry?.Gender);
    const [ChildAadharNo, setChildAadharNo] = useState(formData?.SearchRegistry?.ChildAadharNo);
    const [MotherNameEn, setMotherNameEn] = useState(formData?.SearchRegistry?.MotherNameEn);
    const [FatherNameEn, setFatherNameEn] = useState(formData?.SearchRegistry?.FatherNameEn);   
    const [ChildFirstNameEn, setChildFirstNameEn] = useState(formData?.SearchRegistry?.ChildFirstNameEn);
    const [ChildMiddleNameEn, setChildMiddleNameEn] = useState(formData?.SearchRegistry?.ChildMiddleNameEn);
    const [ChildLastNameEn, setChildLastNameEn] = useState(formData?.SearchRegistry?.ChildLastNameEn);
    const [ChildFirstNameMl, setChildFirstNameMl] = useState(formData?.SearchRegistry?.ChildFirstNameMl);
    const [ChildMiddleNameMl, setChildMiddleNameMl] = useState(formData?.SearchRegistry?.ChildMiddleNameMl);
    const [ChildLastNameMl, setChildLastNameMl] = useState(formData?.SearchRegistry?.ChildLastNameMl);
    const [isAdopted, setIsAdopted] = useState(formData?.SearchRegistry?.isAdopted);
    const [isMultipleBirth, setIsMultipleBirth] = useState(formData?.SearchRegistry?.isMultipleBirth);
    const [isFatherMotherInfo, setIsFatherMotherInfo] = useState(formData?.SearchRegistry?.isFatherMotherInfo);
    const [isFatherInfo, setIsFatherInfo] = useState(formData?.SearchRegistry?.isFatherInfo);
    const [isMotherInfo, setIsMotherInfo] = useState(formData?.SearchRegistry?.isMotherInfo);
    const [isGuardianInfo, setIsGuardianInfo] = useState(formData?.SearchRegistry?.isGuardianInfo);
    const [isBornOutSide, setIsBornOutSide] = useState(formData?.SearchRegistry?.isBornOutSide);
    const [ChildPassportNo, setChildPassportNo] = useState(formData?.SearchRegistry?.ChildPassportNo);
    const [ChildArrivalDate, setChildArrivalDate] = useState(formData?.SearchRegistry?.ChildArrivalDate);

    const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

    let menu = [];
    Menu &&
        Menu.map((genderDetails) => {
            menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
        });

    const onSkip = () => onSelect();

    function setselectGender(value) {
        selectGender(value);
    }
    function setSelectChildAadharNo(e) {
        setChildAadharNo(e.target.value);
    }
    function setselectChildDOB(value) {
        setChildDOB(value);
    }
    function setSelectMotherNameEn(e) {
        setMotherNameEn(e.target.value);
    }
    function setSelectFatherNameEn(e) {
        setFatherNameEn(e.target.value);
    }
    
    function setSelectChildFirstNameEn(e) {
        setChildFirstNameEn(e.target.value);
    }
    function setSelectChildMiddleNameEn(e) {
        setChildMiddleNameEn(e.target.value);
    }
    function setSelectChildLastNameEn(e) {
        setChildLastNameEn(e.target.value);
    }
    function setSelectChildFirstNameMl(e) {
        setChildFirstNameMl(e.target.value);
    }
    function setSelectChildMiddleNameMl(e) {
        setChildMiddleNameMl(e.target.value);
    }
    function setSelectChildLastNameMl(e) {
        setChildLastNameMl(e.target.value);
    }
    function setAdopted(e) {
        if (e.target.checked == true) {
            setIsAdopted(true);
        } else {
            setIsAdopted(false);
        }
    }
    function setMultipleBirth(e) {
        if (e.target.checked == true) {
            setIsMultipleBirth(true);
        } else {
            setIsMultipleBirth(false);
        }
    }
    function setFatherMotherInfo(e) {
        if (e.target.checked == true) {
            setIsFatherMotherInfo(true);
        } else {
            setIsFatherMotherInfo(false);
        }
    }
    function setFatherInfo(e) {
        if (e.target.checked == true) {
            setIsFatherInfo(true);
        } else {
            setIsFatherInfo(false);
        }
    }
    
    function setMotherInfo(e) {
        if (e.target.checked == true) {
            setIsMotherInfo(true);
        } else {
            setIsMotherInfo(false);
        }
    }
    function setGuardianInfo(e) {
        if (e.target.checked == true) {
            setIsGuardianInfo(true);
        } else {
            setIsGuardianInfo(false);
        }
    }
    function setBornOutSide(e) {
        console.log(e.target.checked);
        if (e.target.checked === true) {
            
            setIsBornOutSide(true);
            console.log(isBornOutSide);

        } else {
            setIsBornOutSide(false);
        }
        
    }
    function setSelectPassportNo(e) {
        setChildPassportNo(e.target.value);
    }
    function setSelectArrivalDate(e) {
        setChildArrivalDate(e.target.value);
    }

    const goNext = () => {
        sessionStorage.setItem("ChildDOB", ChildDOB);
        sessionStorage.setItem("Gender", Gender.code);
        sessionStorage.setItem("ChildAadharNo", ChildAadharNo);
        sessionStorage.setItem("ChildFirstNameEn", ChildFirstNameEn);
        sessionStorage.setItem("MotherNameEn", MotherNameEn);
        sessionStorage.setItem("FatherNameEn", FatherNameEn);        
        sessionStorage.setItem("ChildMiddleNameEn", ChildMiddleNameEn);
        sessionStorage.setItem("ChildLastNameEn", ChildLastNameEn);
        sessionStorage.setItem("ChildFirstNameMl", ChildFirstNameMl);
        sessionStorage.setItem("ChildMiddleNameMl", ChildMiddleNameMl);
        sessionStorage.setItem("ChildLastNameMl", ChildLastNameMl);
        sessionStorage.setItem("isAdopted", isAdopted);
        sessionStorage.setItem("isMultipleBirth", isMultipleBirth);
        sessionStorage.setItem("isFatherMotherInfo", isFatherMotherInfo);
        sessionStorage.setItem("isFatherInfo", isFatherInfo);
        sessionStorage.setItem("isMotherInfo", isMotherInfo);
        sessionStorage.setItem("isGuardianInfo", isGuardianInfo);
        sessionStorage.setItem("isMotherInfo", isMotherInfo);
        sessionStorage.setItem("isBornOutSide", isBornOutSide);
        sessionStorage.setItem("ChildPassportNo", ChildPassportNo);
        sessionStorage.setItem("ChildArrivalDate", ChildArrivalDate);
        onSelect(config.key, { ChildDOB, Gender, ChildAadharNo,MotherNameEn,FatherNameEn, ChildFirstNameEn, ChildMiddleNameEn, ChildLastNameEn, ChildFirstNameMl, ChildMiddleNameMl, ChildLastNameMl, isAdopted, isMultipleBirth, isFatherMotherInfo, isMotherInfo, isGuardianInfo, isBornOutSide, ChildPassportNo, ChildArrivalDate });
    }
    return (
        <React.Fragment>
            {window.location.href.includes("/citizen") ? <Timeline  /> : null}
            {window.location.href.includes("/employee") ? <Timeline /> : null}
            <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ChildDOB}>

                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRY_SEARCH")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" ><CardLabel>{t("CR_DATE_OF_BIRTH_TIME")}</CardLabel>
                        <DatePicker date={ChildDOB} name="ChildDOB" onChange={setselectChildDOB} placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`} />
                    </div>
                    <div className="col-md-6" > <CardLabel>{`${t("CR_GENDER")}`}</CardLabel>
                        <Dropdown t={t} optionKey="code" isMandatory={true} option={menu} selected={Gender} select={setselectGender} disabled={isEdit} placeholder={`${t("CR_GENDER")}`} {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })} />
                    </div>                    
                </div>
             
                <div className="row">
                    <div className="col-md-12" ><h1 className="" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span> </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6" > <CardLabel>{`${t("CR_NAME_OF_MOTHER")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="MotherNameEn" value={MotherNameEn} onChange={setSelectMotherNameEn} disable={isEdit} placeholder={`${t("CR_NAME_OF_MOTHER")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_NAME_OF_MOTHER") })} />
                    </div>
                    <div className="col-md-6" > <CardLabel>{`${t("CR_NAME_OF_FATHER")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="FatherNameEn" value={FatherNameEn} onChange={setSelectFatherNameEn} disable={isEdit} placeholder={`${t("CR_NAME_OF_FATHER")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_CR_NAME_OF_FATHER") })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" > <CardLabel>{`${t("CR_FIRST_NAME_EN")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameEn" value={ChildFirstNameEn} onChange={setSelectChildFirstNameEn} disable={isEdit} placeholder={`${t("CR_FIRST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    <div className="col-md-4" > <CardLabel>{`${t("CR_MIDDLE_NAME_EN")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameEn" value={ChildMiddleNameEn} onChange={setSelectChildMiddleNameEn} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    <div className="col-md-4" > <CardLabel>{`${t("CR_LAST_NAME_EN")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildLastNameEn" value={ChildLastNameEn} onChange={setSelectChildLastNameEn} disable={isEdit} placeholder={`${t("CR_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" > <CardLabel>{`${t("CR_FIRST_NAME_ML")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameMl" value={ChildFirstNameMl} onChange={setSelectChildFirstNameMl} disable={isEdit} placeholder={`${t("CR_FIRST_NAME_ML")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    <div className="col-md-4" > <CardLabel>{`${t("CR_MIDDLE_NAME_ML")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameMl" value={ChildMiddleNameMl} onChange={setSelectChildMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    <div className="col-md-4" > <CardLabel>{`${t("CR_LAST_NAME_ML")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildLastNameMl" value={ChildLastNameMl} onChange={setSelectChildLastNameMl} disable={isEdit} placeholder={`${t("CR_LAST_NAME_MLS")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                        <CheckBox label={t("CR_FATHER_AND_MOTHER_INFORMATION_MISSING")} onChange={setFatherMotherInfo} value={isFatherMotherInfo} checked={isFatherMotherInfo} />
                    </div>
                    </div>
                <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DECLARATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                        <CheckBox label={t("CR_INFORMATION_MISSING")} onChange={setFatherInfo} value={isFatherInfo} checked={isFatherInfo} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12" ><h1 className="" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span> </h1>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6" > <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameMl" value={ChildFirstNameMl} onChange={setSelectChildFirstNameMl} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CS_COMMON_AADHAAR") })} />
                    </div>
                    <div className="col-md-6" > <CardLabel>{`${t("OTP")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameMl" value={ChildMiddleNameMl} onChange={setSelectChildMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MOTHER_DECLARATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                        <CheckBox label={t("CR_INFORMATION_MISSING")} onChange={setMotherInfo} value={isMotherInfo} checked={isMotherInfo} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12" ><h1 className="" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span> </h1>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6" > <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameMl" value={ChildFirstNameMl} onChange={setSelectChildFirstNameMl} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CS_COMMON_AADHAAR") })} />
                    </div>
                    <div className="col-md-6" > <CardLabel>{`${t("OTP")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameMl" value={ChildMiddleNameMl} onChange={setSelectChildMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GUARDIAN_DECLARATION")}`}</span> </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        {/* <CardLabel>{`${t("CR_GENDER")}`}</CardLabel> */}
                        <CheckBox label={t("CR_INFORMATION_MISSING")} onChange={setGuardianInfo} value={isGuardianInfo} checked={isGuardianInfo} />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12" ><h1 className="" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span> </h1>
                    </div>
                </div>
                    <div className="row">
                    <div className="col-md-6" > <CardLabel>{`${t("CS_COMMON_AADHAAR")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildFirstNameMl" value={ChildFirstNameMl} onChange={setSelectChildFirstNameMl} disable={isEdit} placeholder={`${t("CS_COMMON_AADHAAR")}`} {...(validation = { isRequired: true, type: "text", title: t("CR_INVALID_CS_COMMON_AADHAAR") })} />
                    </div>
                    <div className="col-md-6" > <CardLabel>{`${t("OTP")}`}</CardLabel>
                        <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ChildMiddleNameMl" value={ChildMiddleNameMl} onChange={setSelectChildMiddleNameMl} disable={isEdit} placeholder={`${t("CR_MIDDLE_NAME_ML")}`} {...(validation = { isRequired: false, type: "text", title: t("CR_INVALID_TRADE_NAME") })} />
                    </div>
                    </div>
            </FormStep>
        </React.Fragment>
    );
};
export default SearchRegistry;
