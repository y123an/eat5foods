import Head from 'next/head'

interface MetaTagsProps {
    title: string
    description: string
    ogImage?: string
    ogUrl?: string
    twitterCard?: 'summary' | 'summary_large_image'
    canonicalUrl?: string
    noindex?: boolean
}

export default function MetaTags({
    title,
    description,
    ogImage = 'https://eat5foods.vercel.app/eat5foods.png',
    ogUrl = 'https://eat5foods.vercel.app',
    twitterCard = 'summary_large_image',
    canonicalUrl,
    noindex = false,
}: MetaTagsProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:url" content={ogUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex" />}
        </Head>
    )
}