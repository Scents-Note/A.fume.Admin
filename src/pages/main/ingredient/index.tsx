import { useCallback, useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Pagination } from '@mui/material';

import { MainLayout } from '@/components/icons/pages/main/MainLayout';
import { GetIngredient, Ingredient } from '@/common/api/ingredient/GetIngredient';

const columns: MUIDataTableColumnDef[] = [
  { name: 'ingredientIdx', label: 'idx' },
  { name: 'name', label: '이름' },
  { name: 'englishName', label: '영어 이름' },
  { name: 'description', label: '설명' },
  //   { name: 'story', label: '계열 이름' },
  //   { name: 'volumeAndPrice', label: '카테고리' },
];

// @TODO 예외처리
export const PerfumePage: React.FC = () => {
  const [data, setData] = useState<Ingredient[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(101);

  const getIngredients = useCallback(async () => {
    const ingredientData = await GetIngredient(page);
    setData(ingredientData.rows);
  }, [page]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  useEffect(() => {
    if (page === maxPage) {
      GetIngredient(page + 1).then((response) => {
        if (response.rows.length > 0) setMaxPage((prev) => prev + 100);
      });
    }
  }, [maxPage, page]);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-30">
        <MUIDataTable
          columns={columns}
          data={data}
          title="향료"
          options={{
            download: false,
            print: false,
            search: false,
            filter: false,
            viewColumns: false,
            pagination: false,
            selectableRows: 'none',
            tableBodyHeight: '500px',
            tableBodyMaxHeight: '500px',
          }}
        />
        <div className="w-full flex items-center justify-center">
          <Pagination
            showFirstButton
            showLastButton
            page={page}
            count={maxPage}
            onChange={handleChange}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default PerfumePage;
