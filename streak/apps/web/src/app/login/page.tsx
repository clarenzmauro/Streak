import { Button } from "@/components/ui/button";
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

// svg for the login icon
const LoginIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 128 128"
  fill="none"
  {...props}
  >
    <g clipPath="url(#clip0_1_46)">
      <path d="M88 56C88 69.28 77.28 80 64 80C50.72 80 40 69.28 40 56C40 42.72 50.72 32 64 32C77.28 32 88 42.72 88 56Z" fill="black"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M128 64C128 99.36 99.36 128 64 128C28.64 128 0 99.36 0 64C0 28.64 28.64 0 64 0C99.36 0 128 28.64 128 64ZM32 110C33.28 107.872 45.68 88 63.92 88C82.08 88 94.56 107.92 95.84 110C103.279 104.856 109.357 97.9818 113.552 89.969C117.746 81.9561 119.932 73.0443 119.92 64C119.92 33.04 94.88 8 63.92 8C32.96 8 7.92 33.04 7.92 64C7.92 83.04 17.44 99.92 32 110Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0_1_46">
        <rect width="128" height="128" fill="white" />
      </clipPath>
    </defs>

  </svg>
);

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