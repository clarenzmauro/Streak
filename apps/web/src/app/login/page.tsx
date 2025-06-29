import { Button } from "@/components/ui/button";
import { FireIcon, LoginIcon } from "@/components/icons/index";

// return the login page
export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-black">
      <header className="absolute top-0 left-0 p-4 md:p-8">
        <div className="flex items-center gap-2">
        <FireIcon className="h-8 w-8"/>
          <div>
            <h1 className="text-3xl font-black md:text-4xl">Streak</h1>
            <p className="text-xs font-normal">Stick to your goals!</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center space-y-8 px-4">
        <LoginIcon className="h-24 w-24 md:h-32 md:w-32" />
        <Button className="h-16 w-full max-w-sm rounded-full bg-[#D9D9D9] text-xl font-normal text-black hover:bg-gray-300 md:h-[100px] md:w-[500px] md:rounded-[50px] md:text-4xl" variant="secondary">
          Login with Google
        </Button>
      </main>

      <footer className="absolute bottom-0 w-full p-4 text-center md:p-8">
        <p className="text-xs font-normal">Made by: Clarenz Mauro</p>
      </footer>

    </div>
  )
}