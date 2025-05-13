import { fetchWithAuth } from './api.service';
import { API_CONFIG } from '../config/api.config';

export const adminService = {
    getDashboardData: async () => {
        return fetchWithAuth('/admin/dashboard');
    },

    getAdminHouses: async () => {
        return fetchWithAuth('/admin/houselist');
    },

    deleteHouse: async (houseId: number) => {
        return fetchWithAuth(`/admin/delete/${houseId}`, { method: 'DELETE' });
    },

    updateHouse: async (houseId: number, data: any) => {
        return fetchWithAuth(`/admin/edit/${houseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    postHouse: async (formData: FormData) => {
        return fetchWithAuth('/admin/house-post', {
            method: 'POST',
            body: formData,
        });
    },

    getVisitRequests: async () => {
        return fetchWithAuth('/admin/visit-request');
    },

    markVisitRequestAsSeen: async (requestId: number) => {
        return fetchWithAuth(`/admin/${requestId}/mark-seen`, { method: 'PUT' });
    },

    createSuccessReport: async (requestId: number, formData: FormData) => {
        return fetchWithAuth(`/admin/success-report/${requestId}`, {
            method: 'POST',
            body: formData,
        });
    },

    createFailureReport: async (requestId: number, formData: FormData) => {
        return fetchWithAuth(`/admin/failure-report/${requestId}`, {
            method: 'POST',
            body: formData,
        });
    },

    getLocations: async () => {
        const response = await fetch(`${API_CONFIG.BASE_URL}/user/locations`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },
}; 