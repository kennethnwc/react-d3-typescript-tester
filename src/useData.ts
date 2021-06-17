import { csv } from "d3";
import { useEffect, useState } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv";

export const useData = <T extends {}>() => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const row = (d: any) => {
      d.sepal_length = +d.sepal_length; // from string to number
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      return d;
    };
    csv(csvUrl, row).then((r: any) => {
      setData(r);
    });
  }, []);

  return data;
};
