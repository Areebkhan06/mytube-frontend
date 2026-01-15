"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";

const items = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Subscription",
    href: "/feed/subscription",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Trending",
    href: "/feed/trending",
    icon: FlameIcon,
  },
];

export const MainSection = () => {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => (
            <SidebarMenuButton
              key={index}
              tooltip={item.title}
              asChild
              isActive={false}
              onClick={(e) => {
                if (!isSignedIn && item.auth) {
                  e.preventDefault();
                  return openSignIn();
                }
              }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
