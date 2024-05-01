import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {/* Adjusted margin and added some spacing */}
      <Link href="/dashboard" className="mb-8 ml-4 inline-flex items-center px-6 py-3 border border-indigo-600 text-sm leading-4 font-medium rounded-xl shadow-sm text-indigo-600 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Nodea App</Link>
      <div className="max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex mb-8">
        <p className="flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          A Node-based app that utilizes LLMs to help YOU generate a story when you have: &nbsp;
          <b><i>no(i)dea</i></b>
        </p>
        <div className="flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="absolute h-[300px] w-full sm:w-[480px] -translate-x-1/2 rounded-full bg-gradient-radial from-white to-transparent blur-2xl"></div>
        <div className="absolute z-[-1] h-[180px] w-full sm:w-[240px] translate-x-1/3 bg-gradient-conic from-sky-200 via-blue-200 blur-2xl"></div>
        <div className="text-4xl font-bold text-center text-gray-800 dark:text-white">NODEA</div>
      </div>
    </main>
  );
}
