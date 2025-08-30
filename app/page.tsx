import { ComingSoonLanding } from "@/components/coming-soon-landing";
import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/home/dashboard");
  return <ComingSoonLanding />
}
