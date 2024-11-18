import { Inbox, PenBoxIcon, PenOff, PlusSquare } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
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
import { useCV } from "@/context/CVContext";
import { CV } from "@/types/types";
import DialogCreateCV from "./components/DialogCreateCV";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import DialogUpdateTitle from "./components/DialogUpdateTitle";
import CVBuilder from "../CV/CVBuilder";

export default function AppSidebar() {
  const { cvList, setSelectedCV, selectedCV } = useCV();
  const { user } = useAuth();

  function handleClickCV(cv: CV) {
    setSelectedCV(cv);
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
                  <span className="text-md font-bold text-[#747bff]">
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
                      <span className="font-semibold">
                        {`${user?.username}'s `}Resumè
                      </span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {cvList.length ? (
                        cvList.map((cv) => {
                          return (
                            <SidebarMenuSubItem
                              key={cv.cv_id}
                              onClick={() => handleClickCV(cv)}
                              className="cursor-pointer"
                            >
                              <SidebarMenuSubButton className="flex justify-between">
                                {cv.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })
                      ) : (
                        <p className="italic text-sm text-slate-400">
                          No Resumè to show
                        </p>
                      )}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <DialogCreateCV>
                  <Button
                    variant={"outline"}
                    className="border-primary text-primary w-full border px-5"
                    size="lg"
                  >
                    <PlusSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Create New CV</span>
                  </Button>
                </DialogCreateCV>
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex align-middle justify-between gap-2">
                  {selectedCV?.title}
                  {selectedCV?.title && (
                    <DialogUpdateTitle>
                      <PenBoxIcon className="h-4 w-4" />
                    </DialogUpdateTitle>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 p-2">
          <div className="rounded-lg border h-[calc(100vh-68px)] bg-zinc-50">
            <CVBuilder />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
