/* middleware -> runs on network layer
 doesn't support Node environment
*/

import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/mylibrary"]; // once you're authorised, you've access to all these routes
const authPages = ["/login", "/signup"];

export const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.ACCESS_TOKEN;
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    if (!accessToken) {
      return NextResponse.redirect("/login");
      // return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (authPages.includes(req.nextUrl.pathname) && accessToken)
    return NextResponse.redirect("/"); // don't show login or signup page if you're valid logged-in user
};
