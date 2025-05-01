export default function uuid() {
  const now = BigInt(Date.now()); // milidetik
  const timeHigh = (now >> 16n) & 0xffffffffn;
  const timeLow = now & 0xffffn;

  const randA = crypto.getRandomValues(new Uint8Array(2));
  const randB = crypto.getRandomValues(new Uint8Array(8));

  const part1 = timeHigh.toString(16).padStart(8, "0");
  const part2 = timeLow.toString(16).padStart(4, "0");
  const version = "7" + randA[0].toString(16).padStart(2, "0").slice(1); // version 7
  const variant = ((randA[1] & 0x3f) | 0x80).toString(16).padStart(2, "0");
  const part4 = Array.from(randB.slice(0, 2))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const part5 = Array.from(randB.slice(2))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${part1}-${part2}-${version}${variant}-${part4}-${part5}`;
}
