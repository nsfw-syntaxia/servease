import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/facility-appointments.module.css";

const Appointments: NextPage = () => {
  return (
    <div className={styles.appointments}>
      <div className={styles.appointmentsParent}>
        <div className={styles.appointments1}>
          <div className={styles.appointmentsChild} />
          <b className={styles.appointments2}>Appointments</b>
          <div className={styles.appointmentsInner}>
            <div className={styles.groupParent}>
              <div className={styles.groupParent}>
                <div className={styles.groupParent}>
                  <div className={styles.heroImageParent}>
                    <div className={styles.heroImage}>
                      <Image
                        className={styles.avatarIcon}
                        width={110}
                        height={110}
                        sizes="100vw"
                        alt=""
                        src="/Avatar.svg"
                      />
                      <div className={styles.clientName}>Client Name</div>
                      <div className={styles.service}>Service</div>
                    </div>
                    <Image
                      className={styles.heroImageIcon}
                      width={900}
                      height={60}
                      sizes="100vw"
                      alt=""
                      src="/Hero Image.svg"
                    />
                  </div>
                  <div className={styles.pm}>1:00 PM</div>
                  <div className={styles.calendarMonthParent}>
                    <Image
                      className={styles.calendarMonthIcon}
                      width={19.5}
                      height={21.7}
                      sizes="100vw"
                      alt=""
                      src="/calendar_month.svg"
                    />
                    <div className={styles.wedJune30}>Wed, June 30</div>
                  </div>
                  <div className={styles.confirmed}>Confirmed</div>
                </div>
              </div>
              <div className={styles.viewDetailsParent}>
                <div className={styles.viewDetails}>View Details</div>
                <Image
                  className={styles.svgIcon}
                  width={17}
                  height={16}
                  sizes="100vw"
                  alt=""
                  src="/SVG.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.groupDiv}>
            <div className={styles.groupParent}>
              <div className={styles.groupParent}>
                <div className={styles.groupParent}>
                  <div className={styles.heroImageParent}>
                    <div className={styles.heroImage}>
                      <Image
                        className={styles.avatarIcon}
                        width={110}
                        height={110}
                        sizes="100vw"
                        alt=""
                        src="/Avatar.svg"
                      />
                      <div className={styles.clientName}>Client Name</div>
                      <div className={styles.service}>Service</div>
                    </div>
                    <Image
                      className={styles.heroImageIcon}
                      width={900}
                      height={60}
                      sizes="100vw"
                      alt=""
                      src="/Hero Image.svg"
                    />
                  </div>
                  <div className={styles.pm}>1:00 PM</div>
                  <div className={styles.calendarMonthParent}>
                    <Image
                      className={styles.calendarMonthIcon}
                      width={19.5}
                      height={21.7}
                      sizes="100vw"
                      alt=""
                      src="/calendar_month.svg"
                    />
                    <div className={styles.wedJune30}>Wed, June 30</div>
                  </div>
                  <div className={styles.confirmed1}>Confirmed</div>
                </div>
              </div>
              <div className={styles.viewDetailsParent}>
                <div className={styles.viewDetails}>View Details</div>
                <Image
                  className={styles.svgIcon}
                  width={17}
                  height={16}
                  sizes="100vw"
                  alt=""
                  src="/SVG.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.cancelled}>Cancelled</div>
          </div>
          <div className={styles.button1}>
            <div className={styles.cancelled}>Completed</div>
          </div>
          <div className={styles.button2}>
            <div className={styles.cancelled}>Pending</div>
            <div className={styles.button3}>
              <div className={styles.upcoming}>Upcoming</div>
            </div>
          </div>
          <Image
            className={styles.arrowDropDownIcon}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/arrow_drop_down.svg"
          />
          <Image
            className={styles.arrowDropDownIcon1}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/arrow_drop_down.svg"
          />
        </div>
        <div className={styles.card}>
          <div className={styles.groupParent}>
            <div className={styles.groupParent}>
              <div className={styles.groupParent}>
                <div className={styles.heroImageParent}>
                  <div className={styles.heroImage}>
                    <Image
                      className={styles.avatarIcon}
                      width={110}
                      height={110}
                      sizes="100vw"
                      alt=""
                      src="/Avatar.svg"
                    />
                    <div className={styles.clientName}>Client Name</div>
                    <div className={styles.service}>Service</div>
                  </div>
                  <Image
                    className={styles.heroImageIcon}
                    width={900}
                    height={60}
                    sizes="100vw"
                    alt=""
                    src="/Hero Image.svg"
                  />
                </div>
                <div className={styles.pm}>1:00 PM</div>
                <div className={styles.calendarMonthParent}>
                  <Image
                    className={styles.calendarMonthIcon}
                    width={19.5}
                    height={21.7}
                    sizes="100vw"
                    alt=""
                    src="/calendar_month.svg"
                  />
                  <div className={styles.wedJune30}>Wed, June 30</div>
                </div>
                <div className={styles.confirmed2}>Confirmed</div>
              </div>
              <Image
                className={styles.arrowDropDownIcon2}
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/arrow_drop_down.svg"
              />
            </div>
            <div className={styles.viewDetailsParent}>
              <div className={styles.viewDetails}>View Details</div>
              <Image
                className={styles.svgIcon}
                width={17}
                height={16}
                sizes="100vw"
                alt=""
                src="/SVG.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

/*

dropdown for appointment status management

const Dropdown: NextPage = () => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.image8Wrapper}>
        <div className={styles.image8} />
      </div>
      <div className={styles.image11Parent}>
        <div className={styles.image11} />
        <div className={styles.paraContentWrapper}>
          <div className={styles.paraContent}>
            <div className={styles.confirmed}>Confirmed</div>
          </div>
        </div>
        <div className={styles.paraContentContainer}>
          <div className={styles.paraContent1}>
            <div className={styles.pending}>Pending</div>
          </div>
        </div>
        <div className={styles.paraContentFrame}>
          <div className={styles.paraContent}>
            <div className={styles.pending}>Completed</div>
          </div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.paraContent}>
            <div className={styles.pending}>Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

*/
