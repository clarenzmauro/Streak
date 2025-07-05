"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FireIcon, UserIcon, TargetIcon, NotificationBellIcon } from "@/components/icons/index";
import { ActivityCalendar } from "react-activity-calendar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Homepage() {
    const { data: session, isPending } = authClient.useSession();

    // placeholder data
    const user = { name: "user" };
    const goal = { title: "Make a Goal Checklist Web App" };
    const tasks = [
        { id: 1, label: "Plan the non-negotiable features", completed: false },
        { id: 2, label: "Define tech stack", completed: false },
        { id: 3, label: "Write down use cases", completed: false }
    ];
    // activity data; count is for the number of activities done; level is for the color intensity (0-no activity; 1-some activity; 2-4-more activity)
    const activityData = [
        { date: "2025-01-01", count: 0, level: 0 },
        { date: "2025-06-16", count: 1, level: 1 },
        { date: "2025-06-17", count: 2, level: 2 },
        { date: "2025-06-18", count: 3, level: 3 },
        { date: "2025-06-19", count: 4, level: 4 },
        { date: "2025-06-29", count: 0, level: 0 },
        // { date: "2025-12-31", count: 0, level: 0 },
    ];

    return (
        <div className="relative flex min-h-screen flex-col bg-white p-4 text-black md:p-8">
            <header className="flex w-full shrink-0 items-center justify-between">
                <div className="flex items-center gap-2">
                    <FireIcon className="h-8 w-8"/>
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

            <main className="flex w-full flex-1 flex-col items-center gap-8 py-8 md:gap-12 md:py-12">
                <div className="w-full max-w-4xl space-y-8">
                    
                    {/* Goal Title */}
                    <h2 className="text-center text-2xl font-black md:text-[32px] ">Goal: {goal.title}</h2>

                    {/* Github Activity Tracker Placeholder */}
                    <div className="flex h-auto w-auto items-center justify-center rounded-lg bg-gray-200 md:h=[140px]">
                       <ActivityCalendar data={activityData} theme={{ light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] }} blockSize={10} blockMargin={2} weekStart={0} />
                    </div>

                    {/* Tasks for today */}
                    <div className="space-y-4">
                        <h3 className="text-xk font-bold">Tasks for today</h3>
                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div key={task.id} className="flex items-center gap-4">
                                    <Checkbox id={`task-${task.id}`} checked={task.completed} className="h-8 w-8 data-[state=checked]:bg-black data-[state=checked]:text-white"/>
                                    <label htmlFor={`task-${task.id}`} className="text-lg font-normal md:text-xl">{task.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex w-full shrink-0 items-center justify-between">
                <button>
                    <TargetIcon className="h-8 w-8"/>
                </button>

                <p className="text-xs font-normal">Made by: Clarenz Mauro</p>

                <button>
                    <NotificationBellIcon className="h-8 w-8"/>
                </button>
            </footer>
        </div>
    )
}