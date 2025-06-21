"use client";
import Image from "next/image";
import styles from "../styles/RegisterFacilityPage1.module.css";

const FacilitySignup = () => {
  return (
    <div className={styles.facilitySignup1}>
      <div className={styles.headerNav}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="Servease Logo.svg"
        />
        <Image
          className={styles.outlineArrowsArrowLeft}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="Arrow Left.svg"
        />
        <div className={styles.back}>Back</div>
      </div>
      <div className={styles.joinUs}>
        <div className={styles.conten}>
          <div className={styles.joinUsParent}>
            <div className={styles.joinUs1}>Join us</div>
            <div className={styles.signUpAnd}>
              Sign up and get connected with the clients.
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
            <div className={styles.groupContainer}>
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
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>1</div>
                    </div>
                    <div className={styles.contactInformation}>Profile</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
                      <div className={styles.bg4} />
                      <div className={styles.div4}>2</div>
                    </div>
                    <div className={styles.contactInformation}>Documents</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
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
            <div className={styles.frameWrapper1}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number1}>
                    <div className={styles.bgParent1}>
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

export default FacilitySignup;
