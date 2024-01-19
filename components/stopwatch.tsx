"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { addActivity, updateActivity } from "@/actions/activity";
import { toast } from "sonner";

export default function Stopwatch({ subjectId }: { subjectId: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [activityId, setActivityId] = useState("");

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    addActivity({ subjectId })
      .then((res) => {
        toast("Started Stopwatch");
        setActivityId(res.id);
      })
      .catch(() => toast.error("Error starting stopwatch"));
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    updateActivity({ subjectId, activityId })
      .then(() => {
        toast("Stopped Stopwatch");
      })
      .catch(() => toast.error("Error stopping stopwatch"));
    setTime(0);
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center ">
      <div className="text-xl">{formatTime(time)}</div>
      <div className="flex gap-x-5">
        <Button onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(value: number) {
  return value < 10 ? `0${value}` : value;
}
