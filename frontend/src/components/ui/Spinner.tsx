import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};

export default Spinner;
