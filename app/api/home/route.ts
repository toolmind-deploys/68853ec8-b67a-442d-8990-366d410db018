import { NextResponse } from 'next/server';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';

export async function GET() {
  try {
    // Initialize Firebase Admin SDK
    initFirebaseAdminSDK();

    // This is where you would typically fetch real data from your database
    // For now, we'll return a structured response that matches our dashboard needs
    const dashboardData = {
      totalUsers: 1234,
      newUsers: 56,
      activeSessions: 789,
      sessionChange: 12,
      totalRevenue: 50000,
      revenueIncrease: 5000,
      pendingTasks: 15,
      completedTasks: 8,
      recentActivity: [
        {
          title: 'New user registration',
          timestamp: '2 minutes ago'
        },
        {
          title: 'Payment processed',
          timestamp: '15 minutes ago'
        },
        {
          title: 'System update completed',
          timestamp: '1 hour ago'
        }
      ],
      quickStats: [
        {
          label: 'Average Response Time',
          value: '1.2s'
        },
        {
          label: 'System Uptime',
          value: '99.9%'
        },
        {
          label: 'Storage Usage',
          value: '75%'
        }
      ]
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}