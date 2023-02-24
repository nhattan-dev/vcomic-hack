export const getChapterConfig = (cookie, comicId) => ({
  method: "get",
  url: `https://vcomic.net/app/manga/controllers/cont.getChapterList.php?comicId=${comicId}`,
  headers: {
    cookie,
  },
});

export const readChapterConfig = (cookie, url) => ({
  method: "head",
  url: `https://vcomic.net${url}`,
  headers: {
    cookie,
  },
});

export const getPointConfig = (cookie, data) => ({
  method: "post",
  url: "https://vcomic.net/app/manga/controllers/cont.updateLevel.php?type=chapter",
  headers: {
    cookie,
  },
  data,
});

export const getTokenConfig = (PHPSESSID) => ({
  method: "get",
  url: "https://vcomic.net/account/login",
  headers: {
    Cookie: `PHPSESSID=${PHPSESSID}`,
  },
});

export const getLoginConfig = (token, PHPSESSID, data) => ({
  method: "post",
  url: `https://vcomic.net/controllers/cont.userForm.php?action=login&token=${token}`,
  headers: {
    Cookie: `PHPSESSID=${PHPSESSID}`,
    // ...data.getHeaders(),
  },
  data,
});

const constants = {
  GET_CHAPTER: "GET_CHAPTER",
  READ_CHAPTER: "READ_CHAPTER",
  GET_POINT: "GET_POINT",
  GET_TOKEN: "GET_TOKEN",
  GET_LOGIN: "GET_LOGIN",
};

const config = {
  GET_CHAPTER: (comicId) => ({
    method: "get",
    url: `https://vcomic.net/app/manga/controllers/cont.getChapterList.php?comicId=${comicId}`,
  }),
  READ_CHAPTER: (url) => ({
    method: "head",
    url: `https://vcomic.net${url}`,
  }),
  GET_POINT: (data) => ({
    method: "post",
    url: "https://vcomic.net/app/manga/controllers/cont.updateLevel.php?type=chapter",
    data,
  }),
  GET_TOKEN: () => ({
    method: "get",
    url: "https://vcomic.net/account/login",
  }),
  GET_LOGIN: (token, data) => ({
    method: "post",
    url: `https://vcomic.net/controllers/cont.userForm.php?action=login&token=${token}`,
    data,
  }),
};

const getConfig = (name, PHPSESSID) => ({
  ...config(name),
  headers: {
    Cookie: `PHPSESSID=${PHPSESSID}`,
  },
});
