import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="h-screen w-screen flex items-center gap-2 justify-center flex-col ">
      <p>Go to Admin Panel</p>
      <Link href={`/admin`} className="bg-black text-white rounded-md py-1 px-2 ">Admin Panel</Link>
   </div>
  );
}
