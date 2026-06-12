import { Users, Network, Briefcase, CalendarClock } from "lucide-react";
import type { StatCardProps } from "@/components/cards";

export const HEADCOUNT_BY_DEPARTMENT = [
    { department: "Engineering", count: 12 },
    { department: "Finance", count: 6 },
    { department: "Design", count: 4 },
    { department: "HR", count: 2 },
];

export const EMPLOYEE_GROWTH = [
    { month: "Jan", count: 4 },
    { month: "Feb", count: 10 },
    { month: "Mar", count: 16 },
    { month: "Apr", count: 22 },
    { month: "May", count: 23 },
    { month: "Jun", count: 23 },
];

export const LEAVE_BY_TYPE = [
    { id: 0, label: "Annual", value: 45 },
    { id: 1, label: "Sick", value: 25 },
    { id: 2, label: "Maternity", value: 15 },
    { id: 3, label: "Other", value: 15 },
];

export const PENDING_LEAVE = [
    { id: 1, name: "Peter M", type: "Annual Leave", dates: "May 20 - 25" },
    { id: 2, name: "Lucy W", type: "Sick Leave", dates: "May 18" },
];

export const RECENT_HIRES = [
    {
        id: 1,
        name: "Jane Doe",
        email: "jane.doe@acme.com",
        phone: "+254 712 345 678",
        department: "Engineering",
        joined: "3 days ago",
    },
    {
        id: 2,
        name: "John Smith",
        email: "john.smith@acme.com",
        phone: "+254 701 234 567",
        department: "Finance",
        joined: "1 week ago",
    },
    {
        id: 3,
        name: "Mary K",
        email: "mary.k@acme.com",
        phone: "+254 720 111 222",
        department: "Design",
        joined: "2 weeks ago",
    },
];

export const HR_STATS: StatCardProps[] = [
    { label: "Total Employees", value: 24, subtext: "+2 this month", color: "primary", icon: <Users size={16} /> },
    { label: "Departments", value: 5, subtext: "5 teams", color: "info", icon: <Network size={16} /> },
    {
        label: "Open Positions",
        value: 3,
        subtext: "3 active job postings",
        color: "warning",
        icon: <Briefcase size={16} />,
    },
    {
        label: "Pending Leave Requests",
        value: 7,
        subtext: "Needs review",
        color: "secondary",
        icon: <CalendarClock size={16} />,
    },
];
