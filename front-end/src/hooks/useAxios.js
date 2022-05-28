import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (options, onSuccess, onError) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(options)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        setData(data);
        onSuccess(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        onError(error);
      });
  }, []);

  return { data, error, loading };
};

export default useAxios;
