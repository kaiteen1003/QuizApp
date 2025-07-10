"use client";

interface Props {
  imageIndex: number;
  maxImages: number;
  quizIndex: number;
  maxQuizzes: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  onNextQuiz: () => void;
  onPrevQuiz: () => void;
  t: {
    prevImage: string;
    nextImage: string;
    prevQuiz: string;
    nextQuiz: string;
  };
}

export default function QuizController({
  imageIndex,
  maxImages,
  quizIndex,
  maxQuizzes,
  onNextImage,
  onPrevImage,
  onNextQuiz,
  onPrevQuiz,
  t,
}: Props) {
  const canPrevImage = imageIndex > 0;
  const canNextImage = imageIndex < maxImages - 1;
  const canPrevQuiz = quizIndex > 0;
  const canNextQuiz = quizIndex < maxQuizzes - 1;

  const getButtonClass = (enabled: boolean) =>
    `px-4 py-2 rounded text-white transition ${
      enabled
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-gray-400 cursor-not-allowed"
    }`;

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="flex gap-4">
        <button
          onClick={onPrevImage}
          disabled={!canPrevImage}
          className={getButtonClass(canPrevImage)}
        >
          {t.prevImage}
        </button>
        <button
          onClick={onNextImage}
          disabled={!canNextImage}
          className={getButtonClass(canNextImage)}
        >
          {t.nextImage}
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrevQuiz}
          disabled={!canPrevQuiz}
          className={getButtonClass(canPrevQuiz)}
        >
          {t.prevQuiz}
        </button>
        <button
          onClick={onNextQuiz}
          disabled={!canNextQuiz}
          className={getButtonClass(canNextQuiz)}
        >
          {t.nextQuiz}
        </button>
      </div>
    </div>
  );
}
