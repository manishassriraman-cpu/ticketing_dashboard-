import React, { useMemo, useState } from "react";

const SERVICE_TABS = ["Technology Services", "HR Services", "Service Contract Mgmt."];

const HEADER_ACTIONS = ["Knowledge", "Get Help", "My Ticket", "My Approval"];

const RESOURCE_CARDS = [
  {
    id: "account-enable",
    title: "Account Enable",
    description: "Enable new joiner or contractor access across corporate systems.",
    category: "Access",
    service: "Technology Services",
    eta: "Avg fulfilment 4 hrs",
    icon: UserCheckIcon,
    popular: 98,
  },
  {
    id: "reserve-room",
    title: "Reserve a Meeting Room",
    description: "Request AV-enabled rooms for leadership reviews, trainings and town halls.",
    category: "Collaboration",
    service: "Technology Services",
    eta: "Instant confirmation",
    icon: RoomIcon,
    popular: 84,
  },
  {
    id: "firewall-request",
    title: "Firewall Request",
    description: "Raise inbound or outbound rule requests for business applications.",
    category: "Network",
    service: "Technology Services",
    eta: "Security review 1 day",
    icon: ShieldIcon,
    popular: 77,
  },
  {
    id: "wifi-issue",
    title: "Wi-Fi Issue",
    description: "Report slow connectivity, dead zones or frequent reconnection problems.",
    category: "Network",
    service: "Technology Services",
    eta: "Avg resolution 2 hrs",
    icon: WifiIcon,
    popular: 95,
  },
  {
    id: "ariba",
    title: "Ariba Support",
    description: "Get help with sourcing, approvals, PO sync and supplier onboarding blockers.",
    category: "Applications",
    service: "Technology Services",
    eta: "Business app queue",
    icon: AppGridIcon,
    popular: 68,
  },
  {
    id: "hardware-corp-etv",
    title: "Hardware Issue - CORP ETV",
    description: "Laptop, docking station, monitor or asset health issue for corporate devices.",
    category: "Hardware",
    service: "Technology Services",
    eta: "Asset desk 6 hrs",
    icon: LaptopIcon,
    popular: 88,
  },
  {
    id: "password-reset",
    title: "Password Reset",
    description: "Reset locked AD, VPN, mail or enterprise application passwords.",
    category: "Access",
    service: "Technology Services",
    eta: "Self-service in 10 mins",
    icon: KeyIcon,
    popular: 100,
  },
  {
    id: "vpn-access",
    title: "VPN Access",
    description: "Provision secure remote access for internal tools and warehouse consoles.",
    category: "Access",
    service: "Technology Services",
    eta: "Manager approval required",
    icon: LockShieldIcon,
    popular: 81,
  },
  {
    id: "laptop-refresh",
    title: "Laptop Refresh",
    description: "Request scheduled device replacement or performance upgrade for your role.",
    category: "Hardware",
    service: "Technology Services",
    eta: "Stock-based scheduling",
    icon: RefreshDeviceIcon,
    popular: 64,
  },
  {
    id: "payroll-query",
    title: "Payroll Query",
    description: "Salary, reimbursement or tax-support request for monthly payroll processing.",
    category: "Payroll",
    service: "HR Services",
    eta: "HR ops within 1 day",
    icon: WalletIcon,
    popular: 59,
  },
  {
    id: "employment-letter",
    title: "Employment Letter",
    description: "Request address proof, employment verification or visa support letters.",
    category: "HR Ops",
    service: "HR Services",
    eta: "Fulfilled within 1 day",
    icon: DocumentBadgeIcon,
    popular: 62,
  },
  {
    id: "leave-correction",
    title: "Leave Balance Correction",
    description: "Raise a request for leave booking errors or carry-forward mismatches.",
    category: "HR Ops",
    service: "HR Services",
    eta: "People ops within 4 hrs",
    icon: CalendarCheckIcon,
    popular: 54,
  },
  {
    id: "vendor-renewal",
    title: "Vendor Contract Renewal",
    description: "Initiate renewal workflow for partner, support or managed-service contracts.",
    category: "Vendor",
    service: "Service Contract Mgmt.",
    eta: "Procurement review",
    icon: ContractIcon,
    popular: 57,
  },
  {
    id: "nda-review",
    title: "NDA / MSA Review",
    description: "Submit legal review requests for NDA, MSA and service contract redlines.",
    category: "Vendor",
    service: "Service Contract Mgmt.",
    eta: "Legal turnaround 2 days",
    icon: DocumentBadgeIcon,
    popular: 49,
  },
];

const OPEN_TICKETS = [
  {
    id: "REQ10492",
    title: "Firewall rule for seller payout service",
    status: "Awaiting Security Approval",
    stage: 2,
    totalStages: 4,
    updated: "14 mins ago",
    owner: "Amit Desai",
    priority: "Medium",
  },
  {
    id: "INC4829",
    title: "Wi-Fi dead zone near finance bay",
    status: "Assigned to Network Ops",
    stage: 3,
    totalStages: 4,
    updated: "32 mins ago",
    owner: "Priya Sharma",
    priority: "High",
  },
  {
    id: "REQ10503",
    title: "Password reset for vendor AD account",
    status: "Completed",
    stage: 4,
    totalStages: 4,
    updated: "1 hr ago",
    owner: "Self Service",
    priority: "Low",
  },
  {
    id: "REQ10511",
    title: "Meeting room reservation for QBR",
    status: "Pending manager approval",
    stage: 1,
    totalStages: 4,
    updated: "2 hrs ago",
    owner: "Rahul Sharma",
    priority: "Medium",
  },
];

const APPROVALS = [
  {
    id: "APR209",
    title: "VPN access for logistics vendor",
    requester: "Anjali Menon",
    due: "Due today",
  },
  {
    id: "APR214",
    title: "Laptop refresh for analytics team",
    requester: "Rohan Gupta",
    due: "Due in 1 day",
  },
  {
    id: "APR219",
    title: "New joiner account enablement",
    requester: "People Ops",
    due: "Due in 2 hrs",
  },
];

const KNOWLEDGE_ARTICLES = [
  "How to reset your corporate password",
  "Requesting software through the service catalog",
  "WFH VPN troubleshooting checklist",
];

const CATEGORY_OPTIONS = [
  "All",
  "Access",
  "Network",
  "Hardware",
  "Applications",
  "Collaboration",
  "Payroll",
  "HR Ops",
  "Vendor",
];

const SORT_OPTIONS = ["Popular", "A-Z", "Recently used"];

function EmployeeCentralPortal() {
  const [activeTab, setActiveTab] = useState("Technology Services");
  const [filterBy, setFilterBy] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(() => new Set(["account-enable", "password-reset"]));
  const [selectedResourceId, setSelectedResourceId] = useState("account-enable");
  const [selectedTicketId, setSelectedTicketId] = useState("REQ10492");

  // TODO: Replace request catalog with GET /api/now/table/sc_cat_item for employee-visible catalog items.
  const resources = useMemo(() => {
    let next = RESOURCE_CARDS.filter((item) => item.service === activeTab);

    if (filterBy !== "All") {
      next = next.filter((item) => item.category === filterBy);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      next = next.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    if (sortBy === "A-Z") {
      next = [...next].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Recently used") {
      next = [...next].sort((a, b) => b.id.localeCompare(a.id));
    } else {
      next = [...next].sort((a, b) => b.popular - a.popular);
    }

    return next;
  }, [activeTab, filterBy, search, sortBy]);

  // TODO: Replace with GET /api/now/table/task?sysparm_query=opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^active=true
  const myOpenTickets = OPEN_TICKETS;

  // TODO: Replace with GET /api/now/table/sysapproval_approver for the logged-in employee's pending approvals.
  const myApprovals = APPROVALS;

  const selectedResource =
    resources.find((item) => item.id === selectedResourceId) ||
    RESOURCE_CARDS.find((item) => item.id === selectedResourceId) ||
    resources[0];

  const selectedTicket =
    myOpenTickets.find((ticket) => ticket.id === selectedTicketId) || myOpenTickets[0];

  const summaryStats = [
    { label: "Open tickets", value: myOpenTickets.length, tone: "text-[#2874F0]" },
    { label: "Pending approvals", value: myApprovals.length, tone: "text-[#F59E0B]" },
    { label: "Saved favorites", value: favorites.size, tone: "text-[#0F766E]" },
  ];

  return (
    <div
      className="min-h-screen bg-[#F1F3F6] text-slate-900"
      style={{ fontFamily: "Inter, Roboto, sans-serif" }}
    >
      <header className="bg-[#2874F0] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex flex-wrap items-center gap-3">
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-white/15 text-[#FFE500]"
                    : "text-white/90 hover:bg-white/10 hover:text-[#FFE500]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {HEADER_ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                className="rounded-full border border-[#FFE500] px-4 py-2 text-sm font-semibold text-[#FFE500] transition hover:bg-[#FFE500] hover:text-[#1D64D9]"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1560px] px-4 py-8 lg:px-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <button type="button" className="font-medium text-[#2874F0]">
            Home
          </button>
          <ChevronRightIcon className="h-4 w-4 text-slate-400" />
          <button type="button" className="font-medium text-[#2874F0]">
            {activeTab}
          </button>
          <ChevronRightIcon className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-slate-900">IT Services</span>
        </div>

        <section className="mt-8 flex flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex min-w-[240px] items-center gap-3 rounded-[20px] bg-[#FFE500] px-5 py-4 text-[#172337] shadow-sm">
                <div className="text-4xl font-black italic leading-none text-[#2874F0]">f</div>
                <div>
                  <div className="text-[19px] font-semibold leading-none">Flipkart Employee Central</div>
                  <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.34em] text-slate-700">
                    ServiceNow Portal
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[34px] font-semibold tracking-[-0.02em] text-slate-950">
                  Raise tickets, track progress, and get help faster
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  A Flipkart-branded employee portal for ServiceNow requests, approvals, knowledge
                  access and live ticket status across technology, HR and contract workflows.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start">
              <button
                type="button"
                className="rounded-full border border-slate-200 p-3 text-slate-500 transition hover:border-[#2874F0] hover:text-[#2874F0]"
                aria-label="Favorite portal"
              >
                <HeartIcon className="h-5 w-5" filled={favorites.size > 0} />
              </button>
              <button
                type="button"
                className="rounded-full bg-[#FB641B] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(251,100,27,0.2)] transition hover:bg-[#f25508]"
              >
                Raise New Ticket
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
            <div className="rounded-[22px] border-2 border-[#2874F0] bg-[#F8FBFF] px-5 py-4 shadow-[0_2px_8px_rgba(40,116,240,0.08)]">
              <div className="flex items-center gap-3">
                <SearchIcon className="h-6 w-6 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search for services, catalog items, approvals, or ticket IDs"
                  className="w-full border-none bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-500"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Password Reset", "Wi-Fi Issue", "Laptop Refresh", "Payroll Query"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearch(chip)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2874F0] shadow-sm ring-1 ring-[#d7e5ff]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
              {summaryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-[#FFFDF4] px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
                  <div className={`mt-2 text-3xl font-semibold ${stat.tone}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-[20px] bg-[#F7F9FC] px-4 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Quick channels
            </span>
            {["Popular requests", "Saved items", "Urgent support", "Knowledge base"].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-[#2874F0]"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <section className="space-y-6">
            <PanelCard
              title="Support resources"
              subtitle="Browse and raise tickets for the most-used employee service catalog items"
            >
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600">Filter by</label>
                  <select
                    value={filterBy}
                    onChange={(event) => setFilterBy(event.target.value)}
                    className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-700 outline-none transition focus:border-[#2874F0]"
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-600">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-700 outline-none transition focus:border-[#2874F0]"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex h-12 overflow-hidden rounded-xl border border-slate-300 bg-white">
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search resources"
                      className="min-w-[260px] border-none px-4 text-base text-slate-700 outline-none"
                    />
                    <button type="button" className="border-l border-slate-200 px-4 text-[#2874F0]">
                      <SearchIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex overflow-hidden rounded-xl border border-[#2874F0]">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`flex h-12 w-12 items-center justify-center transition ${
                        viewMode === "grid" ? "bg-[#2874F0] text-white" : "bg-white text-[#2874F0]"
                      }`}
                    >
                      <GridIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`flex h-12 w-12 items-center justify-center transition ${
                        viewMode === "list" ? "bg-[#2874F0] text-white" : "bg-white text-[#2874F0]"
                      }`}
                    >
                      <ListIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`mt-5 gap-4 ${
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col"
                }`}
              >
                {resources.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                    <div className="text-lg font-semibold text-slate-900">No matching resources</div>
                    <div className="mt-2 text-sm text-slate-500">
                      Try resetting the filter or switching to another service category.
                    </div>
                  </div>
                ) : null}

                {resources.map((item) => {
                  const Icon = item.icon;
                  const isFavorite = favorites.has(item.id);
                  const isSelected = selectedResourceId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedResourceId(item.id)}
                      className={`group rounded-2xl border p-4 text-left transition ${
                        viewMode === "grid" ? "min-h-[210px]" : "w-full"
                      } ${
                        isSelected
                          ? "border-[#2874F0] bg-[#F8FBFF] shadow-[0_10px_24px_rgba(40,116,240,0.08)]"
                          : "border-slate-200 bg-white hover:border-[#9CC7F5] hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          <TicketPenIcon className="h-3.5 w-3.5" />
                          Request
                        </div>
                        <span
                          onClick={(event) => {
                            event.stopPropagation();
                            setFavorites((current) => {
                              const next = new Set(current);
                              if (next.has(item.id)) next.delete(item.id);
                              else next.add(item.id);
                              return next;
                            });
                          }}
                          className="rounded-full p-1 text-[#2874F0]"
                        >
                          <HeartIcon className="h-5 w-5" filled={isFavorite} />
                        </span>
                      </div>

                      <div className={`mt-5 ${viewMode === "list" ? "flex items-center gap-4" : ""}`}>
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EEF5FF] text-[#2874F0]">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className={viewMode === "list" ? "min-w-0 flex-1" : ""}>
                          <div className="mt-4 text-[15px] font-semibold text-slate-950">{item.title}</div>
                          <div className="mt-2 text-sm leading-6 text-slate-500">{item.description}</div>
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-[#F2F6FF] px-3 py-1 text-xs font-semibold text-[#2874F0]">
                              {item.category}
                            </span>
                            <span className="text-xs font-medium text-slate-400">{item.eta}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </PanelCard>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <PanelCard title="My tickets" subtitle="Open, recently completed and approval-bound requests">
                <div className="space-y-3">
                  {myOpenTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        selectedTicketId === ticket.id
                          ? "border-[#2874F0] bg-[#F8FBFF]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#2874F0]">{ticket.id}</div>
                          <div className="mt-1 text-base font-semibold text-slate-950">{ticket.title}</div>
                          <div className="mt-2 text-sm text-slate-500">{ticket.status}</div>
                        </div>
                        <StatusPill status={ticket.status} />
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                          <span>{ticket.owner}</span>
                          <span>{ticket.updated}</span>
                        </div>
                        <ProgressBar value={(ticket.stage / ticket.totalStages) * 100} />
                      </div>
                    </button>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Ticket tracker" subtitle="Live status for the selected request">
                <div className="rounded-2xl bg-[#F8FAFF] p-4">
                  <div className="text-sm font-semibold text-[#2874F0]">{selectedTicket.id}</div>
                  <div className="mt-2 text-xl font-semibold text-slate-950">{selectedTicket.title}</div>
                  <div className="mt-2 text-sm text-slate-500">{selectedTicket.status}</div>

                  <div className="mt-5 grid gap-3">
                    {["Submitted", "Triaged", "In Progress", "Completed"].map((step, index) => {
                      const active = index + 1 <= selectedTicket.stage;
                      const current = index + 1 === selectedTicket.stage;
                      return (
                        <div key={step} className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                              active
                                ? "border-[#2874F0] bg-[#2874F0] text-white"
                                : "border-slate-300 bg-white text-slate-400"
                            }`}
                          >
                            {active ? <CheckIcon className="h-4 w-4" /> : index + 1}
                          </div>
                          <div className="flex-1 rounded-xl bg-white px-3 py-2">
                            <div className="text-sm font-semibold text-slate-900">{step}</div>
                            <div className="text-xs text-slate-500">
                              {current ? "Current stage" : active ? "Completed" : "Awaiting"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Priority</div>
                    <div className="mt-2 text-sm font-semibold text-slate-900">{selectedTicket.priority}</div>
                  </div>
                </div>
              </PanelCard>
            </div>
          </section>

          <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <PanelCard title="Raise a ticket" subtitle="Quick submit panel for the selected service item">
              <div className="rounded-2xl border border-[#D7E7FB] bg-[#F8FBFF] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2874F0] shadow-sm">
                    <selectedResource.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-950">{selectedResource.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{selectedResource.description}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <Field label="Requested for" value="Rahul Sharma" />
                  <Field label="Business need" value="Access needed for ongoing operations" />
                  <Field label="Category" value={selectedResource.category} />
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-2xl bg-[#FB641B] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(251,100,27,0.18)] transition hover:bg-[#f25508]"
                >
                  Raise ticket for {selectedResource.title}
                </button>
              </div>
            </PanelCard>

            <PanelCard title="Pending approvals" subtitle="Approvals requiring your action">
              <div className="space-y-3">
                {myApprovals.map((approval) => (
                  <div key={approval.id} className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-950">{approval.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{approval.requester}</div>
                      </div>
                      <span className="rounded-full bg-[#FFF7E5] px-3 py-1 text-xs font-semibold text-[#B45309]">
                        {approval.due}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-[#2874F0] px-3 py-2 text-sm font-semibold text-white"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </PanelCard>

            <PanelCard title="Knowledge shortcuts" subtitle="Helpful articles before you raise a ticket">
              <div className="space-y-3">
                {KNOWLEDGE_ARTICLES.map((article) => (
                  <button
                    key={article}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-[#2874F0] hover:bg-[#F8FBFF]"
                  >
                    <span className="text-sm font-medium text-slate-700">{article}</span>
                    <ChevronRightIcon className="h-4 w-4 text-[#2874F0]" />
                  </button>
                ))}
              </div>
            </PanelCard>
          </aside>
        </div>
      </main>
    </div>
  );
}

function PanelCard({ title, subtitle, children }) {
  return (
    <section className="rounded-[24px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:p-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="text-[18px] font-semibold text-slate-950">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-[#2874F0]" style={{ width: `${value}%` }} />
    </div>
  );
}

function StatusPill({ status }) {
  const normalized = status.toLowerCase();
  const tone = normalized.includes("completed")
    ? "bg-emerald-50 text-emerald-700"
    : normalized.includes("approval")
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-700";

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

function iconProps(className) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };
}

function ServiceSparkIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M5 17V7l7-4 7 4v10l-7 4-7-4z" />
      <path d="M8 10h8M12 6v8M8 18l8-8" />
    </svg>
  );
}

function UserCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M20 21a8 8 0 10-16 0" />
      <circle cx="12" cy="8" r="4" />
      <path d="M17 10l2 2 4-4" />
    </svg>
  );
}

function RoomIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 13h5M16 5v14" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
      <path d="M9.5 12l1.8 1.8 3.2-3.6" />
    </svg>
  );
}

function WifiIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M5 9a12 12 0 0114 0M8 12a7 7 0 018 0M11 15a2.5 2.5 0 012 0" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function AppGridIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function LaptopIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="5" y="6" width="14" height="10" rx="1.5" />
      <path d="M3 18h18" />
    </svg>
  );
}

function KeyIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H20l-2 2 2 2" />
    </svg>
  );
}

function LockShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="7" y="11" width="10" height="8" rx="2" />
      <path d="M9 11V8a3 3 0 016 0v3" />
      <path d="M12 14v2" />
    </svg>
  );
}

function RefreshDeviceIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="5" y="5" width="14" height="10" rx="1.5" />
      <path d="M8 19h8M9 9a3 3 0 015-1l1.2-1.2M15 11a3 3 0 01-5 1L8.8 13.2" />
    </svg>
  );
}

function WalletIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 7h14a2 2 0 012 2v8H6a2 2 0 01-2-2V7z" />
      <path d="M4 7V6a2 2 0 012-2h11" />
      <path d="M16 13h4" />
    </svg>
  );
}

function DocumentBadgeIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 14h6M10 18h4" />
    </svg>
  );
}

function CalendarCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M9 15l2 2 4-4" />
    </svg>
  );
}

function ContractIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
      <path d="M9 21l3-2 3 2" />
    </svg>
  );
}

function TicketPenIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M4 6h10l6 6v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
      <path d="M14 6v6h6M8 15l4-4 2 2-4 4H8v-2z" />
    </svg>
  );
}

function HeartIcon({ className = "h-5 w-5", filled = false }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 21s-7-4.35-9.5-8.3C.7 9.9 2 5.5 6.2 4.5A5.5 5.5 0 0112 7a5.5 5.5 0 015.8-2.5c4.2 1 5.5 5.4 3.7 8.2C19 16.65 12 21 12 21z" />
      </svg>
    );
  }

  return (
    <svg {...iconProps(className)}>
      <path d="M12 21s-7-4.35-9.5-8.3C.7 9.9 2 5.5 6.2 4.5A5.5 5.5 0 0112 7a5.5 5.5 0 015.8-2.5c4.2 1 5.5 5.4 3.7 8.2C19 16.65 12 21 12 21z" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function GridIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function ListIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...iconProps(className)}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default EmployeeCentralPortal;
