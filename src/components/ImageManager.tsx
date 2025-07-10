"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

export default function ImageManager() {
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchImages = async () => {
    const res = await fetch("/api/list");
    if (res.ok) {
      const data = await res.json();
      setImages(data);
    }
  };

  const handleDelete = async (filename: string) => {
    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    fetchImages();
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setFile(null);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Image Manager
      </Typography>
      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={img}>
            <Card sx={{ height: 250, position: "relative" }}>
              <CardMedia
                component="img"
                image={`/input/${img}`}
                alt={img}
                sx={{ height: "100%", objectFit: "cover" }}
              />
              <IconButton
                onClick={() => handleDelete(img)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" gap={2} alignItems="center">
        {/* ファイル選択ボタン */}
        <Button variant="outlined" component="label">
          Select File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </Button>

        {/* アップロードボタン */}
        <Button variant="contained" onClick={handleUpload} disabled={!file}>
          Upload
        </Button>

        {/* 選択中のファイル名の表示（任意） */}
        {file && <Typography>{file.name}</Typography>}
      </Box>
    </Box>
  );
}
