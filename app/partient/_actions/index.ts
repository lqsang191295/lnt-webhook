import { get } from "@/api/client";

const FILE_API_URL = process.env.NEXT_PUBLIC_FILE_API || "";

export const getFilePatientData = async (patientId: string, date?: string) => {
    try {
        const response = await get(`${FILE_API_URL}/upload/${patientId}${date ? '/' + date : ''}`);

        if (response.error) {
            return [];
        }

        return response.data;
    } catch (ex) {
        return [];
    }
}