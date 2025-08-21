"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart as BarChartIcon, Users, Award, Brain } from "lucide-react";
import { PacmanLoader } from "react-spinners";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardView = ({ insights }) => {
  console.log("insights", insights);



  // Helper function to get color based on value
  const getOutlookColor = (outlook) => {
    switch (outlook?.toLowerCase()) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getDemandColor = (demand) => {
    switch (demand?.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div>
         <h1 className="text-4xl p-4 sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight max-w-4xl">
        Industry Insights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
        {/* Market Outlook Card */}
        <Card className=" border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Market Outlook
            </CardTitle>
            <TrendingUp
              className={`h-4 w-4 ${getOutlookColor(insights.marketOutlook)}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getOutlookColor(
                insights.marketOutlook
              )}`}
            >
              {insights.marketOutlook?.toUpperCase() || "N/A"}
            </div>
            <p className="text-xs text-gray-500 mt-1">Next update in 7 days</p>
          </CardContent>
        </Card>

        {/* Industry Growth Card */}
        <Card className=" border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Industry Growth
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.growthRate ? `${insights.growthRate}%` : "N/A"}
            </div>
            <Progress value={insights.growthRate || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        {/* Demand Level Card */}
        <Card className=" border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Demand Level
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.demandLevel || "N/A"}
            </div>
            <div className="mt-2">
              <div
                className={`h-2 rounded-full ${getDemandColor(
                  insights.demandLevel
                )}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Skills Card */}
        <Card className=" border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-gray-400" />
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills && insights.topSkills.length > 0 ? (
                insights.topSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="rounded-md px-3 py-1 text-sm font-medium bg-gray-800 text-white"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <div className="text-xs text-gray-500">No skills data</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <div className="p-6">
        <Card className="border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">
              Salary Ranges by Role($)
            </CardTitle>
            <p className="text-sm text-gray-400">
              Displaying minimum, median, and maximum salaries (in thousands)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={insights.salaryRanges?.map(role => ({
                    name: role.role.replace(/\s*\([^)]*\)/g, '').split(' ').slice(0, 2).join(' '),
                    min: Math.round(role.min / 1000),
                    median: Math.round(role.median / 1000),
                    max: Math.round(role.max / 1000),
                    fullRole: role.role,
                    location: role.location
                  })) || []}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value, name) => [
                      `$${value}k`,
                      name === 'min' ? 'Minimum' : name === 'median' ? 'Median' : 'Maximum'
                    ]}
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.fullRole}`;
                      }
                      return label;
                    }}
                  />
                  <Bar
                    dataKey="min"
                    fill="#6B7280"
                    name="min"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="median"
                    fill="#9CA3AF"
                    name="median"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="max"
                    fill="#D1D5DB"
                    name="max"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Trends and Recommended Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Key Industry Trends Card */}
        <Card className="border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">
              Key Industry Trends
            </CardTitle>
            <p className="text-sm text-gray-400">
              Current trends shaping the industry
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.keyTrends && insights.keyTrends.length > 0 ? (
                insights.keyTrends.map((trend, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {trend}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No trends data available</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Skills Card */}
        <Card className="border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">
              Recommended Skills
            </CardTitle>
            <p className="text-sm text-gray-400">
              Skills to consider developing
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills && insights.recommendedSkills.length > 0 ? (
                insights.recommendedSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="rounded-md px-3 py-2 text-sm font-medium bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <div className="text-sm text-gray-500">No recommended skills data</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
