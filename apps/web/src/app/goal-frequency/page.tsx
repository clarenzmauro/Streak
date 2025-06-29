import { Button } from "@/components/ui/button";
import { FireIcon, UserIcon } from "@/components/icons/index";

// return the goalFrequencyPage
export default function GoalFrequencyPage() {
    // TODO: display the actual user name
    const user =  { name: "user" };

    // define the frequencies
    const frequencyOptions = ["Daily", "Weekly", "Monthly"];

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
                    <p className="hidden text-xs font-normal sm:block">Welcome, {user.name}!</p>
                    <UserIcon className="h-8 w-8"/>
                </div>
            </header>

            <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center md:gap-8">
                <h2 className="text-[32px] font-black">What's your desired goal frequency?</h2>
                <div className="flex w-full flex-col items-center gap-4">
                    {frequencyOptions.map((option) => (
                        <Button key={option} variant="secondary" className="h-auto w-full max-w-md rounded-lg bg-gray-200 py-2 text-2xl font-black text-black hover:bg-gray-300 md:w-[588px] md:py-3 md:text-[32px]">{option}</Button>
                    ))}
                </div>
            </main>

            <footer>
                <p className="text-xs font-normal">Made by: Clarenz Mauro</p>
            </footer>
        </div>
    )
}