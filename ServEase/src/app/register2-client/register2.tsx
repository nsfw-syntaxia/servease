import type { NextPage } from 'next';
import Image from "next/image";
import styles from "../styles/RegisterPage2.module.css";


const ClientSignup2:NextPage = () => {
  	return (
    		<div className={styles.clientSignup2}>
      			<div className={styles.headerNav}>
        				<Image className={styles.serveaseLogoAlbumCover3} width={40} height={40} sizes="100vw" alt="" src="/servease logo.svg" />
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
      			</div>
      			<div className={styles.joinUs}>
        				<div className={styles.conten}>
          					<div className={styles.joinUsParent}>
            						<div className={styles.joinUs1}>Join us</div>
            						<div className={styles.signUpAnd}>Sign up and get connected with trusted professionals.</div>
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
              							<div className={styles.profile}>Contacts</div>
            						</div>
            						<div className={styles.stepperChild} />
            						<div className={styles.frameDiv}>
              							<div className={styles.bgParent}>
                								<div className={styles.bg} />
                								<div className={styles.div}>3</div>
              							</div>
              							<div className={styles.profile}>Login</div>
            						</div>
          					</div>
          					<div className={styles.frameParent}>
            						<div className={styles.frameWrapper}>
              							<div className={styles.frameContainer}>
                								<div className={styles.numberWrapper}>
                  									<div className={styles.number}>
                    										<div className={styles.groupDiv}>
                      											<div className={styles.bg3} />
                      											<div className={styles.div3}>1</div>
                    										</div>
                    										<div className={styles.contactInformation}>Profile</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.frameGroup}>
              							<div className={styles.frameParent1}>
                								<div className={styles.numberParent}>
                  									<div className={styles.number1}>
                    										<div className={styles.groupDiv}>
                      											<div className={styles.bg3} />
                      											<div className={styles.div3}>2</div>
                    										</div>
                    										<div className={styles.contactInformation}>Contact Information</div>
                  									</div>
                  									<div className={styles.provideYourPhone}>Provide your phone number so we can confirm your bookings and verify your account.</div>
                  									<div className={styles.allFieldsRequired}>*All fields required unless noted.</div>
                								</div>
                								<div className={styles.cardInput}>
                  									<div className={styles.labelParent}>
                    										<div className={styles.label}>*Phone number</div>
                    										<div className={styles.passwordHideSee}>
                      											<div className={styles.icon}>
                        												<Image className={styles.iconChild} width={18.2} height={16} sizes="100vw" alt="" src="Group 1.svg" />
                      											</div>
                      											<div className={styles.hide}>Hide</div>
                    										</div>
                  									</div>
                  									<div className={styles.inputButton}>
                    										<div className={styles.input}>
                      											<div className={styles.select}>
                        												<Image className={styles.phPhilippinesIcon} width={33} height={24} sizes="100vw" alt="" src="ph Philippines.svg" />
                      											</div>
                      											<div className={styles.webDesigns}>(+63)</div>
                      											<div className={styles.div6}>963 469 4776</div>
                    										</div>
                    										<div className={styles.button2}>
                      											<div className={styles.sendCode}>Send Code</div>
                    										</div>
                  									</div>
                								</div>
                								<Image className={styles.frameChild} width={611} height={1.5} sizes="100vw" alt="" src="Line 15.svg" />
                								<div className={styles.form}>
                  									<div className={styles.resendCode}>
                    										<div className={styles.time}>
                      											<Image className={styles.outlineTimeClockCircle} width={20} height={20} sizes="100vw" alt="" src="Outline / Time / Clock Circle.svg" />
                      											<div className={styles.div7}>00 : 45</div>
                    										</div>
                    										<div className={styles.resendCode1}>Resend Code</div>
                  									</div>
                  									<div className={styles.inputs}>
                    										<div className={styles.list}>
                      											<div className={styles.input1} />
                      											<div className={styles.input2} />
                      											<div className={styles.input2} />
                      											<div className={styles.input2} />
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.button3}>
                								<div className={styles.signUpWrapper}>
                  									<div className={styles.webDesigns}>Next</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.frameWrapper}>
              							<div className={styles.frameContainer}>
                								<div className={styles.numberWrapper}>
                  									<div className={styles.number}>
                    										<div className={styles.groupDiv}>
                      											<div className={styles.bg3} />
                      											<div className={styles.div3}>3</div>
                    										</div>
                    										<div className={styles.contactInformation}>Login</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
      			<Image className={styles.outlineArrowsArrowLeft} width={24} height={24} sizes="100vw" alt="" src="Outline / Arrows / Arrow Left.svg" />
      			<div className={styles.back}>Back</div>
    		</div>);
};

export default ClientSignup2;
