import Link from "next/link";
import React from "react";
interface SidebarLinkProps {
  Icon: React.ReactNode;
  title: string;
  href: string;
  currentPath: string;
}

function SidebarLink({ Icon, title, href, currentPath }: SidebarLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          currentPath === href && "bg-graydark dark:bg-meta-4"
        }`}
      >
        {Icon}
        {title}
      </Link>
    </li>
  );
}

export default SidebarLink;
