"use client";

import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/DiscoverPage.module.css";

const DiscoverPage: NextPage = () => {
  const router = useRouter();

  const onPersonalBeautyClick = useCallback(() => {
    router.push("/discover/categories/personal-beauty-and-care");
  }, [router]);

  const onHealthMedicalClick = useCallback(() => {
    router.push("/discover/categories/health-and-medical");
  }, [router]);

  const onFitnessSportsClick = useCallback(() => {
    router.push("/discover/categories/fitness-and-sports");
  }, [router]);

  const onEducationTutoringClick = useCallback(() => {
    router.push("/discover/categories/education-and-tutoring");
  }, [router]);

  const onRepairTechnicalClick = useCallback(() => {
    router.push("/discover/categories/repair-and-technical");
  }, [router]);

  const onFoodBeveragesClick = useCallback(() => {
    router.push("/discover/categories/food-and-beverages");
  }, [router]);

  const onMiscellaneousClick = useCallback(() => {
    router.push("/discover/categories/miscellaneous");
  }, [router]);

  return (
    <div className={styles.discover1Parent}>
      <div className={styles.discover1}>
        <div className={styles.footer}>
          <div className={styles.footerChild} />
          <div className={styles.yourTrustedPlatform}>
            Your trusted platform to discover, book, and manage local
            services—anytime, anywhere.
          </div>
          <b className={styles.contactUs}>Contact Us</b>
          <div className={styles.supportserveasecom}>support@servease.com</div>
          <div className={styles.contactNumber}>+63 996 3175 214</div>
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
          <div
            className={styles.discover}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Discover
          </div>
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

        <div className={styles.whatweofferbox} />
        <b className={styles.ourServices}>
          <span>{`Our `}</span>
          <span className={styles.services}>Services</span>
        </b>

        <div className={styles.background1} onClick={onPersonalBeautyClick}>
          <div className={styles.link}>
            <div className={styles.personalBeautyAnd}>
              Personal Beauty and Care
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background2} onClick={onHealthMedicalClick}>
          <div className={styles.link}>
            <div className={styles.healthAndMedical}>
              Health and Medical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background3} onClick={onFitnessSportsClick}>
          <div className={styles.link}>
            <div className={styles.fitnessAndSports}>Fitness and Sports</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background4} onClick={onEducationTutoringClick}>
          <div className={styles.link}>
            <div className={styles.educationAndTutoring}>
              Education and Tutoring
            </div>
            <div className={styles.svg} />
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background5} onClick={onRepairTechnicalClick}>
          <div className={styles.link}>
            <div className={styles.repairAndTechnical}>
              Repair and Technical Services
            </div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background6} onClick={onFoodBeveragesClick}>
          <div className={styles.link}>
            <div className={styles.foodAndBeverages}>Food and Beverages</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="/Chevron right.svg"
              />
            </div>
          </div>
        </div>

        <div className={styles.background} onClick={onMiscellaneousClick}>
          <div className={styles.link}>
            <div className={styles.miscellaneous}>Miscellaneous</div>
            <div className={styles.chevronRight}>
              <Image
                className={styles.icon}
                width={6.8}
                height={13.5}
                sizes="100vw"
                alt=""
                src="Chevron right.svg"
              />
            </div>
          </div>
        </div>

        {/* hero img */}
        <div className={styles.heroImage}>
          <div className={styles.image10} />
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
            onClick={() => router.push("/home")}
          />
          <div
            className={styles.servease1}
            onClick={() => router.push("/home")}
          >
            <span className={styles.serv}>serv</span>
            <b>ease</b>
          </div>
          <div className={styles.navChild} />
          <div className={styles.homeParent}>
            <div className={styles.home1} onClick={() => router.push("/home")}>
              Home
            </div>
            <div
              className={styles.home1}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Discover
            </div>
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
          <div className={styles.buttonS}>
            <div
              className={styles.signIn}
              onClick={() => router.push("/login")}
            >
              Sign in
            </div>
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
      </div>
    </div>
  );
};

export default DiscoverPage;
