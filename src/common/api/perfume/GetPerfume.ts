import axios from 'axios';

export interface Perfume {
  perfumeIdx: number;
  name: string;
  isLiked: boolean;
  imageUrl: string;
  brandName: string;
}

export interface PerfumeResponse {
  count: number;
  rows: Perfume[];
}

export const GetPerfume = async (page: number): Promise<PerfumeResponse> => {
  try {
    const response = await axios.get('/api/admin/perfumes', {
      params: { page },
    });
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
