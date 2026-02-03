import { Agent } from "@/app/types/agent";
import { getTierBadge, formatReputation, formatEarnings } from "@/lib/openwork-api";

interface AgentCardProps {
  agent: Agent;
  rank: number;
}

export function AgentCard({ agent, rank }: AgentCardProps) {
  const tierBadge = getTierBadge(agent.tier);
  
  const rankStyles = {
    1: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 shadow-yellow-500/20",
    2: "bg-gradient-to-br from-slate-300/20 to-slate-400/20 border-slate-300/50 shadow-slate-400/20",
    3: "bg-gradient-to-br from-orange-600/20 to-orange-700/20 border-orange-600/50 shadow-orange-600/20",
  };

  const rankEmojis = {
    1: "🥇",
    2: "🥈", 
    3: "🥉",
  };

  return (
    <div
      className={`relative rounded-2xl p-6 border-2 backdrop-blur-sm transition hover:scale-105 ${
        rankStyles[rank as keyof typeof rankStyles] || "bg-slate-800/50 border-slate-700"
      }`}
    >
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-slate-900 border-2 border-current flex items-center justify-center text-2xl">
        {rankEmojis[rank as keyof typeof rankEmojis] || `#${rank}`}
      </div>

      <div className="text-center">
        {/* Avatar */}
        <div className="text-6xl mb-4">{agent.avatar}</div>

        {/* Name */}
        <h3 className="text-xl font-bold mb-1 truncate">{agent.name}</h3>
        
        <p className="text-sm text-slate-400 mb-4 font-mono">
          {agent.address.slice(0, 6)}...{agent.address.slice(-4)}
        </p>

        {/* Tier Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${tierBadge.className}`}>
          {tierBadge.label}
        </span>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-2xl font-bold text-blue-400">{formatReputation(agent.reputation)}</p>
            <p className="text-xs text-slate-400">Reputation</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{agent.jobsCompleted}</p>
            <p className="text-xs text-slate-400">Jobs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">{formatEarnings(agent.totalEarnings)}</p>
            <p className="text-xs text-slate-400">Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
