import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { ChevronUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
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
              src={`https://ui-avatars.com/api/?name=${user?.username}&?background=random&?size=24`}
              alt="User avatar"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          <div className=" flex flex-col items-start gap-0.5">
            <span className="text-sm font-medium">{user?.username}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <ChevronUp className="ml-auto h-4 w-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[--radix-dropdown-menu-trigger-width]"
      >
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
