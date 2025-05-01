export default function shuffleArray<T>(
  arr: T[],
  CHAOS_ITER: number = 1000,
): T[] {
  const len = arr.length;

  // Step 1: Fisher-Yates dasar (O(n))
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  for (let k = 0; k < CHAOS_ITER; k++) {
    const idx1 = Math.floor(Math.random() * len);
    const idx2 = Math.floor(Math.random() * len);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  for (let i = 0; i < len; i++) {
    const swapIdx = (i ^ Math.floor(Math.random() * len)) % len;
    [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
  }

  return arr;
}
