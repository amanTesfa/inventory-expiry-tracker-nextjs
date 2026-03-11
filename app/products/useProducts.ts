import { useState, useEffect } from "react";

export interface Product {
  _id?: string;
  name: string;
  category: string;
  description?: string;
  alertBeforeDays?: number;
  price?: number;
  cost?: number;
}

const API_URL = "http://localhost:5000/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(product: Product) {
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to create product");
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    }
  }

  async function updateProduct(id: string, product: Product) {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to update product");
    }
  }

  async function deleteProduct(id: string) {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
