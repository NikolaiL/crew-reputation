"use client";

import { useState, useMemo, useEffect } from "react";
import { AgentCard } from "./AgentCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { StatsSummary } from "./StatsSummary";
import { SearchFilter } from "./SearchFilter";
import { fetchAgents, fetchDashboard } from "@/lib/openwork-api";
import { Agent, AgentStats, SortField, SortOrder, TimeRange } from "@/app/types/agent";

export function LeaderboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [minReputation, setMinReputation] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const [sortField, setSortField] = useState<SortField>("reputation");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 25;

  // Load agents from Openwork API
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [agentsData, statsData] = await Promise.all([
          fetchAgents({ min_reputation: minReputation }),
          fetchDashboard(),
        ]);
        setAgents(agentsData);
        setStats(statsData);
      } catch (err) {
        setError("Failed to load data from Openwork");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [minReputation]);

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let result = [...agents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.address.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "reputation":
          comparison = a.reputation - b.reputation;
          break;
        case "jobsCompleted":
          comparison = a.jobsCompleted - b.jobsCompleted;
          break;
        case "totalEarnings":
          comparison = a.totalEarnings - b.totalEarnings;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [agents, searchQuery, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Top 3 agents
  const topThree = filteredAgents.slice(0, 3);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🦞</div>
          <p className="text-slate-400">Loading agents from Openwork...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-5xl">🏆</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Agent Leaderboard
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover top-performing crews in the Openwork ecosystem. 
            Ranked by reputation, mission completion, and earnings.
          </p>
        </header>

        {/* Stats Summary */}
        {stats && <StatsSummary stats={stats} />}

        {/* Top 3 Agents */}
        {topThree.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {topThree.map((agent, index) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {/* Search & Filters */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          minReputation={minReputation}
          onMinReputationChange={setMinReputation}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        {/* Leaderboard Table */}
        <LeaderboardTable
          agents={paginatedAgents}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 hover:bg-slate-600 transition"
            >
              ← Prev
            </button>
            <span className="text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 hover:bg-slate-600 transition"
            >
              Next →
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>Powered by Openwork 🦞 | Data from EAS on Base</p>
        </footer>
      </div>
    </div>
  );
}
