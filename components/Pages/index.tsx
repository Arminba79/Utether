import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import { parse } from "path";
import "boxicons/css/boxicons.min.css";

export default (p) => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  let styles = global.styles;

  return (
    <div
      className="bg-[#213A57] h-full"
      style={{ direction: "rtl", minHeight: "11vh" }}
    >
      <br-x />

      <section className=" container-fluid flex flex-wrap justify-center gap-6 bg-[#213A57]">
        {/* title */}
        <div className="w-full  h-full flex justify-center items-center gap-3  font-semibold mt-3 text-white">
          <i className="bx bxs-badge-dollar text-5xl text-yellow-400"></i>
          <span className="text-3xl"> قیمت لحظه ای تتر (دلار)</span>
        </div>

        {/* قیمت لحظه ای */}
        <div className="bg-[#f12626c5] w-10/12 md:w-5/12 flex gap-3 items-center rounded-lg mt-5 h-28 shadow-md shadow-black hover:shadow-white transition duration-300  ">
          <i className="bx bxs-coin-stack text-7xl ms-3 text-yellow-400"></i>
          <span className="text-xl font-semibold text-white">
            قیمت لحظه ای :
          </span>
          <span className="text-xl font-semibold text-white">
            {(props.p.price as number).toLocaleString("fa-IR")}
          </span>
        </div>
        {/* تغیرات ۲۴ ساعته */}
        <div className="bg-[#44c424b2] w-10/12 md:w-5/12 flex gap-3 items-center rounded-lg mt-5 h-28 shadow-md shadow-black hover:shadow-white transition duration-300  ">
          <i className="bx bxs-time text-7xl ms-3 text-white"></i>
          <span className="text-xl font-semibold text-white">
            تغیرات ۲۴ ساعته :
          </span>
          <span className="text-xl font-semibold text-white">
            % {Number(props.p.diff24d).toLocaleString("fa-IR")}
          </span>
        </div>
        {/* تغیرات هفتگی */}
        <div className="bg-[#2663f1c5] w-10/12 md:w-5/12 flex gap-3 items-center rounded-lg mt-5 h-28 shadow-md shadow-black hover:shadow-white transition duration-300  ">
          <i className="bx bx-calendar-week text-7xl ms-3 text-rose-600"></i>
          <span className="text-xl font-semibold text-white">
            تغیرات هفتگی :
          </span>
          <span className="text-xl font-semibold text-white">
            {Number(props.p.diff7d).toLocaleString("fa-IR")}
          </span>
        </div>
        {/* تغیرات ماهانه  */}
        <div className="bg-[#cc26f1c5] w-10/12 md:w-5/12 flex gap-3 items-center rounded-lg mt-5 h-28 shadow-md shadow-black hover:shadow-white transition duration-300  ">
          <i className="bx bx-calendar text-7xl ms-3 "></i>
          <span className="text-xl font-semibold text-white">
            تغیرات ماهانه :
          </span>
          <span className="text-xl font-semibold text-white">
            {Number(props.p.diff7d).toLocaleString("fa-IR")}
          </span>
        </div>
           {/* max & min 7 d */}
        <div className=" border shadow-lg shadow-red-600 w-[10rem] rounded-lg   h-32 flex flex-col font-bold gap-5 items-center mt-10">
          <span className="-mt-10 text-white">کمترین قیمت ۷ روز گذشته </span>
          <span className="mt-10 text-3xl text-white"> {Number(props.p.last7dMin).toLocaleString("fa-IR")}</span>
        </div>

        <div className=" border shadow-lg shadow-green-600 w-[10rem] rounded-lg   h-32 flex flex-col font-bold gap-5 items-center mt-10">
          <span className="-mt-10 text-white">بالاترین قیمت ۷ روز گذشته </span>
          <span className="mt-10 text-3xl text-white"> {Number(props.p.last7dMax).toLocaleString("fa-IR")}</span>
        </div>

        {/* max & min 30D */}
        <div className=" border shadow-lg shadow-red-600 w-[10rem] rounded-lg   h-32 flex flex-col font-bold gap-5 items-center mt-10">
          <span className="-mt-10 text-white">کمترین قیمت ۳۰ روز گذشته </span>
          <span className="mt-10 text-3xl text-white"> {Number(props.p.last30dMin).toLocaleString("fa-IR")}</span>
        </div>

        <div className=" border shadow-lg shadow-green-600 w-[10rem] rounded-lg   h-32 flex flex-col font-bold gap-5 items-center mt-10">
          <span className="-mt-10 text-white">بالاترین قیمت ۳۰ روز گذشته </span>
          <span className="mt-10 text-3xl text-white"> {Number(props.p.last30dMax).toLocaleString("fa-IR")}</span>
        </div>
      </section>


    </div>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let res = await fetch("https://api.tetherland.com/currencies");
  let data = await res.json();
  let p = data.data.currencies.USDT;

  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
        // nlangs,
      }),
    },
  };
}
