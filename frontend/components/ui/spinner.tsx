import React from "react"; 
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string; 
}


const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const Spinner = ({ className }: SpinnerProps) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};
