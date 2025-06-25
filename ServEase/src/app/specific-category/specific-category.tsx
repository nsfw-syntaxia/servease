'use client';

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/specific-category.module.css";


const SpecificCategory: NextPage = () => {
    const router = useRouter();

  return (
    <div className={styles.discover3}>
      <div className={styles.whatweofferbox} />
      <div className={styles.form}>
        <div className={styles.verticalborder}>
          <div className={styles.link}>
            <Image
              className={styles.icon}
              width={20}
              height={20}
              sizes="100vw"
              alt="Filter"
              src="/filter.svg"
            />
            <div className={styles.moreFilters}>More Filters</div>
          </div>
        </div>
        <div className={styles.button}>
          <Image
            className={styles.icon1}
            width={15}
            height={15}
            sizes="100vw"
            alt=""
            src="/Search.svg"
          />
          <div className={styles.findListing}>Find Listing</div>
        </div>
        <div className={styles.form1}>
          <div className={styles.enterAService}>
            Enter a Service Name, Category, or Location
          </div>
        </div>
      </div>
      <b className={styles.allServices}>
        <span>All</span>
        <span className={styles.services}> Services</span>
      </b>
      <div className={styles.heroImage}>
      </div>
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
        <div className={styles.button1}>
          <div className={styles.star} />
          <div className={styles.signIn}>Sign in</div>
          <div className={styles.star} />
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarParent}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.div1}>5.0</div>
            </div>
          </div>
        </div>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cards1}>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarParent}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.div1}>5.0</div>
            </div>
          </div>
        </div>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cards2}>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarParent}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.div1}>5.0</div>
            </div>
          </div>
        </div>
        <div className={styles.customerQuote}>
          <div className={styles.customerQuoteChild} />
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <div className={styles.avatar1} />
              <div className={styles.serviceFacilityNameParent}>
                <div className={styles.serviceFacilityName}>
                  Service Facility Name
                </div>
                <div className={styles.location1}>Location</div>
              </div>
              <div className={styles.avatar2} />
              <div className={styles.avatar3}>
                <div className={styles.groupParent}>
                  <div className={styles.parent}>
                    <div className={styles.div}>4.0</div>
                    <Image
                      className={styles.groupChild}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupItem}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.groupInner}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                    <Image
                      className={styles.starIcon}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 4.svg"
                    />
                    <Image
                      className={styles.groupChild1}
                      width={23.7}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/Star 3.svg"
                    />
                  </div>
                  <div className={styles.link1}>
                    <div className={styles.viewDetails}>View Details</div>
                    <Image
                      className={styles.svgIcon}
                      width={14}
                      height={14}
                      sizes="100vw"
                      alt=""
                      src="/SVG.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className={styles.footer}>
          <div className={styles.footerChild} />
          <div className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </div>
          <b className={styles.contactUs1}>Contact Us</b>
          <div className={styles.supportserveasecom}>support@servease.com</div>
          <div className={styles.contactNumber}>+63 996-751-3542</div>
          <b className={styles.support}>Support</b>
          <div className={styles.faqs}>FAQs</div>
          <div className={styles.privacyPolicy}>Privacy Policy</div>
          <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
          <div
            className={styles.aboutUs}
            onClick={() => {
              window.scrollTo({ top: 500, behavior: "smooth" });
            }}
          >
            About Us
          </div>
          <b className={styles.quickLinks}>Quick Links</b>
          <div
            className={styles.servease1}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className={styles.serv}>serv</span>
            <b>ease</b>
          </div>
          <div
            className={styles.home1}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </div>
          <div className={styles.discover1}>Discover</div>
          <div
            className={styles.createAnAccount}
            onClick={() => router.push("/signup")}
          >
            Create an Account
          </div>
          <div className={styles.lineParent}>
            <div className={styles.lineDiv} />
            <div className={styles.servease2025}>
              servease 2025 © All rights reserved
            </div>
          </div>
          <Image
            className={styles.serveaseLogoAlbum}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/landingLogo.svg"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
  );
};

export default SpecificCategory;