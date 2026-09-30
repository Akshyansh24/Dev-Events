'use client';

import Image from "next/image";
import posthog from "posthog-js";
import { catalogueLogger } from "@/lib/posthog-logs";

const isPostHogConfigured =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
  process.env.NEXT_PUBLIC_POSTHOG_HOST;

const ExploreBtn = () => {
  const handleExploreClick = () => {
    if (isPostHogConfigured) {
      posthog.capture("explore_events_clicked");
      catalogueLogger.info("catalogue exploration started", { source: "hero_cta" });
    }
    console.log("Hello");
  };

  return (
    <div>
       <button className="mt-7 mx-auto" type="button" id="explore-btn" onClick={handleExploreClick}>
        <a href="#events">Explore Events
            <Image
              src="/icons/arrow-down.svg"
              alt="Arrow-down"
              width={24}
              height={24}
            />
        </a>
       </button>
    </div>
  )
}

export default ExploreBtn
