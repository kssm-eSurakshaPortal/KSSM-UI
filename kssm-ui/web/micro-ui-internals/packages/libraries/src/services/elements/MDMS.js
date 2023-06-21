//HAVE TO CHANGE THI
import { stringReplaceAll } from "@egovernments/digit-ui-module-pt/src/utils";
import { ApiCacheService } from "../atoms/ApiCacheService";
import Urls from "../atoms/urls";
import { Request, ServiceRequest } from "../atoms/Utils/Request";
import { PersistantStorage } from "../atoms/Utils/Storage";

// export const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
//   if (searcher == "") return str;
//   while (str.includes(searcher)) {
//     str = str.replace(searcher, replaceWith);
//   }
//   return str;
// };

const SortByName = (na, nb) => {
  if (na < nb) {
    return -1;
  }
  if (na > nb) {
    return 1;
  }
  return 0;
};

const GetCitiesWithi18nKeys = (MdmsRes, moduleCode) => {
  const cityList = (MdmsRes.tenant.citymodule && MdmsRes.tenant.citymodule.find((module) => module.code === moduleCode).tenants) || [];
  const citiesMap = cityList.map((city) => city.code);
  const cities = MdmsRes.tenant.tenants
    .filter((city) => citiesMap.includes(city.code))
    .map(({ code, name, logoId, emailId, address, contactNumber }) => ({
      code,
      name,
      logoId,
      emailId,
      address,
      contactNumber,
      i18nKey: "TENANT_TENANTS_" + code.replace(".", "_").toUpperCase(),
    }))
    .sort((cityA, cityB) => {
      const na = cityA.name.toLowerCase(),
        nb = cityB.name.toLowerCase();
      return SortByName(na, nb);
    });
  return cities;
};

const initRequestBody = (tenantId) => ({
  MdmsCriteria: {
    tenantId,
    moduleDetails: [
      {
        moduleName: "common-masters",
        masterDetails: [{ name: "Department" }, { name: "Designation" }, { name: "StateInfo" }, { name: "wfSlaConfig" }, { name: "District" }],
      },
      {
        moduleName: "tenant",
        masterDetails: [{ name: "tenants" }, { name: "citymodule" }],
      },
      {
        moduleName: "DIGIT-UI",
        masterDetails: [{ name: "ApiCachingSettings" }],
      },
    ],
  },
});
const getWorkFlowBirthMasterList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "WorkFlowBirth",
          },
        ],
      },
    ],
  },
});
const getWorkFlowDeathMasterList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "WorkFlowDeath",
          },
        ],
      },
    ],
  },
});
const getLocalBodyMasterList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "tenant",
        masterDetails: [
          {
            name: "tenants",
          },
        ],
      },
    ],
  },
});
const getCRQualificationSubList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "QualificationSub",
          },
        ],
      },
    ],
  },
});
const getCRModeOfPregnancyList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "ModeOfPregnancy",
          },
        ],
      },
    ],
  },
});
const getDFMajorFunctionList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MajorFunction",
          },
        ],
      },
    ],
  },
});
const getDFMSubFunctionList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "SubFunction",
          },
        ],
      },
    ],
  },
});
const getDFMFunctionList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Function",
          },
        ],
      },
    ],
  },
});
const getDFMinorFunctionList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MinorFunction",
          },
        ],
      },
    ],
  },
});
const getCommonApplicantCategoryList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "ApplicantCategory",
          },
        ],
      },
    ],
  },
});
const getCRDocumentTypeList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "IdProof",
          },
        ],
      },
    ],
  },
});
const getCRPlaceMasterList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PlaceMaster",
          },
        ],
      },
    ],
  },
});
const getCRHospitalMasterList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "egov-location",
        masterDetails: [
          {
            name: "hospitalList",
          },
        ],
      },
    ],
  },
});
const getCriteria = (tenantId, moduleDetails) => {
  return {
    MdmsCriteria: {
      tenantId,
      ...moduleDetails,
    },
  };
};

export const getGeneralCriteria = (tenantId, moduleCode, type) => ({
  details: {
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: type,
          },
        ],
      },
    ],
  },
});

export const getMultipleTypes = (tenantId, moduleCode, types) => ({
  details: {
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: types.map((type) => ({ name: type })),
      },
    ],
  },
});

const getReceiptKey = (tenantId, moduleCode) => ({
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "uiCommonPay",
          },
        ],
      },
    ],
  },
});

const getModuleServiceDefsCriteria = (tenantId, moduleCode) => ({
  type: "serviceDefs",
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: `RAINMAKER-${moduleCode}`,
        masterDetails: [
          {
            name: "ServiceDefs",
          },
        ],
      },
    ],
  },
});

const getSanitationTypeCriteria = (tenantId, moduleCode) => ({
  type: "SanitationType",
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "SanitationType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getPitTypeCriteria = (tenantId, moduleCode) => ({
  type: "PitType",
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PitType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getApplicationChannelCriteria = (tenantId, moduleCode) => ({
  type: "ApplicationChannel",
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "ApplicationChannel",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getPropertyTypeCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PropertyType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getPropertyUsageCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PropertyType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getCommonFieldsCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "CommonFieldsConfig",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getPreFieldsCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PreFieldsConfig",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getPostFieldsCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PostFieldsConfig",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getConfig = (tenantId, moduleCode) => ({
  type: "Config",
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Config",
          },
        ],
      },
    ],
  },
});

const getVehicleTypeCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "VehicleMakeModel",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getChecklistCriteria = (tenantId, moduleCode) => ({
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "CheckList",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getSlumLocalityCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Slum",
          },
        ],
      },
    ],
  },
});
const getPropertyOwnerTypeCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "OwnerType" }],
      },
    ],
  },
});

const getSubPropertyOwnerShipCategoryCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "SubOwnerShipCategory" }],
      },
    ],
  },
});
const getPropertyOwnerShipCategoryCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "OwnerShipCategory" }],
      },
    ],
  },
});

const getTradeOwnerShipCategoryCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "OwnerShipCategory" }],
      },
    ],
  },
});

const getDocumentRequiredScreenCategory = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Documents",
          },
        ],
      },
    ],
  },
});

const getDefaultMapConfig = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MapConfig",
          },
        ],
      },
    ],
  },
});

const getUsageCategoryList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "UsageCategory" }],
      },
    ],
  },
});

const getPTPropertyTypeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "PropertyType" }],
      },
    ],
  },
});

const getTLStructureTypeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "StructureType" }],
      },
    ],
  },
});
const getTLStructureTypePlaceList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "TradeLicense",
        masterDetails: [{ name: "TradeStructureSubtype" }],
      },
    ],
  },
});
const getTLNatureOfInstitutionList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "TradeLicense",
        masterDetails: [{ name: "NatureOfInstitution" }],
      },
    ],
  },
});
const getTLTypeOfInstitutionList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "TradeLicense",
        masterDetails: [{ name: "TypeOfUnit" }],
      },
    ],
  },
});
const getTLNatureOfStructureList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "TradeLicense",
        masterDetails: [{ name: "PlaceOfActivity" }],
      },
    ],
  },
});
const getTLZonalOfficeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "egov-location",
        masterDetails: [{ name: "TenantBoundary" }],
      },
    ],
  },
});
const getTLSectorList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "TradeLicense",
        masterDetails: [{ name: "EnterpriseType" }],
      },
    ],
  },
});

const getTLAccessoriesTypeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "AccessoriesCategory" }],
      },
    ],
  },
});

const getTLFinancialYearList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "FinancialYear", filter: `[?(@.module == "TL")]` }],
      },
    ],
  },
});
const getTLDistrict = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "District", filter: `[?(@.statecode == "kl")]` }],
      },
    ],
  },
});
const getTLLBType = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "LBType", filter: `[?((@.code == "LB_TYPE_MUNICIPALITY") || (@.code == "LB_TYPE_CORPORATION"))]` }],
      },
    ],
  },
});
const getTLLocalbody = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "tenants", filter: `[?(@.city.statecode == "kl")]` }],
      },
    ],
  },
});

const getPTFloorList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "Floor" }],
      },
    ],
  },
});

const getReasonCriteria = (tenantId, moduleCode, type, payload) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: payload.map((mdmsLoad) => ({
          name: mdmsLoad,
        })),
      },
    ],
  },
});

const getBillingServiceForBusinessServiceCriteria = (filter) => ({
  moduleDetails: [
    {
      moduleName: "BillingService",
      masterDetails: [
        { name: "BusinessService", filter },
        {
          name: "TaxHeadMaster",
        },
        {
          name: "TaxPeriod",
        },
      ],
    },
  ],
});

const getRoleStatusCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "RoleStatusMapping",
            filter: null,
          },
        ],
      },
    ],
  },
});
const getRentalDetailsCategoryCriteria = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "RentalDetails",
          },
        ],
      },
    ],
  },
});
const getCRGenderList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "GenderType",
          },
        ],
      },
    ],
  },
});
const getCRPlaceOfDeathList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PlaceMaster",
          },
        ],
      },
    ],
  },
});
const getCRNationalityList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Country",
          },
        ],
      },
    ],
  },
});
const getCRTalukList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Taluk",
          },
        ],
      },
    ],
  },
});
const getCRReligionlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Religion",
          },
        ],
      },
    ],
  },
});
const getCRcauseOfDeathMainlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "DeathCause",
          },
        ],
      },
    ],
  },
});
const getCRcauseOfDeathsublist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "DeathCauseSub",
          },
        ],
      },
    ],
  },
});
const getDeathPlaceTypelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PlaceMasterDeath",
          },
        ],
      },
    ],
  },
});
const getCROtherDeathPlacelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "OtherDeathPlace",
          },
        ],
      },
    ],
  },
});
const getCRMannerOfDeathlist
 = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MannerOfDeath",
          },
        ],
      },
    ],
  },
});
const getCRPregnantDeceasedlist
 = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PregnantDeceased",
          },
        ],
      },
    ],
  },
});
const getCRRBirthStatuslist
 = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "BirthStatus",
          },
        ],
      },
    ],
  },
});
const getCRcauseOfSpouseTypelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "SpouseType",
          },
        ],
      },
    ],
  },
});
const getCRDeathVehicleTypelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "VehicleType",
          },
        ],
      },
    ],
  },
});

// const getCRplaceTypelist = (tenantId, moduleCode) => ({
//   details: {
//     tenantId: tenantId,
//     moduleDetails: [
//       {
//         moduleName: moduleCode,
//         masterDetails: [
//           {
//             name: "PlaceMasterDeath",
//           },
//         ],
//       },
//     ],
//   },
// });
const getCRVillagelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Village",
          },
        ],
      },
    ],
  },
});
const getCRDistrictlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "District",
          },
        ],
      },
    ],
  },
});

const getCRPostOfficelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PostOffice",
          },
        ],
      },
    ],
  },
});
const getCRCountrylist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Country",
          },
        ],
      },
    ],
  },
});
const getCRStatelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "State",
          },
        ],
      },
    ],
  },
});
const getCROccupationlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Occupation",
          },
        ],
      },
    ],
  },
});
const getCRLBTypelist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "LBType",
          },
        ],
      },
    ],
  },
});
const getCRQualificationlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Qualification",
          },
        ],
      },
    ],
  },
});
const getCRProfessionlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Profession",
          },
        ],
      },
    ],
  },
});
const getCRNatureofMedicalAttentionlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "AttentionOfDelivery",
          },
        ],
      },
    ],
  },
});
const getCRNatureofMedicalAttentionSublist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MedicalAttentionType",
          },
        ],
      },
    ],
  },
});
const getCRNatureofMedicalAttentionSubAlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "DeathCauseSub",
          },
        ],
      },
    ],
  },
});
const getCRDeliveryMethodlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "DeliveryMethod",
          },
        ],
      },
    ],
  },
});
const getCRAgeUnitlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "AgeUnit",
          },
        ],
      },
    ],
  },
});
const getCRMaleDependentlist = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "MaleDependentType",
          },
        ],
      },
    ],
  },
});
const getCRTitleList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "Title",
          },
        ],
      },
    ],
  },
});
// const getCRInstitutionList = (tenantId, moduleCode) => ({
//   details: {
//     tenantId: tenantId,
//     moduleDetails: [
//       {
//         moduleName: moduleCode,
//         masterDetails: [
//           {
//             name: "InstitutionTypePlaceOfEvent",
//           },
//         ],
//       },
//     ],
//   },
// });
const getCRInstitutionPlaceOfEventList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "InstitutionTypePlaceOfEvent",
          },
        ],
      },
    ],
  },
});
const getCROtherPlaceList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "OtherBithPlace",
          },
        ],
      },
    ],
  },
});

const getCRIdProofList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "IdProof",
          },
        ],
      },
    ],
  },
});
const getCRIdProofDetailsList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "IdProofDetails",
          },
        ],
      },
    ],
  },
});

const getCRDeathPlaceTypeList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PlaceMaster",
          },
        ],
      },
    ],
  },
});
const getCRVehicleTypeList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: birth - death - service,
        masterDetails: [
          {
            name: "VehicleType",
          },
        ],
      },
    ],
  },
});
const getCRInstitutionIdList = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: "egov-location",
        masterDetails: [
          {
            name: "institutionList",
          },
        ],
      },
    ],
  },
});

const getChargeSlabsCategoryCriteria = (tenantId, moduleCode) => ({
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "ChargeSlabs",
          },
        ],
      },
    ],
  },
});

const getGenderTypeList = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "GenderType",
          },
        ],
      },
    ],
  },
});

const getDssDashboardCriteria = (tenantId, moduleCode) => ({
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "dashboard-config",
          },
        ],
      },
    ],
  },
});

const getMCollectBillingServiceCriteria = (tenantId, moduleCode, type, filter) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "BusinessService", filter: filter }],
      },
    ],
  },
});

const getTradeUnitsDataList = (tenantId, moduleCode, type, filter) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "TradeType", filter: filter }],
      },
    ],
  },
});

const getMCollectApplicationStatusCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "applicationStatus" }],
      },
    ],
  },
});

const getHrmsEmployeeRolesandDesignations = () => ({
  moduleDetails: [
    {
      moduleName: "common-masters",
      masterDetails: [
        { name: "Department", filter: "[?(@.active == true)]" },
        { name: "Designation", filter: "[?(@.active == true)]" },
      ],
    },
    {
      moduleName: "tenant",
      masterDetails: [{ name: "tenants" }],
    },
    {
      moduleName: "ACCESSCONTROL-ROLES",
      masterDetails: [{ name: "roles", filter: "$.[?(@.code!='CITIZEN')]" }],
    },
    { moduleName: "egov-location", masterDetails: [{ name: "TenantBoundary" }] },
  ],
});
const getFSTPPlantCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "FSTPPlantInfo" }],
      },
    ],
  },
});
const getCancelReceiptReason = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "CancelReceiptReason" }],
      },
    ],
  },
});
const getReceiptStatus = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "ReceiptStatus" }],
      },
    ],
  },
});
const getCancelReceiptReasonAndStatus = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [{ name: "ReceiptStatus" }, { name: "uiCommonPay" }],
      },
    ],
  },
});

const getDocumentTypesCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "DocTypeMapping",
          },
        ],
      },
    ],
  },
});

const getTradeTypeRoleCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "TradeTypetoRoleMapping",
          },
        ],
      },
    ],
  },
});

const getFSTPORejectionReasonCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "FSTPORejectionReason",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getFSMPaymentTypeCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "PaymentType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getFSMTripNumberCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "TripNumber",
            filter: null,
          },
        ],
      },
    ],
  },
});

const getFSMReceivedPaymentTypeCriteria = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "ReceivedPaymentType",
            filter: null,
          },
        ],
      },
    ],
  },
});

const GetEgovLocations = (MdmsRes) => {
  return MdmsRes["egov-location"].TenantBoundary[0].boundary.children.map((obj) => ({
    name: obj.localname,
    i18nKey: obj.localname,
  }));
};

const GetServiceDefs = (MdmsRes, moduleCode) => MdmsRes[`RAINMAKER-${moduleCode}`].ServiceDefs.filter((def) => def.active);

const GetSanitationType = (MdmsRes) => MdmsRes["FSM"].SanitationType.filter((type) => type.active);

const GetPitType = (MdmsRes) =>
  MdmsRes["FSM"].PitType.filter((item) => item.active).map((type) => ({ ...type, i18nKey: `PITTYPE_MASTERS_${type.code}` }));

const GetApplicationChannel = (MdmsRes) =>
  MdmsRes["FSM"].ApplicationChannel.filter((type) => type.active).map((channel) => ({
    ...channel,
    i18nKey: `ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${channel.code}`,
  }));

const GetPropertyType = (MdmsRes) =>
  MdmsRes["FSM"].PropertyType.filter((property) => property.active && !property.propertyType).map((item) => ({
    ...item,
    i18nKey: `PROPERTYTYPE_MASTERS_${item.code}`,
    code: item.code,
  }));

const GetPropertySubtype = (MdmsRes) =>
  MdmsRes["FSM"].PropertyType.filter((property) => property.active && property.propertyType).map((item) => ({
    ...item,
    i18nKey: `PROPERTYTYPE_MASTERS_${item.code}`,
    code: item.code,
  }));

const GetVehicleType = (MdmsRes) =>
  MdmsRes["Vehicle"].VehicleMakeModel.filter((vehicle) => vehicle.active)
    .filter((vehicle) => vehicle.make)
    .map((vehicleDetails) => {
      return {
        ...vehicleDetails,
        i18nKey: `COMMON_MASTER_VEHICLE_${vehicleDetails.code}`,
      };
    });

const GetSlumLocalityMapping = (MdmsRes, tenantId) =>
  MdmsRes["FSM"].Slum.filter((type) => type.active).reduce((prev, curr) => {
    return prev[curr.locality]
      ? {
          ...prev,
          [curr.locality]: [
            ...prev[curr.locality],
            {
              ...curr,
              i18nKey: `${tenantId.toUpperCase().replace(".", "_")}_${curr.locality}_${curr.code}`,
            },
          ],
        }
      : {
          ...prev,
          [curr.locality]: [
            {
              ...curr,
              i18nKey: `${tenantId.toUpperCase().replace(".", "_")}_${curr.locality}_${curr.code}`,
            },
          ],
        };
  }, {});

const GetPropertyOwnerShipCategory = (MdmsRes) =>
  MdmsRes["PropertyTax"].OwnerShipCategory.filter((ownerShip) => ownerShip.active).map((ownerShipDetails) => {
    return {
      ...ownerShipDetails,
      i18nKey: `COMMON_MASTER_OWNER_TYPE_${ownerShipDetails.code}`,
    };
  });

const GetTradeOwnerShipCategory = (MdmsRes) =>
  MdmsRes["common-masters"].OwnerShipCategory.filter((ownerShip) => ownerShip.active).map((ownerShipDetails) => {
    return {
      ...ownerShipDetails,
      i18nKey: `COMMON_MASTER_OWNER_TYPE_${ownerShipDetails.code}`,
    };
  });

const GetPropertyOwnerType = (MdmsRes) =>
  MdmsRes["PropertyTax"].OwnerType.filter((owner) => owner.active).map((ownerDetails) => {
    return {
      ...ownerDetails,
      i18nKey: `PROPERTYTAX_OWNERTYPE_${ownerDetails.code}`,
    };
  });

const getSubPropertyOwnerShipCategory = (MdmsRes) => {
  MdmsRes["PropertyTax"].SubOwnerShipCategory.filter((category) => category.active).map((subOwnerShipDetails) => {
    return {
      ...subOwnerShipDetails,
      i18nKey: `PROPERTYTAX_BILLING_SLAB_${subOwnerShipDetails.code}`,
    };
  });
  sessionStorage.setItem("getSubPropertyOwnerShipCategory", JSON.stringify(MdmsRes));
};

const getDocumentRequiredScreen = (MdmsRes) => {
  MdmsRes["PropertyTax"].Documents.filter((Documents) => Documents.active).map((dropdownData) => {
    return {
      ...Documents,
      i18nKey: `${dropdownData.code}`,
    };
  });
};

const getTLDocumentRequiredScreen = (MdmsRes) => {
  MdmsRes["TradeLicense"].Documents.filter((Documents) => Documents.active).map((dropdownData) => {
    return {
      ...Documents,
      i18nKey: `${dropdownData.code}`,
    };
  });
};

const getMapConfig = (MdmsRes) => {
  MdmsRes["PropertyTax"].MapConfig.filter((MapConfig) => MapConfig).map((MapData) => {
    return {
      ...MapConfig,
      defaultconfig: MapData.defaultConfig,
    };
  });
};

const getUsageCategory = (MdmsRes) =>
  MdmsRes["PropertyTax"].UsageCategory.filter((UsageCategory) => UsageCategory.active).map((UsageCategorylist) => {
    return {
      ...UsageCategorylist,
      i18nKey: `PROPERTYTAX_BILLING_SLAB_${UsageCategorylist.code}`,
    };
  });

const getPTPropertyType = (MdmsRes) =>
  MdmsRes["PropertyTax"].UsageCategory.filter((PropertyType) => PropertyType.active).map((PTPropertyTypelist) => {
    return {
      ...UsageCategorylist,
      i18nKey: `COMMON_PROPTYPE_${stringReplaceAll(PTPropertyTypelist.code, ".", "_")}`,
    };
  });

const getTLStructureType = (MdmsRes) =>
  MdmsRes["common-masters"].StructureType.filter((StructureType) => StructureType.active).map((TLStructureTypeList) => {
    return {
      ...TLStructureTypeList,
      i18nKey: `COMMON_MASTERS_STRUCTURETYPE_${stringReplaceAll(TLStructureTypeList.code, ".", "_")}`,
    };
  });
const getTLStructureTypePlace = (MdmsRes) =>
  MdmsRes["TradeLicense"].TradeStructureSubtype.filter((TradeStructureSubtype) => TradeStructureSubtype.active).map((TLStructureSubtypeList) => {
    return {
      ...TLStructureSubtypeList,
      // i18nKey: `TradeLicense_STRUCTURESUBTYPE_${stringReplaceAll(TLStructureSubtypeList.code, ".", "_")}`,
    };
  });

const getTLAccessoriesType = (MdmsRes) =>
  MdmsRes["TradeLicense"].AccessoriesCategory.filter((AccessoriesCategory) => AccessoriesCategory.active).map((TLAccessoryTypeList) => {
    return {
      ...TLAccessoryTypeList,
      i18nKey: `TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(TLAccessoryTypeList.code, ".", "_")}`,
    };
  });

const getTLFinancialYear = (MdmsRes) =>
  MdmsRes["egf-master"].FinancialYear.filter((FinancialYear) => FinancialYear.active && FinancialYear.module === "TL").map((FinancialYearList) => {
    return {
      ...FinancialYearList,
      //i18nKey: `TRADELICENSE_ACCESSORIESCATEGORY_${stringReplaceAll(TLAccessoryTypeList.code, ".", "_")}`,
    };
  });

const getFloorList = (MdmsRes) =>
  MdmsRes["PropertyTax"].Floor.filter((PTFloor) => PTFloor.active).map((PTFloorlist) => {
    return {
      ...PTFloorlist,
      i18nKey: `PROPERTYTAX_FLOOR_${PTFloorlist.code}`,
    };
  });

const GetReasonType = (MdmsRes, type, moduleCode) =>
  Object.assign(
    {},
    ...Object.keys(MdmsRes[moduleCode]).map((collection) => ({
      [collection]: MdmsRes[moduleCode][collection]
        .filter((reason) => reason.active)
        .map((reason) => ({
          ...reason,
          i18nKey: `ES_ACTION_REASON_${reason.code}`,
        })),
    }))
  );

const getRentalDetailsCategory = (MdmsRes) => {
  MdmsRes["PropertyTax"].RentalDetails.filter((category) => category.active).map((RentalDetailsInfo) => {
    return {
      ...RentalDetailsInfo,
      i18nKey: `PROPERTYTAX_BILLING_SLAB_${RentalDetailsInfo.code}`,
    };
  });
};

const getChargeSlabsCategory = (MdmsRes) => {
  MdmsRes["PropertyTax"].ChargeSlabs.filter((category) => category.active).map((ChargeSlabsInfo) => {
    return {
      ...ChargeSlabsInfo,
    };
  });
};

const getGenderType = (MdmsRes) => {
  return MdmsRes["common-masters"].GenderType.filter((GenderType) => GenderType.active).map((genderDetails) => {
    return {
      ...genderDetails,
      i18nKey: `PT_COMMON_GENDER_${genderDetails.code}`,
    };
  });
  //return MdmsRes;
};

const TLGenderType = (MdmsRes) => {
  MdmsRes["common-masters"].GenderType.filter((GenderType) => GenderType.active).map((genders) => {
    return {
      ...genders,
      i18nKey: `TL_GENDER_${genders.code}`,
    };
  });
};
const CRGenderType = (MdmsRes) => {
  MdmsRes["common-masters"].GenderType.filter((GenderType) => GenderType.active).map((genders) => {
    return {
      ...genders,
      i18nKey: `CR_GENDER_${genders.code}`,
    };
  });
};

const PTGenderType = (MdmsRes) => {
  MdmsRes["common-masters"].GenderType.filter((GenderType) => GenderType.active).map((formGender) => {
    return {
      ...formGender,
      i18nKey: `PT_FORM3_${formGender.code}`,
    };
  });
};

const HRGenderType = (MdmsRes) => {
  MdmsRes["common-masters"].GenderType.filter((GenderType) => GenderType.active).map((comGender) => {
    return {
      ...comGender,
      i18nKey: `COMMON_GENDER_${comGender.code}`,
    };
  });
};

const GetMCollectBusinessService = (MdmsRes) =>
  MdmsRes["BillingService"].BusinessService.map((businesServiceDetails) => {
    return {
      ...businesServiceDetails,
      i18nKey: `BILLINGSERVICE_BUSINESSSERVICE_${businesServiceDetails.code}`,
    };
  });

const GetMCollectApplicationStatus = (MdmsRes) =>
  MdmsRes["mCollect"].applcationStatus.map((appStatusDetails) => {
    return {
      ...appStatusDetails,
      i18nKey: `BILLINGSERVICE_BUSINESSSERVICE_${appStatusDetails.code}`,
    };
  });

const getFSMGenderType = (MdmsRes) => {
  return MdmsRes["common-masters"].GenderType.map((genderDetails) => {
    return {
      ...genderDetails,
      i18nKey: `COMMON_GENDER_${genderDetails.code}`,
    };
  });
};

const GetFSTPORejectionReason = (MdmsRes) => {
  return MdmsRes["Vehicle"].FSTPORejectionReason.filter((reason) => reason.active).map((reasonDetails) => {
    return {
      ...reasonDetails,
      i18nKey: `ES_ACTION_REASON_${reasonDetails.code}`,
    };
  });
};

const GetPaymentType = (MdmsRes) => {
  return MdmsRes["FSM"].PaymentType.filter((option) => option.active).map((reasonDetails) => {
    return {
      ...reasonDetails,
      i18nKey: `ES_ACTION_${reasonDetails.code}`,
    };
  });
};

const GetTripNumber = (MdmsRes) => {
  return MdmsRes["FSM"].TripNumber.filter((option) => option.active).map((reasonDetails) => {
    return {
      ...reasonDetails,
      i18nKey: `ES_ACTION_TRIP_${reasonDetails.code}`,
    };
  });
};

const GetReceivedPaymentType = (MdmsRes) => {
  return MdmsRes["FSM"].ReceivedPaymentType.filter((option) => option.active).map((reasonDetails) => {
    return {
      ...reasonDetails,
      i18nKey: `ES_ACTION_${reasonDetails.code}`,
    };
  });
};
const getFinancialPeriod = (tenantId, moduleCode, type) => ({
  type,
  details: {
    tenantId: tenantId,
    moduleDetails: [
      {
        moduleName: moduleCode,
        masterDetails: [
          {
            name: "FinancialPeriod",
            filter: null,
          },
        ],
      },
    ],
  },
});
const getDssDashboard = (MdmsRes) => MdmsRes["dss-dashboard"]["dashboard-config"];

const GetRoleStatusMapping = (MdmsRes) => MdmsRes["DIGIT-UI"].RoleStatusMapping;
const GetCommonFields = (MdmsRes, moduleCode) =>
  moduleCode.toUpperCase() === "PROPERTYTAX" ? MdmsRes["PropertyTax"].CommonFieldsConfig : MdmsRes["FSM"].CommonFieldsConfig;

const GetPreFields = (MdmsRes) => MdmsRes["FSM"].PreFieldsConfig;

const GetPostFields = (MdmsRes) => MdmsRes["FSM"].PostFieldsConfig;

const GetFSTPPlantInfo = (MdmsRes) => MdmsRes["FSM"].FSTPPlantInfo;

const GetDocumentsTypes = (MdmsRes) => MdmsRes["BPA"].DocTypeMapping;

const GetChecklist = (MdmsRes) => MdmsRes["BPA"].CheckList;

const transformResponse = (type, MdmsRes, moduleCode, tenantId) => {
  switch (type) {
    case "citymodule":
      return GetCitiesWithi18nKeys(MdmsRes, moduleCode);
    case "egovLocation":
      return GetEgovLocations(MdmsRes);
    case "serviceDefs":
      return GetServiceDefs(MdmsRes, moduleCode);
    case "ApplicationChannel":
      return GetApplicationChannel(MdmsRes);
    case "SanitationType":
      return GetSanitationType(MdmsRes);
    case "PropertyType":
      return GetPropertyType(MdmsRes);
    case "PropertySubtype":
      return GetPropertySubtype(MdmsRes);
    case "PitType":
      return GetPitType(MdmsRes);
    case "VehicleType":
      return GetVehicleType(MdmsRes);
    case "Slum":
      return GetSlumLocalityMapping(MdmsRes, tenantId);
    case "OwnerShipCategory":
      return GetPropertyOwnerShipCategory(MdmsRes);
    case "TLOwnerShipCategory":
      return GetTradeOwnerShipCategory(MdmsRes);
    case "OwnerType":
      return GetPropertyOwnerType(MdmsRes);
    case "SubOwnerShipCategory":
      return getSubPropertyOwnerShipCategory(MdmsRes);
    case "Documents":
      return getDocumentRequiredScreen(MdmsRes);
    case "TLDocuments":
      return getTLDocumentRequiredScreen(MdmsRes);
    case "MapConfig":
      return getMapConfig(MdmsRes);
    case "UsageCategory":
      return getUsageCategory(MdmsRes);
    case "PTPropertyType":
      return getPTPropertyType(MdmsRes);
    case "StructureType":
      return getTLStructureType(MdmsRes);
    case "TradeStructureSubtype":
      return getTLStructureTypePlace(MdmsRes);
    case "AccessoryCategory":
      return getTLAccessoriesType(MdmsRes);
    case "FinancialYear":
      return getTLFinancialYear(MdmsRes);
    case "Floor":
      return getFloorList(MdmsRes);
    case "Reason":
      return GetReasonType(MdmsRes, type, moduleCode);
    case "RoleStatusMapping":
      return GetRoleStatusMapping(MdmsRes);
    case "CommonFieldsConfig":
      return GetCommonFields(MdmsRes, moduleCode);
    case "PreFieldsConfig":
      return GetPreFields(MdmsRes);
    case "PostFieldsConfig":
      return GetPostFields(MdmsRes);
    case "RentalDeatils":
      return getRentalDetailsCategory(MdmsRes);
    case "ChargeSlabs":
      return getChargeSlabsCategory(MdmsRes);
    case "DssDashboard":
      return getDssDashboard(MdmsRes);
    case "BusinessService":
      return GetMCollectBusinessService(MdmsRes);
    case "applcatonStatus":
      return GetMCollectApplicationStatus(MdmsRes);
    case "FSTPPlantInfo":
      return GetFSTPPlantInfo(MdmsRes);
    case "GenderType":
      return getGenderType(MdmsRes);
    case "TLGendertype":
      return TLGenderType(MdmsRes);
    case "CRGenderType":
      return CRGenderType(MdmsRes);
    case "PTGenderType":
      return PTGenderType(MdmsRes);
    case "HRGenderType":
      return HRGenderType(MdmsRes);
    case "DocumentTypes":
      return GetDocumentsTypes(MdmsRes);
    case "IdProof":
      return GetIdProof(MdmsRes);
    case "CheckList":
      return GetChecklist(MdmsRes);
    case "FSMGenderType":
      return getFSMGenderType(MdmsRes);
    case "FSTPORejectionReason":
      return GetFSTPORejectionReason(MdmsRes);
    case "PaymentType":
      return GetPaymentType(MdmsRes);
    case "TripNumber":
      return GetTripNumber(MdmsRes);
    case "ReceivedPaymentType":
      return GetReceivedPaymentType(MdmsRes);
    default:
      return MdmsRes;
  }
};

const getCacheSetting = (moduleName) => {
  return ApiCacheService.getSettingByServiceUrl(Urls.MDMS, moduleName);
};

const mergedData = {};
const mergedPromises = {};
const callAllPromises = (success, promises = [], resData) => {
  promises.forEach((promise) => {
    if (success) {
      promise.resolve(resData);
    } else {
      promise.reject(resData);
    }
  });
};
const mergeMDMSData = (data, tenantId) => {
  if (!mergedData[tenantId] || Object.keys(mergedData[tenantId]).length === 0) {
    mergedData[tenantId] = data;
  } else {
    data.MdmsCriteria.moduleDetails.forEach((dataModuleDetails) => {
      const moduleName = dataModuleDetails.moduleName;
      const masterDetails = dataModuleDetails.masterDetails;
      let found = false;
      mergedData[tenantId].MdmsCriteria.moduleDetails.forEach((moduleDetail) => {
        if (moduleDetail.moduleName === moduleName) {
          found = true;
          moduleDetail.masterDetails = [...moduleDetail.masterDetails, ...masterDetails];
        }
      });
      if (!found) {
        mergedData[tenantId].MdmsCriteria.moduleDetails.push(dataModuleDetails);
      }
    });
  }
};
const debouncedCall = ({ serviceName, url, data, useCache, params }, resolve, reject) => {
  if (!mergedPromises[params.tenantId] || mergedPromises[params.tenantId].length === 0) {
    const cacheSetting = getCacheSetting();
    setTimeout(() => {
      let callData = JSON.parse(JSON.stringify(mergedData[params.tenantId]));
      mergedData[params.tenantId] = {};
      let callPromises = [...mergedPromises[params.tenantId]];
      mergedPromises[params.tenantId] = [];
      ServiceRequest({
        serviceName,
        url,
        data: callData,
        useCache,
        params,
      })
        .then((data) => {
          callAllPromises(true, callPromises, data);
        })
        .catch((err) => {
          callAllPromises(false, callPromises, err);
        });
    }, cacheSetting.debounceTimeInMS || 500);
  }
  mergeMDMSData(data, params.tenantId);
  if (!mergedPromises[params.tenantId]) {
    mergedPromises[params.tenantId] = [];
  }
  mergedPromises[params.tenantId].push({ resolve, reject });
};

export const MdmsService = {
  init: (stateCode) =>
    ServiceRequest({
      serviceName: "mdmsInit",
      url: Urls.MDMS,
      data: initRequestBody(stateCode),
      useCache: true,
      params: { tenantId: stateCode },
    }),
  call: (tenantId, details) => {
    return new Promise((resolve, reject) =>
      debouncedCall(
        {
          serviceName: "mdmsCall",
          url: Urls.MDMS,
          data: getCriteria(tenantId, details),
          useCache: true,
          params: { tenantId },
        },
        resolve,
        reject
      )
    );
  },
  getDataByCriteria: async (tenantId, mdmsDetails, moduleCode) => {
    const key = `MDMS.${tenantId}.${moduleCode}.${mdmsDetails.type}.${JSON.stringify(mdmsDetails.details)}`;
    const inStoreValue = PersistantStorage.get(key);
    if (inStoreValue) {
      return inStoreValue;
    }
    const { MdmsRes } = await MdmsService.call(tenantId, mdmsDetails.details);
    const responseValue = transformResponse(mdmsDetails.type, MdmsRes, moduleCode.toUpperCase(), tenantId);
    const cacheSetting = getCacheSetting(mdmsDetails.details.moduleDetails[0].moduleName);
    // PersistantStorage.set(key, responseValue, cacheSetting.cacheTimeInSecs);
    return responseValue;
  },
  getWorkFlowBirthMaster: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getWorkFlowBirthMasterList(tenantId, moduleCode), moduleCode);
  },
  getWorkFlowDeathMaster: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getWorkFlowDeathMasterList(tenantId, moduleCode), moduleCode);
  },
  getLocalBodyMaster: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getLocalBodyMasterList(tenantId, moduleCode), moduleCode);
  },
  getCRQualificationSub: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRQualificationSubList(tenantId, moduleCode), moduleCode);
  },
  getCRModeOfPregnancy: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRModeOfPregnancyList(tenantId, moduleCode), moduleCode);
  },
  getDFMajorFunction: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDFMajorFunctionList(tenantId, moduleCode), moduleCode);
  },
  getDFMSubFunction: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDFMSubFunctionList(tenantId, moduleCode), moduleCode);
  },
  getDFMFunction: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDFMFunctionList(tenantId, moduleCode), moduleCode);
  },
  getDFMinorFunction: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDFMinorFunctionList(tenantId, moduleCode), moduleCode);
  },
  getCommonApplicantCategory: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCommonApplicantCategoryList(tenantId, moduleCode), moduleCode);
  },
  getCRDocumentType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDocumentTypeList(tenantId, moduleCode), moduleCode);
  },
  getCRDocumentType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDocumentTypeList(tenantId, moduleCode), moduleCode);
  },
  getCRPlaceMaster: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRPlaceMasterList(tenantId, moduleCode), moduleCode);
  },
  getCRHospitalMaster: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRHospitalMasterList(tenantId, moduleCode), moduleCode);
  },
  getCRNationlity: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRNationalityList(tenantId, moduleCode), moduleCode);
  },
  getCRPlaceOfDeath: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRPlaceOfDeathList(tenantId, moduleCode), moduleCode);
  },
  getCRGender: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRGenderList(tenantId, moduleCode), moduleCode);
  },
  getCRTaluk: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRTalukList(tenantId, moduleCode), moduleCode);
  },
  getCRTitle: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRTitleList(tenantId, moduleCode), moduleCode);
  },
  getCRWard: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRWardList(tenantId, moduleCode), moduleCode);
  },
  getCRReligion: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRReligionlist(tenantId, moduleCode), moduleCode);
  },
  getCRcauseOfDeathMain: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRcauseOfDeathMainlist(tenantId, moduleCode), moduleCode);
  },
  getCRcauseOfDeathsub: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRcauseOfDeathsublist(tenantId, moduleCode), moduleCode);
  },
  getCROtherDeathPlace: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCROtherDeathPlacelist(tenantId, moduleCode), moduleCode);
  },
  getCRMannerOfDeath: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRMannerOfDeathlist(tenantId, moduleCode), moduleCode);
  },
  getCRPregnantDeceased: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRPregnantDeceasedlist(tenantId, moduleCode), moduleCode);
  },
  
  getCRBirthStatus: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRRBirthStatuslist(tenantId, moduleCode), moduleCode);
  },
  getDeathPlaceType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDeathPlaceTypelist(tenantId, moduleCode), moduleCode);
  },
  getCRcauseOfSpouseType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRcauseOfSpouseTypelist(tenantId, moduleCode), moduleCode);
  },
  getCRDeathVehicleType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDeathVehicleTypelist(tenantId, moduleCode), moduleCode);
  },

  // getCRplaceType: (tenantId, moduleCode) => {
  //   return MdmsService.getDataByCriteria(tenantId, getCRplaceTypelist(tenantId, moduleCode), moduleCode);
  // },
  getCRVillage: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRVillagelist(tenantId, moduleCode), moduleCode);
  },
  getCRDistrict: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDistrictlist(tenantId, moduleCode), moduleCode);
  },
  // getCRInstitution: (tenantId, moduleCode) => {
  //   return MdmsService.getDataByCriteria(tenantId, getCRInstitutionList(tenantId, moduleCode), moduleCode);
  // },
  getCRInstitutionId: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRInstitutionIdList(tenantId, moduleCode), moduleCode);
  },
  getCRInstitutionPlaceOfEvent: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRInstitutionPlaceOfEventList(tenantId, moduleCode), moduleCode);
  },
  getCROtherPlace: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCROtherPlaceList(tenantId, moduleCode), moduleCode);
  },
  getCRPostOffice: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRPostOfficelist(tenantId, moduleCode), moduleCode);
  },
  getCRState: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRStatelist(tenantId, moduleCode), moduleCode);
  },
  getCROccupation: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCROccupationlist(tenantId, moduleCode), moduleCode);
  },
  getCRLBType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRLBTypelist(tenantId, moduleCode), moduleCode);
  },
  getCRQualification: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRQualificationlist(tenantId, moduleCode), moduleCode);
  },
  getCRProfession: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRProfessionlist(tenantId, moduleCode), moduleCode);
  },
  getCRCountry: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRCountrylist(tenantId, moduleCode), moduleCode);
  },
  getCRNatureofMedicalAttention: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRNatureofMedicalAttentionlist(tenantId, moduleCode), moduleCode);
  },
  getCRDeliveryMethod: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDeliveryMethodlist(tenantId, moduleCode), moduleCode);
  },
  getCRNatureofMedicalAttentionSub: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRNatureofMedicalAttentionSublist(tenantId, moduleCode), moduleCode);
  },
  getCRNatureofMedicalAttentionSubA: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRNatureofMedicalAttentionSubAlist(tenantId, moduleCode), moduleCode);
  },
  getCRAgeUnit: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRAgeUnitlist(tenantId, moduleCode), moduleCode);
  },
  getCRDocumentTypeB: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDocumentTypeBlist(tenantId, moduleCode), moduleCode);
  },
  getCRIdProof: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRIdProofList(tenantId, moduleCode), moduleCode);
  },
  getCRIdProofDetails: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRIdProofDetailsList(tenantId, moduleCode), moduleCode);
  }, 
  getCRDeathPlaceType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRDeathPlaceTypeList(tenantId, moduleCode), moduleCode);
  },

  getCRVehicleType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRVehicleTypeList(tenantId, moduleCode), moduleCode);
  },

  getCRMaleDependent: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCRMaleDependentlist(tenantId, moduleCode), moduleCode);
  },
  /////////crmdms
  getServiceDefs: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getModuleServiceDefsCriteria(tenantId, moduleCode), moduleCode);
  },
  getSanitationType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getSanitationTypeCriteria(tenantId, moduleCode), moduleCode);
  },
  getApplicationChannel: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getApplicationChannelCriteria(tenantId, moduleCode), moduleCode);
  },
  getPropertyType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPropertyTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getPropertyUsage: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPropertyUsageCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getPropertySubtype: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPropertyTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getPitType: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getPitTypeCriteria(tenantId, moduleCode), moduleCode);
  },
  getVehicleType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getVehicleTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getChecklist: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getChecklistCriteria(tenantId, moduleCode), moduleCode);
  },
  getPaymentRules: (tenantId, filter) => {
    return MdmsService.call(tenantId, getBillingServiceForBusinessServiceCriteria(filter));
  },

  getCustomizationConfig: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getConfig(tenantId, moduleCode), moduleCode);
  },
  getSlumLocalityMapping: (tenantId, moduleCode, type) =>
    MdmsService.getDataByCriteria(tenantId, getSlumLocalityCriteria(tenantId, moduleCode, type), moduleCode),

  getReason: (tenantId, moduleCode, type, payload) =>
    MdmsService.getDataByCriteria(tenantId, getReasonCriteria(tenantId, moduleCode, type, payload), moduleCode),

  getRoleStatus: (tenantId, moduleCode, type) =>
    MdmsService.getDataByCriteria(tenantId, getRoleStatusCriteria(tenantId, moduleCode, type), moduleCode),

  getCommonFieldsConfig: (tenantId, moduleCode, type, payload) =>
    MdmsService.getDataByCriteria(tenantId, getCommonFieldsCriteria(tenantId, moduleCode, type, payload), moduleCode),

  getPreFieldsConfig: (tenantId, moduleCode, type, payload) =>
    MdmsService.getDataByCriteria(tenantId, getPreFieldsCriteria(tenantId, moduleCode, type, payload), moduleCode),

  getPostFieldsConfig: (tenantId, moduleCode, type, payload) =>
    MdmsService.getDataByCriteria(tenantId, getPostFieldsCriteria(tenantId, moduleCode, type, payload), moduleCode),

  getPropertyOwnerShipCategory: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPropertyOwnerShipCategoryCriteria(tenantId, moduleCode, type), moduleCode);
  },

  GetTradeOwnerShipCategory: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTradeOwnerShipCategoryCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getPropertyOwnerType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPropertyOwnerTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getPropertySubOwnerShipCategory: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getSubPropertyOwnerShipCategoryCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getDocumentRequiredScreen: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDocumentRequiredScreenCategory(tenantId, moduleCode), moduleCode);
  },
  getTLDocumentRequiredScreen: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDocumentRequiredScreenCategory(tenantId, moduleCode), moduleCode);
  },
  getTradeUnitsData: (tenantId, moduleCode, type, filter) => {
    return MdmsService.getDataByCriteria(tenantId, getTradeUnitsDataList(tenantId, moduleCode, type, filter), moduleCode);
  },
  getMapConfig: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDefaultMapConfig(tenantId, moduleCode), moduleCode);
  },
  getUsageCategory: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getUsageCategoryList(tenantId, moduleCode), moduleCode);
  },
  getPTPropertyType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPTPropertyTypeList(tenantId, moduleCode), moduleCode);
  },
  getTLStructureType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLStructureTypeList(tenantId, moduleCode), moduleCode);
  },
  getTLStructureTypePlace: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLStructureTypePlaceList(tenantId, moduleCode), moduleCode);
  },
  getTLNatureOfInstitution: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLNatureOfInstitutionList(tenantId, moduleCode), moduleCode);
  },
  getTLTypeOfInstitution: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLTypeOfInstitutionList(tenantId, moduleCode), moduleCode);
  },
  getTLNatureOfStructure: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLNatureOfStructureList(tenantId, moduleCode), moduleCode);
  },
  getTLZonalOffice: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLZonalOfficeList(tenantId, moduleCode), moduleCode);
  },
  getTLSector: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLSectorList(tenantId, moduleCode), moduleCode);
  },
  getTLAccessoriesType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLAccessoriesTypeList(tenantId, moduleCode), moduleCode);
  },
  getTLFinancialYear: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLFinancialYearList(tenantId, moduleCode), moduleCode);
  },
  getTLDistrict: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLDistrict(tenantId, moduleCode), moduleCode);
  },
  getTLLBType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLLBType(tenantId, moduleCode), moduleCode);
  },
  getTLLocalbody: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTLLocalbody(tenantId, moduleCode), moduleCode);
  },
  getFloorList: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getPTFloorList(tenantId, moduleCode, type), moduleCode);
  },
  getRentalDetails: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getRentalDetailsCategoryCriteria(tenantId, moduleCode), moduleCode);
  },
  getChargeSlabs: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getChargeSlabsCategoryCriteria(tenantId, moduleCode), moduleCode);
  },
  getDssDashboard: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getDssDashboardCriteria(tenantId, moduleCode), moduleCode);
  },
  getPaymentGateway: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGeneralCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getReceiptKey: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getReceiptKey(tenantId, moduleCode), moduleCode);
  },
  getHelpText: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGeneralCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getMCollectBillingService: (tenantId, moduleCode, type, filter) => {
    return MdmsService.getDataByCriteria(tenantId, getMCollectBillingServiceCriteria(tenantId, moduleCode, type, filter), moduleCode);
  },
  getMCollectApplcationStatus: (tenantId, moduleCode, type, filter) => {
    return MdmsService.getDataByCriteria(tenantId, getMCollectApplicationStatusCriteria(tenantId, moduleCode, type, filter), moduleCode);
  },
  getHrmsEmployeeRolesandDesignation: (tenantId) => {
    return MdmsService.call(tenantId, getHrmsEmployeeRolesandDesignations());
  },
  getHrmsEmployeeTypes: (tenantId, moduleCode, type, filter) => {
    return MdmsService.getDataByCriteria(tenantId, getGeneralCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getHrmsEmployeeReason: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGeneralCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getMultipleTypes: (tenantId, moduleCode, types) => {
    return MdmsService.getDataByCriteria(tenantId, getMultipleTypes(tenantId, moduleCode, types), moduleCode);
  },
  getFSTPPlantInfo: (tenantId, moduleCode, types) => {
    return MdmsService.getDataByCriteria(tenantId, getFSTPPlantCriteria(tenantId, moduleCode, types), moduleCode);
  },
  getCancelReceiptReason: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCancelReceiptReason(tenantId, moduleCode), moduleCode);
  },
  getReceiptStatus: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getReceiptStatus(tenantId, moduleCode), moduleCode);
  },
  getCancelReceiptReasonAndStatus: (tenantId, moduleCode) => {
    return MdmsService.getDataByCriteria(tenantId, getCancelReceiptReasonAndStatus(tenantId, moduleCode), moduleCode);
  },

  getGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  TLGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  CRGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  PTGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  HRGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  getDocumentTypes: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getDocumentTypesCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getTradeTypeRoleTypes: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getTradeTypeRoleCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getFSMGenderType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getGenderTypeList(tenantId, moduleCode, type), moduleCode);
  },

  getFSTPORejectionReason: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getFSTPORejectionReasonCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getFSMPaymentType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getFSMPaymentTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getFSMTripNumber: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getFSMTripNumberCriteria(tenantId, moduleCode, type), moduleCode);
  },

  getFSMReceivedPaymentType: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getFSMReceivedPaymentTypeCriteria(tenantId, moduleCode, type), moduleCode);
  },
  getTLFinancePeriod: (tenantId, moduleCode, type) => {
    return MdmsService.getDataByCriteria(tenantId, getFinancialPeriod(tenantId, moduleCode), moduleCode);
  },
};
