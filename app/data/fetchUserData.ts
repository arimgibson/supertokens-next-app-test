"use server";

import { cookies, headers } from "next/headers";
import { getSSRSessionHelper } from "../components/getSSRHelper";

export const fetchUserData = async () => {
  // console.log({ cookies: cookies().getAll(), headers: headers() });
  // const { session, hasToken, hasInvalidClaims, error } = await getSSRSessionHelper();

  // console.log({ error: error?.message });

  // const accessToken = session?.getAccessToken();
  // console.log({ session });

  const parsedCookies = cookies();
  const accessToken = parsedCookies.get("sAccessToken");

  console.log({ parsedCookies, accessToken });

  const response = await fetch("http://localhost:3001/sessioninfo", {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  const data = await response.json();
  return data;
  // alert(JSON.stringify(await userInfoResponse.json()));
};
