"use client";
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

interface SentimentScoreMeterProps {
  value: number;
}

export default function SentimentScoreMeter(props: SentimentScoreMeterProps) {
  return (
    <ReactSpeedometer
      value={props.value}
      minValue={-1}
      maxValue={1}
      segments={2}
      width={300}
      height={200}
      customSegmentLabels={[
        {
          text: "Negative",
          color: "#fff",
        },
        {
          text: "Positive",
          color: "#fff",
        },
      ]}
      segmentColors={["#FF4C4C", "#4CAF50"]} 
    />
  );
}
