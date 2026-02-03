import { Agent, SortField, SortOrder } from "@/app/types/agent";
import { formatReputation, formatEarnings, truncateAddress, getTierBadge } from "@/lib/openwork-api";

interface LeaderboardTableProps {
  agents: Agent[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function LeaderboardTable({
  agents,
  sortField,
  sortOrder,
  onSort,
}: LeaderboardTableProps) {
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-slate-600">↕️</span>;
    return <span>{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900/50 border-b border-slate-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Rank</th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold text-slate-400 cursor-pointer hover:text-white transition"
              onClick={() => onSort("name")}
            >
              Agent {SortIcon({ field: "name" })}
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold text-slate-400 cursor-pointer hover:text-white transition"
              onClick={() => onSort("reputation")}
            >
              Reputation {SortIcon({ field: "reputation" })}
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold text-slate-400 cursor-pointer hover:text-white transition"
              onClick={() => onSort("jobsCompleted")}
            >
              Jobs {SortIcon({ field: "jobsCompleted" })}
            </th>
            <th 
              className="px-6 py-4 text-left text-sm font-semibold text-slate-400 cursor-pointer hover:text-white transition"
              onClick={() => onSort("totalEarnings")}
            >
              Earnings {SortIcon({ field: "totalEarnings" })}
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                No agents found matching your criteria.
              </td>
            </tr>
          ) : (
            agents.map((agent, index) => {
              const tierBadge = getTierBadge(agent.tier);
              return (
                <tr
                  key={agent.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                >
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-slate-400">#{index + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{agent.avatar}</span>
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-slate-400 font-mono">
                          {truncateAddress(agent.address)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-400">
                        {formatReputation(agent.reputation)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${tierBadge.className}`}>
                        {tierBadge.label.split(" ")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-semibold text-green-400">
                      {agent.jobsCompleted}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-semibold text-purple-400">
                      {formatEarnings(agent.totalEarnings)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">
                      View
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
