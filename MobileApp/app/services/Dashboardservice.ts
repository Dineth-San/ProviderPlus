/**
 * dashboardService.ts
 * ────────────────────
 * Service layer for the Provider Dashboard.
 * Handles all API calls related to the dashboard screen.
 *
 */

import apiClient from './apiClient';

// ─── Types ────────────────────────────────────────────────────

export interface DashboardData {
  completedJobs: number;
  upcomingJobs: number;
  notifications: number;
  rating: number;
  totalReviews: number;
  customerResponses: number;
  reSchedules: number;
}

export interface AIOverviewRequest {
  provider_id: string;
  provider_name: string;
  job_role: string;
  completed_jobs_today: number;
  upcoming_jobs: number;
  rating: number;
}

export interface AIOverviewResponse {
  overview: string;
  provider_id: string;
  status: string;
}

// ─── Default Dashboard Data (used as fallback) ────────────────

export const DEFAULT_DASHBOARD_DATA: DashboardData = {
  completedJobs: 0,
  upcomingJobs: 0,
  notifications: 0,
  rating: 0,
  totalReviews: 0,
  customerResponses: 0,
  reSchedules: 0,
};

// ─── API Calls ────────────────────────────────────────────────

/**
 * Fetches the AI-powered overview from the Gemini backend.
 * Endpoint: POST /api/gemini/provider-overview
 */
export const fetchAIOverview = async (
  request: AIOverviewRequest
): Promise<string> => {
  const response = await apiClient.post<AIOverviewResponse>(
    '/gemini/provider-overview',
    request
  );
  return response.data.overview;
};

/**
 * Fetches the provider's dashboard stats.
 * Endpoint: GET /api/provider/:providerId/dashboard
 *
 * NOTE: This endpoint doesn't exist in your backend yet.
 * Until you build it, the dashboard will use the default/hardcoded values.
 * When ready, create the route in BackendAPI/app/routes/provider_routes.py
 */
export const fetchDashboardData = async (
  providerId: string
): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>(
    `/provider/${providerId}/dashboard`
  );
  return response.data;
};