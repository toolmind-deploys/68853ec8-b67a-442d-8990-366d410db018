import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Main dashboard overview',
};

async function getDashboardData() {
  const response = await fetch('http://localhost:3000/api/home', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-muted-foreground'>
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.totalUsers}</div>
            <p className='text-xs text-muted-foreground'>
              +{data.newUsers} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.activeSessions}</div>
            <p className='text-xs text-muted-foreground'>
              {data.sessionChange}% from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${data.totalRevenue}</div>
            <p className='text-xs text-muted-foreground'>
              +${data.revenueIncrease} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{data.pendingTasks}</div>
            <p className='text-xs text-muted-foreground'>
              {data.completedTasks} completed today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {data.recentActivity.map((activity: any, index: number) => (
                <div key={index} className='flex items-center'>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm font-medium leading-none'>{activity.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {data.quickStats.map((stat: any, index: number) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium leading-none'>{stat.label}</p>
                    <p className='text-sm text-muted-foreground'>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}