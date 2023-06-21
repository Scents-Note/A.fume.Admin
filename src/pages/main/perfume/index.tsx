import { useCallback, useEffect, useState } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import { Pagination } from '@mui/material';

import { MainLayout } from '@/components/icons/pages/main/MainLayout';
import { GetPerfume } from '@/common/api/perfume/GetPerfume';
import {
  DetailPerfume,
  GetDetailPerfume,
} from '@/common/api/perfume/GetDetailPerfume';

const columns: MUIDataTableColumnDef[] = [
  { name: 'perfumeIdx', label: 'idx' },
  { name: 'name', label: '이름' },
  { name: 'brandName', label: '브랜드' },
  { name: 'brandName', label: '영어 이름' },
  { name: 'story', label: '조향 스토리' },
  { name: 'volumeAndPrice', label: '용량 / 가격' },
  { name: 'brandName', label: '브랜드' },
  { name: 'score', label: '부향률' },
  { name: 'top', label: '탑노트' },
  { name: 'middle', label: '미들 노트' },
  { name: 'base', label: '베이스 노트' },
  { name: 'single', label: '싱글 노트' },
];

// @TODO 예외처리
export const PerfumePage: React.FC = () => {
  const [data, setData] = useState<DetailPerfume[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(101);

  const getPerfumeList = useCallback(async () => {
    setData([]);
    const perfumeData = await GetPerfume(page);

    perfumeData.rows.forEach(async (row) => {
      try {
        const detailPerfumeData = await GetDetailPerfume(row.perfumeIdx);
        setData((prev) => [...prev, { ...detailPerfumeData } as DetailPerfume]);
      } catch (err: any) {
        console.log(err.message);
      }
    });
  }, [page]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getPerfumeList();
  }, [getPerfumeList]);

  useEffect(() => {
    if (page === maxPage) {
      GetPerfume(page + 1).then((response) => {
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
          title="향수"
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
