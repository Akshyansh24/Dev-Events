'use client';

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <div>
       <button className="mt-7 mx-auto" type="button" id="explore-btn" onClick={() => console.log("Hello")}>
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
