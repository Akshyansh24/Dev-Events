# PostHog error tracking

## What you still need to do

1. Create a personal API key with the **Source map upload** preset at https://us.posthog.com/settings/user-api-keys.
2. Add that key to your production build environment as the protected/masked CI secret `POSTHOG_API_KEY`. Also provide `POSTHOG_PROJECT_ID` and `NEXT_PUBLIC_POSTHOG_HOST` to the environment running the build; use project ID `629795`.
3. Configure the actual production provider, which is not represented in this repository, so it supplies `POSTHOG_API_KEY`, `POSTHOG_PROJECT_ID`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, and `NEXT_PUBLIC_POSTHOG_HOST` at build time. Preserve `.git` or provide the provider's Git metadata so releases can be associated with commits. If deploying from Docker without Git metadata, provide a stable release name and version through that deployment system. Keep `POSTHOG_API_KEY` in the provider's secret store rather than a Docker `ARG` or `ENV`.

## What is now set up

Uncaught browser errors and promise rejections are captured by the PostHog Web SDK through `capture_exceptions: true` in `instrumentation-client.ts`. Errors caught by Next.js's App Router global boundary are sent with `posthog.captureException(error)` from `app/global-error.tsx`. No additional global handlers or component wrappers are needed, so these mechanisms do not duplicate one another.

The PostHog SDK is already initialized for this app, and the error-tracking integration dependency is installed.

Source-map upload is wired into the production build. The changed files are:

- `next.config.ts`
- `package.json`
- `package-lock.json`

Run the production build with:

```sh
npm run build
```

Every production build now uploads source maps when the required build-time credentials are available, and configured cleanup prevents the maps from being served publicly. Start the built app with `npm run start`.

## Verify

Trigger any error in the running app, then view it at https://us.posthog.com/project/629795/error_tracking. Uploaded symbol sets appear at https://us.posthog.com/project/629795/error_tracking/configuration.
