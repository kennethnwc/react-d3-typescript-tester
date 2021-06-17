import { useState, useEffect } from "react";
import { rawData } from "./rawData";

export const useData = <T extends {}>() => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    setData(rawData as any);
  }, []);
  return data;
};
