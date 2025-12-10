import { Search } from "lucide-react";

interface UserSearchProps {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export function UserSearch({ value, onChange, placeholder }: UserSearchProps) {
    return (
        <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Search users..."}
                className="
          w-full pl-10 pr-4 py-3
          border border-gray-300 dark:border-gray-700
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition
        "
            />
        </div>
    );
};

