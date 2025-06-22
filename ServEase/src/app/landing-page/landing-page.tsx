"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/landing-page.module.css";

const heroImages = [
  "/LandingPageImage1.png",
  "/LandingPageImage2.png",
  "/LandingPageImage3.png",
  "/LandingPageImage4.png",
  "/LandingPageImage5.png",
  "/LandingPageImage6.png",
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navDropped, setNavDropped] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const whatWeOfferRef = useRef<HTMLDivElement>(null);
  const [showWhatWeOffer, setShowWhatWeOffer] = useState(false);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const [showWhyChoose, setShowWhyChoose] = useState(false);
  const animationTriggered = useRef(false); // prevent multiple triggers
  const offerAnimationTriggered = useRef(false); // prevent multiple triggers for offer section
  const whyChooseAnimationTriggered = useRef(false); // prevent multiple triggers for why choose section

  useEffect(() => {
    setNavDropped(true);

    const heroTimeout = setTimeout(() => {
      setShowHero(true);
    }, 900);

    heroImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    // single intersection observer to handle the about us animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // only trigger once and when user has scrolled down
          if (
            entry.isIntersecting &&
            window.scrollY > 50 &&
            !animationTriggered.current
          ) {
            animationTriggered.current = true;
            setShowAboutUs(true);
            observer.disconnect(); // disconnect immediately after triggering
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px", // only trigger when element is well within viewport
      }
    );

    // intersection observer for what we offer section
    const offerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            window.scrollY > 100 &&
            !offerAnimationTriggered.current
          ) {
            offerAnimationTriggered.current = true;
            setShowWhatWeOffer(true);
            offerObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    // intersection observer for why choose section
    const whyChooseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            window.scrollY > 150 &&
            !whyChooseAnimationTriggered.current
          ) {
            whyChooseAnimationTriggered.current = true;
            setShowWhyChoose(true);
            whyChooseObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    if (whatWeOfferRef.current) {
      offerObserver.observe(whatWeOfferRef.current);
    }

    if (whyChooseRef.current) {
      whyChooseObserver.observe(whyChooseRef.current);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(heroTimeout);
      observer.disconnect();
      offerObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      {/* nav bar */}
      <div
        className={`${styles.navigation} ${
          navDropped ? styles.navAnimate : ""
        }`}
      >
        <div className={styles.navigationlogo}>
          <Image
            className={styles.serveaseLogoAlbumCover31}
            width={40}
            height={40}
            sizes="100vw"
            alt=""
            src="/landingLogo.svg"
          />
          <div className={styles.servease1}>
            <span className={styles.serv1}>serv</span>
            <b>ease</b>
          </div>
        </div>
        <div className={styles.navigationChild} />
        <div className={styles.homeParent}>
          <div className={styles.home1}>Home</div>
          <div className={styles.home1}>Discover</div>
          <div className={styles.contactUs1}>Contact Us</div>
        </div>
        <div className={styles.navigationChild} />
        <div className={styles.button1}>
          <div className={styles.signIn}>Sign in</div>
        </div>
      </div>

      {/* hero img */}
      {showHero && (
        <div className={`${styles.heroImageWrapper} ${styles.heroFade}`}>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`${styles.heroImage} ${
                index === currentImageIndex ? styles.active : ""
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}

          <div className={styles.divinheroImage}>
            <b className={styles.bridgingClientsAndContainer}>
              <p className={styles.areYouLooking}>Bridging Clients</p>
              <p className={styles.areYouLooking}>and Services with Ease</p>
            </b>
            <div className={styles.discoverASmarter}>
              Discover a smarter way to connect with local services. Servease
              brings together clients and providers in a seamless digital hub
              built for speed, trust, and ease.
              <div className={styles.button}>
                <div className={styles.joinServeaseNow}>Join servease now</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.spacer}></div>

      {/* abt us - now initially hidden and only shows on scroll */}
      <div
        ref={aboutRef}
        className={`${styles.aboutUsSection} ${
          showAboutUs ? styles.showAbout : styles.hiddenAbout
        }`}
      >
        <div className={`${styles.servChild} ${styles.slideInLeft}`}>
          <Image
            className={styles.subtractIcon}
            width={110}
            height={110}
            alt="Subtract"
            src="/Subtract.png"
          />
          <div className={styles.servChild1}>100+</div>
          <div className={styles.serviceFacilities}>Service Facilities</div>
        </div>

        <div className={`${styles.aboutusbox} ${styles.slideInRight}`}>
          <div className={styles.aboutUsChild}>
            <b className={styles.aboutUs1}>
              <span className={styles.aboutUsTxtContainer}>About Us</span>
            </b>
            <div className={styles.serveaseIsYour}>
              Servease is your go-to platform for discovering and connecting
              with trusted local service providers. Designed for both clients
              and professionals, our goal is to make finding, comparing, and
              choosing services simple and stress-free.
            </div>
            <div className={styles.fromHomeRepairs}>
              From home repairs to personal care, Servease brings everything you
              need into one easy-to-use platform — saving you time and helping
              businesses grow.
            </div>
          </div>

          <div className={styles.aboutUsintersect}>
            <div className={styles.intersectIcon9}></div>
            <div className={styles.intersectIcon10}></div>
          </div>
        </div>
      </div>

      {/* what we offer */}
      <div
        ref={whatWeOfferRef}
        className={`${styles.whatweoffer} ${
          showWhatWeOffer ? styles.showOffer : styles.hiddenOffer
        }`}
      >
        <div
          className={`${styles.whatWeOfferContainer} ${styles.slideFromTop}`}
        >
          <b>{`What We `}</b>
          <span className={styles.offer}>Offer</span>
        </div>
        <div
          className={`${styles.whatWeOfferContainerChild} ${styles.slideFromBottom}`}
        >
          {/* first */}
          <div className={styles.onlineBooking}>
            <Image
              className={styles.intersectIcon}
              width={239.4}
              height={50.8}
              sizes="100vw"
              alt=""
              src="/Intersect.svg"
            />
            <Image
              className={styles.intersectIcon1}
              width={81}
              height={189}
              sizes="100vw"
              alt=""
              src="/Intersect1.svg"
            />
            <Image
              className={styles.icon}
              width={100}
              height={100}
              sizes="100vw"
              alt=""
              src="/3.svg"
            />
            <b className={styles.onlineBookingSystem}>Online Booking System</b>
            <div className={styles.easilyBookAppointments}>
              Easily book appointments with your chosen service provider, check
              availability in real time, and receive instant confirmation - all
              from your device.
            </div>
          </div>

          {/* second */}
          <div className={styles.serviceDirectory}>
            <Image
              className={styles.intersectIcon4}
              width={61}
              height={173.7}
              sizes="100vw"
              alt=""
              src="/Intersect4.svg"
            />
            <Image
              className={styles.intersectIcon5}
              width={163.5}
              height={168.3}
              sizes="100vw"
              alt=""
              src="/Intersect5.svg"
            />
            <Image
              className={styles.icon}
              width={100}
              height={100}
              sizes="100vw"
              alt=""
              src="/4.svg"
            />
            <b className={styles.serviceDirectory1}>Service Directory</b>
            <div className={styles.searchForService}>
              Search for service facilities by name or category, and view
              ratings, pricing, services offered, operating hours, and contact
              details in one place.
            </div>
          </div>

          {/* third */}
          <div className={styles.dualDahsboard}>
            <Image
              className={styles.intersectIcon2}
              width={184.6}
              height={135.6}
              sizes="100vw"
              alt=""
              src="/Intersect2.svg"
            />
            <Image
              className={styles.intersectIcon3}
              width={219}
              height={165}
              sizes="100vw"
              alt=""
              src="/Intersect3.svg"
            />
            <Image
              className={styles.icon}
              width={100}
              height={100}
              sizes="100vw"
              alt=""
              src="/5.svg"
            />
            <b className={styles.dualDashboardAccess}>Dual Dashboard Access</b>
            <div className={styles.whetherYoureA}>
              Whether you’re a client or a service provider, access tailored
              dashboards designed for easy booking, service management, and
              real-time updates.
            </div>
          </div>
        </div>
      </div>

      {/* why choose - now with scroll animations */}
      <div
        ref={whyChooseRef}
        className={`${styles.whyChooseSection} ${
          showWhyChoose ? styles.showWhyChoose : styles.hiddenWhyChoose
        }`}
      >
        <div
          className={`${styles.whyChooseServeaseContainer} ${styles.slideFromTopTitle}`}
        >
          <span className={styles.whyChooseServ}>
            <span className={styles.why}>Why</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.choose}>Choose</span>
            <span className={styles.span}>{` `}</span>
            <span>serv</span>
          </span>
          <span>
            <span className={styles.ease}>ease</span>
          </span>
        </div>

        {/* grid Section */}
        <div className={styles.whyChooseGrid}>
          <div className={`${styles.allInOneBox} ${styles.slideFromLeft}`}>
            <b className={styles.allInOnePlatform}>All-in-One Platform</b>
            <div className={styles.browseBookAnd}>
              Browse, book, and manage services—everything in one place.
            </div>
            <Image
              className={styles.intersectIcon8}
              width={117}
              height={91}
              sizes="100vw"
              alt=""
              src="/Intersect8.svg"
            />
          </div>

          <div
            className={`${styles.smartschedulingBox} ${styles.slideFromRight}`}
          >
            <div className={styles.wrapperIntersecthider}></div>
            <div className={styles.wrapperIntersect}>
              <Image
                className={styles.intersectIcon6}
                width={107}
                height={84}
                sizes="100vw"
                alt=""
                src="/Intersect6.svg"
              />
            </div>
            <div className={styles.landingPageInner} />
            <b className={styles.smartScheduling}>Smart Scheduling</b>
            <div className={styles.avoidConflictsWith}>
              Avoid conflicts with real-time booking and calendar sync.
            </div>
          </div>

          <div
            className={`${styles.transparentTrustworthyBox} ${styles.slideFromLeft}`}
          >
            <b className={styles.transparentTrustworthy}>
              Transparent & Trustworthy
            </b>
            <div className={styles.makeConfidentDecisions}>
              Make confident decisions with all the information at your
              fingertips.
            </div>
          </div>

          <div
            className={`${styles.builtForGrowthBox} ${styles.slideFromRight}`}
          >
            <div className={styles.wrapperIntersect1}>
              <Image
                className={styles.intersectIcon7}
                width={343.8}
                height={283}
                sizes="100vw"
                alt=""
                src="/Intersect7.svg"
              />
            </div>
            <div className={styles.builtForGrowthDiv}>
              <b className={styles.builtForGrowth}>Built for Growth</b>
              <div className={styles.boostYourPresence}>
                Boost your presence with customizable service listings,
                analytics insights, and a professional digital storefront.
              </div>
            </div>
            <div className={styles.instantMessagingDiv}>
              <b className={styles.instantMessaging}>Instant Messaging</b>
              <div className={styles.connectInstantlyFor}>
                Connect instantly for questions, updates, and confirmations.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----SIGN IN SECTION----- */}
      <div className={styles.register}>
        <div className={styles.background}>
          <div className={styles.heading2}>
            <b className={styles.areYouLookingContainer}>
              <span className={styles.aboutUsTxtContainer}>
                <p className={styles.areYouLooking}>Are You Looking</p>
                <p className={styles.areYouLooking}>For a Service Provider ?</p>
              </span>
            </b>
          </div>
          <div className={styles.findTrustedProfessionals}>
            Find trusted professionals across various fields—fast, reliable, and
            tailored to your needs.
          </div>
          <div className={styles.link}>
            <div className={styles.getStarted}>Get Started</div>
            <Image
              className={styles.svgIcon}
              width={14}
              height={14}
              sizes="100vw"
              alt=""
              src="/SVG1.svg"
            />
          </div>
          <Image
            className={styles.serveaseLogoAlbumCover32}
            width={145}
            height={145}
            sizes="100vw"
            alt=""
            src="/Client Logo.svg"
          />
        </div>

        <div className={styles.background1}>
          <div className={styles.heading21}>
            <b className={styles.areYouOffering}>Are You Offering a Service?</b>
          </div>
          <div className={styles.findTrustedProfessionals}>
            Connect with clients actively searching for what you offer. Grow
            your business with ease.
          </div>
          <div className={styles.link1}>
            <div className={styles.getStarted}>Get Started</div>
            <Image
              className={styles.svgIcon}
              width={14}
              height={14}
              sizes="100vw"
              alt=""
              src="/SVG2.svg"
            />
          </div>
          <div className={styles.electricCar2svgFill} />
          <Image
            className={styles.serveaseLogoAlbumCover1}
            width={145}
            height={145}
            sizes="100vw"
            alt=""
            src="/Facility Logo.svg"
          />
        </div>
      </div>

      {/* -----FOOTER----- */}
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
        <b className={styles.servease}>servease</b>
        <div className={styles.home}>Home</div>
        <div className={styles.discover}>Discover</div>
        <div className={styles.createAnAccount}>Create an Account</div>
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
    </div>
  );
};

export default LandingPage;
