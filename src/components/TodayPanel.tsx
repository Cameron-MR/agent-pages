"use client";

import { useEffect, useState } from "react";
import { todayItems, type StubContent } from "@/lib/mockData";

interface TodayPanelProps {
  onOpenStub: (content: StubContent) => void;
}

// Completed task labels persist so checking off a task survives a refresh.
const DONE_KEY = "mr-today-done";

function loadDone(): string[] {
  try {
    const raw = window.localStorage.getItem(DONE_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Glass card wrapper for one Today column.
function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-mr-base">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

// A clickable glass row with a consistent hover lift.
function Row({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-white/50 bg-white/70 p-3 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-mr-light/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-mr-light"
    >
      {children}
    </button>
  );
}

// "Today": appointments, tasks, deadlines, and hot leads. Each row opens the
// shared stub modal so the cockpit feels live.
export default function TodayPanel({ onOpenStub }: TodayPanelProps) {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(loadDone());
  }, []);

  const toggleTask = (label: string) => {
    const next = done.includes(label)
      ? done.filter((l) => l !== label)
      : [...done, label];
    setDone(next);
    try {
      window.localStorage.setItem(DONE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  return (
    <section>
      <h2 className="mb-4 font-heading text-2xl font-bold text-mr-dark">
        Today
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Column title="Appointments">
          {todayItems.appointments.map((item) => (
            <Row
              key={item.time + item.label}
              onClick={() =>
                onOpenStub({
                  kind: `Appointment ${item.time}`,
                  title: item.label,
                  detail: `Placeholder for the ${item.time} ${item.label.toLowerCase()} at ${item.detail}. The live view would open the calendar event with directions, client details, and prep notes. Fabricated sample data.`,
                })
              }
            >
              <p className="text-xs font-semibold text-mr-base">{item.time}</p>
              <p className="text-sm font-medium text-mr-dark">{item.label}</p>
              <p className="text-xs text-body">{item.detail}</p>
            </Row>
          ))}
        </Column>

        <Column title="Tasks">
          {todayItems.tasks.map((task) => {
            const isDone = done.includes(task.label);
            return (
              <div
                key={task.label}
                className="flex w-full items-center gap-2 rounded-xl border border-white/50 bg-white/70 p-3 shadow-sm transition duration-200 hover:border-mr-light/50 hover:shadow-md"
              >
                {/* Checking off a task persists across refreshes */}
                <button
                  type="button"
                  onClick={() => toggleTask(task.label)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.65rem] font-bold transition-colors ${
                    isDone
                      ? "border-mr-base bg-mr-base text-white"
                      : task.priority === "high"
                      ? "border-mr-base text-transparent hover:text-mr-pale"
                      : "border-mr-light text-transparent hover:text-mr-pale"
                  }`}
                >
                  ✓
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenStub({
                      kind: `Task · ${task.priority === "high" ? "High" : "Medium"} priority`,
                      title: task.label,
                      detail:
                        "Placeholder task. The live view would let the agent mark it complete, snooze it, or jump to the related record. Fabricated sample data.",
                    })
                  }
                  className={`min-w-0 flex-1 text-left text-sm font-medium ${
                    isDone ? "text-body line-through" : "text-mr-dark"
                  }`}
                >
                  {task.label}
                </button>
              </div>
            );
          })}
        </Column>

        <Column title="Deadlines">
          {todayItems.deadlines.map((deadline) => (
            <Row
              key={deadline.label + deadline.detail}
              onClick={() =>
                onOpenStub({
                  kind: `Deadline · due ${deadline.due}`,
                  title: deadline.label,
                  detail: `Placeholder for the ${deadline.label.toLowerCase()} on ${deadline.detail}, due ${deadline.due}. The live view would open the transaction timeline and the documents tied to this date. Fabricated sample data.`,
                })
              }
            >
              <span className="flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-mr-dark">
                    {deadline.label}
                  </span>
                  <span className="block truncate text-xs text-body">
                    {deadline.detail}
                  </span>
                </span>
                <span
                  className={`flex-none rounded-full px-2 py-0.5 text-xs font-semibold ${
                    deadline.due === "Today"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-mr-pale/25 text-mr-base"
                  }`}
                >
                  {deadline.due}
                </span>
              </span>
            </Row>
          ))}
        </Column>

        <Column title="Hot Leads">
          {todayItems.hotLeads.map((lead) => (
            <Row
              key={lead.name}
              onClick={() =>
                onOpenStub({
                  kind: `Hot lead · ${lead.source}`,
                  title: lead.name,
                  detail: `Placeholder lead card for ${lead.name}. ${lead.note}. Source: ${lead.source}. The live view would open the full contact record and follow-up history. Fabricated sample data.`,
                })
              }
            >
              <span className="flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-mr-dark">
                    {lead.name}
                  </span>
                  <span className="block truncate text-xs text-body">
                    {lead.note}
                  </span>
                </span>
                <span className="flex-none rounded-full bg-mr-pale/25 px-2 py-0.5 text-xs font-medium text-mr-base">
                  {lead.source}
                </span>
              </span>
            </Row>
          ))}
        </Column>
      </div>
    </section>
  );
}
