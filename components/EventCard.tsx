"use client";

import Image from "next/image";
import Link from "next/link";
import { trackCatalogueEvent } from "@/lib/posthog-logs";

interface Props {
    title: string;
    image: string;
    slug?: string;
    location?: string;
    date?: string;
    time?: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
    const handleSelection = () => {
        trackCatalogueEvent("event_card_selected", "catalogue event selected", {
            event_slug: slug,
        });
    };

    return (
        <Link href={`/events/${slug}`}
            id="event-card" 
            onClick={handleSelection} >
            <Image src={image} alt={title} width={410} height={300} />
            <div className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p className="location">{location}</p>
            </div>
            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="calendar" width={14} height={14} />
                    <p className="date">{date}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="clock" width={14} height={14} />
                    <p className="time">{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard
