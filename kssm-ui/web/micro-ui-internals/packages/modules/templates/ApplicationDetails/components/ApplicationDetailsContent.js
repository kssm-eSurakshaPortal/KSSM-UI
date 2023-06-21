import {
  BreakLine,
  Card,
  CardSectionHeader,
  CardSubHeader,
  CheckPoint,
  ConnectingCheckPoints,
  Loader,
  Row,
  StatusTable,
} from "@egovernments/digit-ui-react-components";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BPADocuments from "./BPADocuments";
import InspectionReport from "./InspectionReport";
import NOCDocuments from "./NOCDocuments";
import PermissionCheck from "./PermissionCheck";
import PropertyDocuments from "./PropertyDocuments";
import PropertyEstimates from "./PropertyEstimates";
import PropertyFloors from "./PropertyFloors";
import PropertyOwners from "./PropertyOwners";
import ScruntinyDetails from "./ScruntinyDetails";
import SubOccupancyTable from "./SubOccupancyTable";
import TLCaption from "./TLCaption";
import TLTradeAccessories from "./TLTradeAccessories";
import TLTradeUnits from "./TLTradeUnits";
import DocumentsPreview from "./DocumentsPreview";

function ApplicationDetailsContent({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
}) {
  const { t } = useTranslation();

  function OpenImage(imageSource, index, thumbnailsToShow) {
    window.open(thumbnailsToShow?.fullImage?.[0], "_blank");
  }

  const getTimelineCaptions = (checkpoint) => {
    if (checkpoint.state === "OPEN" || (checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/"))) {
      const caption = {
        date: Digit.DateUtils.ConvertTimestampToDate(applicationData?.auditDetails?.createdTime),
        source: applicationData?.channel || "",
      };
      return <TLCaption data={caption} />;
    } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/")) {
      const caption = {
        date: checkpoint?.auditDetails?.lastModified,
        name: checkpoint?.assignes?.[0]?.name,
        mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
        comment: t(checkpoint?.comment),
        wfComment: checkpoint.wfComment,
        thumbnailsToShow: checkpoint?.thumbnailsToShow,
      };
      return <TLCaption data={caption} OpenImage={OpenImage} />;
    } else {
      const caption = {
        date: Digit.DateUtils?.ConvertTimestampToDate(applicationData?.auditDetails?.lastModifiedTime),
        // name: checkpoint?.assigner?.name,
        name: checkpoint?.assignes?.[0]?.name,
        // mobileNumber: checkpoint?.assigner?.mobileNumber,
        wfComment: checkpoint?.wfComment,
        mobileNumber: checkpoint?.assignes?.[0]?.mobileNumber,
      };
      return <TLCaption data={caption} />;
    }
  };

  const getTranslatedValues = (dataValue, isNotTranslated) => {
    if (dataValue) {
      return !isNotTranslated ? t(dataValue) : dataValue;
    } else {
      return t("NA");
    }
  };

  const checkLocation =
    window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
  const isNocLocation = window.location.href.includes("employee/noc");
  const isBPALocation = window.location.href.includes("employee/obps");

  const getRowStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else if (checkLocation) {
      return { justifyContent: "space-between", fontSize: "16px", lineHeight: "19px", color: "#0B0C0C" };
    } else {
      return {};
    }
  };

  const getTableStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { position: "relative", marginTop: "19px" };
    } else if (checkLocation) {
      return { position: "relative", marginTop: "19px" };
    } else {
      return {};
    }
  };

  const getMainDivStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return { lineHeight: "19px", maxWidth: "950px", minWidth: "280px" };
    } else if (checkLocation) {
      return { lineHeight: "19px", maxWidth: "600px", minWidth: "280px" };
    } else {
      return {};
    }
  };

  const getTextValue = (value) => {
    if (value?.skip) return value.value;
    else if (value?.isUnit) return value?.value ? `${getTranslatedValues(value?.value, value?.isNotTranslated)} ${t(value?.isUnit)}` : t("N/A");
    else return value?.value ? getTranslatedValues(value?.value, value?.isNotTranslated) : t("N/A");
  };

  return (
    <>
      <div className="file-main">
        <div style={{ position: "relative" }} className={"wrapper-app"}>
          {applicationDetails?.applicationDetails?.map((detail, index) => (
            <React.Fragment key={index}>
              <div style={getMainDivStyles()}>
                {index === 0 && !detail.asSectionHeader ? (
                  <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t(detail.title)}</CardSubHeader>
                ) : (
                  <React.Fragment>
                    <CardSectionHeader
                      style={
                        index == 0 && checkLocation
                          ? { marginBottom: "16px", fontSize: "16px" }
                          : { marginBottom: "16px", marginTop: "32px", fontSize: "16px" }
                      }
                    >
                      {isNocLocation ? `${t(detail.title)}` : t(detail.title)}
                      {detail?.Component ? <detail.Component /> : null}
                    </CardSectionHeader>
                  </React.Fragment>
                )}
                {/* TODO, Later will move to classes */}
                <StatusTable style={getTableStyles()}>
                  {detail?.title &&
                    !detail?.title.includes("NOC") &&
                    detail?.values?.map((value, index) => {
                      if (value.map === true && value.value !== "N/A") {
                        return <Row key={t(value.title)} label={t(value.title)} text={<img src={t(value.value)} alt="" />} />;
                      }
                      if (value?.isLink == true) {
                        return (
                          <Row
                            key={t(value.title)}
                            label={
                              window.location.href.includes("tl") ? (
                                <div style={{ width: "200%" }}>
                                  <Link to={value?.to}>
                                    <span className="link" style={{ color: "#F47738" }}>
                                      {t(value?.title)}
                                    </span>
                                  </Link>
                                </div>
                              ) : isNocLocation || isBPALocation ? (
                                `${t(value.title)}`
                              ) : (
                                t(value.title)
                              )
                            }
                            text={
                              <div>
                                <Link to={value?.to}>
                                  <span className="link" style={{ color: "#F47738" }}>
                                    {value?.value}
                                  </span>
                                </Link>
                              </div>
                            }
                            last={index === detail?.values?.length - 1}
                            caption={value.caption}
                            className="border-none"
                            rowContainerStyle={getRowStyles()}
                          />
                        );
                      }
                      return (
                        <Row
                          key={t(value.title)}
                          label={isNocLocation || isBPALocation ? `${t(value.title)}` : t(value.title)}
                          text={getTextValue(value)}
                          last={index === detail?.values?.length - 1}
                          caption={value.caption}
                          className=" "
                          // TODO, Later will move to classes
                          rowContainerStyle={getRowStyles()}
                        />
                      );
                    })}
                </StatusTable>
              </div>
              {detail?.belowComponent && <detail.belowComponent />}
              {detail?.additionalDetails?.inspectionReport && (
                <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} paymentsList={paymentsList} />
              )}
              {applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending?.length > 0 && detail?.additionalDetails?.fiReport && (
                <InspectionReport fiReport={applicationDetails?.applicationData?.additionalDetails?.fieldinspection_pending} />
              )}
              {/* {detail?.additionalDetails?.FIdocuments && detail?.additionalDetails?.values?.map((doc,index) => (
            <div key={index}>
            {doc.isNotDuplicate && <div> 
             <StatusTable>
             <Row label={t(doc?.documentType)}></Row>
             <OBPSDocument value={detail?.additionalDetails?.values} Code={doc?.documentType} index={index}/> 
             <hr style={{color:"#cccccc",backgroundColor:"#cccccc",height:"2px",marginTop:"20px",marginBottom:"20px"}}/>
             </StatusTable>
             </div>}
             </div>
          )) } */}
              {detail?.additionalDetails?.floors && <PropertyFloors floors={detail?.additionalDetails?.floors} />}
              {detail?.additionalDetails?.owners && <PropertyOwners owners={detail?.additionalDetails?.owners} />}
              {detail?.additionalDetails?.units && <TLTradeUnits units={detail?.additionalDetails?.units} />}
              {detail?.additionalDetails?.accessories && <TLTradeAccessories units={detail?.additionalDetails?.accessories} />}
              {detail?.additionalDetails?.permissions && workflowDetails?.data?.nextActions?.length > 0 && (
                <PermissionCheck applicationData={applicationDetails?.applicationData} t={t} permissions={detail?.additionalDetails?.permissions} />
              )}
              {detail?.additionalDetails?.obpsDocuments && (
                <BPADocuments
                  t={t}
                  applicationData={applicationDetails?.applicationData}
                  docs={detail.additionalDetails.obpsDocuments}
                  bpaActionsDetails={workflowDetails}
                />
              )}
              {detail?.additionalDetails?.noc && (
                <NOCDocuments
                  t={t}
                  isNoc={true}
                  NOCdata={detail.values}
                  applicationData={applicationDetails?.applicationData}
                  docs={detail.additionalDetails.noc}
                  noc={detail.additionalDetails?.data}
                  bpaActionsDetails={workflowDetails}
                />
              )}
              {detail?.additionalDetails?.scruntinyDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
              {detail?.additionalDetails?.buildingExtractionDetails && <ScruntinyDetails scrutinyDetails={detail?.additionalDetails} />}
              {detail?.additionalDetails?.subOccupancyTableDetails && (
                <SubOccupancyTable edcrDetails={detail?.additionalDetails} applicationData={applicationDetails?.applicationData} />
              )}
              {detail?.additionalDetails?.documentsWithUrl && <DocumentsPreview documents={detail?.additionalDetails?.documentsWithUrl} />}
              {detail?.additionalDetails?.documents && <PropertyDocuments documents={detail?.additionalDetails?.documents} />}
              {detail?.additionalDetails?.taxHeadEstimatesCalculation && (
                <PropertyEstimates taxHeadEstimatesCalculation={detail?.additionalDetails?.taxHeadEstimatesCalculation} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className={"timeline-wrapper"}>
          {showTimeLine && workflowDetails?.data?.timeline?.length > 0 && (
            <React.Fragment>
              {(workflowDetails?.isLoading || isDataLoading) && <Loader />}
              {!workflowDetails?.isLoading && !isDataLoading && (
                <Fragment>
                  <CardSectionHeader>
                    {/* {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")} */}
                    {t("Activities")}
                  </CardSectionHeader>
                  <BreakLine style={{ marginLeft: "-40px" }} />
                  {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
                    <CheckPoint
                      isCompleted={true}
                      label={t(`${timelineStatusPrefix}${workflowDetails?.data?.timeline[0]?.state}`)}
                      customChild={getTimelineCaptions(workflowDetails?.data?.timeline[0])}
                    />
                  ) : (
                    <ConnectingCheckPoints>
                      {workflowDetails?.data?.timeline &&
                        workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                          return (
                            <React.Fragment key={index}>
                              <CheckPoint
                                keyValue={index}
                                isCompleted={index === 0}
                                info={checkpoint.comment}
                                label={t(
                                  `${timelineStatusPrefix}${
                                    checkpoint?.performedAction === "REOPEN" ? checkpoint?.performedAction : checkpoint?.[statusAttribute]
                                  }`
                                )}
                                customChild={getTimelineCaptions(checkpoint)}
                              />
                            </React.Fragment>
                          );
                        })}
                    </ConnectingCheckPoints>
                  )}
                </Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}

export default ApplicationDetailsContent;
