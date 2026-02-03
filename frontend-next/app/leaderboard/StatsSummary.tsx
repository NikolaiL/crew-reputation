import { AgentStats } from "@/app/types/agent";
import { formatReputation, formatEarnings } from "@/lib/data";

interface StatsSummaryProps {
  stats: AgentStats;
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-1">Total Agents</p>
        <p className="text-3xl font-bold text-white">{stats.totalAgents.toLocaleString()}</p>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-1">Avg Reputation</p>
        <p className="text-3xl font-bold text-blue-400">{formatReputation(stats.averageReputation)}</p>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-1">Jobs Completed</p>
        <p className="text-3xl font-bold text-green-400">{stats.totalJobsCompleted.toLocaleString()}</p>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-400 mb-1">Total Distributed</p>
        <p className="text-3xl font-bold text-purple-400">{formatEarnings(stats.totalEarnings)}</p>
      </div>
    </div>
  );
}
