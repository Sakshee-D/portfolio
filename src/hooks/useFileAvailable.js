import { useEffect, useState } from "react";

/**
 * Checks that a static file exists and has the expected content type.
 * SPA hosts (and the Vite dev server) answer missing files with index.html,
 * so a plain `res.ok` is not enough.
 */
export function useFileAvailable(url, expectedType = "pdf") {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();

    fetch(url, { method: "HEAD", signal: controller.signal })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        setAvailable(res.ok && type.includes(expectedType));
      })
      .catch(() => setAvailable(false));

    return () => controller.abort();
  }, [url, expectedType]);

  return available;
}
