import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainerClientSearchComponentProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeFilter: "all" | "active" | "inactive";
    setActiveFilter: (filter: "all" | "active" | "inactive") => void;
}

export default function TrainerClientSearchComponent({
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter
}: TrainerClientSearchComponentProps) {

    return (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Search clients by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={activeFilter === "all" ? "default" : "outline"}
                            onClick={() => setActiveFilter("all")}
                            className={activeFilter === "all" ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-0" : ""}
                        >
                            All
                        </Button>
                        <Button
                            variant={activeFilter === "active" ? "default" : "outline"}
                            onClick={() => setActiveFilter("active")}
                            className={activeFilter === "active" ? "bg-gradient-to-r from-emerald-500 to-teal-600 border-0" : ""}
                        >
                            Active
                        </Button>
                        <Button
                            variant={activeFilter === "inactive" ? "default" : "outline"}
                            onClick={() => setActiveFilter("inactive")}
                            className={activeFilter === "inactive" ? "bg-gradient-to-r from-amber-500 to-orange-600 border-0" : ""}
                        >
                            Inactive
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}