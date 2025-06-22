"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef } from "react";
import styles from "../styles/RegisterFacilityPage3copy.module.css";

type Props = {
  onNext: () => void;
};

export default function FacilitySignup3({ onNext }: Props) {
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    string | null
  >(null);
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: string | null;
  }>({
    businessRegistration: null,
    governmentId: null,
    facilityPhotos: null,
    serviceLicenses: null,
    proofOfAddress: null,
    taxDocuments: null,
    insuranceCompliance: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const documentTypes = [
    { key: "businessRegistration", label: "Business Registration" },
    { key: "governmentId", label: "Valid Government-issued ID" },
    { key: "facilityPhotos", label: "Facility Photos" },
    { key: "serviceLicenses", label: "Service Licenses / Certifications" },
    { key: "proofOfAddress", label: "Proof of Address" },
    { key: "taxDocuments", label: "Tax Documents" },
    { key: "insuranceCompliance", label: "Insurance or Safety Compliance" },
  ];

  const router = useRouter();

  const handleDocumentClick = (docType: string) => {
    setSelectedDocumentType(docType);
    setShowError(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDocumentType) {
      setUploadedFiles((prev) => {
        const updated = {
          ...prev,
          [selectedDocumentType]: file.name,
        };
        if (Object.values(updated).every((name) => name)) {
          setShowError(false);
        }
        return updated;
      });
      setSelectedDocumentType(null);
    }
  };

  const allFilesUploaded = Object.values(uploadedFiles).every(
    (fileName) => fileName !== null
  );

  const handleNextClick = () => {
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 200);

    if (!allFilesUploaded) {
      setShowError(true);
    } else {
      setShowError(false);
      console.log("All files uploaded, proceeding to next step");
      onNext();
    }
  };

  return (
    <div className={styles.documents2}>
      <div className={styles.documentsDescrip}>
        <div className={styles.documentsDescrip1}>
          <div className={styles.submitDocumentsNeeded}>
            Submit documents needed for verification. All information is handled
            securely and used solely to confirm your eligibility.
          </div>
          <div className={styles.allFieldsRequired}>
            All fields required unless noted.
          </div>
        </div>
      </div>
      <div className={styles.uploadFiles}>
        <b className={styles.uploadFilesText}>Upload files</b>
        {selectedDocumentType && (
          <>
            <div
              className={styles.uploadPhoto}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={styles.upload}>
                <Image
                  className={styles.fileAddIcon}
                  width={30}
                  height={30}
                  sizes="100vw"
                  alt=""
                  src="/file-add.svg"
                />
                <div className={styles.clickToUpload}>
                  {uploadedFiles[selectedDocumentType] ?? "Click to upload"}
                </div>
              </div>
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.documentsType}>
              <div className={styles.pdf}>
                <div className={styles.pdf1}>PDF</div>
              </div>
              <div className={styles.pdf}>
                <div className={styles.pdf1}>PNG</div>
              </div>
              <div className={styles.pdf}>
                <div className={styles.pdf1}>JPG</div>
              </div>
              <div className={styles.pdf}>
                <div className={styles.pdf1}>JPEG</div>
              </div>
              <div className={styles.pdf6}>
                <div className={styles.pdf1}>{`> 10 MB`}</div>
              </div>
            </div>
          </>
        )}
        {documentTypes.map((docType) => {
          const isSelected = selectedDocumentType === docType.key;
          return (
            <div
              key={docType.key}
              className={`${styles.businessRegis} ${
                isSelected ? styles.selected : ""
              } ${
                showError && !uploadedFiles[docType.key]
                  ? styles.uploadErrorBox
                  : ""
              }`}
              onClick={() => handleDocumentClick(docType.key)}
            >
              <div className={styles.document1}>
                <b className={styles.uploadFilesText}>{docType.label}</b>
                <div
                  className={
                    uploadedFiles[docType.key]
                      ? styles.uploadComplete
                      : showError
                      ? styles.uploadIncompleteError
                      : styles.uploadComplete
                  }
                >
                  {uploadedFiles[docType.key]
                    ? "Upload complete"
                    : showError
                    ? "Upload incomplete"
                    : "Upload"}
                </div>
              </div>
              <Image
                className={styles.docuncheckedIcon}
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src={
                  uploadedFiles[docType.key]
                    ? "/docuChecked.svg"
                    : "/docUnchecked.svg"
                }
              />
            </div>
          );
        })}
      </div>
      <div className={styles.buttonSection}>
        <div
          className={`${styles.errorbox} ${
            showError ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.errorMessage}>
            Please upload all required documents before continuing.
          </div>
        </div>
        <div
          className={`${styles.buttoncontainer} ${
            allFilesUploaded ? styles.buttoncontainerActive : ""
          } ${buttonClicked ? styles.clicked : ""}`}
          onClick={handleNextClick}
        >
          <div className={styles.next}>
            <div className={styles.uploadFilesText}>Next</div>
          </div>
        </div>
      </div>
    </div>
  );
}
