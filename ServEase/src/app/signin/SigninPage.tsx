import { useCallback } from "react";
import Image from "next/image";

const ClientSignup = () => {
  return (
    <div className="w-full relative bg-white border-black border-solid border-[1px] box-border h-[1024px] overflow-hidden text-center text-lg text-white font-dm-sans">
      <div className="absolute top-[0px] left-[-128px] w-[1568px] h-[1024px]">
        <div className="absolute top-[0px] left-[128px] [background:linear-gradient(180deg,_#a68465,_#624c3f_50.48%,_#a68465)] w-[1440px] h-[1024px] overflow-hidden" />
        <div className="absolute top-[0px] left-[128px] [backdrop-filter:blur(76px)] bg-whitesmoke w-[1440px] h-[1024px] overflow-hidden" />
        <div className="absolute top-[145px] left-[717px] w-[732px] h-[750px]">
          <div className="absolute top-[0px] left-[0px] shadow-[0px_2px_8px_rgba(40,_41,_61,_0.08),_0px_20px_32px_rgba(96,_97,_112,_0.24)] rounded-3xl bg-white w-[732px] h-[750px] overflow-hidden">
            <div className="absolute top-[16px] right-[16px] w-6 h-6 overflow-hidden hidden" />
          </div>
          <div className="absolute top-[45.62px] left-[64px] w-[604px] h-[594.8px]">
            <div className="absolute top-[0px] left-[0px] w-[604px] flex flex-col items-center justify-start py-0 px-[75px] box-border gap-[65px]">
              <div className="self-stretch flex flex-col items-center justify-center">
                <div className="w-[604px] rounded-xl overflow-hidden flex flex-row items-start justify-start">
                  <div className="w-[302px] relative bg-tan h-14 overflow-hidden shrink-0 opacity-[0.5] cursor-pointer">
                    {" "}
                    {/*onClick={onTabsNavContainerClick*/}
                    <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_25px)] font-semibold">
                      Log In
                    </div>
                  </div>
                  <div className="w-[302px] relative bg-tan h-14 overflow-hidden shrink-0">
                    <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_33px)] font-semibold">
                      Sign Up
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 text-[40px] text-gray-200">
                <div className="relative">
                  <span>Welcome to serv</span>
                  <b>ease</b>
                  <span>!</span>
                </div>
                <div className="relative text-xl text-slategray">
                  Create your account to get started now.
                </div>
              </div>
              <div className="w-[570px] relative h-[197.8px] text-left text-xl text-gray-100 font-poppins">
                <div className="absolute top-[111.76px] left-[0px] w-[570px] h-[86px]">
                  <div className="absolute top-[0px] left-[0px] w-[570px] h-[86px]">
                    <div className="absolute top-[0px] left-[0px] rounded-[15px] border-dimgray border-solid border-[1px] box-border w-[570px] h-[86px]" />
                    <div className="absolute top-[0px] left-[0px] rounded-[15px] border-gainsboro border-solid border-[1px] box-border w-[570px] h-[86px]" />
                    <Image
                      className="absolute top-[21px] left-[25px] w-[103px] h-[45px] object-cover"
                      width={103}
                      height={45}
                      sizes="100vw"
                      alt=""
                      src="/Servease Logo.svg"
                    />
                    {/*//src="Group 35.png" /*/}
                    <div className="absolute top-[16px] left-[148px] w-[308px] h-[54px]">
                      <div className="absolute top-[0px] left-[0px] tracking-[0.02em] font-semibold">
                        Service Provider
                      </div>
                      <div className="absolute top-[30px] left-[0px] text-base tracking-[0.02em] font-light">
                        I’m running a service-based business
                      </div>
                    </div>
                    <Image
                      className="absolute top-[9.61px] left-[533px] w-[25px] h-[25px]"
                      width={25}
                      height={25}
                      sizes="100vw"
                      alt=""
                      src="/Servease Logo.svg"
                    />
                    {/*src="Group 82.svg" />*/}
                  </div>
                </div>
                <div className="absolute top-[0px] left-[0px] w-[570px] h-[86px]">
                  <div className="absolute top-[0px] left-[0px] w-[570px] h-[86px] cursor-pointer">
                    {" "}
                    {/*//onClick={onTabsNavContainerClick}>*/}
                    <div className="absolute top-[0px] left-[0px] rounded-[15px] border-dimgray border-solid border-[2px] box-border w-[570px] h-[86px]" />
                    <Image
                      className="absolute top-[25px] left-[25px] w-[35px] h-[35px] object-cover"
                      width={35}
                      height={35}
                      sizes="100vw"
                      alt=""
                      src="/Servease Logo.svg"
                    />
                    {/*src="Group 32.png" />*/}
                    <div className="absolute top-[16px] left-[148px] w-[322px] h-[54px]">
                      <div className="absolute top-[0px] left-[0px] tracking-[0.02em] font-semibold">
                        Client
                      </div>
                      <div className="absolute top-[30px] left-[0px] text-base tracking-[0.02em] font-light">
                        I’m looking for trusted service providers
                      </div>
                    </div>
                    <div className="absolute top-[10px] left-[533px] rounded-[50%] bg-dimgray w-[25px] h-[25px]" />
                    <Image
                      className="absolute top-[16.38px] left-[538px] w-[15px] h-[11px]"
                      width={15}
                      height={11}
                      sizes="100vw"
                      alt=""
                      src="/Servease Logo.svg"
                    />
                    {/*src="Vector.svg" />*/}
                  </div>
                  <Image
                    className="absolute top-[25px] left-[93px] rounded-[50%] w-[35px] h-[35px] object-cover"
                    width={35}
                    height={35}
                    sizes="100vw"
                    alt=""
                    src="/Servease Logo.svg"
                  />
                  {/*src="Ellipse 6.png" />*/}
                  <Image
                    className="absolute top-[20px] left-[54px] rounded-[50%] w-[45px] h-[45px] object-cover"
                    width={45}
                    height={45}
                    sizes="100vw"
                    alt=""
                    src="/Servease Logo.svg"
                  />
                  {/*src="Ellipse 6.png" />*/}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-[25px] text-[22px]">
                <div className="w-[454px] relative rounded-[40px] bg-tan h-16 overflow-hidden shrink-0 opacity-[0.5]">
                  <div className="absolute top-[calc(50%_-_15px)] left-[calc(50%_-_100.5px)] flex flex-row items-center justify-center">
                    <div className="relative font-medium">
                      Create My Account
                    </div>
                  </div>
                </div>
                <div className="hidden flex-row items-start justify-start p-0.5 text-left text-base text-tan">
                  <div className="relative cursor-pointer">
                    {" "}
                    {/*onClick={onTabsNavContainerClick}>*/}
                    <span className="whitespace-pre-wrap">{`Don’t have an account?  `}</span>
                    <span className="[text-decoration:underline] font-medium whitespace-pre-wrap">{`Sign up  `}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[129px] right-[50px] w-8 h-8 overflow-hidden">
          <Image
            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
            width={32}
            height={32}
            sizes="100vw"
            alt=""
            src="/Servease Logo.svg"
          />
          {/*src="Vector.svg" />*/}
          <Image
            className="absolute h-[58.44%] w-[58.44%] top-[20.83%] right-[20.73%] bottom-[20.73%] left-[20.83%] max-w-full overflow-hidden max-h-full"
            width={18.7}
            height={18.7}
            sizes="100vw"
            alt=""
            src="/Servease Logo.svg"
          />
          {/*src="Vector.svg" />*/}
        </div>
        <Image
          className="absolute top-[23px] left-[0px] w-[832px] h-[978px] object-cover"
          width={832}
          height={978}
          sizes="100vw"
          alt=""
          src="/Servease Logo.svg"
        />
        {/*src="export 1.png" />*/}
      </div>
    </div>
  );
};

export default ClientSignup;
