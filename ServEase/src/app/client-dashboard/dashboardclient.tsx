"use client";

import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/dashboard-client.module.css";

const DashboardClient: NextPage = () => {
  return (
    <div className={styles.dashboardClient}>
      <div className={styles.joinUsWrapper}>
        <div className={styles.joinUs}>
          <div className={styles.joinUsChild} />
          <div className={styles.paraContent} />
          <div className={styles.footer}>
            <div className={styles.footerChild} />
            <div className={styles.yourTrustedPlatform}>
              Your trusted platform to discover, book, and manage local
              services—anytime, anywhere.
            </div>
            <b className={styles.contactUs}>Contact Us</b>
            <div className={styles.supportserveasecom}>
              support@servease.com
            </div>
            <div className={styles.div}>+63 996 3175 214</div>
            <b className={styles.support}>Support</b>
            <div className={styles.faqs}>FAQs</div>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
            <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
            <div className={styles.aboutUs}>About Us</div>
            <b className={styles.quickLinks}>Quick Links</b>
            <b className={styles.servease}>servease</b>
            <div className={styles.home}>Home</div>
            <div className={styles.discover}>Discover</div>
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
                src="/Frame 2.svg"
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
                src="/Frame 3.svg"
              />
            </div>
            <div className={styles.lineParent}>
              <div className={styles.lineDiv} />
              <div className={styles.servease2025}>
                servease 2025 © All rights reserved
              </div>
            </div>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/Servease Logo (Album Cover) (3) 2.png"
            />
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImage}>
              <div className={styles.bookAn}>Book an</div>
              <div className={styles.appointment}>Appointment</div>
              <Image
                className={styles.heroImageChild}
                width={95}
                height={15}
                sizes="100vw"
                alt=""
                src="/Group 126.svg"
              />
            </div>
          </div>
          <div className={styles.navigation}>
            <Image
              className={styles.serveaseLogoAlbumCover31}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/Servease Logo (Album Cover) (3) 1.png"
            />
            <div className={styles.servease1}>
              <span className={styles.serv}>serv</span>
              <b>ease</b>
            </div>
            <div className={styles.navigationChild} />
            <div className={styles.homeParent}>
              <div className={styles.home1}>Home</div>
              <div className={styles.home1}>Discover</div>
              <div className={styles.contactUs1}>Contact Us</div>
            </div>
            <div className={styles.navigationItem} />
            <div className={styles.genericAvatar}>
              <Image
                className={styles.avatarPlaceholderIcon}
                width={28.2}
                height={25.6}
                sizes="100vw"
                alt=""
                src="/Avatar Placeholder.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <b className={styles.featuredServices}>
        <span className={styles.featuredServicesTxtContainer}>
          <span>Featured</span>
          <span className={styles.services}> Services</span>
        </span>
      </b>
      <b className={styles.upcomingAppointments}>
        <span className={styles.featuredServicesTxtContainer}>
          <span>Upcoming</span>
          <span className={styles.services}> Appointments</span>
        </span>
      </b>
      <div className={styles.cards}>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.parent}>
                  <div className={styles.div1}>4.0</div>
                  <Image
                    className={styles.starIcon}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild1}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild2}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild3}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.customerQuote1}>
          <div className={styles.customerQuoteItem} />
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.parent}>
                  <div className={styles.div1}>4.0</div>
                  <Image
                    className={styles.starIcon}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild1}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild2}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild3}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.customerQuote1}>
          <div className={styles.customerQuoteItem} />
          <div className={styles.avatarContainer}>
            <div className={styles.avatar4}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.parent}>
                  <div className={styles.div1}>4.0</div>
                  <Image
                    className={styles.starIcon}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild1}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild2}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild3}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cardsInner}>
          <div className={styles.buttonWrapper}>
            <div className={styles.button}>
              <div className={styles.chevronRight}>
                <Image
                  className={styles.icon}
                  width={7.5}
                  height={15}
                  sizes="100vw"
                  alt=""
                  src="/Icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupParent}>
        <div className={styles.groupContainer}>
          <div className={styles.heroImageParent}>
            <div className={styles.heroImage1}>
              <Image
                className={styles.avatarIcon}
                width={90}
                height={90}
                sizes="100vw"
                alt=""
                src="/Avatar.svg"
              />
              <div className={styles.serviceFacilityName3}>
                Service Facility Name
              </div>
              <div className={styles.location}>Location</div>
            </div>
            <div className={styles.heroImage2}>
              <Image
                className={styles.calendarMonthIcon}
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/calendar_month.svg"
              />
            </div>
          </div>
          <div className={styles.vectorParent}>
            <Image
              className={styles.vectorIcon}
              width={20}
              height={20}
              sizes="100vw"
              alt=""
              src="/Vector.svg"
            />
            <div className={styles.pm}>1:00 PM</div>
          </div>
          <div className={styles.wedJune30}>Wed, June 30</div>
        </div>
        <div className={styles.groupWrapper}>
          <div className={styles.groupFrame}>
            <div className={styles.groupFrame}>
              <div className={styles.groupFrame}>
                <div className={styles.groupFrame}>
                  <div className={styles.heroImageParent}>
                    <div className={styles.heroImage1}>
                      <Image
                        className={styles.avatarIcon}
                        width={90}
                        height={90}
                        sizes="100vw"
                        alt=""
                        src="/Avatar.svg"
                      />
                      <div className={styles.serviceFacilityName3}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
                    </div>
                    <div className={styles.heroImage2}>
                      <Image
                        className={styles.calendarMonthIcon}
                        width={24}
                        height={24}
                        sizes="100vw"
                        alt=""
                        src="/calendar_month.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.vectorGroup}>
                    <Image
                      className={styles.vectorIcon1}
                      width={16.7}
                      height={16.7}
                      sizes="100vw"
                      alt=""
                      src="/Vector.svg"
                    />
                    <div className={styles.pm1}>1:00 PM</div>
                  </div>
                  <div className={styles.wedJune30}>Wed, June 30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button1}>
        <div className={styles.viewAll}>View All</div>
      </div>
    </div>
  );
};

export default DashboardClient;
