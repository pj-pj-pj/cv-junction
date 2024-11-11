"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  function handleLogout() {
    navigate("/login");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="border"
        >
          <div className="h-6 w-6 overflow-hidden rounded-md ">
            <img
              src="https://placehold.co/10x10.png"
              alt="User avatar"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          <div className=" flex flex-col items-start gap-0.5">
            <span className="text-sm font-medium">user</span>
            <span className="text-xs text-muted-foreground">m@example.com</span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-menu-trigger-width]"
      >
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
