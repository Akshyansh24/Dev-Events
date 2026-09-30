'use client';

import Image from "next/image";
import { trackCatalogueEvent } from "@/lib/posthog-logs";

const ExploreBtn = () => {
  const handleExploreClick = () => {
    trackCatalogueEvent("explore_events_clicked", "catalogue exploration started", {
      source: "hero_cta",
    });
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
