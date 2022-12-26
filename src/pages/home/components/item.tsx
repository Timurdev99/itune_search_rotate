import React from "react";
import { Typography } from "@mui/material";

interface ItemPropType {
  content: string;
}

export const Item: React.FC<ItemPropType> = ({ content }) => {
  return (
    <Typography
      color="secondary"
      sx={{
        padding: "8px",
        fontSize: "16px",
        marginBottom: "16px",
        border: "1px solid blue",
        textAlign: "center",
        borderRadius: "6px",
      }}
    >
      {content}
    </Typography>
  );
};
