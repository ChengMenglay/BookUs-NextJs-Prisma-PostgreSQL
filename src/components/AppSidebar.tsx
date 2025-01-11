import React from "react";
import {
  BadgeCheck,
  Bus,
  BusFront,
  CalendarDays,
  ChevronsUpDown,
  Home,
  Route,
  Ticket,
  UserRoundCog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/(auth)/actions/authAction";
import SignOut from "./SignOut";
export default async function AppSidebar() {
  const session = await auth();
  const users = session?.user && (await getCurrentUser());
  const items = [
    {
      title: "Overview",
      url: `/`,
      icon: Home,
    },
    {
      title: "Operator",
      url: `/operator`,
      icon: UserRoundCog,
    },
    {
      title: "Bus Type",
      url: `/bus-type`,
      icon: Bus,
    },
    {
      title: "Route",
      url: `/route`,
      icon: Route,
    },
    {
      title: "Bus",
      url: `/bus`,
      icon: BusFront,
    },
    {
      title: "Schedule",
      url: `/schedule`,
      icon: CalendarDays,
    },
    {
      title: "Ticket",
      url: `/ticket`,
      icon: Ticket,
    },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-6 py-4 ">
        <Link href="/" className="font-bold text-3xl ">
          BookUs
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-y-4">
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className=" h-14 hover:bg-blue-700 hover:text-white"
                  >
                    <a
                      href={"/dashboard" + item.url}
                      className="space-x-2 font-bold"
                    >
                      <item.icon style={{ width: "20px", height: "20px" }} />
                      <span className="font-bold text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size={"lg"}
                  className="w-full h-20 data-[state=open]:bg-slidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage src={users?.image || ""} alt="shoes" />
                    <AvatarFallback className="rounded-lg">
                      {users?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-md leading-tight">
                    <span className=" truncate font-semibold">
                      {users?.name}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      {users?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radox-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="top"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 p-4">
                    <Avatar className="w-10 h-10 rounded-lg">
                      <AvatarImage src={users?.image || ""} alt="profile" />
                      <AvatarFallback className="rounded-lg">
                        {users?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-md leading-tight">
                      <span className=" truncate font-semibold">
                        {users?.name}
                      </span>
                      <span className="truncate text-sm text-muted-foreground">
                        {users?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={"/profile"}>
                    <DropdownMenuItem className=" cursor-pointer">
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignOut
                    className="w-full h-full flex space-x-4 items-center cursor-pointer"
                    name="Log out"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
