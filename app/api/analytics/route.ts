// app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Initialize the Analytics Data client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const propertyId = process.env.GA4_PROPERTY_ID; // Your GA4 Property ID

export async function GET() {
  try {
    // Get date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    // Fetch multiple reports in parallel
    const [
      pageViewsResponse,
      usersResponse,
      topPagesResponse,
      deviceTypesResponse,
      overviewResponse,
    ] = await Promise.all([
      // Page views over time
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: formatDate(startDate), endDate: formatDate(endDate) },
        ],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),

      // Users over time
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: formatDate(startDate), endDate: formatDate(endDate) },
        ],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),

      // Top pages
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: formatDate(startDate), endDate: formatDate(endDate) },
        ],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),

      // Device categories
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: formatDate(startDate), endDate: formatDate(endDate) },
        ],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),

      // Overview metrics
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          { startDate: formatDate(startDate), endDate: formatDate(endDate) },
        ],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
    ]);

    // Process page views data
    const pageViews =
      pageViewsResponse[0].rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value || "",
        views: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

    // Process users data
    const users =
      usersResponse[0].rows?.map((row) => ({
        date: row.dimensionValues?.[0]?.value || "",
        users: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

    // Process top pages data
    const topPages =
      topPagesResponse[0].rows?.map((row) => ({
        page: row.dimensionValues?.[0]?.value || "",
        views: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

    // Process device types data
    const deviceData =
      deviceTypesResponse[0].rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value || "",
        users: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

    const totalDeviceUsers = deviceData.reduce(
      (sum, item) => sum + item.users,
      0
    );
    const deviceTypes = deviceData.map((item) => ({
      ...item,
      percentage:
        totalDeviceUsers > 0
          ? Math.round((item.users / totalDeviceUsers) * 100)
          : 0,
    }));

    // Process overview metrics
    const overviewRow = overviewResponse[0].rows?.[0];
    const totalUsers = parseInt(overviewRow?.metricValues?.[0]?.value || "0");
    const newUsers = parseInt(overviewRow?.metricValues?.[1]?.value || "0");
    const totalSessions = parseInt(
      overviewRow?.metricValues?.[2]?.value || "0"
    );
    const totalPageViews = parseInt(
      overviewRow?.metricValues?.[3]?.value || "0"
    );
    const avgSessionDurationSeconds = parseInt(
      overviewRow?.metricValues?.[4]?.value || "0"
    );
    const bounceRate = Math.round(
      parseFloat(overviewRow?.metricValues?.[5]?.value || "0") * 100
    );

    // Format average session duration
    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    };

    const analyticsData = {
      pageViews,
      users,
      topPages,
      deviceTypes,
      totalUsers,
      totalSessions,
      totalPageViews,
      avgSessionDuration: formatDuration(avgSessionDurationSeconds),
      bounceRate,
      newUsers,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
