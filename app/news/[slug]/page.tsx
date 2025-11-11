"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowLeft, ChevronRight, ExternalLink } from "lucide-react"
import { newsItems } from "@/data/news"
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6"

export default function NewsArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<(typeof newsItems)[0] | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<typeof newsItems>([])

  useEffect(() => {
    const slug = params.slug as string
    const foundArticle = newsItems.find((item) => item.slug === slug)

    if (foundArticle) {
      setArticle(foundArticle)

      const related = newsItems
        .filter((item) => item.category === foundArticle.category && item.id !== foundArticle.id)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3)

      setRelatedArticles(related)
    } else {
      router.push("/news")
    }
  }, [params.slug, router])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-michigan"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-blue-michigan py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00274C_1px,transparent_1px),linear-gradient(to_bottom,#00274C_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news"
              className="inline-flex items-center text-gray-200 hover:text-yellow-maize mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {article.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-200 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {article.date}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                <span className="capitalize">{article.category}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-lg">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
            </div>

            {article.images && article.images.map((url, index) => (
                <div key={index} className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-lg">
                  <Image
                    src={url}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            }

            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.link && (
              <div className="mt-8 flex justify-center">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-blue-michigan text-yellow-maize rounded-full font-medium hover:bg-blue-michigan/90 transition-colors shadow-md"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Full Article
                </a>
              </div>
            )}

            <div className="mt-12 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  href="/news"
                  className="inline-flex items-center text-blue-michigan hover:text-blue-michigan/80 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Share:</span>
                  <button className="p-2 rounded-full bg-gray-100 text-blue-michigan hover:bg-gray-200 transition-colors">
                    <FaTwitter />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-blue-michigan hover:bg-gray-200 transition-colors">
                    <FaFacebook />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-blue-michigan hover:bg-gray-200 transition-colors">
                    <FaLinkedin />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-michigan mb-8">Related Articles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.date}
                        </div>

                        <h3 className="text-md font-bold text-blue-michigan mb-2 line-clamp-2 group-hover:text-blue-michigan/80 transition-colors">
                          {item.title}
                        </h3>

                        <div className="flex items-center text-blue-michigan text-sm font-medium mt-auto">
                          Read article
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

