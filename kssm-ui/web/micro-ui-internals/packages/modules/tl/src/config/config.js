export const newConfig = [
  {
    head: "",
    body: [
      {
        type: "component",
        component: "TLInfoLabel",
        key: "tradedetils1",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_COMMON_TR_DETAILS",
    body: [
      {
        type: "component",
        component: "TLTradeDetailsEmployee",
        key: "tradedetils",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_TRADE_UNITS_HEADER",
    body: [
      {
        type: "component",
        component: "TLTradeUnitsEmployee",
        key: "tradeUnits",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_TRADE_DETAILS_HEADER_ACC",
    body: [
      {
        type: "component",
        component: "TLAccessoriesEmployee",
        key: "accessories",
        withoutLabel: true,
        hideInCitizen: true,
      }
    ]
  },
  {
    head: "TL_NEW_APPLICATION_PROPERTY",
    body: [
      {
        component: "CPTPropertySearchNSummary",
        withoutLabel: true,
        key: "cpt",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
  {
    "head": "ES_NEW_APPLICATION_LOCATION_DETAILS",
    "body": [
      {
        type: "component",
        route: "license-individual",
        component: "SelectLicenseeIndividualDetails",
        texts: {
          headerCaption: "",
          header: "TL_LICENSEE_DETAILS",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "place-structure",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "license-institution",
        component: "SelectLicenseeInstitutionDetails",
        texts: {
          headerCaption: "",
          header: "TL_LICENSEE_TYPE",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "place-structure",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "place-structure",
        component: "SelectLicenseePlaceActivity",
        texts: {
          headerCaption: "",
          header: "",
          //TL_LICENSEE_PLACE_STRUCTURE
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "address",
        nextStep: "structure-type",
        hideInEmployee: true,
      },
      {
        "route": "map",
        component: "TLSelectGeolocation",
        nextStep: "tladdress",
        hideInEmployee: true,
        key: "address",
        withoutLabel: true,
        texts: {
          header: "TL_GEOLOACTION_HEADER",
          cardText: "TL_GEOLOCATION_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipAndContinueText: "CORE_COMMON_SKIP_CONTINUE"
        }
      },
      {
        route: "pincode",
        component: "TLSelectPincode",
        texts: {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_PINCODE_HEADER",
          "cardText": "TL_PINCODE_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        withoutLabel: true,
        key: "address",
        nextStep: "address",
        type: "component"
      },
      {
        "route": "tladdress",
        "component": "SelectTradeAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "route": "address",
        "component": "TLSelectAddress",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_ADDRESS_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "key": "address",
        "nextStep": "street",
        "isMandatory": true,
        "type": "component"
      },
      {
        "type": "component",
        "route": "street",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInEmployee": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            "disable": "window.location.href.includes(`edit-application`)||window.location.href.includes(`renew-trade`)",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          }
        ],
        "nextStep": "landmark"
      },
      {
        "type": "component",
        "component": "SelectStreet",
        "key": "address",
        "withoutLabel": true,
        "hideInCitizen": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "TL_ADDRESS_HEADER",
          "cardText": "TL_STREET_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT"
        },
        "inputs": [
          {
            "label": "TL_LOCALIZATION_BUILDING_NO",
            "type": "text",
            "name": "doorNo",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_DOOR_INVALID"
            // }
          },
          {
            "label": "TL_LOCALIZATION_STREET_NAME",
            "type": "text",
            "name": "street",
            // "validation": {
            //     "maxlength": 256,
            //     "title": "CORE_COMMON_STREET_INVALID"
            // }
          }
        ]
      },
      {
        "type": "component",
        "route": "landmark",
        "component": "SelectLandmark",
        "withoutLabel": true,
        "texts": {
          "headerCaption": "TL_LOCATION_CAPTION",
          "header": "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          "cardText": "TL_LANDMARK_TEXT",
          "submitBarLabel": "CS_COMMON_NEXT",
          "skipText": "CORE_COMMON_SKIP_CONTINUE"
        },
        "key": "address",
        "nextStep": "owner-ship-details",
        "hideInEmployee": true
      },
      // {
      //     "type": "component",
      //     "route": "proof",
      //     "component": "Proof",
      //     "withoutLabel": true,
      //     "texts": {
      //         "headerCaption": "TL_OWNERS_DETAILS",
      //         "header": "TL_OWNERS_PHOTOGRAPH_HEADER",
      //         "cardText": "",
      //         "nextText": "CS_COMMON_NEXT",
      //         "submitBarLabel": "CS_COMMON_NEXT"
      //     },
      //     "key": "owners",
      //     "nextStep": null,
      //     "hideInEmployee": true
      // }
    ]
  },
  {
    head: "ES_NEW_APPLICATION_PROPERTY_ASSESSMENT",
    body: [
      {
        isMandatory: true,
        type: "component",
       route: "units-details",
        key: "TradeDetails",
        component: "SelectTradeUnits",
        texts: {
          headerCaption: "",
          header: "TL_TRADE_UNITS_HEADER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "licensee-select",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "licensee-select",
        isMandatory: true,
        component: "SelectLicensee",
        texts: {
          headerCaption: "",
          header: "",
          // TL_LICENSEE_TYPE
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "license-individual",
        // nextStep: {
        //   TL_COMMON_YES: "license-individual",
        //   TL_COMMON_NO: "know-your-property",
        //   // "TL_COMMON_INDIVIDUAL": "license-individual",
        //   // "TL_COMMON_INSTITUTION": "vehicle-type",
        // },
      },

      {
        route: "info",
        component: "TradeLicense",
        nextStep: "map",
        hideInEmployee: true,
        key: "tl",
      },
      {
        route: "TradeName",
        component: "SelectTradeName",
        texts: {
          headerCaption: "",
          header: "TL_TRADE_NAME_HEADER",
          cardText: "TL_TARDE_NAME_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
          skipText: "",
        },
        withoutLabel: true,
        key: "TradeDetails",
        nextStep: "structure-type",
        type: "component",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "structure-type",
        isMandatory: true,
        component: "SelectStructureType",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "TL_STRUCTURE_TYPE_HEADER",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "business-category",
      },
      {
        type: "component",
        route: "land-type",
        isMandatory: true,
        component: "SelectLand",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "TL_STRUCTURE_TYPE_LAND",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "commencement-date",

      },
      {
        type: "component",
        route: "building-det",
        isMandatory: true,
        component: "SelectBuilding",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "Building Details",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "commencement-date",

      },
      {
        type: "component",
        route: "vechicle-det",
        isMandatory: true,
        component: "SelectTLVechicle",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "Vechicle Details",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "commencement-date",

      },
      {
        type: "component",
        route: "water-det",
        isMandatory: true,
        component: "SelectTLWater",
        texts: {
          // headerCaption: "TL_STRUCTURE_TYPE",
          header: "Water Details",
          // cardText: "TL_STRUCTURE_TYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: "commencement-date",

      },
      // {
      //   type: "component",
      //   route: "vehicle-type",
      //   isMandatory: true,
      //   component: "SelectVehicleType",
      //   texts: {
      //     headerCaption: "TL_STRUCTURE_SUBTYPE_CAPTION",
      //     header: "TL_VEHICLE_TYPE_HEADER",
      //     cardText: "TL_VEHICLE_TYPE_TEXT",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "TradeDetails",
      //   withoutLabel: true,
      //   hideInEmployee: true,
      //   //nextStep: "property-usage-type",
      //   nextStep: "commencement-date",
      // },
      // {
      //   type: "component",
      //   route: "Building-type",
      //   isMandatory: true,
      //   component: "SelectBuildingType",
      //   texts: {
      //     headerCaption: "TL_STRUCTURE_SUBTYPE_CAPTION",
      //     header: "TL_BUILDING_TYPE_HEADER",
      //     cardText: "TL_BUILDING_TYPE_TEXT",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "TradeDetails",
      //   withoutLabel: true,
      //   hideInEmployee: true,
      //   //nextStep: "property-usage-type",
      //   nextStep: "commencement-date",
      // },
      {
        type: "component",
        route: "commencement-date",
        isMandatory: true,
        component: "SelectCommencementDate",
        texts: {
          headerCaption: "",
          header: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_HEADER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        hideInEmployee: true,
        //nextStep: "property-usage-type",
        nextStep: "proof-of-identity",
      },
      {
        type: "component",
        route: "proof-of-identity",
        isMandatory: true,
        component: "SelectProofIdentity",
        texts: {
          headerCaption: "",
          header: "TL_PROOF_IDENTITY_HEADER",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
          addMultipleText: "PT_COMMON_ADD_APPLICANT_LABEL",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "ownership-proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "ownership-proof",
        isMandatory: true,
        component: "SelectOwnershipProof",
        texts: {
          headerCaption: "",
          header: "TL_OWNERSHIP_DOCUMENT",
          cardText: "",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "owners",
        withoutLabel: true,
        nextStep: "proof",
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "proof",
        component: "Proof",
        withoutLabel: true,
        texts: {
          headerCaption: "",
          header: "TL_OWNERS_PHOTOGRAPH_HEADER",
          cardText: "",
          nextText: "CS_COMMON_NEXT",
          submitBarLabel: "CS_COMMON_NEXT"
        },
        key: "owners",
        nextStep: null,
        hideInEmployee: true
      },
      {
        isMandatory: true,
        type: "component",
        route: "business-category",
        key: "TradeDetails",
        component: "SelectBusinessCategory",
        texts: {
          headerCaption: "",
          header: "TL_TRADE_BUISINESS_CATEGORY",
          // cardText: "TL_TRADE_UNITS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "commencement-date",
        hideInEmployee: true,
      },
      // {
      //   type: "component",
      //   route: "isAccessories",
      //   isMandatory: true,
      //   component: "SelectAccessories",
      //   texts: {
      //     headerCaption: "",
      //     header: "TL_ISACCESSORIES_HEADER",
      //     cardText: "TL_ISACCESSORIES_TEXT",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "TradeDetails",
      //   withoutLabel: true,
      //   hideInEmployee: true,
      //   //nextStep: "property-usage-type",
      //   nextStep: {
      //     TL_COMMON_YES: "accessories-details",
      //     TL_COMMON_NO: "know-your-property",
      //   },
      // },
      {
        isMandatory: true,
        type: "component",
        route: "accessories-details",
        key: "TradeDetails",
        component: "SelectAccessoriesDetails",
        texts: {
          headerCaption: "",
          header: "TL_TRADE_ACCESSORIES_HEADER",
          cardText: "TL_TRADE_ACCESSORIES_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "know-your-property",
        hideInEmployee: true,
      },
    ],
  },
  {
    head: "ES_NEW_APPLICATION_OWNERSHIP_DETAILS",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "owner-ship-details",
        isMandatory: true,
        component: "SelectOwnerShipDetails",
        texts: {
          headerCaption: "TL_TRADE_OWNERSHIP_CAPTION",
          header: "TL_PROVIDE_OWNERSHIP_DETAILS",
          cardText: "TL_PROVIDE_OWNERSHI_DETAILS_SUB_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "ownershipCategory",
        withoutLabel: true,
        nextStep: "owner-details",
      },
      {
        isMandatory: true,
        type: "component",
        route: "owner-details",
        key: "owners",
        component: "SelectOwnerDetails",
        texts: {
          headerCaption: "",
          header: "TL_OWNERSHIP_INFO_SUB_HEADER",
          cardText: "TL_OWNER_DETAILS_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        withoutLabel: true,
        nextStep: "owner-address",
        hideInEmployee: true,
      },
      // {
      //   type: "component",
      //   route: "owner-address",
      //   isMandatory: true,
      //   component: "SelectOwnerAddress",
      //   texts: {
      //     headerCaption: "TL_OWNERS_DETAILS",
      //     header: "TL_OWNERS_ADDRESS",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "owners",
      //   withoutLabel: true,
      //   nextStep: "proof-of-identity",
      //   hideInEmployee: true,
      // },
      /* {
          type: "component",
          component: "SelectAltContactNumber",
          key: "owners",
          withoutLabel: true,
          hideInEmployee: true,
        }, */
      // {
      //   type: "component",
      //   route: "proof-of-identity",
      //   isMandatory: true,
      //   component: "SelectProofIdentity",
      //   texts: {
      //     headerCaption: "TL_OWNERS_DETAILS",
      //     header: "TL_PROOF_IDENTITY_HEADER",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //     addMultipleText: "PT_COMMON_ADD_APPLICANT_LABEL",
      //   },
      //   key: "owners",
      //   withoutLabel: true,
      //   nextStep: "ownership-proof",
      //   hideInEmployee: true,
      // },
      // {
      //   type: "component",
      //   route: "ownership-proof",
      //   isMandatory: true,
      //   component: "SelectOwnershipProof",
      //   texts: {
      //     headerCaption: "TL_OWNERS_DETAILS",
      //     header: "TL_OWNERSHIP_DOCUMENT",
      //     cardText: "",
      //     submitBarLabel: "CS_COMMON_NEXT",
      //   },
      //   key: "owners",
      //   withoutLabel: true,
      //   nextStep: "proof",
      //   hideInEmployee: true,
      // },
      {
        type: "component",
        component: "TLOwnerDetailsEmployee",
        key: "owners",
        withoutLabel: true,
        hideInCitizen: true,
      },
      /* {
          type: "component",
          route: "inistitution-details",
          isMandatory: true,
          component: "SelectInistitutionOwnerDetails",
          texts: {
            headerCaption: "",
            header: "PT_INSTITUTION_DETAILS_HEADER",
            cardText: "PT_FORM3_HEADER_MESSAGE",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          nextStep: "institutional-owner-address",
          hideInEmployee: true,
        }, */
      /* {
          type: "component",
          route: "institutional-owner-address",
          isMandatory: true,
          component: "SelectOwnerAddress",
          texts: {
            headerCaption: "PT_OWNERS_DETAILS",
            header: "PT_OWNERS_ADDRESS",
            cardText: "",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          nextStep: "institutional-proof-of-identity",
          hideInEmployee: true,
        }, */
      /* {
          type: "component",
          route: "institutional-proof-of-identity",
          isMandatory: true,
          component: "SelectProofIdentity",
          texts: {
            headerCaption: "PT_OWNERS_DETAILS",
            header: "PT_PROOF_IDENTITY_HEADER",
            cardText: "",
            submitBarLabel: "PT_COMMON_NEXT",
          },
          key: "owners",
          withoutLabel: true,
          //nextStep: "",
          nextStep: null,
          hideInEmployee: true,
        }, */
      /*  {
          type: "component",
          component: "PTEmployeeOwnershipDetails",
          key: "owners",
          withoutLabel: true,
          hideInCitizen: true,
        }, */
    ],
  },
  {
    head: "",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "know-your-property",
        isMandatory: true,
        component: "CPTKnowYourProperty",
        texts: {
          header: "PT_DO_YOU_KNOW_YOUR_PROPERTY",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "knowyourproperty",
        isCreateEnabled: true,
        withoutLabel: true,
        nextStep: {
          TL_COMMON_YES: "search-property",
          TL_COMMON_NO: "create-property",
        },
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-property",
        isMandatory: true,
        component: "CPTSearchProperty",
        key: "cptsearchproperty",
        withoutLabel: true,
        nextStep: 'search-results',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "search-results",
        isMandatory: true,
        component: "CPTSearchResults",
        key: "cptsearchresults",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "create-property",
        isMandatory: true,
        component: "CPTCreateProperty",
        key: "cptcreateproperty",
        withoutLabel: true,
        isSkipEnabled: true,
        nextStep: 'acknowledge-create-property',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "acknowledge-create-property",
        isMandatory: true,
        component: "CPTAcknowledgement",
        key: "cptacknowledgement",
        withoutLabel: true,
        nextStep: 'property-details',
        hideInEmployee: true,
      },
      {
        type: "component",
        route: "property-details",
        isMandatory: true,
        component: "CPTPropertyDetails",
        key: "propertydetails",
        withoutLabel: true,
        nextStep: 'owner-ship-details',
        hideInEmployee: true,
      },
    ],
  },
  // {
  //   head: "ES_NEW_APPLICATION_DOCUMENTS_REQUIRED",
  //   body: [
  //     {
  //       component: "SelectDocuments",
  //       withoutLabel: true,
  //       key: "documents",
  //       type: "component",
  //     },
  //   ],
  // },
  {
    head: "TL_NEW_APPLICATION_DOCUMENTS_REQUIRED",
    body: [
      {
        component: "TLDocumentsEmployee",
        withoutLabel: true,
        key: "documents",
        type: "component",
        hideInCitizen: true
      },
    ],
  },
  {
    head: "ES_NEW_APPLICATION_PROPERTY_ASSESSMENT",
    body: [
      {
        isMandatory: true,
        type: "component",
        route: "pde-details",
      //  route: "test-details",
        key: "PDETradeDetails",
        component: "TLPdeEntry",
        texts: {
          headerCaption: "",
          header:"" ,//"TL_LICENSING_PDE_ENTRY_HEADER",
          cardText: "",
          submitBarLabel: "Save",
        },
        withoutLabel: true,
        hideInEmployee: true,
      },
    ]
  },

  {
    head: "New IFTE & OS License Application",
    body: [
      {
        type: "component",
        route: "mapnewtrade",
        component: "TLSelectGeolocation",
        nextStep: "license-unit-det",
        hideInEmployee: true,
        key: "TradeDetails",
        withoutLabel: true,
        texts: {
            header: "TL_GEOLOACTION_HEADER",
            // cardText: "TL_GEOLOCATION_TEXT",
            // nextText: "CS_COMMON_NEXT",
            submitBarLabel: "CS_COMMON_NEXT",
            skipAndContinueText: "CORE_COMMON_SKIP_CONTINUE"
        }
    },
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "license-unit-det",
        isMandatory: true,
        component: "TLLicenseUnitDet",
        texts: {
         // headerCaption:"New IFTE & OS License Application",
          header: "TL_LB_DET_LABEL",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: 'license-applicant-det',
      },
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "license-applicant-det",
        isMandatory: true,
        component: "TLLicenseApplicantDet",
        texts: {
          header: "Name and Address of Applicant",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: 'license-doc-det',
      },     
      
      {
        type: "component",
        route: "license-doc-det",
        isMandatory: true,
        component: "TLDocumentUpload",
        texts: {
          header: "",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep:null
      }
    ]
  }
  ,

  {
    head: "Search for Renewal",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "license-renewal-search",
        isMandatory: true,
        component: "renewalSearchTrade",
        texts: {
          header: "",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: '',
      }
    ]
  },
  {
    head: "New IFTE & OS License Application",
    body: [
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "licenserenewal-unit-det",
        isMandatory: true,
        component: "TLLicenseUnitDetRenewal",
        texts: {
          header: "TL_LB_DET_LABEL",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: 'licenserenewal-applicant-det',
      },
      {
        //if want to input index in url just pul @0 after route name owner-ship-details@0
        type: "component",
        route: "licenserenewal-applicant-det",
        isMandatory: true,
        component: "TLLicenseApplicantDetRenewal",
        texts: {
          header: "Name and Address of Applicant",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep: 'licenserenewal-doc-det',
      },     
      
      {
        type: "component",
        route: "licenserenewal-doc-det",
        isMandatory: true,
        component: "TLDocumentUpload",
        texts: {
          header: "",     ///"TL_TRADE_UNITS_HEADER",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        key: "TradeDetails",
        isCreateEnabled: true,
        withoutLabel: true,
        hideInEmployee: true,
        nextStep:null
      }
    ]
  }
  ,
];
