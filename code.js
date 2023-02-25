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

const getChapterConfig = (cookie, comicId) => ({
  method: "get",
  url: `https://vcomic.net/app/manga/controllers/cont.getChapterList.php?comicId=${comicId}`,
  headers: {
    cookie,
  },
});

const readChapterConfig = (cookie, url) => ({
  method: "head",
  url: `https://vcomic.net${url}`,
  headers: {
    cookie,
  },
});

const getPointConfig = (cookie, data) => ({
  method: "post",
  url: "https://vcomic.net/app/manga/controllers/cont.updateLevel.php?type=chapter",
  headers: {
    cookie,
  },
  data,
});

const getTokenConfig = (PHPSESSID) => ({
  method: "get",
  url: "https://vcomic.net/account/login",
  // headers: {
  //   Cookie: `PHPSESSID=${PHPSESSID}`,
  // },
});

const getLoginConfig = (token, PHPSESSID, data) => ({
  method: "post",
  url: `https://vcomic.net/controllers/cont.userForm.php?action=login&token=${token}`,
  headers: {
    Cookie: `PHPSESSID=${PHPSESSID}`,
    // ...data.getHeaders(),
  },
  data,
});

const PHPSESSIDGenerator = (length) => {
  var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";

  var result = "";
  for (var i = 0; i < length; ++i) {
    result += alphabet[Math.floor(alphabet.length * Math.random())];
  }
  return result;
};

const getToken = (htmlString) => {
  const firstMatched =
    /cont\.userForm\.php\?action=login&token=[a-z0-9]*/g.exec(htmlString)[0];

  const secondMatched = /token=[a-z0-9]*/g.exec(firstMatched)[0];

  return secondMatched.split("=")[1];
};

const getLoginForm = () => {
  const data = new FormData();
  data.append("email", "ltwnhattan+2@gmail.com");
  data.append("password", "0502ngocty");
  data.append("isRemember", "on");
  return data;
};

let count = 0;

const VComic = async (comicId) => {
  try {
    const PHPSESSID = PHPSESSIDGenerator(26);

    console.log("PHPSESSID", PHPSESSID);
    const htmlString = await (
      await axios.request(getTokenConfig(PHPSESSID))
    ).data;
    console.log("htmlString", htmlString);

    const token = getToken(htmlString);
    const data = getLoginForm();

    const activateSessionResponse = await (
      await axios.request(getLoginConfig(token, PHPSESSID, data))
    ).data;

    if (activateSessionResponse === "...") {
      console.log("successfully");
      // const cookie = `PHPSESSID=${PHPSESSID}`;
      // const chapters = await (
      //   await axios.request(getChapterConfig(cookie, comicId))
      // ).data.chapters;
      // console.log(chapters);
      // chapters.forEach(async ({ url, chapterId }) => {
      //   try {
      //     await axios.request(readChapterConfig(cookie, url));
      //     const response = await axios.request(
      //       // this one can get from updateChapter endpoint
      //       getPointConfig(
      //         cookie,
      //         `chapterId=${chapterId}&levelToken=dc6f955c58`
      //       )
      //     );
      //     if (response.data["success"]) {
      //       console.log(++count);
      //     }
      //   } catch (error) {
      //     // console.log(error);
      //     return;
      //   }
      // });
    } else {
      console.log("failed to activate session");
    }
  } catch (error) {}
};

// const constants = {
//   GET_CHAPTER: "GET_CHAPTER",
//   READ_CHAPTER: "READ_CHAPTER",
//   GET_POINT: "GET_POINT",
//   GET_TOKEN: "GET_TOKEN",
//   GET_LOGIN: "GET_LOGIN",
// };

// const config = {
//   GET_CHAPTER: (comicId) => ({
//     method: "get",
//     url: `https://vcomic.net/app/manga/controllers/cont.getChapterList.php?comicId=${comicId}`,
//   }),
//   READ_CHAPTER: (url) => ({
//     method: "head",
//     url: `https://vcomic.net${url}`,
//   }),
//   GET_POINT: (data) => ({
//     method: "post",
//     url: "https://vcomic.net/app/manga/controllers/cont.updateLevel.php?type=chapter",
//     data,
//   }),
//   GET_TOKEN: () => ({
//     method: "get",
//     url: "https://vcomic.net/account/login",
//   }),
//   GET_LOGIN: (token, data) => ({
//     method: "post",
//     url: `https://vcomic.net/controllers/cont.userForm.php?action=login&token=${token}`,
//     data,
//   }),
// };

// const getConfig = (name, PHPSESSID) => ({
//   ...config(name),
//   headers: {
//     Cookie: `PHPSESSID=${PHPSESSID}`,
//   },
// });

const onSubmit = async () => {
  // const email = document.getElementById(constants.EMAIL).value;
  // const password = document.getElementById(constants.PASSWORD).value;
  // const vemail = document.getElementById(constants.VCOMIC_EMAIL).value;
  // const vpassword = document.getElementById(constants.VCOMIC_PASSWORD).value;

  // const secrectKey = email + "_" + password;
  // if (secrectKey === "vcomic_nhattan") alert(secrectKey);
  // else alert(md5(secrectKey));
  // const call = async () => {
  //   const req = await axios.request({
  //     url: "https://vcomic.net/doc-ta-la-ta-de-chuong-338.html",
  //     headers: {
  //       // Cookie: "PHPSESSID=bfnkm5dou5rijo0ek5gpnnn3el",
  //       // "Access-Control-Allow-Origin": "*",
  //       // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //       // "Access-Control-Allow-Headers": "Content-Type",
  //       // "Access-Control-Allow-Credentials": true,
  //     },
  //     // withCredentials: true,
  //   });
  //   console.log(req);
  // };
  // call();
  VComic(3);
};
