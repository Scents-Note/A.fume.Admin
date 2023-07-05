import axios from 'axios';

export interface IngredientCategory {
  id: string;
  name: string;
}

export interface IngredientCategoryResponse {
  count: number;
  row: IngredientCategory[];
}

export const GetIngredientCategory = async (
  page: number,
  target?: string,
  keyword?: string,
): Promise<IngredientCategoryResponse> => {
  try {
    const response = await axios.get('/api/admin/ingredientCategories', {
      params: { page, target, keyword },
    });
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
