import { NextResponse } from 'next/server';

export async function GET() {
    // Mock data for the dashboard
    const dashboardData = {
        totalRevenue: 1250000,
        pendingReports: 5,
        totalHouses: 150,
        pendingVisits: 8,
        successRate: 85
    };

    return NextResponse.json(dashboardData);
} 