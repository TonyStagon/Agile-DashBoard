
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Bell, 
  BookOpen, 
  MapPin, 
  Activity,
  Download
} from 'lucide-react';

// TypeScript interfaces for dashboard components only
// (Original schema interfaces removed for clarity)

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  totalMessages: number;
  avgResponseTime: number;
  avgSentiment: number;
}

interface ProvinceStats {
  province: string;
  userCount: number;
  conversations: number;
}

interface SubjectStats {
  subject: string;
  messageCount: number;
  avgResponseTime: number;
}

// Simulated API functions - replace with actual Supabase calls
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalUsers: 2847,
    activeUsers: 1234,
    totalConversations: 5691,
    totalMessages: 18347,
    avgResponseTime: 1200,
    avgSentiment: 0.74
  };
};

const fetchProvinceStats = async (): Promise<ProvinceStats[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { province: 'Gauteng', userCount: 892, conversations: 1847 },
    { province: 'Western Cape', userCount: 654, conversations: 1234 },
    { province: 'KwaZulu-Natal', userCount: 543, conversations: 987 },
    { province: 'Eastern Cape', userCount: 321, conversations: 567 },
    { province: 'Mpumalanga', userCount: 234, conversations: 432 },
    { province: 'Limpopo', userCount: 203, conversations: 389 }
  ];
};

const fetchSubjectStats = async (): Promise<SubjectStats[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    { subject: 'Mathematics', messageCount: 7234, avgResponseTime: 1450 },
    { subject: 'Science', messageCount: 4567, avgResponseTime: 1320 },
    { subject: 'English', messageCount: 3456, avgResponseTime: 980 },
    { subject: 'History', messageCount: 2134, avgResponseTime: 1100 },
    { subject: 'Geography', messageCount: 1456, avgResponseTime: 1250 }
  ];
};

// Components
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${!trendUp ? 'rotate-180' : ''}`} />
            {trend}
          </div>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const ProvinceChart: React.FC<{ data: ProvinceStats[] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Province</h3>
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.province} className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{item.province}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(item.userCount / Math.max(...data.map(d => d.userCount))) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-900 w-16 text-right">
              {item.userCount.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SubjectChart: React.FC<{ data: SubjectStats[] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Subjects</h3>
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.subject} className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{item.subject}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-500">
              {item.avgResponseTime}ms avg
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {item.messageCount.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentActivity: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      <Activity className="w-5 h-5 text-gray-400" />
    </div>
    <div className="space-y-3">
      {[
        { user: 'Aisha N.', action: 'Started new math conversation', time: '2 min ago', subject: 'Algebra' },
        { user: 'Thabo M.', action: 'Completed chemistry session', time: '5 min ago', subject: 'Chemistry' },
        { user: 'Lerato S.', action: 'Bookmarked UCT', time: '8 min ago', subject: 'University' },
        { user: 'Sipho K.', action: 'Asked physics question', time: '12 min ago', subject: 'Physics' },
        { user: 'Nomsa P.', action: 'Updated profile', time: '15 min ago', subject: 'Profile' }
      ].map((activity, index) => (
        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          <div className="flex-1">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{activity.time}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {activity.subject}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [provinceData, setProvinceData] = useState<ProvinceStats[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('7d');

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, provinceStats, subjectStats] = await Promise.all([
          fetchDashboardStats(),
          fetchProvinceStats(),
          fetchSubjectStats()
        ]);
        
        setStats(statsData);
        setProvinceData(provinceStats);
        setSubjectData(subjectStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [timeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Education Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor student engagement and learning outcomes</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers.toLocaleString() || '0'}
            icon={<Users className="w-6 h-6 text-blue-600" />}
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="Active Users"
            value={stats?.activeUsers.toLocaleString() || '0'}
            icon={<Activity className="w-6 h-6 text-green-600" />}
            trend="+8.2%"
            trendUp={true}
          />
          <StatCard
            title="Conversations"
            value={stats?.totalConversations.toLocaleString() || '0'}
            icon={<MessageSquare className="w-6 h-6 text-purple-600" />}
            trend="+15.8%"
            trendUp={true}
          />
          <StatCard
            title="Avg Response Time"
            value={`${stats?.avgResponseTime || 0}ms`}
            icon={<Clock className="w-6 h-6 text-orange-600" />}
            trend="-5.2%"
            trendUp={false}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Messages"
            value={stats?.totalMessages.toLocaleString() || '0'}
            icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Avg Sentiment"
            value={`${((stats?.avgSentiment || 0) * 100).toFixed(1)}%`}
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          />
          <StatCard
            title="Notifications Sent"
            value="1,247"
            icon={<Bell className="w-6 h-6 text-yellow-600" />}
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProvinceChart data={provinceData} />
          <SubjectChart data={subjectData} />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Math Questions</span>
                <span className="text-lg font-bold text-blue-600">7,234</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">Science Questions</span>
                <span className="text-lg font-bold text-green-600">4,567</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-900">University Matches</span>
                <span className="text-lg font-bold text-purple-600">1,892</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-orange-900">Bookmarks</span>
                <span className="text-lg font-bold text-orange-600">3,456</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;