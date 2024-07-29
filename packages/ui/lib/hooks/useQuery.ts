import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchData = (apipath: string) => {
  const {
    data: res,
    isLoading: reqloading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: [apipath],
    queryFn: ({ signal }) =>
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}${apipath}`, {
        signal,
      }),
  });

  const data = res?.data.data;
  const msg = res?.data.msg;
  const status = res?.data.status;

  return { data, msg, status, reqloading, isError, isSuccess, error };
};

export default useFetchData;
