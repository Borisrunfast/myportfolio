export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/projects/auction-house":
      await import("./views/auction-house.js");
      break;
    case "/projects/ecom":
      await import("./views/ecom.js");
      break;
    case "/projects/holidaze":
      await import("./views/holidaze.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
