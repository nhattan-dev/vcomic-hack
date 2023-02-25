// import axios from "axios";
// import FormData from "form-data";
import {
  getChapterConfig,
  getLoginConfig,
  getPointConfig,
  getTokenConfig,
  readChapterConfig,
} from "./config.js";

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

export const VComic = async (comicId) => {
  try {
    const PHPSESSID = PHPSESSIDGenerator(26);

    const htmlString = await (
      await axios.request(getTokenConfig(PHPSESSID))
    ).data;

    const token = getToken(htmlString);
    const data = getLoginForm();

    const activateSessionResponse = await (
      await axios.request(getLoginConfig(token, PHPSESSID, data))
    ).data;

    if (activateSessionResponse === "...") {
      console.log("PHPSESSID", PHPSESSID);
      const cookie = `PHPSESSID=${PHPSESSID}`;

      const chapters = await (
        await axios.request(getChapterConfig(cookie, comicId))
      ).data.chapters;
      console.log(chapters);
      chapters.forEach(async ({ url, chapterId }) => {
        try {
          await axios.request(readChapterConfig(cookie, url));

          const response = await axios.request(
            // this one can get from updateChapter endpoint
            getPointConfig(
              cookie,
              `chapterId=${chapterId}&levelToken=dc6f955c58`
            )
          );

          if (response.data["success"]) {
            console.log(++count);
          }
        } catch (error) {
          // console.log(error);
          return;
        }
      });
    } else {
      console.log("failed to activate session");
    }
  } catch (error) {}
};

// VComic(3);
