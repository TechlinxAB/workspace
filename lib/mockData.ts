export type ItemStatus = "Paid" | "Overdue" | "In Review" | "Pending" | "Completed";

export type StatShape = {
  openRequests: number;
  requireReply: number;
  websiteStatus: {
    state: "Online" | "Degraded" | "Offline";
    uptime: number;
    lastSyncMins: number;
  };
  monthlyOrders: {
    count: number;
    deltaPct: number;
  };
};

export type MonthlyOverviewPoint = {
  month: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  status: ItemStatus;
};

export type RecentItem = {
  ref: string;
  date: string;
  type: "IT Case" | "Website Request" | "Marketing Request" | "Invoice";
  amountOrImpact: string;
  subject?: string;
  status: ItemStatus;
};

export const mockData = {
  stats: {
    openRequests: 42,
    requireReply: 11,
    websiteStatus: {
      state: "Online",
      uptime: 99.96,
      lastSyncMins: 6
    },
    monthlyOrders: {
      count: 318,
      deltaPct: 12.4
    }
  } as StatShape,
  monthlyOverview: [
    { month: "Jan", value: 210 },
    { month: "Feb", value: 232 },
    { month: "Mar", value: 224 },
    { month: "Apr", value: 268 },
    { month: "May", value: 251 },
    { month: "Jun", value: 305 },
    { month: "Jul", value: 278 },
    { month: "Aug", value: 264 },
    { month: "Sep", value: 281 },
    { month: "Oct", value: 299 },
    { month: "Nov", value: 308 },
    { month: "Dec", value: 332 }
  ] as MonthlyOverviewPoint[],
  activities: [
    {
      id: "act-1",
      title: "IT Case #1234: VPN issue awaiting your reply",
      description: "Support comment posted for customer confirmation.",
      time: "10m ago",
      status: "In Review"
    },
    {
      id: "act-2",
      title: "Website request: New About page",
      description: "Design copy approved and queued for implementation.",
      time: "28m ago",
      status: "Completed"
    },
    {
      id: "act-3",
      title: "Marketing request: Meta campaign setup",
      description: "Audience configuration still pending budget lock.",
      time: "1h ago",
      status: "Pending"
    },
    {
      id: "act-4",
      title: "Invoice FEB-2026 uploaded",
      description: "Billing export synced to Workspace documents.",
      time: "Today, 08:42 AM",
      status: "Paid"
    }
  ] as ActivityItem[],
  recentItems: [
    {
      ref: "REQ-1234",
      date: "Feb 25, 2026",
      type: "IT Case",
      amountOrImpact: "High impact",
      subject: "VPN issue awaiting your reply",
      status: "In Review"
    },
    {
      ref: "REQ-2388",
      date: "Feb 24, 2026",
      type: "Website Request",
      amountOrImpact: "Medium impact",
      subject: "New About page",
      status: "Completed"
    },
    {
      ref: "REQ-7741",
      date: "Feb 23, 2026",
      type: "Marketing Request",
      amountOrImpact: "Campaign setup",
      subject: "Meta campaign setup",
      status: "Pending"
    },
    {
      ref: "INV-4476",
      date: "Feb 22, 2026",
      type: "Invoice",
      amountOrImpact: "$4,280",
      status: "Overdue"
    },
    {
      ref: "INV-4472",
      date: "Feb 21, 2026",
      type: "Invoice",
      amountOrImpact: "$2,960",
      status: "Paid"
    }
  ] as RecentItem[]
};

export const routeContent: Record<string, { title: string; description: string }> = {
  "/requests/inbox": {
    title: "Inbox",
    description: "Track inbound requests and route them to IT, Website, or Marketing."
  },
  "/it/cases": {
    title: "IT Support",
    description: "View IT cases, priorities, and technician assignment status."
  },
  "/website/overview": {
    title: "Website Overview",
    description: "Monitor uptime, traffic, and deployment health across projects."
  },
  "/website/pages": {
    title: "Website Pages",
    description: "Manage page inventory and publishing workflow."
  },
  "/website/requests": {
    title: "Website Requests",
    description: "Review backlog for content edits, new pages, and fixes."
  },
  "/marketing/overview": {
    title: "Marketing Overview",
    description: "Analyze channel performance and campaign pacing."
  },
  "/marketing/requests": {
    title: "Marketing Requests",
    description: "Coordinate campaign setup and creative requests."
  },
  "/billing/invoices": {
    title: "Invoices",
    description: "Manage invoice states, due dates, and payment outcomes."
  },
  "/billing/plans": {
    title: "Plans",
    description: "Review current plans and account billing settings."
  },
  "/admin/overview": {
    title: "Admin Overview",
    description: "High-level control center for operational oversight."
  },
  "/admin/users": {
    title: "Admin Users",
    description: "Manage workspace users, access, and password resets."
  },
  "/admin/requests": {
    title: "Admin Requests",
    description: "Handle elevated access requests and approvals."
  },
  "/admin/clients": {
    title: "Admin Clients",
    description: "Manage client workspaces, roles, and account controls."
  }
};
