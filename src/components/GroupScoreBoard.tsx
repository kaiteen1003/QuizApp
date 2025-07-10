"use client";

import { Button, Typography, Box } from "@mui/material";

interface Props {
  scores: Record<string, number>;
  onAddScore: (group: string) => void;
  onSubtractScore?: (group: string) => void;
  groups: string[];
  t: {
    group: string;
    points: string;
    plus: string;
    minus: string;
  };
}

export default function GroupScoreBoard({
  scores,
  onAddScore,
  onSubtractScore,
  groups,
  t,
}: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
        width: "100%",
        maxWidth: "70%",
        mx: "auto",
        mt: 4,
        px: 2,
      }}
    >
      {groups.map((group) => (
        <Box
          key={group}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            flexWrap: "nowrap",
          }}
        >
          <Typography variant="h6" noWrap>
            {group} {t.group}
          </Typography>
          <Typography noWrap>
            {scores[group]} {t.points}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onSubtractScore?.(group)}
            >
              {t.minus}
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => onAddScore(group)}
            >
              {t.plus}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
