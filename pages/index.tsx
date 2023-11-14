import Head from "next/head";
import useTimeSpan from "@/utils/use-time-span";
import dynamic from "next/dynamic";
import BFProject from "public/static/bf-project.gif";

export const Timer = dynamic(() => import("@/components/timer"), {
  ssr: false,
});

export default function Home() {
  const { timeUnits, isLive } = useTimeSpan({
    timestampMS: 1700000460000,
  });

  //1700139600000
  const { days, hours, minutes, seconds } = timeUnits;

  const pad = (number: number) => String(number).padStart(2, "0");

  const countdown = [
    { id: 1, time: pad(days), text: "Days" },
    { id: 2, time: pad(hours), text: "Hours" },
    { id: 3, time: pad(minutes), text: "Minutes" },
    { id: 4, time: pad(seconds), text: "Seconds" },
  ];

  return (
    <>
      <Head>
        <title>Another timer</title>
        <meta name="description" content="Another timer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {isLive ? (
          <img src={BFProject.src} width="100%" height="100%" alt="bf-sb" />
        ) : (
          <Timer countdown={countdown} />
        )}
      </>
    </>
  );
}
