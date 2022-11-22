import { errorResponse } from "./apiResponseStructure";

const fetcher = async (
  method: "POST" | "GET" | "PUT",
  url: string,
  data = undefined
) => {
  return await fetch(`${window.location.origin}/api${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status > 399 || res.status < 200) {
        const dataObj = errorResponse({
          code: res.status,
          message: res.statusText,
        });
        return dataObj;
      }

      return res.json();
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export default fetcher;
