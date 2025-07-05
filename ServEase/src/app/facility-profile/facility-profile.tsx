/*
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-profile.module.css";

const ProfileFacility: NextPage = () => {
  return (
    <div className={styles.profileFacility}>
      <div className={styles.joinUsWrapper}>
        <div className={styles.joinUs}>
          <div className={styles.joinUsChild} />
          <div className={styles.paraContent} />
          <div className={styles.navigation}>
            <Image
              className={styles.serveaseLogoAlbumCover3}
              width={40}
              height={40}
              sizes="100vw"
              alt=""
              src="/logo.svg"
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
                src="/Avatar Placeholder.svg"
              />
            </div>
          </div>
          <div className={styles.joinUsItem} />
          <div className={styles.genericAvatar1}>
            <Image
              className={styles.avatarPlaceholderIcon1}
              width={70.5}
              height={64.1}
              sizes="100vw"
              alt=""
              src="/Avatar Placeholder.svg"
            />
          </div>
          <div className={styles.joinUsInner} />
          <Image
            className={styles.edit03Icon}
            width={19}
            height={19}
            sizes="100vw"
            alt=""
            src="/edit-03.svg"
          />
          <div className={styles.rectangleDiv} />
          <Image
            className={styles.rectangleIcon}
            width={1032}
            height={148}
            sizes="100vw"
            alt=""
            src="/Rectangle 6691.svg"
          />
          <div className={styles.serviceFacilityNameParent}>
            <div className={styles.serviceFacilityName}>
              Service Facility Name
            </div>
            <div className={styles.verified}>Verified</div>
            <div className={styles.servicefacilityemailcom}>
              service.facility@email.com
            </div>
          </div>
          <div className={styles.joinUsChild1} />
          <div className={styles.joinUsChild2} />
          <div className={styles.serviceFacilityName1}>
            Service Facility Name
          </div>
          <div className={styles.joinUsChild3} />
          <div className={styles.serviceFacilityName2}>
            Service Facility Name
          </div>
          <div className={styles.category}>Category</div>
          <div className={styles.joinUsChild4} />
          <div className={styles.category1}>Category</div>
          <div className={styles.workingDays}>Working Days</div>
          <div className={styles.contactNumber}>Contact Number</div>
          <div className={styles.joinUsChild5} />
          <div className={styles.xxXxxxXxx}>+63 9XX XXXX XXX</div>
          <div className={styles.address}>Address</div>
          <div className={styles.joinUsChild6} />
          <div className={styles.address1}>Address</div>
          <div className={styles.tags}>Tags</div>
          <div className={styles.joinUsChild7} />
          <div className={styles.tags1}>Tags</div>
          <div className={styles.specificCategory}>Specific Category</div>
          <div className={styles.joinUsChild8} />
          <div className={styles.specificCategory1}>Specific Category</div>
          <div className={styles.workingHours}>Working Hours</div>
          <div className={styles.joinUsChild9} />
          <div className={styles.workingHours1}>Working Hours</div>
          <div className={styles.joinUsChild10} />
          <div className={styles.workingDays1}>Working Days</div>
          <div className={styles.emailAddress}>Email Address</div>
          <div className={styles.joinUsChild11} />
          <div className={styles.emailAddress1}>Email Address</div>
          <div className={styles.servicesOfferedWrapper}>
            <div className={styles.servicesOffered}>Services Offered</div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.groupChild} />
            <div className={styles.view}>View</div>
          </div>
          <div className={styles.ellipseDiv} />
          <div className={styles.appointmentTimeslotsWrapper}>
            <div className={styles.servicesOffered}>Appointment Timeslots</div>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.groupChild} />
            <div className={styles.view}>View</div>
          </div>
          <div className={styles.joinUsChild12} />
          <div className={styles.joinUsChild13} />
          <Image
            className={styles.edit03Icon1}
            width={19}
            height={19}
            sizes="100vw"
            alt=""
            src="edit-03.svg"
          />
          <Image
            className={styles.verifiedaccountIcon}
            width={26}
            height={26}
            sizes="100vw"
            alt=""
            src="20 / VerifiedAccount.svg"
          />
          <div className={styles.likes}>Likes</div>
          <div className={styles.heart}>
            <Image
              className={styles.icon}
              width={15.7}
              height={13.7}
              sizes="100vw"
              alt=""
              src="Icon.svg"
            />
          </div>
          <div className={styles.div}>12,234</div>
          <div className={styles.joinUsChild14} />
          <div className={styles.joinUsChild15} />
          <div className={styles.ratings}>Ratings</div>
          <div className={styles.div1}>4.2/5.0</div>
          <div className={styles.star}>
            <Image
              className={styles.icon1}
              width={15}
              height={14.3}
              sizes="100vw"
              alt=""
              src="Icon.svg"
            />
          </div>
          <div className={styles.joinUsChild16} />
          <div className={styles.joinUsChild17} />
          <div className={styles.reviews}>Reviews</div>
          <div className={styles.div2}>11,232</div>
          <div className={styles.users}>
            <Image
              className={styles.icon2}
              width={14.7}
              height={12}
              sizes="100vw"
              alt=""
              src="Icon.svg"
            />
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
            <div className={styles.div3}>+63 996 3175 214</div>
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
                className={styles.groupInner}
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
                className={styles.frameIcon}
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
                className={styles.groupChild1}
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
          <div className={styles.buttonWrapper}>
            <div className={styles.button}>
              <div className={styles.buttonInner}>
                <div className={styles.editWrapper}>
                  <div className={styles.edit}>Edit</div>
                </div>
              </div>
              <Image
                className={styles.edit03Icon2}
                width={20}
                height={20}
                sizes="100vw"
                alt=""
                src="edit-03.svg"
              />
            </div>
          </div>
          <div className={styles.briefcase}>
            <Image
              className={styles.vuesaxboldbriefcaseIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="vuesax/bold/briefcase.svg"
            />
          </div>
          <Image
            className={styles.vuesaxboldclockIcon}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="vuesax/bold/clock.svg"
          />
        </div>
      </div>
      <b className={styles.profile}>Profile</b>
    </div>
  );
};

export default ProfileFacility;
*/
