import type { NextPage } from 'next';
import Image from "next/image";
import styles from "../styles/RegisterPage1.module.css";


const ClientSignup1:NextPage = () => {
  	return (
    		<div className={styles.clientSignup1}>
      			<div className={styles.headerNavParent}>
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
          					<Image className={styles.outlineArrowsArrowLeft} width={24} height={24} sizes="100vw" alt="" src="/Arrow Left.svg" />
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
              							<div className={styles.frameGroup}>
                								<div className={styles.frameContainer}>
                  									<div className={styles.numberParent}>
                    										<div className={styles.number}>
                      											<div className={styles.groupDiv}>
                        												<div className={styles.bg3} />
                        												<div className={styles.div3}>1</div>
                      											</div>
                      											<div className={styles.contactInformation}>Profile</div>
                    										</div>
                    										<div className={styles.tellUsA}>Tell us a bit about yourself so we can personalize your experience.</div>
                    										<div className={styles.allFieldsRequired}>*All fields required unless noted.</div>
                  									</div>
                  									<div className={styles.textField}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>*First name</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                  									<div className={styles.textField}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>Middle name (as applicable)</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                  									<div className={styles.textField}>
                    										<div className={styles.labelWrapper}>
                      											<div className={styles.label}>*Last name</div>
                    										</div>
                    										<div className={styles.textField1} />
                  									</div>
                  									<div className={styles.gender}>
                    										<div className={styles.webDesigns}>What’s your gender? (optional)</div>
                      											<div className={styles.radioButtonParent}>
                        												<div className={styles.radioButton}>
                          													<div className={styles.radioButton1}>
                            														<Image className={styles.vectorIcon} width={16} height={16} sizes="100vw" alt="" src="Vector.svg" />
                            														<Image className={styles.vectorIcon1} width={13.3} height={13.3} sizes="100vw" alt="" src="Vector.svg" />
                          													</div>
                          													<div className={styles.webDesigns}>Female</div>
                        												</div>
                        												<div className={styles.radioButton}>
                          													<div className={styles.radioButton1}>
                            														<Image className={styles.vectorIcon} width={16} height={16} sizes="100vw" alt="" src="Vector.svg" />
                            														<Image className={styles.vectorIcon1} width={13.3} height={13.3} sizes="100vw" alt="" src="Vector.svg" />
                          													</div>
                          													<div className={styles.webDesigns}>Male</div>
                        												</div>
                        												<div className={styles.radioButton}>
                          													<div className={styles.radioButton1}>
                            														<Image className={styles.vectorIcon} width={16} height={16} sizes="100vw" alt="" src="Vector.svg" />
                            														<Image className={styles.vectorIcon1} width={13.3} height={13.3} sizes="100vw" alt="" src="Vector.svg" />
                          													</div>
                          													<div className={styles.webDesigns}>Non-binary</div>
                        												</div>
                      											</div>
                      											</div>
                      											<div className={styles.gender}>
                        												<div className={styles.webDesigns}>What’s your date of borth?</div>
                          													<div className={styles.textFieldParent}>
                            														<div className={styles.textField6}>
                              															<div className={styles.labelWrapper}>
                                																<div className={styles.label}>Month</div>
                              															</div>
                              															<div className={styles.textField1}>
                                																<div className={styles.icons}>
                                  																	<Image className={styles.vectorIcon} width={24} height={24} sizes="100vw" alt="" src="Vector.svg" />
                                  																	<Image className={styles.vectorIcon7} width={12} height={7.4} sizes="100vw" alt="" src="Vector.svg" />
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.textField8}>
                              															<div className={styles.labelWrapper}>
                                																<div className={styles.label}>Date</div>
                              															</div>
                              															<div className={styles.textField1}>
                                																<div className={styles.icons}>
                                  																	<Image className={styles.vectorIcon} width={24} height={24} sizes="100vw" alt="" src="Vector.svg" />
                                  																	<Image className={styles.vectorIcon7} width={12} height={7.4} sizes="100vw" alt="" src="Vector.svg" />
                                																</div>
                              															</div>
                            														</div>
                            														<div className={styles.textField8}>
                              															<div className={styles.labelWrapper}>
                                																<div className={styles.label}>Year</div>
                              															</div>
                              															<div className={styles.textField1}>
                                																<div className={styles.icons}>
                                  																	<Image className={styles.vectorIcon} width={24} height={24} sizes="100vw" alt="" src="Vector.svg" />
                                  																	<Image className={styles.vectorIcon7} width={12} height={7.4} sizes="100vw" alt="" src="Vector.svg" />
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                          													</div>
                          													</div>
                          													<div className={styles.button2}>
                            														<div className={styles.signUpWrapper}>
                              															<div className={styles.webDesigns}>Next</div>
                            														</div>
                          													</div>
                          													</div>
                          													<div className={styles.frameWrapper}>
                            														<div className={styles.frameWrapper1}>
                              															<div className={styles.numberWrapper}>
                                																<div className={styles.number1}>
                                  																	<div className={styles.groupDiv}>
                                    																		<div className={styles.bg3} />
                                    																		<div className={styles.div3}>2</div>
                                  																	</div>
                                  																	<div className={styles.contactInformation}>Contact Information</div>
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className={styles.frameWrapper}>
                            														<div className={styles.frameWrapper1}>
                              															<div className={styles.numberWrapper}>
                                																<div className={styles.number1}>
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
                          													</div>
                          													</div>);
                        												};
                        												
                        												export default ClientSignup1;
                        												