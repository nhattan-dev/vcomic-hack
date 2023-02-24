import axios from "axios";
import {
  getChapterConfig,
  getPointConfig,
  readChapterConfig,
} from "./config.js";

// this one can get from updateChapter endpoint
const cookie = "PHPSESSID=yekjimrv0iu1yadmb7akdpnsmf";
let count = 0;
const tool = async (comicId) => {
  const chapters = await (
    await axios.request(getChapterConfig(cookie, comicId))
  ).data.chapters;

  chapters.forEach(async ({ url, chapterId }) => {
    try {
      await axios.request(readChapterConfig(cookie, url));
    } catch (error) {
      return;
    }
    try {
      const response3 = await axios.request(
        // this one can get from updateChapter endpoint
        getPointConfig(cookie, `chapterId=${chapterId}&levelToken=dc6f955c58`)
      );

      if (response3.data["success"]) {
        console.log(++count);
      } else console.log(response3.data);
    } catch (error) {
      return;
    }
  });
};

tool(3);

setInterval(() => tool(3), 9000);
