const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const closeButton = document.querySelector(".close-button");
const scrollDown = document.querySelector(".scroll-down");
let isOpened = false;

const openModal = () => {
  modal.classList.add("is-open");
  body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("is-open");
  body.style.overflow = "initial";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 3 && !isOpened) {
    isOpened = true;
    scrollDown.style.display = "none";
    openModal();
  }
});

modalButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

document.onkeydown = (evt) => {
  evt = evt || window.event;
  evt.keyCode === 27 ? closeModal() : false;
};

const constants = {
  EMAIL: "email",
  PASSWORD: "password",
  VCOMIC_EMAIL: "vemail",
  VCOMIC_PASSWORD: "vpassword",
};

// import md5 from "md5";

// import axios from "axios";

// import * as md5 from "./node_modules/md5/md5.js";

const onSubmit = async () => {
  // const email = document.getElementById(constants.EMAIL).value;
  // const password = document.getElementById(constants.PASSWORD).value;
  // const vemail = document.getElementById(constants.VCOMIC_EMAIL).value;
  // const vpassword = document.getElementById(constants.VCOMIC_PASSWORD).value;

  // const secrectKey = email + "_" + password;
  // if (secrectKey === "vcomic_nhattan") alert(secrectKey);
  // else alert(md5(secrectKey));
  const call = async () => {
    const req = await axios.request({
      url: "https://vcomic.net/doc-ta-la-ta-de-chuong-338.html",
      headers: {
        // Cookie: "PHPSESSID=bfnkm5dou5rijo0ek5gpnnn3el",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Credentials": true,
      },
      // withCredentials: true,
    });
    console.log(req);
  };
  call();
};
