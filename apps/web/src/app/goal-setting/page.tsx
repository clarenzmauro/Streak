"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FireIcon, UserIcon } from "@/components/icons/index";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

// return the goalSettingPage
export default function GoalSettingPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [goalTitle, setGoalTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goalTitle.trim()) {
      toast.error("Please enter a goal title");
      return;
    }
    
    if (!session?.user) {
      toast.error("Please sign in to create a goal");
      return;
    }

    setIsSubmitting(true);
    
    sessionStorage.setItem("pendingGoal", JSON.stringify({
      title: goalTitle.trim(),
      description: "",
    }));
    
    router.push("/goal-frequency");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white p-4 text-black md:p-8">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <FireIcon className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-black sm:text-3xl md:text-4xl">Streak</h1>
            <p className="text-xs font-normal">Stick to your goals!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPending ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <p className="hidden text-xs font-normal sm:block">
              Welcome, {session?.user.name || "Guest"}!
            </p>
          )}
          {isPending ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : session?.user.image ? (
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <UserIcon className="h-8 w-8" />
          )}
        </div> 
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center md:gap-8">
        <h2 className="text-[32px] font-black">What's your goal?</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md md:max-w-[732px]">
          <Input type="text" 
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your goal here..." 
            className="h-24 w-full rounded-lg bg-gray-200 text-center text-lg placeholder:text-gray-500 md:h-[141px] md:text-xl"
            maxLength={200}
            disabled={isSubmitting}
          />
          <div className="mt-4 flex justify-center">
            <Button 
              type="submit" 
              disabled={isSubmitting || !goalTitle.trim()}
              className="px-8 py-2 text-lg font-semibold"
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </Button>
          </div>
        </form>
      </main>

      <footer className="w-full text-center">
        <p className="text-xs font-normal">Made by: Clarenz Mauro</p>
      </footer>
    </div>
  )
}