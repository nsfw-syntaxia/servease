"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import styles from "../styles/facilitydetails.module.css";

const FacilityDetails: NextPage = () => {
  const onLinkContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className={styles.facilityDetails}>
      <div className={styles.navigation}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="/Servease Logo (Album Cover) (3) 1.png"
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
        <div className={styles.navigationChild} />
        <div className={styles.button}>
          <div className={styles.star} />
          <div className={styles.signIn}>Sign in</div>
          <div className={styles.star} />
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.image7Parent}>
          <div className={styles.image7} />
          <div className={styles.image7Group}>
            <div className={styles.image71} />
            <div className={styles.image71} />
            <div className={styles.image71} />
          </div>
          <div className={styles.paraContent} />
          <div className={styles.groupParent}>
            <Image
              className={styles.frameChild}
              width={60}
              height={60}
              sizes="100vw"
              alt=""
              src="/Group 86.png"
            />
            <Image
              className={styles.dividerIcon}
              width={1}
              height={100}
              sizes="100vw"
              alt=""
              src="/Divider.svg"
            />
            <Image
              className={styles.frameItem}
              width={80}
              height={71}
              sizes="100vw"
              alt=""
              src="/Group 91.png"
            />
            <Image
              className={styles.frameItem}
              width={80}
              height={71}
              sizes="100vw"
              alt=""
              src="/Group 89.png"
            />
            <Image
              className={styles.frameItem}
              width={80}
              height={71}
              sizes="100vw"
              alt=""
              src="/Group 90.png"
            />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.barbershopParent}>
            <div className={styles.barbershop}>barbershop</div>
            <div className={styles.wrapper}>
              <b className={styles.b8}>₱300 - ₱700</b>
            </div>
            <div className={styles.groupContainer}>
              <div className={styles.parent}>
                <b className={styles.kReviews}>4.0</b>
                <Image
                  className={styles.groupChild}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <Image
                  className={styles.groupItem}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <Image
                  className={styles.groupInner}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <Image
                  className={styles.starIcon}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="/Star 4.svg"
                />
                <Image
                  className={styles.groupChild1}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
              </div>
              <div className={styles.kReviewsWrapper}>
                <b className={styles.kReviews}>(8.2K Reviews)</b>
              </div>
            </div>
            <div className={styles.paraContentWrapper}>
              <div className={styles.paraContent1}>
                <Image
                  className={styles.locationPointIcon}
                  width={25}
                  height={25}
                  sizes="100vw"
                  alt=""
                  src="location-point.svg"
                />
                <div className={styles.nBacalsoAve}>
                  N. Bacalso Ave., Cebu City
                </div>
              </div>
            </div>
            <div className={styles.paraContentParent}>
              <div className={styles.paraContent1}>
                <div className={styles.locationPointIcon}>
                  <Image
                    className={styles.icon}
                    width={20.7}
                    height={20.8}
                    sizes="100vw"
                    alt=""
                    src="Icon.svg"
                  />
                </div>
                <div className={styles.nBacalsoAve}>(+63) 912-3456-789</div>
              </div>
              <div className={styles.paraContent1}>
                <div className={styles.locationPointIcon}>
                  <Image
                    className={styles.icon1}
                    width={20.8}
                    height={16.7}
                    sizes="100vw"
                    alt=""
                    src="Icon.svg"
                  />
                </div>
                <div className={styles.nBacalsoAve}>email@email.com</div>
              </div>
            </div>
            <div className={styles.paraContent4} />
            <Image
              className={styles.dividerIcon1}
              width={629}
              height={1}
              sizes="100vw"
              alt=""
              src="Divider.svg"
            />
            <div className={styles.paraContent5} />
            <div className={styles.paraContentContainer}>
              <div className={styles.paraContent6}>
                <b className={styles.workSchedule}>Work Schedule</b>
              </div>
            </div>
            <div className={styles.buttonParent}>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Monday - Friday</div>
                <div className={styles.star} />
              </div>
              <div className={styles.paraContent7}>
                <div className={styles.nBacalsoAve}>08:00 AM - 09:00 PM</div>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Saturday - Sunday</div>
                <div className={styles.star} />
              </div>
              <div className={styles.paraContent7}>
                <div className={styles.nBacalsoAve}>10:00 AM - 08:00 PM</div>
              </div>
            </div>
            <div className={styles.paraContent9} />
            <Image
              className={styles.dividerIcon2}
              width={629}
              height={1}
              sizes="100vw"
              alt=""
              src="Divider.svg"
            />
            <div className={styles.paraContent10} />
            <div className={styles.paraContentFrame}>
              <div className={styles.paraContent6}>
                <b className={styles.workSchedule}>Available Services</b>
              </div>
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.paraContent6}>
                <b className={styles.b8}>₱300.00</b>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.button3}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 1</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 2</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 3</div>
                <div className={styles.star} />
              </div>
            </div>
            <div className={styles.buttonParent1}>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 4</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 5</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button1}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>Service 6</div>
                <div className={styles.star} />
              </div>
            </div>
          </div>
          <Image
            className={styles.dividerIcon3}
            width={629}
            height={1}
            sizes="100vw"
            alt=""
            src="Divider.svg"
          />
          <div className={styles.buttonParent2}>
            <div className={styles.button9}>
              <div className={styles.heart}>
                <Image
                  className={styles.icon2}
                  width={30.5}
                  height={26.6}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
              <div className={styles.favorite11k}>Favorite (1.1K)</div>
              <div className={styles.star} />
              <div className={styles.star} />
            </div>
            <div className={styles.button3}>
              <div className={styles.star} />
              <div className={styles.mondayFriday}>Book Now</div>
              <div className={styles.star} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button11}>
          <div className={styles.chevronRight}>
            <Image
              className={styles.icon3}
              width={5}
              height={10}
              sizes="100vw"
              alt=""
              src="/Chevron right.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonFrame}>
        <div className={styles.button11}>
          <div className={styles.chevronRight}>
            <Image
              className={styles.icon4}
              width={5}
              height={10}
              sizes="100vw"
              alt=""
              src="/Chevron right.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.whatweofferbox} />
      <div className={styles.location1}>
        <b className={styles.location2}>Location</b>
        <div className={styles.paraContentWrapper1}>
          <div className={styles.paraContent6}>
            <div className={styles.nBacalsoAve}>N. Bacalso Ave., Cebu City</div>
          </div>
        </div>
        <div className={styles.paraContent14} />
        <div className={styles.map}>
          <Image
            className={styles.mapIcon}
            width={1178}
            height={400}
            sizes="100vw"
            alt=""
            src="/Map.png"
          />
          <Image
            className={styles.buttonPlusIcon}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/Button: plus.svg"
          />
          <Image
            className={styles.buttonMinusIcon}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/Button: minus.svg"
          />
          <Image
            className={styles.locationOnIcon}
            width={90}
            height={90}
            sizes="100vw"
            alt=""
            src="/location_on.svg"
          />
          <Image
            className={styles.bgIcon}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/BG.svg"
          />
          <div className={styles.logo}>logo</div>
        </div>
        <div className={styles.paraContent14} />
        <div className={styles.button13}>
          <div className={styles.star} />
          <div className={styles.link} onClick={onLinkContainerClick}>
            <div className={styles.bookNow1}>Book Now</div>
            <Image
              className={styles.svgIcon}
              width={14}
              height={14}
              sizes="100vw"
              alt=""
              src="SVG.svg"
            />
          </div>
          <div className={styles.star} />
        </div>
      </div>
      <div className={styles.location3}>
        <b className={styles.serviceRatings}>Service Ratings</b>
        <div className={styles.paraContent14} />
        <div className={styles.group}>
          <Image
            className={styles.icon5}
            width={160}
            height={160}
            sizes="100vw"
            alt=""
            src="/75%.svg"
          />
          <div className={styles.paraContentGroup}>
            <div className={styles.paraContent17}>
              <b className={styles.workSchedule}>8.2K Reviews</b>
            </div>
            <div className={styles.buttonParent3}>
              <div className={styles.button14}>
                <div className={styles.star} />
                <div className={styles.mondayFriday}>All</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button15}>
                <div className={styles.star} />
                <Image
                  className={styles.buttonChild}
                  width={20}
                  height={20}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <div className={styles.k}>5 (3.2K)</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button15}>
                <div className={styles.star} />
                <Image
                  className={styles.buttonChild}
                  width={20}
                  height={20}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <div className={styles.k}>4 (1.5K)</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button15}>
                <div className={styles.star} />
                <Image
                  className={styles.buttonChild}
                  width={20}
                  height={20}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <div className={styles.k2}>3 (1.37K)</div>
                <div className={styles.star} />
              </div>
            </div>
            <div className={styles.buttonParent3}>
              <div className={styles.button15}>
                <div className={styles.star} />
                <Image
                  className={styles.buttonChild}
                  width={20}
                  height={20}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <div className={styles.k}>2 (1.12K)</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button15}>
                <div className={styles.star} />
                <Image
                  className={styles.buttonChild}
                  width={20}
                  height={20}
                  sizes="100vw"
                  alt=""
                  src="/Star 3.svg"
                />
                <div className={styles.k}>1 (1.01K)</div>
                <div className={styles.star} />
              </div>
              <div className={styles.button20}>
                <div className={styles.star} />
                <div className={styles.favorite11k}>With Media</div>
                <div className={styles.star} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.paraContent14} />
        <div className={styles.locationInner}>
          <div className={styles.frameContainer}>
            <div className={styles.paraContentParent1}>
              <div className={styles.paraContent19}>
                <div className={styles.serviceOptionWrapper}>
                  <div className={styles.serviceOption}>service option</div>
                </div>
                <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
              </div>
              <div className={styles.paraContent19}>
                <div className={styles.container}>
                  <div className={styles.div1}>4.0</div>
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
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild5}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild6}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
                <div className={styles.name}>name</div>
              </div>
              <div className={styles.button21} />
            </div>
            <div className={styles.paraContentWrapper2}>
              <div className={styles.paraContent21}>
                <div className={styles.blahBlahBlah}>blah blah blah</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.locationChild}>
          <div className={styles.frameParent1}>
            <div className={styles.paraContentParent1}>
              <div className={styles.paraContent19}>
                <div className={styles.serviceOptionWrapper}>
                  <div className={styles.serviceOption}>service option</div>
                </div>
                <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
              </div>
              <div className={styles.paraContent19}>
                <div className={styles.container}>
                  <div className={styles.div1}>4.0</div>
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
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild5}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild6}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
                <div className={styles.name}>name</div>
              </div>
              <div className={styles.button21} />
            </div>
            <div className={styles.paraContentWrapper2}>
              <div className={styles.paraContent21}>
                <div className={styles.blahBlahBlah}>blah blah blah</div>
              </div>
            </div>
            <div className={styles.paraContent25}>
              <div className={styles.image73} />
              <div className={styles.image73} />
              <div className={styles.image73} />
              <div className={styles.image73} />
              <div className={styles.image73} />
            </div>
          </div>
        </div>
        <div className={styles.locationInner}>
          <div className={styles.frameContainer}>
            <div className={styles.paraContentParent1}>
              <div className={styles.paraContent19}>
                <div className={styles.serviceOptionWrapper}>
                  <div className={styles.serviceOption}>service option</div>
                </div>
                <div className={styles.xxxxxxxx}>xx/xx/xxxx</div>
              </div>
              <div className={styles.paraContent19}>
                <div className={styles.container}>
                  <div className={styles.div1}>4.0</div>
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
                    src="/Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild4}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="Star 3.svg"
                  />
                  <Image
                    className={styles.groupChild5}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 4.svg"
                  />
                  <Image
                    className={styles.groupChild6}
                    width={20}
                    height={20}
                    sizes="100vw"
                    alt=""
                    src="/Star 3.svg"
                  />
                </div>
                <div className={styles.name}>name</div>
              </div>
              <div className={styles.button21} />
            </div>
            <div className={styles.paraContentWrapper2}>
              <div className={styles.paraContent21}>
                <div className={styles.blahBlahBlah}>blah blah blah</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.paraContent14} />
        <div className={styles.locationInner2}>
          <div className={styles.buttonParent3}>
            <div className={styles.button24}>
              <div className={styles.chevronRight}>
                <Image
                  className={styles.icon4}
                  width={5}
                  height={10}
                  sizes="100vw"
                  alt=""
                  src="/Chevron right.svg"
                />
              </div>
            </div>
            <div className={styles.button25}>
              <div className={styles.star} />
              <b className={styles.b11}>1</b>
              <div className={styles.star} />
            </div>
            <div className={styles.button26}>
              <div className={styles.star} />
              <b className={styles.b11}>2</b>
              <div className={styles.star} />
            </div>
            <div className={styles.button26}>
              <div className={styles.star} />
              <b className={styles.b11}>3</b>
              <div className={styles.star} />
            </div>
            <div className={styles.button26}>
              <div className={styles.star} />
              <b className={styles.b11}>4</b>
              <div className={styles.star} />
            </div>
            <div className={styles.button26}>
              <div className={styles.star} />
              <b className={styles.b11}>5</b>
              <div className={styles.star} />
            </div>
            <div className={styles.buttonWrapper1}>
              <div className={styles.button30}>
                <div className={styles.chevronRight}>
                  <Image
                    className={styles.icon3}
                    width={5}
                    height={10}
                    sizes="100vw"
                    alt=""
                    src="/Chevron right.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.parent2}>
        <b className={styles.b16}>4.0</b>
        <div className={styles.outOf5}>Out of 5</div>
      </div>
      <div className={styles.facilityDetailsChild} />
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.yourTrustedPlatform}>
          Your trusted platform to discover, book, and manage local
          services—anytime, anywhere.
        </div>
        <b className={styles.contactUs1}>Contact Us</b>
        <div className={styles.supportserveasecom}>support@servease.com</div>
        <div className={styles.contactNumber}>contact number</div>
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
            className={styles.frameIcon}
            width={22}
            height={22}
            sizes="100vw"
            alt=""
            src="/Frame 1.svg"
          />
        </div>
        <div className={styles.twitterParent}>
          <div className={styles.twitter}>Twitter</div>
          <Image
            className={styles.groupChild17}
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
            className={styles.groupChild18}
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
          className={styles.serveaseLogoAlbumCover31}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="/Servease Logo (Album Cover) (3) 2.png"
        />
      </div>
    </div>
  );
};

export default FacilityDetails;
