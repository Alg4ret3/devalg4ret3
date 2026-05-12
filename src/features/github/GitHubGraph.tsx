"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GitHubGraph.css";

gsap.registerPlugin(ScrollTrigger);

interface Day {
  contributionCount: number;
  date: string;
  contributionLevel: string;
}

interface GitHubData {
  contributions: Day[][];
  totalContributions: number;
}

export const GitHubGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("https://github-contributions-api.deno.dev/Alg4ret3.json");
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    if (loading || !data) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gh-week",
        {
          y: 10,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.01,
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [loading, data]);

  const getLevel = (level: string) => {
    switch (level) {
      case "FIRST_QUARTILE": return 1;
      case "SECOND_QUARTILE": return 2;
      case "THIRD_QUARTILE": return 3;
      case "FOURTH_QUARTILE": return 4;
      default: return 0;
    }
  };

  return (
    <section className="gh-section" ref={containerRef}>
      <div className="gh-header">
        <div className="gh-title-group">
          <h3 className="gh-title">Activity</h3>
          <p className="gh-subtitle">Real-time GitHub Contributions</p>
        </div>
        <div className="gh-stats">
          <div className="gh-stat-item">
            <span className="gh-stat-value">
              {loading ? "..." : (data?.totalContributions || 0).toLocaleString()}
            </span>
            <span className="gh-stat-label">Total Contributions</span>
          </div>
        </div>
      </div>

      <div className="gh-graph-container">
        <div className="gh-grid" style={{ minHeight: "110px" }}>
          {loading ? (
            <div className="gh-loading">Loading activity data...</div>
          ) : error ? (
            <div className="gh-error">Unable to load GitHub data</div>
          ) : (
            data?.contributions.map((week, weekIdx) => (
              <div key={weekIdx} className="gh-week">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`gh-square level-${getLevel(day.contributionLevel)}`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))
          )}
        </div>

        <div className="gh-legend">
          <span>Less</span>
          <div className="gh-legend-squares">
            <div className="gh-square level-0" />
            <div className="gh-square level-1" />
            <div className="gh-square level-2" />
            <div className="gh-square level-3" />
            <div className="gh-square level-4" />
          </div>
          <span>More</span>
        </div>

        <a 
          href="https://github.com/Alg4ret3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="gh-footer-link"
        >
          VIEW FULL ACTIVITY ON GITHUB
        </a>
      </div>
    </section>
  );
};
