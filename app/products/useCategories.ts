import { useState, useEffect } from "react";

export interface Category {
  _id?: string;
  name: string;
  description?: string;
}

const CATEGORY_API_URL = "http://localhost:5000/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CATEGORY_API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
}
