import axios from 'axios';

export interface DetailPerfume {
  perfumeIdx: number;
  name: string;
  isLiked: string;
  imageUrl: string;
  brandName: string;
  story: string;
  abundanceRate: string;
  volumeAndPrice: string[];
  score: number;
  top: string;
  middle: string;
  base: string;
  single: string;
}

export const GetDetailPerfume = async (
  index: number,
): Promise<DetailPerfume> => {
  try {
    const response = await axios.get(`/api/admin/perfumes/${index}`);

    const finalResponse: DetailPerfume = {
      perfumeIdx: response.data.data.perfumeIdx,
      abundanceRate: response.data.data.abundanceRate,
      score: response.data.data.score,
      story: response.data.data.story,
      name: response.data.data.name,
      isLiked: response.data.data.isLiked,
      imageUrl: response.data.data.imageUrl,
      brandName: response.data.data.brandName,
      volumeAndPrice: response.data.data.volumeAndPrice,
      top: response.data.data.ingredients.top,
      middle: response.data.data.ingredients.middle,
      base: response.data.data.ingredients.base,
      single: response.data.data.ingredients.single,
    };
    return finalResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
