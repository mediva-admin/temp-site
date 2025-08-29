"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarConfig {
  title: string;
  subtitle?: string;
  icon: string | React.ReactNode;
  iconBg: string;
  actions?: React.ReactNode;
}

const routeConfigs: Record<string, NavbarConfig> = {
  "/home/dashboard": {
    title: "Patient Flow",
    subtitle: "Manage patient flow and workflow",
    icon: "PF",
    iconBg: "bg-blue-600",
    actions: <LiveStatusToggle />
  },
  "/home/reception": {
    title: "Receptionist Dashboard",
    subtitle: "Patient check-in and management",
    icon: "R",
    iconBg: "bg-green-600"
  },
  "/home/schedule": {
    title: "Schedule Management",
    subtitle: "Appointments and scheduling",
    icon: "S",
    iconBg: "bg-purple-600",
    actions: <ScheduleActions />
  },
  "/home/billing": {
    title: "Billing Dashboard",
    subtitle: "Financial management and billing",
    icon: "B",
    iconBg: "bg-orange-600",
    actions: <BillingActions />
  },
  "/home/iam": {
    title: "Identity & Access Management",
    subtitle: "User permissions and security",
    icon: <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    actions: <IAMActions />
  },
  "/home/patient-info": {
    title: "Patient Information",
    subtitle: "Patient records and data",
    icon: <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>,
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    actions: <PatientInfoActions />
  },
  "/home/settings": {
    title: "System Settings",
    subtitle: "Configuration and preferences",
    icon: "⚙",
    iconBg: "bg-gray-600"
  }
};

function LiveStatusToggle() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card/50">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm font-medium text-green-700">Live</span>
      </div>
      <div className="w-10 h-6 bg-green-600 rounded-full relative">
        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
      </div>
    </div>
  );
}

function ScheduleActions() {
  const handleAddEvent = () => {
    // This will trigger the add event modal in the ScheduleDashboard
    // We can use a custom event or state management to communicate with the parent component
    window.dispatchEvent(new CustomEvent('openAddEventModal'));
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleAddEvent}
        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg flex items-center gap-2"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Event
      </button>
    </div>
  );
}

function BillingActions() {
  const handleOpenTransactions = () => {
    // Dispatch event to communicate with BillingDashboard
    window.dispatchEvent(new CustomEvent('openBillingTransactions'));
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleOpenTransactions}
        className="px-4 py-2 border border-border bg-background hover:bg-accent text-foreground rounded-lg"
      >
        Transactions
      </button>
    </div>
  );
}

function PatientInfoActions() {
  const [recordsCount, setRecordsCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Get the records count from the component
  useEffect(() => {
    const updateRecordsCount = () => {
      // Try to get the records count from the PatientInformation component
      const recordsElement = document.querySelector('[data-records-count]');
      if (recordsElement) {
        const count = parseInt(recordsElement.getAttribute('data-records-count') || '0');
        setRecordsCount(count);
      }
    };

    const updateDetailsState = () => {
      // Try to get the details state from the PatientInformation component
      const detailsElement = document.querySelector('[data-show-details]');
      if (detailsElement) {
        const show = detailsElement.getAttribute('data-show-details') === 'true';
        setShowDetails(show);
      }
    };

    // Update count and details state when component mounts
    updateRecordsCount();
    updateDetailsState();
    
    // Listen for custom events to update count and details state
    window.addEventListener('updateRecordsCount', updateRecordsCount);
    window.addEventListener('updateDetailsState', updateDetailsState);
    
    return () => {
      window.removeEventListener('updateRecordsCount', updateRecordsCount);
      window.removeEventListener('updateDetailsState', updateDetailsState);
    };
  }, []);

  const handleTogglePatientDetails = () => {
    // Dispatch event to communicate with PatientInformation
    window.dispatchEvent(new CustomEvent('togglePatientDetails'));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200/50">
        <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm font-medium text-emerald-900">{recordsCount} Records</span>
      </div>
      <button 
        onClick={handleTogglePatientDetails}
        className="px-4 py-2 border border-border bg-background hover:bg-accent text-foreground rounded-lg"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );
}

function IAMActions() {
  const [staffCount, setStaffCount] = useState(0);

  // Get the staff count from the component
  useEffect(() => {
    const updateStaffCount = () => {
      // Try to get the staff count from the IAMDashboard component
      const staffElement = document.querySelector('[data-staff-count]');
      if (staffElement) {
        const count = parseInt(staffElement.getAttribute('data-staff-count') || '0');
        setStaffCount(count);
      }
    };

    // Update count when component mounts
    updateStaffCount();
    
    // Listen for custom events to update count
    window.addEventListener('updateStaffCount', updateStaffCount);
    
    return () => {
      window.removeEventListener('updateStaffCount', updateStaffCount);
    };
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-lg border border-white/20">
        <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          {staffCount} Staff Members
        </span>
      </div>
    </div>
  );
}

export function DynamicNavbar() {
  const pathname = usePathname();
  const config = routeConfigs[pathname] || routeConfigs["/home/dashboard"];

  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", config.iconBg)}>
            {typeof config.icon === 'string' ? (
              <span className="text-white font-semibold text-sm">{config.icon}</span>
            ) : (
              config.icon
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent">{config.title}</h1>
            {config.subtitle && (
              <p className="text-sm text-muted-foreground">{config.subtitle}</p>
            )}
          </div>
        </div>
        
        {config.actions && (
          <div className="flex items-center gap-2">
            {config.actions}
          </div>
        )}
      </div>
    </header>
  );
}
