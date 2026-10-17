"use client";

interface InputWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min: number;
  max: number;
  changeValue: (value: number) => void;
}

export default function InputWheel({
  value,
  min,
  max,
  changeValue,
  className,
  ...props
}: InputWheelProps) {
  const _stepSize = 20;

  return (
    <div {...props}>
      {/*
      here i need max-min amount of lines which:
     - will be scrollable until max and min using touch
     - the lines opacity and width are based on their offset to the center of the element
     - on touch end, the scroll stops at the next line it reaches, to not infinite scroll to min/max
     - successfully reaching a new step will 1. call changeValue and 2. give user feedback using sound and vibration/haptics
     */}
    </div>
  );
}
