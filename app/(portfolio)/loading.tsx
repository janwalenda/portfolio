import { Loader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Loader />
    </div>
  );
}