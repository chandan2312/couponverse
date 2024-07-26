import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { backurl } from "../../constants";

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
      axios.get(`${backurl}${apipath}`, {
        signal,
      }),
  });

  const data = res?.data.data;
  const msg = res?.data.msg;
  const status = res?.data.status;

  return { data, msg, status, reqloading, isError, isSuccess, error };
};

export default useFetchData;
