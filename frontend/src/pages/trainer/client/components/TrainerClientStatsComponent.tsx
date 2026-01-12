import { Card, CardContent } from "@/components/ui/card";

import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

export default function TrainerClientStatsComponent() {
    const stats = [
        { label: "Total Clients", value: "12", icon: Users, color: "from-blue-500 to-indigo-500" },
        { label: "Active", value: "8", icon: UserCheck, color: "from-emerald-500 to-teal-500" },
        { label: "Inactive", value: "4", icon: UserX, color: "from-amber-500 to-orange-500" },
        { label: "Avg Progress", value: "65%", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    ];
    return (
        <>
            {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white dark:bg-gray-900">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}