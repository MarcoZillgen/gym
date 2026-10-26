import { Navbar } from "@/src/components/Navbar";

export default function Header() {
  return (
    <Navbar asChild>
      <header>
        <div className="grid aspect-square h-full place-items-center"></div>

        <div className="grid h-full w-full place-items-center text-xl font-normal">
          gym app
        </div>

        <div className="grid aspect-square h-full place-items-center"></div>
      </header>
    </Navbar>
  );
}
