import { csv, timeParse } from "d3";
import { useEffect, useState } from "react";

export const useData = <T extends {}>() => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    csv("/usd-2020.csv").then((d: any) => {
      d = d.reverse();
      const parseDate = timeParse("%m/%d/%Y");
      d.forEach((i: any) => {
        i.date = parseDate(i.date);
        i.price = Number(i.price);
      });
      setData(d);
    });

    return () => undefined;
  }, []);
  return data;
};
