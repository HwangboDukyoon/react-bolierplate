import apiCall from "@/shared/api/apiCall";

export const useValidateAccessToken = async (token: string | null) => {
    if (!token) return false;
    try {
        const response = await apiCall.get('/v1/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch {
        return false;
    }
};