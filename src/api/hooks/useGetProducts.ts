import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ProductData } from '@/types';

import { BASE_URL } from '../instance';
import { fetchInstance } from './../instance/index';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

type ProductsResponseData = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type ProductsResponseRawData = ProductData[];

export const getProductsPath = ({
  categoryId,
  pageToken = '0',
  maxResults = 10,
}: RequestParams) => {
  const params = new URLSearchParams();

  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());
  params.append('sort', 'name,asc');
  params.append('categoryId', categoryId);

  return `${BASE_URL}/api/products?${params.toString()}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));
  const responseData = response.data;
  console.log('Res:', response);
  console.log('data:', responseData);

  const pageToken = parseInt(params.pageToken || '0', 10);
  const resultsPerPage = params.maxResults || 10;
  const nextPageToken =
    responseData.length < resultsPerPage ? undefined : (pageToken + 1).toString();

  return {
    products: responseData,
    nextPageToken: nextPageToken,
    pageInfo: {
      totalResults: responseData.length,
      resultsPerPage: resultsPerPage,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };
export const useGetProducts = ({
  categoryId,
  maxResults = 10,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
