import Link from "next/link"
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../public/fonts/font.woff2"
});

export const Logo = () => {
    return (
        <Link href="/" >
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image 
                    src="/logo.svg"
                    alt="Frello Logo"
                    height={35}
                    width={35}
                />
                <p className={cn("text-lg text-neutral-700 pb-1 pb- pt-3",
                    headingFont.className
                )}>
                    Frello
                </p>
            </div>
        </Link>
    )
}