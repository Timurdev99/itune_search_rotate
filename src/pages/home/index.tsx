import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import debounce from "lodash/debounce";
import orderBy from "lodash/orderBy";
import { AxiosResponse } from "axios";

import { Item } from "./components/item";
import { getAlbums } from "src/modules/query";
import { ItuneResponse } from "src/types/itune";

export const Home: React.FC = () => {
  const [data, setData] = useState<string[]>(["A", "B", "C", "D", "E"]);
  const [search, setSearch] = useState<string>("");
  const [newData, setNewData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const newValue = newData.length ? newData[0] : data[0];
      if (newData.length) {
        setNewData(newData.slice(1, 5));
      }
      setData([...data.slice(1, 5), newValue]);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchAlbum = useCallback(
    debounce((value: string) => {
      if (!!value) {
        if (!isLoading) {
          setIsLoading(true);
          getAlbums(value)
            .then((res: AxiosResponse<ItuneResponse>) =>
              setNewData(
                orderBy(res.data.results, ["collectionName"], ["asc"])
                  .map((itune) => itune.collectionName)
                  .slice(0, 5)
              )
            )
            .catch(() => {
              setNewData([]);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } else {
        setNewData([]);
      }
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearchAlbum(e.target.value);
  };

  return (
    <Box sx={{ padding: "50px" }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: "600px",
          width: "100%",
          marginX: "auto",
          padding: "20px",
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          Rotate-Search App
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{ flexGrow: 1 }}
            value={search}
            onChange={handleChange}
          />
          {isLoading && (
            <CircularProgress size={20} sx={{ marginLeft: "8px" }} />
          )}
        </Box>
        {data.map((item, index) => (
          <Item key={index} content={item} />
        ))}
      </Paper>
    </Box>
  );
};
