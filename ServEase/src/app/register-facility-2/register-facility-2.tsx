import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/register-facility-2.module.css";

const FacilityRegister2: NextPage = () => {
  return (
    <div className={styles.facilitySignup2}>
      <div className={styles.headerNav}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="Servease Logo (Album Cover) (3) 1.png"
        />
        <div className={styles.links}>
          <div className={styles.home}>Home</div>
          <div className={styles.webDesigns}>Web designs</div>
          <div className={styles.webDesigns}>Mobile designs</div>
          <div className={styles.webDesigns}>Design principles</div>
          <div className={styles.webDesigns}>Illustrations</div>
        </div>
        <div className={styles.loginSignUp}>
          <div className={styles.dropdown} />
          <div className={styles.button} />
          <div className={styles.button} />
        </div>
        <div className={styles.divider} />
        <Image
          className={styles.outlineArrowsArrowLeft}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="Outline / Arrows / Arrow Left.svg"
        />
        <div className={styles.back}>Back</div>
      </div>
      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>
              Sign up and get connected with trusted professionals.
            </div>
          </div>
          <div className={styles.stepper}>
            <div className={styles.groupParent}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>1</div>
              </div>
              <div className={styles.profile}>Profile</div>
            </div>
            <div className={styles.stepperChild} />
            <div className={styles.groupContainer}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>2</div>
              </div>
              <div className={styles.profile}>Documents</div>
            </div>
            <div className={styles.stepperChild} />
            <div className={styles.frameDiv}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>3</div>
              </div>
              <div className={styles.profile}>Contacts</div>
            </div>
            <div className={styles.stepperChild} />
            <div className={styles.groupParent1}>
              <div className={styles.bgParent}>
                <div className={styles.bg} />
                <div className={styles.div}>4</div>
              </div>
              <div className={styles.profile}>Login</div>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.elementsIcon}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>1</div>
                    </div>
                    <div className={styles.contactInformation}>Profile</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameGroup}>
              <div className={styles.frameWrapper1}>
                <div className={styles.numberParent}>
                  <div className={styles.number1}>
                    <div className={styles.elementsIcon}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>2</div>
                    </div>
                    <div className={styles.contactInformation}>Documents</div>
                  </div>
                  <div className={styles.submitDocumentsNeeded}>
                    Submit documents needed for verification. All information is
                    handled securely and used solely to confirm your
                    eligibility.
                  </div>
                  <div className={styles.allFieldsRequired}>
                    All fields required unless noted.
                  </div>
                </div>
              </div>
              <div className={styles.uploadPhotos}>
                <b className={styles.webDesigns}>Upload files</b>
                <div className={styles.uplodPhoto}>
                  <div className={styles.imagePlusParent}>
                    <Image
                      className={styles.imagePlusIcon}
                      width={46}
                      height={46}
                      sizes="100vw"
                      alt=""
                      src="image-plus.svg"
                    />
                    <b className={styles.uploadPhoto}>Upload photo</b>
                  </div>
                  <div className={styles.fileAddParent}>
                    <Image
                      className={styles.fileAddIcon}
                      width={30}
                      height={30}
                      sizes="100vw"
                      alt=""
                      src="file-add.svg"
                    />
                    <div className={styles.clickToUpload}>Click to upload</div>
                  </div>
                </div>
                <div className={styles.pdfParent}>
                  <div className={styles.pdf}>
                    <div className={styles.pdf1}>PDF</div>
                  </div>
                  <div className={styles.pdf}>
                    <div className={styles.pdf1}>DOCX</div>
                  </div>
                  <div className={styles.pdf}>
                    <div className={styles.pdf1}>TXT</div>
                  </div>
                  <div className={styles.pdf6}>
                    <div className={styles.pdf1}>{`> 10 MB`}</div>
                  </div>
                </div>
                <div className={styles.uploadPhotosChild} />
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>Business Registration</b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>
                      Valid Government-issued ID
                    </b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>Facility Photos</b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>
                      Service Licenses / Certifications
                    </b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>Proof of Address</b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>Tax Documents</b>
                    <div className={styles.upload}>Upload</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
                <div className={styles.frameParent1}>
                  <div className={styles.businessRegistrationParent}>
                    <b className={styles.webDesigns}>
                      Insurance or Safety Compliance
                    </b>
                    <div className={styles.upload}>Upload complete</div>
                  </div>
                  <Image
                    className={styles.elementsIcon}
                    width={24}
                    height={24}
                    sizes="100vw"
                    alt=""
                    src="elements.svg"
                  />
                </div>
              </div>
              <div className={styles.button2}>
                <div className={styles.signUpWrapper}>
                  <div className={styles.webDesigns}>Next</div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.elementsIcon}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>3</div>
                    </div>
                    <div className={styles.contactInformation}>
                      Contact Information
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameContainer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.elementsIcon}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>4</div>
                    </div>
                    <div className={styles.contactInformation}>Login</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityRegister2;
