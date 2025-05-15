import Image from "next/image";

export function MediaLogos() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
          <Image
            src="/logos/wired.svg"
            alt="Wired logo"
            width={100}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/techcrunch.svg"
            alt="TechCrunch logo"
            width={40}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/new-york-times.svg"
            alt="New York Times logo"
            width={180}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/bbc.svg"
            alt="BBC logo"
            width={60}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/washington-post.svg"
            alt="Washington Post logo"
            width={180}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/wsj.svg"
            alt="WSJ logo"
            width={60}
            height={30}
            className="opacity-80"
          />
          <Image
            src="/logos/npr.svg"
            alt="NPR logo"
            width={60}
            height={30}
            className="opacity-80"
          />
        </div>
    )
}
