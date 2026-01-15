"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useAuth, useClerk } from "@clerk/nextjs";
import {
  FlameIcon,
  HistoryIcon,
  HomeIcon,
  PlaySquareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "History",
    href: "/playlist/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked videos",
    href: "/playlist/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All Playlist",
    href: "/playlist",
    icon: FlameIcon,
    auth: true,
  },
];

export const PersonalSection = () => {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>YOU</SidebarGroupLabel>
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
                  return clerk.openSignIn();
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
