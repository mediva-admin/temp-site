"use client";

import { AuthGuard } from "@/components/auth-guard";
import { DynamicNavbar } from "@/components/ui/dynamic-navbar";
import { Sidebar, SidebarBody, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { authUtils } from "@/utils/auth-utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCalendar,
  IconCreditCard,
  IconSettings,
  IconShieldLock,
  IconUser,
  IconUsers
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      label: "Dashboard",
      href: "/home/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Receptionist",
      href: "/home/reception",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Schedule",
      href: "/home/schedule",
      icon: (
        <IconCalendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Billing",
      href: "/home/billing",
      icon: (
        <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Patient Information",
      href: "/home/patient-info",
      icon: (
        <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Auth IAM",
      href: "/home/iam",
      icon: (
        <IconShieldLock className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const SidebarLink = ({ link, isActive }: { link: typeof links[0]; isActive: boolean }) => {
    const { open, animate } = useSidebar();
    
    return (
      <Link
        href={link.href}
        className={cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md transition-colors cursor-pointer",
          isActive 
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
            : "hover:bg-neutral-100 dark:hover:bg-neutral-700",
        )}
      >
        {link.icon}

        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={cn(
            "text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            isActive 
              ? "text-blue-700 dark:text-blue-300 font-medium" 
              : "text-neutral-700 dark:text-neutral-200"
          )}
        >
          {link.label}
        </motion.span>
      </Link>
    );
  };

  return (
    <AuthGuard>
      <div
        className={cn(
          "flex w-full h-screen flex-col overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800"
        )}
      >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href="/profile"
              className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face"
                className="h-7 w-7 shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 text-neutral-700 dark:text-neutral-200"
              >
                Dr. Sarah Johnson
              </motion.span>
            </Link>
            <Link
              href="/home/settings"
              className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 text-neutral-700 dark:text-neutral-200"
              >
                Settings
              </motion.span>
            </Link>
            <button
              onClick={() => {
                authUtils.logout();
                router.push('/auth/signin');
              }}  
              className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md transition-colors cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 w-full text-left"
            >
              <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 text-neutral-700 dark:text-neutral-200"
              >
                Logout
              </motion.span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 h-full">
        <div className="flex h-full w-full flex-1 flex-col bg-white dark:bg-neutral-900 overflow-auto">
          <DynamicNavbar />
          {children}
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/home/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-600 dark:bg-blue-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        MEDIVA
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/home/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-5 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-600 dark:bg-blue-400" />
    </Link>
  );
};
