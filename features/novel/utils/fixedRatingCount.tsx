const fixedRatingCount = (ratingCount: number | null | undefined) => {
  if (!ratingCount) return "??";
  if (ratingCount < 1000) {
    return ratingCount;
  }
  const fixedRatingCount = (ratingCount / 1000).toFixed(1);
  return `${fixedRatingCount}K`;
};

export { fixedRatingCount };
