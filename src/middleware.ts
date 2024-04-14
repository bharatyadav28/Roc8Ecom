import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // if (request.nextUrl.pathname === "/api/interest-data") {
  //   if (!token) {
  //     return NextResponse.json(
  //       { msg: "You are not authenticated." },
  //       { status: 400 },
  //     );
  //   } else {
  //     const response = NextResponse.next();
  //     // response.headers.set("X-TOKEN", "some-value-to-pass");
  //     return response;
  //   }
  // }

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/",
// };
