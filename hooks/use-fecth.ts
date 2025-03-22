import { useState } from "react";

const useFetch = <T, A extends unknown[]>(cb: (...args: A) => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: A) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);

      setData(response);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error); // ✅ Không cần khai báo kiểu `Error`
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
