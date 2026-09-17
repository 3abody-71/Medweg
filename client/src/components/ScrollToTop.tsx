import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Keep each route entry at the beginning of the page, including mobile deep links. */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, search]);

  return null;
}
