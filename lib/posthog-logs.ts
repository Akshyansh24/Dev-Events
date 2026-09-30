"use client";

import posthog from "posthog-js";

export const catalogueLogger = posthog.logger;

type CatalogueProperties = Record<string, string | undefined>;

/**
 * Captures a catalogue event and writes an info log with the same properties.
 * Does nothing when the PostHog project token or host is missing.
 *
 * @param eventName - Name of the PostHog event to capture.
 * @param logMessage - Message to write to the catalogue logger.
 * @param properties - Properties shared by the event and log; defaults to an empty object.
 */
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
