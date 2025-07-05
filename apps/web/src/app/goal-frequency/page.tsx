"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FireIcon, UserIcon } from "@/components/icons/index";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

type FrequencyType = "DAILY" | "WEEKLY" | "MONTHLY";

// return the goalFrequencyPage
export default function GoalFrequencyPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [pendingGoal, setPendingGoal] = useState<{title: string; description: string} | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // tRPC mutation for creating a goal
    const createGoalMutation = trpc.createGoal.useMutation({
        onSuccess: () => {
            toast.success("Goal created successfully!");
            sessionStorage.removeItem("pendingGoal");
            router.push("/homepage"); // Navigate to homepage or dashboard
        },
        onError: (error : Error ) => {
            toast.error(error.message || "Failed to create goal");
            setIsSubmitting(false);
        }
    });

    // Load pending goal from sessionStorage
    useEffect(() => {
        const stored = sessionStorage.getItem("pendingGoal");
        if (stored) {
            setPendingGoal(JSON.parse(stored));
        } else {
            // Redirect back to goal-setting if no pending goal
            router.push("/goal-setting");
        }
    }, [router]);

    // define the frequencies
    const frequencyOptions: { value: FrequencyType; label: string }[] = [
        { value: "DAILY", label: "Daily" },
        { value: "WEEKLY", label: "Weekly" },
        { value: "MONTHLY", label: "Monthly" }
    ];

    const handleFrequencySelect = async (frequency: FrequencyType) => {
        if (!pendingGoal || !session?.user) {
            toast.error("Missing goal data or user session");
            return;
        }

        setIsSubmitting(true);
        
        try {
            await createGoalMutation.mutateAsync({
                title: pendingGoal.title,
                description: pendingGoal.description,
                frequency: frequency,
            });
        } catch (error) {
            // Error handling is done in the mutation callbacks
        }
    };

    if (!pendingGoal) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        );
    }

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
                <div className="mb-4">
                    <h2 className="text-[32px] font-black">What's your desired goal frequency?</h2>
                    <p className="mt-2 text-lg text-gray-600">Goal: "{pendingGoal.title}"</p>
                </div>
                <div className="flex w-full flex-col items-center gap-4">
                    {frequencyOptions.map((option) => (
                        <Button 
                            key={option.value} 
                            variant="secondary" 
                            onClick={() => handleFrequencySelect(option.value)}
                            disabled={isSubmitting}
                            className="h-auto w-full max-w-md rounded-lg bg-gray-200 py-2 text-2xl font-black text-black hover:bg-gray-300 disabled:opacity-50 md:w-[588px] md:py-3 md:text-[32px]"
                        >
                            {isSubmitting ? "Creating..." : option.label}
                        </Button>
                    ))}
                </div>
                <Button 
                    variant="outline" 
                    onClick={() => router.push("/goal-setting")}
                    disabled={isSubmitting}
                    className="mt-4"
                >
                    Back to Goal Setting
                </Button>
            </main>

            <footer>
                <p className="text-xs font-normal">Made by: Clarenz Mauro</p>
            </footer>
        </div>
    )
}