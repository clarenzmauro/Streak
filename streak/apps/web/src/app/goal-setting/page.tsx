import { Input } from "@/components/ui/input";
import type { SVGProps } from "react";

// svg for the fire icon
const FireIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 32"
  fill="none"
  {...props}
  >
    <path d="M15.352 4.74919L13.672 3.74253L13.352 5.67453C12.8426 8.72519 10.7586 11.5599 8.45995 13.5519C3.95995 17.4532 2.97462 21.6932 4.36795 25.1932C5.70129 28.5425 9.08529 30.8359 12.52 31.2185L13.3146 31.3065C11.3493 30.1052 10.088 27.2985 10.528 25.2012C10.9626 23.1399 12.4453 21.2092 15.2933 19.4279L16.7293 18.5319L17.2653 20.1385C17.5813 21.0879 18.128 21.8505 18.684 22.6252C18.9506 22.9985 19.2213 23.3759 19.4693 23.7772C20.3266 25.1705 20.5533 26.7199 20 28.2572C19.496 29.6545 18.6653 30.7532 17.52 31.3625L18.8133 31.2185C22.0373 30.8599 24.404 29.7572 25.9413 27.9132C27.4653 26.0852 28 23.7319 28 21.2265C28 18.8932 27.0413 16.4879 25.9106 14.4865C24.5853 12.1425 22.856 10.1959 20.968 8.30919C20.6413 8.96253 20.6666 9.22653 19.9946 10.2759C19.122 7.95847 17.484 6.00863 15.352 4.74919Z" fill="black"/>
  </svg>
);

// svg for the user icon
const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 32 32"
  fill="none"
  {...props}
  >
    <g clipPath="url(#clip0_2_26)">
      <path d="M22 14C22 17.32 19.32 20 16 20C12.68 20 10 17.32 10 14C10 10.68 12.68 8 16 8C19.32 8 22 10.68 22 14Z" fill="black" />
      <path fillRule="evenodd" clipRule="evenodd" d="M32 16C32 24.84 24.84 32 16 32C7.16 32 0 24.84 0 16C0 7.16 7.16 0 16 0C24.84 0 32 7.16 32 16ZM8 27.5C8.32 26.968 11.42 22 15.98 22C20.52 22 23.64 26.98 23.96 27.5C25.8197 26.214 27.3393 24.4955 28.3879 22.4922C29.4365 20.489 29.9829 18.2611 29.98 16C29.98 8.26 23.72 2 15.98 2C8.24 2 1.98 8.26 1.98 16C1.98 20.76 4.36 24.98 8 27.5Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0_2_26">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// return the onboardingPage
export default function GoalSettingPage() {
  // TODO: display the username
  const user = { name: "user" };

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
          <UserIcon className="h-8 w-8" />
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