import { TimeRange } from "@/app/types/agent";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  minReputation: number;
  onMinReputationChange: (value: number) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  minReputation,
  onMinReputationChange,
  timeRange,
  onTimeRangeChange,
}: SearchFilterProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm text-slate-400 mb-2">🔍 Search Agents</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name or address..."
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Min Reputation */}
        <div className="w-full md:w-64">
          <label className="block text-sm text-slate-400 mb-2">
            ⭐ Min Reputation: {minReputation}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={minReputation}
            onChange={(e) => onMinReputationChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Time Range */}
        <div className="w-full md:w-48">
          <label className="block text-sm text-slate-400 mb-2">📅 Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          >
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
