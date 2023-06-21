import { CardLabel, CardLabelDesc, FormStep, UploadFile, FormInputGroup, RemoveableTag,Dropdown } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/DFMTimeline";

const containerStyle ={
  display: "flex",
  flexWrap: "unset",
}
const DFMDocumentDetails = ({ t, config, onSelect, userType, formData }) => {

  const [termsCheck, setTermsCheck] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: DocumentType = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "IdProof");
  const [DocumentTypeList, setDocumentTypeList] = useState(formData?.DocumentDet?.DocumentTypeList);
  const [uploadedFile, setUploadedFile] = useState(formData?.DocumentDet?.fileStoreId || null);
  const [file, setFile] = useState(formData?.DocumentDet?.OwnerPhotoProof);
  const [error, setError] = useState(null);
  const [fileLimit, setFileLimit] = useState(0);
  const [uploadFiles, setUploadFiles] = useState([]);
  // console.log(formData);
  let cmbDocumentType = [];
  DocumentType &&
    DocumentType["common-masters"] &&
    DocumentType["common-masters"].IdProof.map((ob) => {
      cmbDocumentType.push(ob);
    });

  function setSelectedDocumentTypeList(value) {
    setDocumentTypeList(value);
  }
  // console.log('upload', uploadFiles);
  const handleChange = (text, type) => {
    // let tempData = { ...documentDetails };
    // if (type === "documentType") {
    //   tempData.documentType = text;
    //   setDocumentDetails(tempData);
    // }
    // if (type === "checkbox") {
    //   setTermsCheck(text);
    //   if (documentDetails.fileStoreId && documentDetails.documentType?.code) {
    //     setFileCheck(true);
    //   }
    //   if (!text) {
    //     setFileCheck(false);
    //   }
    // }
  };
  const handleSubmit = () => {
    let fileStoreId = uploadedFile;
    let fileDetails = file;
    // if (fileDetails) fileDetails.documentType = "OWNERPHOTO";
    // if (fileDetails) fileDetails.fileStoreId = fileStoreId ? fileStoreId : null;
    // let owners = formData?.owners;
    // if (owners && owners.documents) {
    //   owners.documents["OwnerPhotoProof"] = fileDetails;
    // } else {
    //   owners["documents"] = [];
    //   owners.documents["OwnerPhotoProof"] = fileDetails;
    // }
    onSelect(config.key, owners);
    // onSelect(config.key, { specialProofIdentity: fileDetails }, "", index);
  };
  const goNext = () => {
    sessionStorage.setItem("DocumentTypeList", DocumentTypeList ? DocumentTypeList.code : null);
    onSelect(config.key, { file, DocumentTypeList });

  }
  const onSkip = () => onSelect();

  function selectfile(e) {
    let uploadDocuments = []
    setUploadedFile(null);
    // console.log(e.target.files[0]);
    uploadDocuments.push(e.target.files[0])
    setFile((file) => [...file, uploadDocuments]);
    // setFile(e.target.files[0]);
  }


  useEffect(() => {
    (async () => {
      setError(null);
      if (file && file?.type) {
        if (!(acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`))) {
          setError(t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"));
        }
        else if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file]);

  const handleFileEvent = (e) => {
    const chooseFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chooseFiles)
  }
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadFiles]
    let limitExceed = false
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
      if (uploaded.length === 5) setFileLimit(true)
      if (uploaded.length > 5) {
        setFileLimit(false)
        limitExceed = true
        return true;
      }
    })
    if (!limitExceed) setUploadFiles(uploaded)
  }
  const onRemoved = (index, key) => {
    let afterRemove = uploadFiles?.filter((value, i) => {
      return i !== index;
    });
    setUploadFiles(afterRemove);
  };
  // console.log(afterRemove);
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}

      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} >

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_DOCUMENT_DETAILS_TEXT")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>{`${t("DFM_DOCUMENT_TYPE")}`}</CardLabel>
              <Dropdown

                t={t}
                optionKey="name"
                isMandatory={config.isMandatory}
                option={cmbDocumentType}
                selected={DocumentTypeList}
                placeholder={`${t("DFM_DOCUMENT_TYPE")}`}
                select={setSelectedDocumentTypeList}
              />
            </div>

            <div className="col-md-8">
              <CardLabel>{`${t("DFM_ATTACH_DOCUMENT")}`}</CardLabel>
              <UploadFile
                id={"tl-doc"}
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={handleFileEvent}
                // onUpload={selectfile}
                onDelete={() => {
                  setUploadedFile(null);
                }}
                message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                error={error}
              />
              <div className="tag-container" style={containerStyle}>

                {uploadFiles?.length > 0 &&
                  uploadFiles?.map((value, index) => {
                    return <RemoveableTag key={index} text={`${t(value["name"]).slice(0, 22)} ...`} onClick={() => onRemoved(index, value)} />;
                  })}
              </div>
              {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
              <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <div className="Common_terms_checkbox">
                <div className="input-checkbox">
                  <input className="" type="checkbox" onClick={(e) => handleChange(e.target.checked, "checkbox")} />
                  <label>{`${t("DFM_DECLARE_LABEL")}`}</label>
                </div>
              </div>
              {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
              <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
            </div>
          </div>
        </div> */}
      </FormStep>
    </React.Fragment>
  );
};

export default DFMDocumentDetails;
