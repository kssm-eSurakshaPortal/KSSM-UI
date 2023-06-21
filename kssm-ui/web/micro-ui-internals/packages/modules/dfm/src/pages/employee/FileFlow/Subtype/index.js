import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BackButton,
  PrivateRoute,
  BreadCrumb,
  CommonDashboard,
  FormInputGroup,
  SubmitBar,
  CardLabel,
  CardLabelError,
  Dropdown,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SubType = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const { data: MajorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MajorFunction");
  const { data: SubFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "SubFunction");
  const { data: Function = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "Function");
  const { data: MinorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MinorFunction");
  const [MajorFunctionDet, setMajorFunctionDet] = useState(formData?.FatherInfoDetails?.MajorFunctionDet);
  const [SubFunctionDet, setSubFunctionDet] = useState(formData?.FatherInfoDetails?.SubFunctionDet);
  const [FunctionDet, setFunctionDet] = useState(formData?.FatherInfoDetails?.FunctionDet);
  const [MinorFunctionDet, setMinorFunctionDet] = useState(formData?.FatherInfoDetails?.MinorFunctionDet);

  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_SUB_TYPES", {});
  const [subtypeData, setSubtypeData] = useState({
    subtype: [],
    functionality: [],
  });
  // console.log('fn',MajorFunction,FunctionDet);
  const [showError, setShowError] = useState(false);
  //   console.log(state);
  let modules = state.common.modules;
  let stateInfo = state.common.stateInfo;
  //   console.log(path, modules);
  let subtypeOptions = [
    { name: "type1", value: "type1" },
    { name: "type2", value: "type2" },
  ];
  let functionalityOptions = [
    { label: "function1", value: "function1" },
    { label: "function2", value: "function2" },
  ];
  const handleChange = (text, type) => {
    let tempdata = { ...subtypeData };
    if (type === "subtype") {
      tempdata.subtype = text;
      setSubtypeData(tempdata);
    }
    if (type === "functionality") {
      tempdata.functionality = text;
      setSubtypeData(tempdata);
    }
  };
  
  const onSubmit = () => {
    // console.log('sub');
    if (FunctionDet?.name && MinorFunctionDet?.name) {
      handleNext();
    } else {
      setShowError(true);
    }
  };
  let cmbMinorFunction = [];
  let cmbMajorFunction = [];
  let cmbSubFunction = [];
  useEffect(() => {
    if (FunctionDet?.mainCode) {
      MinorFunction &&
        MinorFunction["FileManagement"] &&
        MinorFunction["FileManagement"].MinorFunction.filter((item) => {
          // cmbMinorFunction.push(ob);

          if (item?.mainCode === FunctionDet?.code) {
          // if (item?.subCode === FunctionDet?.mainCode) {
            cmbMinorFunction.push(item);
          }
        });
    }
  }, [FunctionDet]);
  // useEffect(() => {
  //   if (SubFunctionDet?.mainCode) {
    
  //   MajorFunction &&
  //   MajorFunction["FileManagement"] &&
  //   MajorFunction["FileManagement"].MajorFunction.filter((item) => {
  //         if (item?.code === SubFunctionDet?.mainCode) {
  //           cmbMajorFunction.push(item);
  //         }
  //       });
  //   }
  // }, [SubFunctionDet]);
  // useEffect(() => {
  //   if (MinorFunctionDet?.mainCode) {
      
  //       SubFunction &&
  //       SubFunction["FileManagement"] &&
  //       SubFunction["FileManagement"].SubFunction.filter((item) => {
  //         if (item?.code === MinorFunctionDet?.subCode) {
  //           cmbSubFunction.push(item);
  //         }
  //       });
  //   }
  // }, [MinorFunctionDet]);
  // let cmbSubFunction = [];
  // SubFunction &&
  //   SubFunction["FileManagement"] &&
  //   SubFunction["FileManagement"].SubFunction.map((ob) => {
  //     cmbSubFunction.push(ob);
  //   });
  
  let cmbFunction = [];
  Function &&
    Function["FileManagement"] &&
    Function["FileManagement"].Function.map((ob) => {
      cmbFunction.push(ob);
    });
 

  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => <React.Fragment />);
    function setSelectMajorFunctionDet(value) {
      setMajorFunctionDet(value);
    }
    function setSelectSubFunctionDet(value) {
      setSubFunctionDet(value);
      setMajorFunctionDet([])
    }
    function setSelectFunctionDet(value) {
      setFunctionDet(value);
      setMinorFunctionDet([])
    }
    function setSelectMinorFunctionDet(value) {
      setMinorFunctionDet(value);
      SubFunction &&
            SubFunction["FileManagement"] &&
            SubFunction["FileManagement"].SubFunction.filter((item) => {
              if (item?.code === value?.subCode) {
                cmbSubFunction.push(item);
              }
            });
            setSubFunctionDet(cmbSubFunction[0])
            MajorFunction &&
            MajorFunction["FileManagement"] &&
            MajorFunction["FileManagement"].MajorFunction.filter((item) => {
                  if (item?.code === cmbSubFunction[0]?.mainCode) {
                    cmbMajorFunction.push(item);
                  }
                });
            setMajorFunctionDet(cmbMajorFunction[0])
    }

    const goNext = () => { 
      // if(subtypeData.subtype?.value && subtypeData.functionality?.value){
      handleNext();
      // }else{
      //   setShowError(true)
      // }
      // sessionStorage.setItem("CurrentFinancialYear", FY);
      // onSelect(config.key, { applicationData });
      // console.log("d", applicationData);
    };
    return code === "DFM" ? (
      <React.Fragment>
        {/* <div className="moduleLinkHomePage">
          <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
          <BackButton className="moduleLinkHomePageBackButton" />
          <h1>{t("Sub Type" .toUpperCase())}</h1>
        </div> */}
        <div className="moduleLinkHomePageModuleLinks">
          {/* <div className="fileText">
            <h3>Choose file type</h3>
          </div> */}
          <div className="FileFlowWrapper">

{/* <FormInputGroup 
type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="subtype" label="Sub Type"
selectOptions={subtypeOptions} 
/>
<FormInputGroup 
type="Dropdown" handleChange={handleChange}   t={t} value={subtypeData.subtype} name="functionality" label="Functionality"
selectOptions={functionalityOptions} 
/>
{showError ? <CardLabelError>{t("Please Select SubType")}</CardLabelError> : null}
<SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmit} /> */}

{/* <div><CardLabel>{`${t("Major Function")}`}<span className="mandatorycss">*</span></CardLabel>
  <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbMajorFunction} selected={MajorFunctionDet} select={setSelectMajorFunctionDet} />
</div>
<div ><CardLabel>{`${t("Sub Function")}`}<span className="mandatorycss">*</span></CardLabel>
  <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbSubFunction} selected={SubFunctionDet} select={setSelectSubFunctionDet} />
</div> */}
<div ><CardLabel>{`${t("Function")}`}<span className="mandatorycss">*</span></CardLabel>
  <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbFunction} selected={FunctionDet} select={setSelectFunctionDet} />
</div>
<div ><CardLabel>{`${t("Minor Function")}`}<span className="mandatorycss">*</span></CardLabel>
  <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbMinorFunction} selected={MinorFunctionDet} select={setSelectMinorFunctionDet} />
</div>
<div ><CardLabel>{`${t("Sub Function")}`}<span className="mandatorycss">*</span></CardLabel>
  <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbSubFunction} selected={SubFunctionDet} select={setSelectSubFunctionDet} />
  </div>
<div>
  <CardLabel>{`${t("Major Function")}`}<span className="mandatorycss">*</span></CardLabel>
    <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbMajorFunction} selected={MajorFunctionDet} select={setSelectMajorFunctionDet} />
</div>

{showError ? <CardLabelError>{t("DFM_SELECT_FIELDS")}</CardLabelError> : null}
<SubmitBar label={t("CS_COMMON_NEXT")} onSubmit={onSubmit} />
</div>
        </div>
      </React.Fragment>
    ) : (
      ""
    );
  });
  return (
    <React.Fragment>
      {ModuleLevelLinkHomePages}
    </React.Fragment>
  );
};

export default SubType;
