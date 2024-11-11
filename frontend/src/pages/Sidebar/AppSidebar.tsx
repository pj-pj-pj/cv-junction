import { ChevronDown, Inbox, PenOff, PlusSquare } from "lucide-react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
// } from "@/components/ui/breadcrumb";
import { Collapsible } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserProfile from "./UserProfile";
import { Outlet } from "react-router-dom";
import { useCV } from "@/context/CVContext";
import { CV } from "@/types/types";

export default function AppSidebar() {
  const { cvList, setSelectedCV, createNewCV } = useCV();

  function handleClickCV(cv: CV) {
    setSelectedCV(cv);
  }

  function handleClickNewCV() {
    createNewCV();
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-64 border-r select-none ">
        <SidebarContent>
          {/* Organization Section */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-default"
                  size="lg"
                >
                  <div className="flex h-7 w-7 items-center justify-center border-2  rounded-md bg-[#747bff]">
                    <PenOff className="h-4 w-4 p-[.05rem] text-black" />
                  </div>
                  <span className="text-md font-bold text-[#181d87]">
                    CVJunction
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Resume List Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-default">
                      <Inbox className="h-4 w-4" />
                      <span>Resumè</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {cvList.map((cv) => {
                        return (
                          <SidebarMenuSubItem
                            key={cv.cv_id}
                            onClick={() => handleClickCV(cv)}
                            className="cursor-pointer"
                          >
                            <SidebarMenuSubButton>
                              {cv.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="border px-5"
                  size="lg"
                  onClick={handleClickNewCV}
                >
                  <PlusSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Create New CV</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* User Profile Section */}
          <SidebarGroup className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <UserProfile />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 flex h-12 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="h-4"
          />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Sample CV</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <main className="flex-1 p-2">
          <div className="rounded-lg border h-[calc(100vh-68px)] bg-zinc-50">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
