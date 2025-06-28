"use client";

import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../../styles/discover-2-a.module.css";

const PBACS: NextPage = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showPrevNew, setShowPrevNew] = useState(false);

  const handleNextClick = () => {
    setShowPrev(true);
  };

  const handlePrevClick = () => {
    setShowPrev(false);
  };

  const handleNextClickNew = () => {
    setShowPrevNew(true);
  };

  const handlePrevClickNew = () => {
    setShowPrevNew(false);
  };

  const router = useRouter();

  return (
    <div className={styles.pbacs}>
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.yourTrustedPlatform}>
          Your trusted platform to discover, book, and manage local
          services—anytime, anywhere.
        </div>
        <b className={styles.contactUs}>Contact Us</b>
        <div className={styles.supportserveasecom}>support@servease.com</div>
        <div className={styles.contactNumber}>+63 9XX-XXX-XXXX</div>
        <b className={styles.support}>Support</b>
        <div className={styles.faqs}>FAQs</div>
        <div className={styles.privacyPolicy}>Privacy Policy</div>
        <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
        <div className={styles.aboutUs}>About Us</div>
        <b className={styles.quickLinks}>Quick Links</b>
        <div className={styles.servease} onClick={() => router.push("/home")}>
          <span className={styles.serv}>serv</span>
          <b>ease</b>
        </div>
        <div className={styles.home} onClick={() => router.push("/home")}>
          Home
        </div>
        <div className={styles.discover}>Discover</div>
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
          className={styles.serveaseLogoAlbumCover31}
          width={40}
          height={40}
          sizes="100vw"
          alt="Servease Logo"
          src="/logo.svg"
          onClick={() => router.push("/home")}
        />
      </div>

      {/* all services */}
      <div className={styles.allServices}>
        <b className={styles.allServices1}>
          <span>All</span>
          <span className={styles.services}> Services</span>
        </b>
        <div className={styles.allView}>
          <div className={styles.allCards}>
            <div className={styles.cards}>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cards}>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cards}>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.service}>
                <div className={styles.image} />
                <div className={styles.info}>
                  <div className={styles.avatar}>
                    <div className={styles.avatar1} />
                    <div className={styles.serviceFacilityNameParent}>
                      <div className={styles.serviceFacilityName}>
                        Service Facility Name
                      </div>
                      <div className={styles.location}>Location</div>
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
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupItem}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.groupInner}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                          <Image
                            className={styles.starIcon}
                            width={20}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starUnfilled.svg"
                          />
                          <Image
                            className={styles.groupChild1}
                            width={23.7}
                            height={20}
                            sizes="100vw"
                            alt=""
                            src="/starFilled.svg"
                          />
                        </div>
                        <div className={styles.link}>
                          <div className={styles.viewDetails}>View Details</div>
                          <Image
                            className={styles.svgIcon}
                            width={14}
                            height={14}
                            sizes="100vw"
                            alt=""
                            src="/gs2.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.viewAll}>View All</div>
          </div>
        </div>
      </div>

      {/* new services */}
      <div className={styles.newServices}>
        <b className={styles.allServices1}>
          <span>New</span>
          <span className={styles.services}> Services</span>
        </b>
        <div
          className={`${styles.popularCards} ${
            showPrevNew ? styles.centeredCards : ""
          }`}
        >
          {showPrevNew && (
            <div className={styles.btnprev} onClick={handlePrevClickNew}>
              <div className={styles.btn}>
                <div className={styles.chevronLeft}>
                  <Image
                    className={styles.icon}
                    width={7.5}
                    height={15}
                    alt=""
                    src="/swipeLeft.svg"
                  />
                </div>
              </div>
            </div>
          )}
          {[1, 2, 3].map((item) => (
            <div className={styles.service6} key={item}>
              <div className={styles.serviceChild1} />
              <div className={styles.avatarWrapper1}>
                <div className={styles.avatar28}>
                  <div className={styles.avatar1} />
                  <div className={styles.serviceFacilityNameParent}>
                    <div className={styles.serviceFacilityName}>
                      Service Facility Name
                    </div>
                    <div className={styles.parent3}>
                      <div className={styles.location}>Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.btnnext} onClick={handleNextClickNew}>
            <div className={styles.btn}>
              <div className={styles.chevronRight}>
                <Image
                  className={styles.icon}
                  width={7.5}
                  height={15}
                  alt=""
                  src="/swipeRight.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line1} />
      </div>

      {/* popular services */}
      <div className={styles.popularServices}>
        <b className={styles.allServices1}>
          <span>Popular</span>
          <span className={styles.services}> Services</span>
        </b>
        <div
          className={`${styles.popularCards} ${
            showPrev ? styles.centeredCards : ""
          }`}
        >
          {showPrev && (
            <div className={styles.btnprev} onClick={handlePrevClick}>
              <div className={styles.btn}>
                <div className={styles.chevronLeft}>
                  <Image
                    className={styles.icon}
                    width={7.5}
                    height={15}
                    alt=""
                    src="/swipeLeft.svg"
                  />
                </div>
              </div>
            </div>
          )}

          <div className={styles.service6}>
            <div className={styles.serviceChild1} />
            <div className={styles.avatarWrapper1}>
              <div className={styles.avatar28}>
                <div className={styles.avatar1} />
                <div className={styles.serviceFacilityNameParent}>
                  <div className={styles.serviceFacilityName}>
                    Service Facility Name
                  </div>
                  <div className={styles.parent3}>
                    <div className={styles.rate}>4.0</div>
                    <Image
                      className={styles.groupChild27}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild28}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild29}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild30}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starUnfilled.svg"
                    />
                    <Image
                      className={styles.groupChild31}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.service6}>
            <div className={styles.image} />
            <div className={styles.avatarWrapper1}>
              <div className={styles.avatar28}>
                <div className={styles.avatar1} />
                <div className={styles.serviceFacilityNameParent}>
                  <div className={styles.serviceFacilityName}>
                    Service Facility Name
                  </div>
                  <div className={styles.parent3}>
                    <div className={styles.rate}>4.0</div>
                    <Image
                      className={styles.groupChild27}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild28}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild29}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild30}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starUnfilled.svg"
                    />
                    <Image
                      className={styles.groupChild31}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.service6}>
            <div className={styles.image} />
            <div className={styles.avatarWrapper1}>
              <div className={styles.avatar28}>
                <div className={styles.avatar1} />
                <div className={styles.serviceFacilityNameParent}>
                  <div className={styles.serviceFacilityName}>
                    Service Facility Name
                  </div>
                  <div className={styles.parent3}>
                    <div className={styles.rate}>4.0</div>
                    <Image
                      className={styles.groupChild27}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild28}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild29}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                    <Image
                      className={styles.groupChild30}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starUnfilled.svg"
                    />
                    <Image
                      className={styles.groupChild31}
                      width={20}
                      height={20}
                      sizes="100vw"
                      alt=""
                      src="/starFilled.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.btnnext} onClick={handleNextClick}>
            <div className={styles.btn}>
              <div className={styles.chevronRight}>
                <Image
                  className={styles.icon}
                  width={7.5}
                  height={15}
                  alt=""
                  src="/swipeRight.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line1} />
      </div>

      <div className={styles.bg} />
      {/* icons */}
      <div className={styles.icons}>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Image
              className={styles.barbershopIcon}
              src="/barbershop.svg"
              alt=""
              width={75}
              height={75}
            />
          </div>
          <div className={styles.label}>Barbershops</div>
        </div>

        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Image
              className={styles.hairSalonIcon}
              src="/hair salon.svg"
              alt=""
              width={75}
              height={75}
            />
          </div>
          <div className={styles.label}>Hair Salons</div>
        </div>

        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Image
              className={styles.nailSalonIcon}
              src="/nail salon.svg"
              alt=""
              width={75}
              height={75}
            />
          </div>
          <div className={styles.label}>Nail Salons</div>
        </div>

        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Image
              className={styles.spaIcon}
              src="/spa.svg"
              alt=""
              width={75}
              height={75}
            />
          </div>
          <div className={styles.label}>Spa & Massage Centers</div>
        </div>

        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Image
              className={styles.piercingIcon}
              src="/piercing.svg"
              alt=""
              width={75}
              height={75}
            />
          </div>
          <div className={styles.label}>Tattoo & Piercing Parlors</div>
        </div>
      </div>

      {/* search */}
      <div className={styles.searchBox}>
        <div className={styles.filtering}>
          <div className={styles.link6}>
            <Image
              className={styles.icon2}
              width={20}
              height={20}
              sizes="100vw"
              alt=""
              src="/filtering.svg"
            />
            <div className={styles.moreFilters}>More Filters</div>
          </div>
        </div>
        <div className={styles.btnfind}>
          <Image
            className={styles.icon3}
            width={15}
            height={15}
            sizes="100vw"
            alt=""
            src="/search.svg"
          />
          <div className={styles.findListing}>Find Listing</div>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.enterAService}
            placeholder="Enter a Service Name, Category, or Location"
          />
        </div>
      </div>

      {/* hero img */}
      <div className={styles.heroImg}>
        <div className={styles.image12} />
        <div className={styles.personalBeautyAnd}>
          Personal Beauty and Care Services
        </div>
      </div>

      {/* nav */}
      <div className={styles.nav}>
        <Image
          className={styles.serveaseLogoAlbumCover3}
          width={40}
          height={40}
          sizes="100vw"
          alt=""
          src="/logo.svg"
        />
        <div className={styles.servease1}>
          <span className={styles.serv}>serv</span>
          <b>ease</b>
        </div>
        <div className={styles.navChild} />
        <div className={styles.homeParent}>
          <div className={styles.home1} onClick={() => router.push("/home")}>
            Home
          </div>
          <div className={styles.home1}>Discover</div>
          <div
            className={styles.contactUs1}
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            Contact Us
          </div>
        </div>
        <div className={styles.navChild} />
        <div className={styles.button1}>
          <div className={styles.signIn} onClick={() => router.push("/login")}>
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

export default PBACS;
