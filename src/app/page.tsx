"use client";

import { useState } from "react";
import ImageSlider from "@/components/ImageSlider";
import GroupScoreBoard from "@/components/GroupScoreBoard";
import QuizController from "@/components/QuizController";
import { Button, TextField, Typography, Box } from "@mui/material";
import { messages } from "@/i18n/messages";
import { Header } from "./Header";

const TOTAL_QUIZZES = 13;
const IMAGES_PER_QUIZ = 5;

const generateGroupNames = (count: number): string[] => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: count }, (_, i) =>
    i < letters.length ? letters[i] : `G${i + 1}`
  );
};

export default function Home() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [groupCountInput, setGroupCountInput] = useState(4);
  const [groups, setGroups] = useState(generateGroupNames(4));
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(generateGroupNames(4).map((g) => [g, 0]))
  );
  const [language, setLanguage] = useState<"ja" | "en">("ja");
  const t = messages[language]; // ← 翻訳関数の代わり
  const [step, setStep] = useState<"title" | "rules" | "quiz">("title");

  const imageSrc = `/images/${quizIndex + 1}-${imageIndex + 1}.jpg`;

  const nextImage = () =>
    imageIndex < IMAGES_PER_QUIZ - 1 && setImageIndex((i) => i + 1);
  const prevImage = () => imageIndex > 0 && setImageIndex((i) => i - 1);
  const nextQuiz = () => {
    if (quizIndex < TOTAL_QUIZZES - 1) {
      setQuizIndex((q) => q + 1);
      setImageIndex(0);
    }
  };
  const prevQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex((q) => q - 1);
      setImageIndex(0);
    }
  };
  const addScore = (group: string) => {
    setScores((prev) => ({ ...prev, [group]: prev[group] + 1 }));
  };
  const applyGroupCount = () => {
    const newGroups = generateGroupNames(groupCountInput);
    setGroups(newGroups);
    setScores(Object.fromEntries(newGroups.map((g) => [g, 0])));
  };
  const subtractScore = (group: string) => {
    setScores((prev) => ({
      ...prev,
      [group]: Math.max(0, prev[group] - 1), // 点数が0未満にならないように
    }));
  };

  return (
    <>
      <Header
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === "ja" ? "en" : "ja"))
        }
      />
      <Box
        sx={{
          minHeight: "100vh",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {step === "title" && (
          <Box textAlign="center">
            <Typography variant="h2" fontWeight="bold">
              {t.title}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep("rules")}
              sx={{ mt: 4 }}
            >
              {language === "ja" ? "スタート" : "Start"}
            </Button>
          </Box>
        )}
        {step === "rules" && (
          <Box maxWidth="600px" textAlign="center">
            <Typography variant="h5" gutterBottom>
              {language === "ja" ? "ルール説明" : "How to Play"}
            </Typography>
            {language === "ja" ? (
              <>
                <Typography variant="body1" paragraph>
                  各問題では、5段階のモザイクのかかった画像を用意しています。
                </Typography>
                <Typography variant="body1" paragraph>
                  各段階で、グループごとにホワイトボードに答えを書いてください。
                </Typography>
                <Typography variant="body1" paragraph>
                  最も早い段階で正解したグループに1点が加算されます！
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" paragraph>
                  Each question provides an image with five levels of mosaic.
                </Typography>
                <Typography variant="body1" paragraph>
                  At each step, each group writes their answer on a whiteboard.
                </Typography>
                <Typography variant="body1" paragraph>
                  The group that answers correctly the earliest gets 1 point!
                </Typography>
              </>
            )}
            <Box mt={4}>
              <img
                src="/img/sample.jpg"
                alt="サンプル画像"
                style={{
                  maxWidth: "50%",
                  height: "auto",
                  textAlign: "center",
                  margin: "0 auto",
                }}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setStep("quiz")}
              sx={{ mt: 4 }}
            >
              {language === "ja" ? "次へ" : "Next"}
            </Button>
          </Box>
        )}
        {step === "quiz" && (
          <>
            <Typography variant="h4" fontWeight="bold">
              {t.title}
            </Typography>

            <Typography variant="h6">
              {t.question} {quizIndex + 1} / {TOTAL_QUIZZES}
            </Typography>

            <ImageSlider
              imageSrc={imageSrc}
              altText={`クイズ${quizIndex + 1}`}
            />
            <QuizController
              imageIndex={imageIndex}
              maxImages={IMAGES_PER_QUIZ}
              quizIndex={quizIndex}
              maxQuizzes={TOTAL_QUIZZES}
              onNextImage={nextImage}
              onPrevImage={prevImage}
              onNextQuiz={nextQuiz}
              onPrevQuiz={prevQuiz}
              t={{
                prevImage: t.prevImage,
                nextImage: t.nextImage,
                prevQuiz: t.prevQuiz,
                nextQuiz: t.nextQuiz,
              }}
            />

            <GroupScoreBoard
              scores={scores}
              onAddScore={addScore}
              onSubtractScore={subtractScore}
              groups={groups}
              t={{
                group: t.group,
                points: t.points,
                plus: t.plus,
                minus: t.minus,
              }}
            />

            {/* グループ数入力 */}
            <Box display="flex" alignItems="center" gap={2} mt={4}>
              <TextField
                type="number"
                label={t.groupCount} // ← 多言語対応
                size="small"
                value={groupCountInput}
                onChange={(e) => setGroupCountInput(Number(e.target.value))}
                inputProps={{ min: 1, max: 26 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={applyGroupCount}
              >
                {t.apply}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
