import Head from "next/head";
import useTimeSpan from "@/utils/use-time-span";
import dynamic from "next/dynamic";

export const Timer = dynamic(() => import("@/components/timer"), {
  ssr: false,
});

export default function Home() {
  const { days, hours, minutes, seconds } = useTimeSpan({
    timestampMS: 1700812800000,
  });

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
        <Timer countdown={countdown} />
      </>
    </>
  );
}
