"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowRight, Plus } from "lucide-react";
import {
  getNews,
  upsertNewsItem,
  deleteNewsItem,
} from "@/lib/supabase/actions/news";
import AdminWrapper from "@/components/admin/AdminWrapper";
import AdminModal from "@/components/admin/AdminModal";
import NewsForm from "@/components/admin/forms/NewsForm";

type Category = "all" | "reactors" | "controls" | "computing" | "general";

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await getNews();
    setNewsItems(data);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      timestamp: Math.floor(Date.now() / 1000),
      category: "general",
      author: "AIMS Lab",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await upsertNewsItem(formData);
      await fetchNews();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving news");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingItem?.id) return;
    setIsDeleting(true);
    try {
      await deleteNewsItem(editingItem.id);
      await fetchNews();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error deleting news item");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = (newsItems || [])
    .filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-32">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl md:text-5xl text-blue-michigan font-bold mb-4">
            Latest <span className="text-yellow-maize">News</span>
          </h1>
          <AdminWrapper
            onEdit={handleAdd}
            label="Add"
            variant="add"
            position="header"
          >
            <span />
          </AdminWrapper>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <CategoryButton
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              >
                All News
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "reactors"}
                onClick={() => setActiveCategory("reactors")}
              >
                Reactors
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "controls"}
                onClick={() => setActiveCategory("controls")}
              >
                Controls
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "computing"}
                onClick={() => setActiveCategory("computing")}
              >
                Computing
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "general"}
                onClick={() => setActiveCategory("general")}
              >
                General
              </CategoryButton>
            </div>

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-michigan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8 text-gray-600">
            <p>
              Showing {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "article" : "articles"}
              {activeCategory !== "all" && ` in ${activeCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4">
          {currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item, index) => (
                  <AdminWrapper
                    key={item.id}
                    onEdit={() => handleEdit(item)}
                    label="Edit Item"
                    className="h-full"
                  >
                    <NewsCard item={item} index={index} />
                  </AdminWrapper>
                ))}
              </div>

              <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "Edit News Item" : "Add News Item"}
                onSave={handleSave}
                isSaving={isSaving}
                onDelete={editingItem?.id ? handleDelete : undefined}
                isDeleting={isDeleting}
              >
                <NewsForm initialData={formData} onChange={setFormData} />
              </AdminModal>

              {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-blue-michigan hover:bg-gray-200"
                      }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg ${
                            currentPage === page
                              ? "bg-blue-michigan text-yellow-maize"
                              : "bg-gray-100 text-blue-michigan hover:bg-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-blue-michigan hover:bg-gray-200"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <Search size={64} className="mx-auto text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-blue-michigan mb-4">
                No news articles found
              </h3>
              <p className="text-gray-600 mb-8">
                We couldn&apos;t find any news articles matching your current
                filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="bg-blue-michigan text-yellow-maize px-6 py-3 rounded-lg font-medium hover:bg-blue-michigan/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function NewsCard({ item, index }: { item: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/news/${item.slug}`}>
        <div
          className="group h-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={item.image_url || item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {item.featured && (
              <div className="absolute top-4 right-4 bg-yellow-maize text-blue-michigan text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              {item.date}
            </div>

            <h3 className="text-xl font-bold text-blue-michigan mb-3 line-clamp-2 group-hover:text-blue-michigan/80 transition-colors">
              {item.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
              {item.excerpt}
            </p>

            <div className="flex items-center text-blue-michigan font-medium mt-auto">
              <span>Read more</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryButton({
  children,
  active,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
        active
          ? "bg-blue-michigan text-yellow-maize"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon && icon}
      {children}
    </button>
  );
}
