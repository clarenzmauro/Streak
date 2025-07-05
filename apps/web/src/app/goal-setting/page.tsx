"use client"

import { Input } from "@/components/ui/input";
import { FireIcon, UserIcon } from "@/components/icons/index";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

// return the goalSettingPage
export default function GoalSettingPage() {
  const { data: session, isPending } = authClient.useSession();

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
        <Input type="text" placeholder="Type your goal here..." className="h-24 w-full max-w-md rounded-lg bg-gray-200 text-center text-lg placeholder:text-gray-500 md:h-[141px] md:max-w-[732px] md:text-xl" />
      </main>

      <footer className="w-full text-center">
        <p className="text-xs font-normal">Made by: Clarenz Mauro</p>
      </footer>
    </div>
  )
}