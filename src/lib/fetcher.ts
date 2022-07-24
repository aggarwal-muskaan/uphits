const fetcher = async (
  method: "POST" | "GET" | "PUT",
  url: string,
  data = undefined
) => {
  return fetch(`${window.location.origin}/api${url}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
};

export default fetcher;
