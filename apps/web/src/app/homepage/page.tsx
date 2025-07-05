"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FireIcon, UserIcon, TargetIcon, NotificationBellIcon } from "@/components/icons/index";
import { ActivityCalendar } from "react-activity-calendar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

// Goals Modal Component
function GoalsModal({ 
    isOpen, 
    onClose, 
    goals, 
    goalsLoading, 
    goalsError,
    onCreateGoal 
}: {
    isOpen: boolean;
    onClose: () => void;
    goals: any[] | undefined;
    goalsLoading: boolean;
    goalsError: any;
    onCreateGoal: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-black">All Your Goals</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-2xl"
                    >
                        ×
                    </button>
                </div>
                
                {goalsLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : goalsError ? (
                    <div className="text-center space-y-4">
                        <p className="text-red-600">
                            Error loading goals: {goalsError.message}
                        </p>
                        <Button 
                            onClick={() => window.location.reload()}
                            variant="outline"
                        >
                            Retry
                        </Button>
                    </div>
                ) : goals && goals.length > 0 ? (
                    <div className="space-y-4">
                        <div className="grid gap-4">
                            {goals.map((goal) => (
                                <div 
                                    key={goal.id} 
                                    className="rounded-lg border border-gray-200 p-4 space-y-2"
                                >
                                    <h4 className="font-semibold text-lg">{goal.title}</h4>
                                    {goal.description && (
                                        <p className="text-sm text-gray-500">
                                            {goal.description}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400">
                                        Created: {new Date(goal.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Button 
                            onClick={onCreateGoal}
                            className="w-full mt-4"
                        >
                            Create New Goal
                        </Button>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <p className="text-gray-600">
                            No goals yet. Create your first goal to start tracking your progress!
                        </p>
                        <Button 
                            onClick={onCreateGoal}
                            className="w-full"
                        >
                            Create Your First Goal
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Homepage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
    
    // Fetch user goals
    const { data: goals, isLoading: goalsLoading, error: goalsError } = trpc.getUserGoals.useQuery(
        undefined,
        {
            enabled: !!session?.user,
        }
    );

    // Get the most recent active goal
    const currentGoal = goals?.[0];

    // Tasks state management
    const [tasks, setTasks] = useState<Array<{ id: number; label: string; completed: boolean }>>([]);
    const [newTaskInput, setNewTaskInput] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);

    const handleAddTask = () => {
        if (newTaskInput.trim()) {
            const newTask = {
                id: Date.now(),
                label: newTaskInput.trim(),
                completed: false
            };
            setTasks([...tasks, newTask]);
            setNewTaskInput("");
            setIsAddingTask(false);
        }
    };

    const handleToggleTask = (taskId: number) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddTask();
        }
        if (e.key === "Escape") {
            setIsAddingTask(false);
            setNewTaskInput("");
        }
    };

    // activity data; count is for the number of activities done; level is for the color intensity (0-no activity; 1-some activity; 2-4-more activity)
    const activityData = [
        { date: "2025-01-01", count: 0, level: 0 },
        { date: "2025-06-16", count: 1, level: 1 },
        { date: "2025-06-17", count: 2, level: 2 },
        { date: "2025-06-18", count: 3, level: 3 },
        { date: "2025-06-19", count: 4, level: 4 },
        { date: "2025-06-29", count: 0, level: 0 },
    ];

    const handleCreateGoal = () => {
        setIsGoalsModalOpen(false);
        router.push("/goal-setting");
    };

    const handleTargetClick = () => {
        setIsGoalsModalOpen(true);
    };

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
                    {goalsLoading ? (
                        <Skeleton className="h-10 w-full max-w-md mx-auto" />
                    ) : currentGoal ? (
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black md:text-[32px]">
                                Goal: {currentGoal.title}
                            </h2>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-black md:text-[32px]">
                                No goals yet
                            </h2>
                            <p className="text-gray-600">
                                Create your first goal to start tracking your progress
                            </p>
                            <Button 
                                onClick={handleCreateGoal}
                                className="px-6 py-2 text-lg font-semibold"
                            >
                                Create Your First Goal
                            </Button>
                        </div>
                    )}

                    {/* Only show activity and tasks if user has goals */}
                    {currentGoal && (
                        <>
                            {/* Github Activity Tracker Placeholder */}
                            <div className="flex h-auto w-auto items-center justify-center rounded-lg bg-gray-200 md:h-[140px]">
                                <ActivityCalendar 
                                    data={activityData} 
                                    theme={{ 
                                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],  
                                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] 
                                    }} 
                                    blockSize={10} 
                                    blockMargin={2} 
                                    weekStart={0} 
                                />
                            </div>

                            {/* Tasks for today */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Tasks for today</h3>
                                <div className="space-y-3">
                                    {tasks.length > 0 ? (
                                        tasks.map((task) => (
                                            <div key={task.id} className="flex items-center gap-4 group">
                                                <Checkbox 
                                                    id={`task-${task.id}`} 
                                                    checked={task.completed}
                                                    onCheckedChange={() => handleToggleTask(task.id)}
                                                    className="h-8 w-8 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                />
                                                <label 
                                                    htmlFor={`task-${task.id}`} 
                                                    className={`flex-1 text-lg font-normal md:text-xl ${
                                                        task.completed ? 'line-through text-gray-500' : ''
                                                    }`}
                                                >
                                                    {task.label}
                                                </label>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm px-2 py-1"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            No tasks yet. Add your first task to get started!
                                        </p>
                                    )}
                                    
                                    {/* Add task input */}
                                    {isAddingTask ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newTaskInput}
                                                onChange={(e) => setNewTaskInput(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                placeholder="Enter task description..."
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                autoFocus
                                            />
                                            <Button 
                                                onClick={handleAddTask}
                                                disabled={!newTaskInput.trim()}
                                                className="px-4 py-2"
                                            >
                                                Add
                                            </Button>
                                            <Button 
                                                onClick={() => {
                                                    setIsAddingTask(false);
                                                    setNewTaskInput("");
                                                }}
                                                variant="outline"
                                                className="px-4 py-2"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button 
                                            onClick={() => setIsAddingTask(true)}
                                            variant="outline"
                                            className="w-full py-2 text-lg font-normal border-dashed"
                                        >
                                            + Add new task
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Error state */}
                    {goalsError && (
                        <div className="text-center space-y-4">
                            <p className="text-red-600">
                                Error loading goals: {goalsError.message}
                            </p>
                            <Button 
                                onClick={() => window.location.reload()}
                                variant="outline"
                            >
                                Retry
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="flex w-full shrink-0 items-center justify-between">
                <button onClick={handleTargetClick}>
                    <TargetIcon className="h-8 w-8"/>
                </button>

                <p className="text-xs font-normal">Made by: Clarenz Mauro</p>

                <button>
                    <NotificationBellIcon className="h-8 w-8"/>
                </button>
            </footer>

            {/* Goals Modal */}
            <GoalsModal 
                isOpen={isGoalsModalOpen}
                onClose={() => setIsGoalsModalOpen(false)}
                goals={goals}
                goalsLoading={goalsLoading}
                goalsError={goalsError}
                onCreateGoal={handleCreateGoal}
            />
        </div>
    )
}