import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!projectToken) {
  console.warn(
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing; PostHog events will not be captured.",
  );
}
if (!host) {
  console.warn(
    "NEXT_PUBLIC_POSTHOG_HOST is missing; PostHog events will not be captured.",
  );
}

if (projectToken && host) {
  posthog.init(projectToken, {
    api_host: host,
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    logs: {
      serviceName: "project01-web",
      environment: process.env.NODE_ENV,
    },
  });
}
