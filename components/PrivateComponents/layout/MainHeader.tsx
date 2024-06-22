import { cn } from "../../../lib/utils";
import { MobileSidebar } from "../layout/MobileSidebar";
import { UserNav } from "../layout/UserNav";
import { Link } from "../../../navigation";
import { ModeToggle } from "../../../app/utils/ModeToggle";
import Notification from "./Notification";
import LogoLight from "../../../public/assets/logo-light.png";
import LogoDark from "../../../public/assets/logo-dark.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={`/`}
            className={`text-[35px] font-semibold tracking-tight gradient-text`}
          >
            <Image
              src={LogoDark}
              alt="Logo"
              width={50}
              height={50}
              className="hidden p-1 dark:!flex"
            />
            <Image
              src={LogoLight}
              alt="Logo"
              width={50}
              height={50}
              className="flex p-1 dark:!hidden"
            />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <Notification />
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
