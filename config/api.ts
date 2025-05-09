export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    POSTED_HOUSES: `${API_BASE_URL}/user/posted`,
    VIP_HOUSES: `${API_BASE_URL}/user/vip-houses`,
    LOCATIONS: `${API_BASE_URL}/user/locations`,
    HOUSE_POST: `${API_BASE_URL}/user/house-post`,
    HOUSE_LIST: (params: string) => `${API_BASE_URL}/user/house-list?${params}`,
    HOUSE_DETAIL: (id: string) => `${API_BASE_URL}/user/house/${id}`,
    VISIT_REQUEST: `${API_BASE_URL}/user/visite-request`,
    FETCH_VISIT_REQUEST: `${API_BASE_URL}/user/fetch_visit_request`,
    ADMIN_SEARCH: (areaName: string) => `${API_BASE_URL}/user/admins/search?area_name=${areaName}`,
  },
  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    HOUSES: `${API_BASE_URL}/admin/houses`,
    VISIT_REQUESTS: `${API_BASE_URL}/admin/visit`,
    POST_REQUESTS: `${API_BASE_URL}/admin/post-requests`,
    HOUSES_REPORT: `${API_BASE_URL}/admin/houses-report`,
    REPORT: {
      SUCCESS: (houseId: string) => `${API_BASE_URL}/admin/report/success/${houseId}`,
      FAILURE: (houseId: string) => `${API_BASE_URL}/admin/report/failure/${houseId}`,
    },
  },
  // Super Admin endpoints
  SUPER_ADMIN: {
    DASHBOARD: `${API_BASE_URL}/super-admin/dashboard`,
    ADMINS: `${API_BASE_URL}/super-admin/admins`,
    EXPENSES: `${API_BASE_URL}/super-admin/expenses`,
    FINANCES: `${API_BASE_URL}/super-admin/finances`,
  },
} as const; 