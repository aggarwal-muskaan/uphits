/* middleware -> runs on network layer
 doesn't support Node environment
*/

import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/mylibrary"]; // once you're authorised, you've access to all these routes

export const middleware = (req: NextRequest) => {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const accessToken = req.cookies.ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
};
