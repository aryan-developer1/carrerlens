import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Clerk ki recommended matcher
    "/((?!.*\\..*|_next).*)", // sab pages ke liye except static files/_next
    "/(api|trpc)(.*)", // api routes ke liye
  ],
};
