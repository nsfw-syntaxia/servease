import type { NextPage } from 'next';
import Image from "next/image";
import styles from "../styles/RegisterPage3.module.css";


const ClientSignup3:NextPage = () => {
  	return (
    		<div className={styles.clientSignup3}>
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
        				<Image className={styles.outlineArrowsArrowLeft} width={24} height={24} sizes="100vw" alt="" src="Arrow Left.svg" />
        				<div className={styles.back}>Back</div>
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
            						<div className={styles.frameWrapper}>
              							<div className={styles.frameContainer}>
                								<div className={styles.numberWrapper}>
                  									<div className={styles.number}>
                    										<div className={styles.groupDiv}>
                      											<div className={styles.bg3} />
                      											<div className={styles.div3}>2</div>
                    										</div>
                    										<div className={styles.contactInformation}>Contact Information</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className={styles.frameGroup}>
              							<div className={styles.frameParent1}>
                								<div className={styles.numberParent}>
                  									<div className={styles.number2}>
                    										<div className={styles.groupDiv}>
                      											<div className={styles.bg3} />
                      											<div className={styles.div3}>3</div>
                    										</div>
                    										<div className={styles.contactInformation}>Login</div>
                  									</div>
                  									<div className={styles.setUpYour}>Set up your login credential to keep your account secure. We'll send a one-time link to confirm it’s really you.</div>
                    										<div className={styles.allFieldsRequired}>*All fields required unless noted.</div>
                  									</div>
                  									<div className={styles.textField}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>*Email address</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                  									<div className={styles.textField2}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>*Password</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                  									<Image className={styles.icon} width={30} height={25} sizes="100vw" alt="" src="Icon.svg" />
                  									<Image className={styles.icon1} width={30} height={25} sizes="100vw" alt="" src="Icon.svg" />
                  									<div className={styles.textField4}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>*Confirm Password</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                								</div>
                								<div className={styles.button2}>
                  									<div className={styles.signUpWrapper}>
                    										<div className={styles.webDesigns}>Sign Up</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>);
      			};
      			
      			export default ClientSignup3;
      			