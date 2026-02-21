import { createFileRoute } from "@tanstack/solid-router";
import { IoHomeOutline } from "solid-icons/io";
import { HiOutlineArchiveBox } from "solid-icons/hi";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div class="p-2 flex flex-col gap-2 items-center">
      <div class="flex items-center gap-2">
        <IoHomeOutline class="text-2xl font-bold" size={30} color="#ffffffff" />
        <h1 class="text-2xl font-bold text-white">
          Welcome Home!!! This is a test
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <HiOutlineArchiveBox
          class="text-2xl font-bold"
          size={30}
          color="#ffffffff"
        />
        <h1 class="text-2xl font-bold">Welcome Box!!! This is a test</h1>
      </div>
    </div>
  );
}
