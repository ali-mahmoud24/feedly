import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/hooks/useUsers";

interface FeedCardProps {
    item: User;
}

export function FeedCard({ item }: FeedCardProps) {
    return (
        <Card
            className="
        w-full rounded-xl border 
        shadow-sm hover:shadow-md transition 
        p-4 flex flex-col h-full opacity-0 animate-fadeIn"
        >
            <CardHeader className="flex flex-row items-center gap-4 p-0">
                <Avatar className="w-12 h-12 ring-1 ring-gray-200 dark:ring-gray-700">
                    <AvatarImage src={item.avatarUrl} />
                    <AvatarFallback>
                        {item.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.email}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-2 p-0 text-sm">
                <InfoRow label="Address" value={item.address} />
                <InfoRow label="Birthdate" value={item.birthdate} />
            </CardContent>
        </Card>
    );
}

/*  Reusable Inforow component */
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start gap-2">
            <span className="font-medium text-gray-800 dark:text-gray-200 min-w-20">
                {label}:
            </span>
            <span className="text-gray-600 dark:text-gray-400">{value}</span>
        </div>
    );
}
