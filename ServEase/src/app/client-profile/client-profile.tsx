import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/client-profile.module.css";

const ProfileClient: NextPage = () => {
  return (
    <div className={styles.profileClient}>
      <div className={styles.content}>
        <div className={styles.pfpContainer} />
        <Image
          className={styles.pfpCoverIcon}
          width={1032}
          height={148}
          sizes="100vw"
          alt=""
          src="/client-cover.png"
        />
        <div className={styles.profileInfo}>
          <div className={styles.clientemailcom}>client@email.com</div>
          <div className={styles.clientName}>Client Name</div>
        </div>
        <div className={styles.emailAdd}>
          <div className={styles.emailAddTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Email Address</div>
        </div>
        <div className={styles.emailAddress1}>Email Address</div>
        <div className={styles.birthdate}>
          <div className={styles.emailAddTbx} />
          <div className={styles.emailAddress}>Day Month Year</div>
        </div>
        <div className={styles.dateOfBirth}>Date of Birth</div>
        <div className={styles.address}>
          <div className={styles.emailAddTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Address</div>
        </div>
        <div className={styles.address2}>Address</div>
        <div className={styles.contactNum}>
          <div className={styles.emailAddTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>+63 9XX XXXX XXX</div>
        </div>
        <div className={styles.contactNumber}>Contact Number</div>
        <div className={styles.gender}>
          <div className={styles.emailAddTbx} />
          <div className={styles.emailAddress}>Gender</div>
        </div>
        <div className={styles.gender2}>Gender</div>
        <div className={styles.name}>
          <div className={styles.emailAddTbx} />
          <Image
            className={styles.icon}
            width={18}
            height={18}
            sizes="100vw"
            alt=""
            src="/edit-gray.svg"
          />
          <div className={styles.emailAddress}>Name</div>
        </div>
        <div className={styles.name2}>Name</div>
        <div className={styles.pfp}>
          <Image
            className={styles.avatarIcon}
            width={70.5}
            height={64.1}
            sizes="100vw"
            alt=""
            src="/avatar.svg"
          />
        </div>
        <div className={styles.saveProfileBtn}>
          <div className={styles.editLabel}>
            <div className={styles.save}>Save</div>
          </div>
          <Image
            className={styles.checkIcon}
            width={20}
            height={20}
            sizes="100vw"
            alt=""
            src="/check_thin.svg"
          />
        </div>
        <div className={styles.editProfileBtn}>
          <div className={styles.editLabel}>
            <div className={styles.save}>Edit</div>
          </div>
          <Image
            className={styles.checkIcon}
            width={20}
            height={20}
            sizes="100vw"
            alt=""
            src="/edit-white.svg"
          />
        </div>
        <div className={styles.circleEditPfp} />
        <Image
          className={styles.editPfpIcon}
          width={19}
          height={19}
          sizes="100vw"
          alt=""
          src="/edit-profile.svg"
        />
        <div className={styles.moreActions} />
        <div className={styles.passLabel}>
          <div className={styles.password}>Password</div>
        </div>
        <div className={styles.changePassBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Change Password</div>
        </div>
        <div className={styles.circlePassword} />
        <Image
          className={styles.lockIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/change-pass.svg"
        />
        <div className={styles.notifLabel}>
          <div className={styles.password}>Notifications</div>
        </div>
        <div className={styles.enableBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Enable</div>
        </div>
        <div className={styles.circleNotif} />
        <Image
          className={styles.notificationIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/notification-enable.svg"
        />
        <div className={styles.accountLabel}>
          <div className={styles.password}>Account</div>
        </div>
        <div className={styles.deleteAccBtn}>
          <div className={styles.btn} />
          <div className={styles.changePassword}>Delete Account</div>
        </div>
        <div className={styles.circleSetting} />
        <Image
          className={styles.settingIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/setting-client.svg"
        />
      </div>
      <b className={styles.profile}>Profile</b>
    </div>
  );
};

export default ProfileClient;

/*
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/client-profile.module.css";

const ProfileClient: NextPage = () => {
  return (
    <div className={styles.profileClient}>
      <div className={styles.joinUs}>
        <div className={styles.joinUsChild} />
        <div className={styles.paraContent} />
        <div className={styles.joinUsItem} />
        <div className={styles.joinUsInner} />
        <div className={styles.rectangleDiv} />
        <div className={styles.name}>Name</div>
        <div className={styles.gender}>Gender</div>
        <div className={styles.contactNumber}>Contact Number</div>
        <div className={styles.address}>Address</div>
        <div className={styles.dateOfBirth}>Date of Birth</div>
        <div className={styles.emailAddress}>Email Address</div>
        <Image
          className={styles.rectangleIcon}
          width={1032}
          height={148}
          sizes="100vw"
          alt=""
          src="/client-cover.png"
        />
        <div className={styles.clientNameParent}>
          <div className={styles.clientName}>Client Name</div>
          <div className={styles.clientemailcom}>client@email.com</div>
        </div>
        <div className={styles.joinUsChild1} />
        <div className={styles.joinUsChild2} />
        <div className={styles.joinUsChild3} />
        <div className={styles.joinUsChild4} />
        <div className={styles.joinUsChild5} />
        <div className={styles.joinUsChild6} />
        <div className={styles.name1}>Name</div>
        <div className={styles.gender1}>Gender</div>
        <div className={styles.xxXxxxXxx}>+63 9XX XXXX XXX</div>
        <div className={styles.address1}>Address</div>
        <div className={styles.dayMonthYear}>Day Month Year</div>
        <div className={styles.emailAddress1}>Email Address</div>
        <div className={styles.genericAvatar1}>
          <Image
            className={styles.avatarPlaceholderIcon1}
            width={70.5}
            height={64.1}
            sizes="100vw"
            alt=""
            src="/avatar.svg"
          />
        </div>
        <div className={styles.button}>
          <div className={styles.buttonInner}>
            <div className={styles.editWrapper}>
              <div className={styles.edit}>Edit</div>
            </div>
          </div>
          <Image
            className={styles.edit03Icon}
            width={20}
            height={20}
            sizes="100vw"
            alt=""
            src="/edit-white.svg"
          />
        </div>
        <div className={styles.ellipseDiv}>
          <Image
            className={styles.edit03Icon1}
            width={19}
            height={19}
            sizes="100vw"
            alt=""
            src="/edit-profile.svg"
          />
        </div>
        <div className={styles.passwordWrapper}>
          <div className={styles.password}>Password</div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild1} />
          <div className={styles.changePassword}>Change Password</div>
        </div>
        <div className={styles.joinUsChild7} />
        <div className={styles.notificationsWrapper}>
          <div className={styles.password}>Notifications</div>
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupChild1} />
          <div className={styles.changePassword}>Enable</div>
        </div>
        <div className={styles.joinUsChild8} />
        <Image
          className={styles.vuesaxboldlockIcon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/change-pass.svg"
        />
        <div className={styles.notification}>
          <Image
            className={styles.vuesaxboldnotificationIcon}
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/notification-enable.svg"
          />
        </div>
        <div className={styles.accountWrapper}>
          <div className={styles.password}>Account</div>
        </div>
        <div className={styles.rectangleContainer}>
          <div className={styles.groupChild1} />
          <div className={styles.changePassword}>Delete Account</div>
        </div>
        <div className={styles.joinUsChild9} />
        <Image
          className={styles.vuesaxboldsetting2Icon}
          width={24}
          height={24}
          sizes="100vw"
          alt=""
          src="/setting-client.svg"
        />
      </div>
      <b className={styles.profile}>Profile</b>
    </div>
  );
};

export default ProfileClient;
*/

/*

change password

const ChangePassword: NextPage = () => {
  return (
    <div className={styles.changePassword}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.xWrapper}>
            <Image
              className={styles.xIcon}
              width={30}
              height={30}
              sizes="100vw"
              alt=""
              src="x.svg"
            />
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.changeYourPasswordWrapper}>
              <b className={styles.changeYourPassword}>Change your password</b>
            </div>
            <div className={styles.enterYourCurrent}>
              Enter your current password and new password.
            </div>
          </div>
        </div>
        <Image
          className={styles.frameChild}
          width={471}
          height={1}
          sizes="100vw"
          alt=""
          src="Line 261.svg"
        />
        <div className={styles.frameDiv}>
          <div className={styles.frameItem} />
          <div className={styles.frameParent1}>
            <div className={styles.currentPasswordWrapper}>
              <div className={styles.changeYourPassword}>Current Password</div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.changeYourPassword}>New Password</div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
            <div className={styles.frameInner} />
            <div className={styles.currentPasswordWrapper}>
              <div className={styles.changeYourPassword}>
                Confirm New Password
              </div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.icons} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.button}>
            <div className={styles.buttonInner}>
              <div className={styles.buttonInner}>
                <div className={styles.updatePassword}>Update Password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

*/

/*

delete account

const DeleteAccount: NextPage = () => {
  return (
    <div className={styles.deleteAccount}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.xWrapper}>
            <Image
              className={styles.xIcon}
              width={30}
              height={30}
              sizes="100vw"
              alt=""
              src="x.svg"
            />
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.deleteAccountWrapper}>
              <b className={styles.password}>Delete Account</b>
            </div>
            <div className={styles.areYouSure}>
              Are you sure you want to delete your account? This will
              immediately log you out of your account and you will not be able
              to log in again.
            </div>
          </div>
        </div>
        <Image
          className={styles.frameChild}
          width={471}
          height={1}
          sizes="100vw"
          alt=""
          src="Line 261.svg"
        />
        <div className={styles.frameDiv}>
          <div className={styles.frameItem} />
          <div className={styles.frameParent1}>
            <div className={styles.passwordWrapper}>
              <div className={styles.password}>Password</div>
            </div>
            <div className={styles.textField}>
              <div className={styles.inputs} />
              <div className={styles.eyeOff}>
                <Image
                  className={styles.icon}
                  width={33.9}
                  height={27.5}
                  sizes="100vw"
                  alt=""
                  src="Icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.groupParent}>
          <div className={styles.groupWrapper}>
            <div className={styles.groupWrapper}>
              <div className={styles.button}>
                <div className={styles.buttonInner}>
                  <div className={styles.cancelWrapper}>
                    <div className={styles.cancel}>Cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.groupContainer}>
            <div className={styles.buttonContainer}>
              <div className={styles.button1}>
                <div className={styles.buttonChild}>
                  <div className={styles.cancelWrapper}>
                    <div className={styles.cancel}>Delete Account</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

*/
