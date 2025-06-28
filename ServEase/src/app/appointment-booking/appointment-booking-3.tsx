import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.css";

const Booking2: NextPage = () => {
  return (
    <div className={styles.booking2}>
      <div className={styles.joinUsWrapper}>
        <div className={styles.joinUs}>
          <div className={styles.joinUsChild} />
          <div className={styles.appointmentBookingParent}>
            <b className={styles.appointmentBooking}>Appointment Booking</b>
            <div className={styles.chooseAService}>
              Choose a service, pick a time, and book in just a few clicks.
            </div>
            <div className={styles.stepper}>
              <div className={styles.groupParent}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>1</div>
                </div>
                <div className={styles.service}>Service</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.groupContainer}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>2</div>
                </div>
                <div className={styles.service}>{`Date &Time`}</div>
              </div>
              <div className={styles.stepperChild} />
              <div className={styles.frameDiv}>
                <div className={styles.bgParent}>
                  <div className={styles.bg} />
                  <div className={styles.div}>3</div>
                </div>
                <div className={styles.service}>Review</div>
              </div>
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
                    <div className={styles.chooseServices}>
                      Choose Service(s)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameGroup}>
              <div className={styles.numberParent}>
                <div className={styles.number1}>
                  <div className={styles.groupDiv}>
                    <div className={styles.bg3} />
                    <div className={styles.div3}>2</div>
                  </div>
                  <div
                    className={styles.chooseServices}
                  >{`Select Date & Time`}</div>
                </div>
                <div className={styles.pickAConvenient}>
                  Pick a convenient date and time for your appointment.
                  Available slots are based on real-time provider availability
                  to help you schedule with ease.
                </div>
                <div
                  className={styles.atLeastChoose}
                >{`*At least choose one date tayo :> `}</div>
              </div>
              <div className={styles.button}>
                <div className={styles.signUpWrapper}>
                  <div className={styles.signUp}>Next</div>
                </div>
              </div>
              <div className={styles.frameChild} />
              <div className={styles.calendarSelectChangeSize}>
                <div className={styles.calendar}>
                  <div className={styles.header}>
                    <div className={styles.month}>
                      <div className={styles.arrowButton}>
                        <Image
                          className={styles.icon}
                          width={24}
                          height={24}
                          sizes="100vw"
                          alt=""
                          src="Icon.svg"
                        />
                      </div>
                      <div className={styles.month1}>
                        <b className={styles.month2}>January</b>
                        <div className={styles.year}>2024</div>
                      </div>
                      <div className={styles.arrowButton}>
                        <Image
                          className={styles.icon1}
                          width={24}
                          height={24}
                          sizes="100vw"
                          alt=""
                          src="Icon.png"
                        />
                      </div>
                    </div>
                    <div className={styles.separator} />
                    <div className={styles.week}>
                      <div className={styles.mon}>MO</div>
                      <div className={styles.mon}>TU</div>
                      <div className={styles.mon}>WE</div>
                      <div className={styles.mon}>TH</div>
                      <div className={styles.mon}>FR</div>
                      <div className={styles.mon}>SA</div>
                      <div className={styles.mon}>SU</div>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.row}>
                      <div className={styles.dayStates}>
                        <div className={styles.day}>
                          <div className={styles.background} />
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day}>
                          <div className={styles.background} />
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day}>
                          <div className={styles.background} />
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day}>
                          <div className={styles.background} />
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day}>
                          <div className={styles.background} />
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date}>1</div>
                          <div className={styles.price}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date}>2</div>
                          <div className={styles.price}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date}>3</div>
                          <div className={styles.price}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date}>4</div>
                          <div className={styles.price}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date}>5</div>
                          <div className={styles.price}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates10}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>6</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>7</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>8</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>9</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.row2}>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>10</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>11</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>12</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>13</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>14</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>15</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>16</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.row2}>
                      <div className={styles.dayStates21}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>17</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>18</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates23}>
                        <div className={styles.day5}>
                          <div className={styles.background23} />
                          <b className={styles.date18}>19</b>
                          <div className={styles.price18}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background24} />
                          <div className={styles.date5}>20</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background24} />
                          <div className={styles.date5}>21</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates}>
                        <div className={styles.day5}>
                          <div className={styles.background24} />
                          <div className={styles.date5}>22</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates23}>
                        <div className={styles.day5}>
                          <div className={styles.background23} />
                          <b className={styles.date18}>23</b>
                          <div className={styles.price18}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.row2}>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>24</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>25</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>26</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>27</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates11}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>28</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>29</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.dayStates12}>
                        <div className={styles.day5}>
                          <div className={styles.background} />
                          <div className={styles.date5}>30</div>
                          <div className={styles.price5}>
                            <span>123</span>
                            <span className={styles.span}>€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonParent}>
                <div className={styles.button1}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 1</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.button2}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 2</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.button3}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 3</div>
                  <div className={styles.star} />
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <div className={styles.button1}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 1</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.button2}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 2</div>
                  <div className={styles.star} />
                </div>
                <div className={styles.button3}>
                  <div className={styles.star} />
                  <div className={styles.service1}>Service 3</div>
                  <div className={styles.star} />
                </div>
              </div>
              <div className={styles.timeslots}>Timeslots</div>
              <div className={styles.date30}>Date</div>
              <div className={styles.textField}>
                <div className={styles.inputs}>
                  <div className={styles.inputsChild} />
                </div>
                <div className={styles.errorMessage}>Error Message</div>
                <div className={styles.icons} />
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameWrapper2}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>
                    <div className={styles.groupDiv}>
                      <div className={styles.bg3} />
                      <div className={styles.div3}>3</div>
                    </div>
                    <div className={styles.chooseServices}>Booking Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paraContent} />
          <div className={styles.navigation}>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="Servease Logo (Album Cover) (3) 1.png"
            />
            <div className={styles.servease}>
              <span className={styles.serv}>serv</span>
              <b>ease</b>
            </div>
            <div className={styles.navigationChild} />
            <div className={styles.homeParent}>
              <div className={styles.home}>Home</div>
              <div className={styles.home}>Discover</div>
              <div className={styles.contactUs}>Contact Us</div>
            </div>
            <div className={styles.navigationItem} />
            <div className={styles.genericAvatar}>
              <Image
                className={styles.avatarPlaceholderIcon}
                width={28.2}
                height={25.6}
                sizes="100vw"
                alt=""
                src="Avatar Placeholder.svg"
              />
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerChild} />
            <div className={styles.yourTrustedPlatform}>
              Your trusted platform to discover, book, and manage local
              services—anytime, anywhere.
            </div>
            <b className={styles.contactUs1}>Contact Us</b>
            <div className={styles.supportserveasecom}>
              support@servease.com
            </div>
            <div className={styles.contactNumber}>// contact number</div>
            <b className={styles.support}>Support</b>
            <div className={styles.faqs}>FAQs</div>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
            <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
            <div className={styles.aboutUs}>About Us</div>
            <b className={styles.quickLinks}>Quick Links</b>
            <b className={styles.servease1}>servease</b>
            <div className={styles.home1}>Home</div>
            <div className={styles.discover1}>Discover</div>
            <div className={styles.createAnAccount}>Create an Account</div>
            <div className={styles.facebookParent}>
              <div className={styles.facebook}>Facebook</div>
              <Image
                className={styles.groupChild}
                width={22}
                height={22}
                sizes="100vw"
                alt=""
                src="Frame 1.svg"
              />
            </div>
            <div className={styles.twitterParent}>
              <div className={styles.twitter}>Twitter</div>
              <Image
                className={styles.groupItem}
                width={26}
                height={22}
                sizes="100vw"
                alt=""
                src="Frame 2.svg"
              />
            </div>
            <div className={styles.instagramParent}>
              <div className={styles.instagram}>Instagram</div>
              <Image
                className={styles.groupInner}
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="Frame 3.svg"
              />
            </div>
            <div className={styles.lineParent}>
              <div className={styles.lineDiv} />
              <div className={styles.servease2025}>
                servease 2025 © All rights reserved
              </div>
            </div>
            <Image
              className={styles.serveaseLogoAlbumCover31}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="Servease Logo (Album Cover) (3) 2.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking2;
