import axios from 'axios';

export interface Ingredient {
  ingredientIdx: number;
  name: string;
  englishName: string;
  description: string;
}

export interface IngredientResponse {
  count: number;
  rows: Ingredient[];
}

export const GetIngredient = async (
  page: number,
): Promise<IngredientResponse> => {
  try {
    const response = await axios.get('/api/admin/ingredients', {
      params: { page },
    });
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
