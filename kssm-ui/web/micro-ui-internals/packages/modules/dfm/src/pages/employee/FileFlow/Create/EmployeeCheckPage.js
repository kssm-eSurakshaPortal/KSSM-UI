import {
  Card, CardHeader, CardSubHeader, CardText, CardLabel, CitizenInfoLabel,
  LinkButton, Row, StatusTable, SubmitBar,
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
// import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../../components/DFMTimeline";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
      onClick={routeTo}
    />
  );
};

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const EmployeeCheckPage = ({ onSubmit, value }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { ApplicantDetails, AddressDet, ServiceDet, DocumentDet } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = '';
  // `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  // if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
  //   routeLink = `${getPath(match.path, match.params)}`;
  //   routeLink = routeLink.replace("/check", "");
  // }
  console.log("value" + ApplicantDetails?.FirstName,AddressDet,ServiceDet,GetCUrrentDate());
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
        <label style={{ fontSize: "17px", fontWeight: "bold" }} >{t("Summary Details")}</label>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Application Details")}`}</span></h1>
          </div>
        </div>
        <StatusTable>
          <div>
          <div className="row">
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Applicant Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.FirstName)}&nbsp;{t(ApplicantDetails?.LastName)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Date of Birth")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.DateofBirth)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Aadhar No")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.AadharNo)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Category")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.CategoryList?.name)}</CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Father Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.FatherFirstName)}&nbsp;{t(ApplicantDetails?.FatherLastName)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Mother Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.MotherFirstName)}&nbsp;{t(ApplicantDetails?.MotherLastName)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Email")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.Email)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Mobile No")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ApplicantDetails?.MobileNo)}</CardText>
            </div>
          </div>
          <div className="row">
          <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Service Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t('Residential Certificate')}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Building No")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(AddressDet?.BuildingNo)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Owner Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ServiceDet?.OwnerName)}</CardText>
            </div>
            <div className="col-md-3" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Occupier Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ServiceDet?.NameOccupier)}</CardText>
            </div>
          </div>
          <div className="row">
          <div className="col-md-8" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("Application Date")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{new Date().toLocaleDateString()}</CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}></span></h1>
            </div>
          </div>
        </div>
        </StatusTable>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default EmployeeCheckPage;