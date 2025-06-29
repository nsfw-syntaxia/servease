import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/servicesoffered.module.css";

const SevicesOffered: NextPage = () => {
  return (
    <div className={styles.sevicesOffered}>
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
                src="/Frame 1.svg"
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
          <div className={styles.joinUsItem} />
          <div className={styles.joinUsInner}>
            <div className={styles.serviceNameDescriptionPriceParent}>
              <div className={styles.serviceNameDescription}>
                {" "}
                Service Name Description Price Duration
              </div>
              <div className={styles.groupParent}>
                <div className={styles.groupWrapper}>
                  <div className={styles.groupContainer}>
                    <div className={styles.groupContainer}>
                      <div className={styles.heroImage}>
                        <div className={styles.serviceName1}>
                          service name 1
                        </div>
                        <div className={styles.description}>description</div>
                        <div className={styles.p50000}>P500.00</div>
                        <div className={styles.min}>30 min.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.groupFrame}>
                  <div className={styles.groupContainer}>
                    <div className={styles.groupContainer}>
                      <div className={styles.heroImage}>
                        <div className={styles.serviceName1}>
                          service name 1
                        </div>
                        <div className={styles.description}>description</div>
                        <div className={styles.p50000}>P500.00</div>
                        <div className={styles.min}>30 min.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.groupWrapper1}>
                  <div className={styles.groupContainer}>
                    <div className={styles.groupContainer}>
                      <div className={styles.heroImage}>
                        <div className={styles.serviceName1}>
                          service name 1
                        </div>
                        <div className={styles.description}>description</div>
                        <div className={styles.p50000}>P500.00</div>
                        <div className={styles.min}>30 min.</div>
                        <Image
                          className={styles.deleteIcon}
                          width={24}
                          height={24}
                          sizes="100vw"
                          alt=""
                          src="/delete.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b className={styles.servicesOffered}>
        <span className={styles.servicesOfferedTxtContainer}>
          <span>Services</span>
          <span className={styles.offered}> Offered</span>
        </span>
      </b>
      <b className={styles.profile}>Profile</b>
      <div className={styles.buttonParent}>
        <div className={styles.button}>
          <div className={styles.buttonInner}>
            <div className={styles.addServiceWrapper}>
              <div className={styles.addService}>Add Service</div>
            </div>
          </div>
          <Image
            className={styles.buttonChild}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/Group 1000003060.png"
          />
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.button1}>
            <div className={styles.buttonInner1}>
              <div className={styles.addServiceWrapper}>
                <div className={styles.addService}>Edit</div>
              </div>
            </div>
            <Image
              className={styles.edit03Icon}
              width={20}
              height={20}
              sizes="100vw"
              alt=""
              src="/edit-03.svg"
            />
          </div>
        </div>
      </div>
      <Image
        className={styles.outlineArrowsArrowLeft}
        width={26}
        height={26}
        sizes="100vw"
        alt=""
        src="/Outline / Arrows / Arrow Left.svg"
      />
    </div>
  );
};

export default SevicesOffered;
