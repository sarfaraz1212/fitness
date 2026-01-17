import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useRef, useEffect } from "react";

interface TrainerClientSearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onboardingFilter: boolean | null;
  setOnboardingFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}

function TrainerClientSearchComponent({
  searchQuery,
  setSearchQuery,
  onboardingFilter,
  setOnboardingFilter,
}: TrainerClientSearchComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input once on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update state if the value actually changed
    const value = e.target.value;
    if (value !== searchQuery) {
      setSearchQuery(value);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search clients by name or email..."
              value={searchQuery}
              onChange={handleChange}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={onboardingFilter === null ? "default" : "outline"}
              onClick={() => setOnboardingFilter(null)}
              className={
                onboardingFilter === null
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-0"
                  : ""
              }
            >
              All
            </Button>

            <Button
              variant={onboardingFilter === true ? "default" : "outline"}
              onClick={() => setOnboardingFilter(true)}
              className={
                onboardingFilter === true
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 border-0"
                  : ""
              }
            >
              Active
            </Button>

            <Button
              variant={onboardingFilter === false ? "default" : "outline"}
              onClick={() => setOnboardingFilter(false)}
              className={
                onboardingFilter === false
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 border-0"
                  : ""
              }
            >
              Inactive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(TrainerClientSearchComponent);
