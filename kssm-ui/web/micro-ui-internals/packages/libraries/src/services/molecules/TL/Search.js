import cloneDeep from "lodash/cloneDeep";
import { notifyManager } from "react-query";
import { TLService } from "../../elements/TL";

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

/* methid to get date from epoch */
const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  } else {
    return null;
  }
};
const getAddress = (address, t) => {
  return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${address?.landmark ? `${address?.landmark}, ` : ""
    }${t(Digit.Utils.pt.getMohallaLocale(address?.locality.code, address?.tenantId))}, ${t(Digit.Utils.pt.getCityLocale(address?.tenantId))}${address?.pincode && t(address?.pincode) ? `, ${address.pincode}` : " "
    }`;
};
export const TLSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response.Licenses[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await TLService.TLsearch({ tenantId, filters });
    return response.Licenses;
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    const filter = { applicationNumber };
    const response = await TLSearch.application(tenantId, filter);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const licenseNumbers = response?.licenseNumber;
      const filters = { licenseNumbers, offset: 0 };
      numOfApplications = await TLSearch.numberOfApplications(tenantId, filters);
    }
    // let propertyAddress = "";
    // if (propertyDetails && propertyDetails?.Properties.length) {
    //   propertyAddress = getAddress(propertyDetails?.Properties[0]?.address, t);
    // }
    // console.log("response"+response);
    let employeeResponse = [];

    const tradedetails = {
      title: "TL_COMMON_TR_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "TL_FINANCIAL_YEAR_LABEL", value: response?.financialYear ? `FY${response?.financialYear}` : "NA" },
        { title: "TL_APPLICANT_ID_LABEL", value: response?.applicationNumber ? `${response?.applicationNumber}` : "NA" },
        { title: "TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL", value: response?.licenseType ? `TRADELICENSE_LICENSETYPE_${response?.licenseType}` : "NA" },
        { title: "TL_COMMON_TABLE_COL_TRD_NAME", value: response?.licenseUnitName },
        {
          title: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL",
          value: response?.commencementDate ? convertEpochToDate(response?.commencementDate) : "NA",
        },
        {
          title: "TL_LOCALIZATION_SECTOR",
          value: response?.tradeLicenseDetail?.businessSector
            ? response?.tradeLicenseDetail?.businessSector
            : "NA",
        },
        {
          title: "TL_LOCALIZATION_CAPITAL_AMOUNT",
          value: response?.tradeLicenseDetail?.capitalInvestment
            ? response?.tradeLicenseDetail?.capitalInvestment
            : "NA",
        },
        {
          title: "TL_NEW_NUMBER_OF_EMPLOYEES_LABEL",
          value: response?.tradeLicenseDetail?.noOfEmployees || "NA"
        },
      ],
    };

    const tradeUnits = {
      title: "TL_TRADE_UNITS_HEADER",
      additionalDetails: {
        units: response?.tradeLicenseDetail?.tradeUnits?.map((unit, index) => {
          let tradeSubType = stringReplaceAll(unit?.tradeType, ".", "_");
          tradeSubType = stringReplaceAll(tradeSubType, "-", "_");
          return {
            title: "TL_UNIT_HEADER",
            values: [
              {
                title: "TRADELICENSE_TRADECATEGORY_LABEL",
                value: unit?.businessCategory ? `TRADELICENSE_TRADETYPE_${unit?.businessCategory}` : "NA"
              },
              {
                title: "TRADELICENSE_TRADETYPE_LABEL",
                value: unit?.businessType ? `TRADELICENSE_TRADETYPE_${unit?.businessType}` : "NA"
              },
              {
                title: "TL_NEW_TRADE_SUB_TYPE_LABEL",
                value: unit?.businessSubtype ? `TRADELICENSE_TRADETYPE_${stringReplaceAll(unit?.businessSubtype, ".", "_")}` : "NA"
              },
            ],
          };
        }),
      },
    };

    let strucutreplacedet = [];
    if (response?.tradeLicenseDetail?.structureType?.includes("LAND")) {
      strucutreplacedet.push({
        title: "TL_LOCALIZATION_BLOCK_NO",
        value: response?.tradeLicenseDetail?.structurePlace?.blockNo
          ? response?.tradeLicenseDetail?.structurePlace?.blockNo
          : "NA"
      });
      strucutreplacedet.push({
        title: "TL_LOCALIZATION_SURVEY_NO",
        value: response?.tradeLicenseDetail?.structurePlace?.surveyNo
          ? response?.tradeLicenseDetail?.structurePlace?.surveyNo
          : "NA"
      });
      strucutreplacedet.push({
        title: "TL_LOCALIZATION_SUBDIVISION_NO",
        value: response?.tradeLicenseDetail?.structurePlace?.subDivisionNo
          ? response?.tradeLicenseDetail?.structurePlace?.subDivisionNo
          : "NA"
      });
      strucutreplacedet.push({
        title: "TL_LOCALIZATION_PARTITION_NO",
        value: response?.tradeLicenseDetail?.structurePlace?.partitionNo
          ? response?.tradeLicenseDetail?.structurePlace?.partitionNo
          : "NA"
      });
    }

    const structurePlace1 = {
      title: "TL_PLACE_ACTIVITY",
      values: [
        {
          title: "TL_NEW_TRADE_DETAILS_STRUCT_TYPE_LABEL",
          value: response?.tradeLicenseDetail?.structureType
        },
        {
          title: "TL_NEW_TRADE_DETAILS_STRUCT_SUB_TYPE_LABEL",
          value: response?.tradeLicenseDetail?.structurePlaceSubtype
            ? response?.tradeLicenseDetail?.structurePlaceSubtype
            : "NA",
        },
      ],

    }

    
    strucutreplacedet.map((ob)=>{
      structurePlace1.values.push(ob)
     // return (ob)
    })
    // const PropertyDetail = {
    //   title: "PT_DETAILS",
    //   values: [
    //     { title: "TL_PROPERTY_ID", value: propertyDetails?.Properties?.[0]?.propertyId || "NA" },
    //     { title: "PT_OWNER_NAME", value: propertyDetails?.Properties?.[0]?.owners[0]?.name || "NA" },
    //     { title: "PROPERTY_ADDRESS", value: propertyAddress || "NA" },
    //     {
    //       title: "TL_VIEW_PROPERTY_DETAIL",
    //       to: `/digit-ui/employee/commonpt/view-property?propertyId=${propertyDetails?.Properties?.[0]?.propertyId}&tenantId=${propertyDetails?.Properties?.[0]?.tenantId}&from=TL_APPLICATION_DETAILS_LABEL`,
    //       value: "",
    //       isLink: true,
    //     },
    //   ],
    // };

    // const cityOfApp = cloneDeep(response?.tradeLicenseDetail?.address?.city);
    // const localityCode = cloneDeep(response?.tradeLicenseDetail?.address?.wardno?.code);
    const tradeAddress = {
      title: "TL_CHECK_ADDRESS",
      values: [

        // { title: "MYCITY_CODE_LABEL", value: response?.tradeLicenseDetail?.address?.city || "NA" },
        // { title: "TL_LOCALIZATION_LOCALITY", value: `${stringReplaceAll(cityOfApp?.toUpperCase(), ".", "_")}_REVENUE_${localityCode}` },

        { title: "TL_LOCALIZATION_WARD_NO", value: response?.tradeLicenseDetail?.address?.wardNo || "NA" },
        { title: "TL_LOCALIZATION_BUILDING_NO", value: response?.tradeLicenseDetail?.address?.doorNo || "NA" },
        { title: "TL_LOCALIZATION_STREET_NAME", value: response?.tradeLicenseDetail?.address?.street || "NA" },
        { title: "TL_LOCALIZATION_LAND_MARK", value: response?.tradeLicenseDetail?.address?.landmark || "NA" },
        { title: "CORE_COMMON_PINCODE", value: response?.tradeLicenseDetail?.address?.pincode || "NA" },
        { title: "TL_CONTACT_NO", value: response?.tradeLicenseDetail?.address?.contactNo || "NA" },
        { title: "TL_LOCALIZATION_EMAIL_ID", value: response?.tradeLicenseDetail?.address?.email || "NA" },

      ],
    };

    const checkOwnerLength = response?.tradeLicenseDetail?.owners?.length || 1;

    const owners = response?.tradeLicenseDetail?.licenseeType?.includes("INSTITUTION")
      ? {
        title: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
        additionalDetails: {
          owners: response?.tradeLicenseDetail?.owners?.map((owner, index) => {
            let licenseeType = response?.tradeLicenseDetail?.licenseeType
              ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
              : "NA";
            return {
              title: Number(checkOwnerLength) > 1 ? "TL_PAYMENT_PAID_BY_PLACEHOLDER" : "",
              values: [
                { title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType },
                { title: "TL_INSTITUTION_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.instituionName || "NA" },
                { title: "TL_NEW_OWNER_DESIG_LABEL", value: response?.tradeLicenseDetail?.institution?.designation || "NA" },
                {
                  title: "TL_TELEPHONE_NUMBER_LABEL",
                  value:
                    response?.tradeLicenseDetail?.institution?.contactNo || response?.tradeLicenseDetail?.institution?.contactNo !== ""
                      ? response?.tradeLicenseDetail?.institution?.contactNo
                      : "NA",
                },
                { title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" },
                { title: "TL_NEW_OWNER_DETAILS_NAME_LABEL", value: response?.tradeLicenseDetail?.institution?.name || "NA" },
                { title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || owner?.emailId !== "" ? owner?.emailId : "NA" },
              ],
            };
          }),
          documents: [
            {
              title: "PT_COMMON_DOCS",
              values: response?.tradeLicenseDetail?.applicationDocuments?.map((document) => {
                return {
                  title: `TL_NEW_${document?.documentType.replace(".", "_")}`,
                  documentType: document?.documentType,
                  documentUid: document?.documentUid,
                  fileStoreId: document?.fileStoreId,
                };
              }),
            },
          ],
        },
      }
      : {
        title: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
        additionalDetails: {
          owners: response?.tradeLicenseDetail?.owners?.map((owner, index) => {
            let licenseeType = response?.tradeLicenseDetail?.licenseeType
              ? `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(response?.tradeLicenseDetail?.licenseeType, ".", "_")}`
              : "NA";
            return {
              title: Number(checkOwnerLength) > 1 ? "TL_PAYMENT_PAID_BY_PLACEHOLDER" : "",
              values: [
                { title: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL", value: licenseeType },
                { title: "TL_OWNER_S_NAME_LABEL", value: owner?.name || "NA" },
                { title: "TL_OWNER_S_MOBILE_NUM_LABEL", value: owner?.mobileNumber || "NA" },
                { title: "TL_GUARDIAN_S_NAME_LABEL", value: owner?.fatherOrHusbandName || "NA" },
                { title: "TL_RELATIONSHIP_WITH_GUARDIAN_LABEL", value: owner?.relationship || "NA" },
                { title: "TL_NEW_OWNER_DETAILS_GENDER_LABEL", value: owner?.gender || "NA" },
                { title: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL", value: owner?.emailId || "NA" },
                { title: "TL_OWNER_SPECIAL_CATEGORY", value: owner?.ownerType ? `COMMON_MASTERS_OWNERTYPE_${owner?.ownerType}` : "NA" },
                { title: "TL_NEW_OWNER_DETAILS_ADDR_LABEL", value: owner?.permanentAddress || "NA" },
              ],
            };
          }),
          documents: [
            {
              title: "PT_COMMON_DOCS",
              values: response?.tradeLicenseDetail?.applicationDocuments?.map((document) => {
                return {
                  title: `TL_NEW_${document?.documentType.replace(".", "_")}`,
                  documentType: document?.documentType,
                  documentUid: document?.documentUid,
                  fileStoreId: document?.fileStoreId,
                };
              }),
            },
          ],
        },
      };

    if (response?.workflowCode == "NewTL" && response?.status !== "APPROVED") {
      const details = {
        title: "",
        values: [
          { title: "TL_COMMON_TABLE_COL_APP_NO", value: response?.applicationNumber || "NA" },
          {
            title: "TL_APPLICATION_CHALLAN_LABEL",
            value: (response?.tradeLicenseDetail?.channel && `TL_CHANNEL_${response?.tradeLicenseDetail?.channel}`) || "NA",
          },
        ],
      };
      response && employeeResponse.push(details);
    }
    response && employeeResponse.push(tradedetails);
    response?.tradeLicenseDetail?.tradeUnits && employeeResponse.push(tradeUnits);
    response?.tradeLicenseDetail?.structureType && employeeResponse.push(structurePlace1);

    // response?.tradeLicenseDetail?.accessories && employeeResponse.push(accessories);
    // propertyDetails?.Properties?.length > 0 && employeeResponse.push(PropertyDetail);
    // response && !(propertyDetails?.Properties?.length > 0) && employeeResponse.push(tradeAddress);
    response?.tradeLicenseDetail?.address && employeeResponse.push(tradeAddress);
    response?.tradeLicenseDetail?.owners && employeeResponse.push(owners);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
