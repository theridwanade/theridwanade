import { ImageResponse } from "next/og";

import { BrandPreview } from "./seo-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <BrandPreview
      eyebrow="Ridwan / theridwanade"
      title="Software Engineer, Writer, and Speaker"
      description="Building software, maps, and clear technical communication from Nigeria."
      width={1200}
      height={630}
    />,
    size,
  );
}
