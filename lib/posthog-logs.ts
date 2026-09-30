"use client";

import posthog from "posthog-js";

export const catalogueLogger = posthog.logger;

type CatalogueProperties = Record<string, string | undefined>;

export function trackCatalogueEvent(
	eventName: string,
	logMessage: string,
	properties: CatalogueProperties = {},
): void {
	if (
		!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
		!process.env.NEXT_PUBLIC_POSTHOG_HOST
	) {
		return;
	}

	posthog.capture(eventName, properties);
	catalogueLogger.info(logMessage, properties);
}
