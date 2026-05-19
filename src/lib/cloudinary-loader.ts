export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ["f_auto", `q_${quality || 75}`, `w_${width}`, "c_limit"].join(",");
  return src.replace("/upload/", `/upload/${params}/`);
}
