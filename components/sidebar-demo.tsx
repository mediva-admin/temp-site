"use client";
import { BillingDashboard } from "@/components/billing-dashboard";
import { IAMDashboard } from "@/components/iam-dashboard";
import { PatientFlowDashboard } from "@/components/patient-flow-dashboard";
import { PatientInformation } from "@/components/patient-information";
import { ReceptionistDashboard } from "@/components/receptionist-dashboard";
import { ScheduleDashboard } from "@/components/schedule-dashboard";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
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
import { useState } from "react";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("Dashboard");

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Dashboard"),
    },
    {
      label: "Receptionist",
      href: "#",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Receptionist"),
    },
    {
      label: "Schedule",
      href: "#",
      icon: (
        <IconCalendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Schedule"),
    },
    {
      label: "Billing",
      href: "#",
      icon: (
        <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Billing"),
    },
    {
      label: "Patient Information",
      href: "#",
      icon: (
        <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Patient Information"),
    },
    {
      label: "Auth IAM",
      href: "#",
      icon: (
        <IconShieldLock className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActiveContent("Auth IAM"),
    },

  ];
  return (
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
                <SidebarLink key={idx} link={link} isActive={activeContent === link.label} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <SidebarLink
              link={{
                label: "Dr. Sarah Johnson",
                href: "/profile",
                icon: (
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Settings",
                href: "#",
                icon: (
                  <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
                onClick: () => setActiveContent("Settings"),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: (
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
                onClick: () => setActiveContent("Logout"),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DynamicContent activeContent={activeContent} />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/"
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
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-blue-600 dark:bg-blue-400" />
    </a>
  );
};

// Dynamic content component
const DynamicContent = ({ activeContent }: { activeContent: string }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <PatientFlowDashboard />;
      case "Receptionist":
        return <ReceptionistDashboard />;
      case "Schedule":
        return <ScheduleDashboard />;
      case "Billing":
        return <BillingDashboard />;
      case "Patient Information":
        return <PatientInformation />;
      case "Auth IAM":
        return <IAMDashboard />;
      case "Settings":
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">System Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure system preferences and settings.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome to MEDIVA</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select an option from the sidebar to get started.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="flex h-full w-full flex-1 flex-col bg-white dark:bg-neutral-900 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};
