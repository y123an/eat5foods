import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title = "Eat Five Foods",
  description = "Discover and enjoy a variety of delicious foods with Eat Five Foods",
  image = "https://eatfivefoods.vercel.app/eat5foods.png",
  noindex = false,
}: MetadataProps = {}): Metadata {
  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  };

  return metadata;
}
