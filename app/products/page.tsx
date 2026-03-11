"use client";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { showToast } from "./ProductToast";
import { Toaster } from "react-hot-toast";

import { useProducts, Product } from "./useProducts";
import { useCategories } from "./useCategories";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const {
    categories,
    loading: loadingCategories,
    error: categoryError,
  } = useCategories();

  const [form, setForm] = useState<Product>({
    name: "",
    category: "",
    description: "",
    alertBeforeDays: 7,
    price: 0,
    cost: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "alertBeforeDays" ? Number(value) : value,
    }));
  }

  function handleEdit(product: Product) {
    setForm(product);
    setEditingId(product._id || null);
    setModalOpen(true);
  }

  function handleCancel() {
    setForm({
      name: "",
      category: "",
      description: "",
      alertBeforeDays: 7,
      price: 0,
      cost: 0,
    });
    setEditingId(null);
    setModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        showToast("Product updated successfully");
      } else {
        await createProduct(form);
        showToast("Product added successfully");
      }
      setForm({
        name: "",
        category: "",
        description: "",
        alertBeforeDays: 7,
        price: 0,
        cost: 0,
      });
      setEditingId(null);
      setModalOpen(false);
    } catch (err) {
      showToast("Error saving product", "error");
    }
  }

  return (
    <div className="p-8 w-[70%] mx-auto">
      <Toaster position="top-right" />
      <div className="mb-8 flex justify-end">
        <button
          className="bg-cyan-600 text-white px-3 p-2 rounded-lg shadow hover:bg-cyan-700 cursor-pointer transition-all font-semibold text-sm"
          onClick={() => {
            setEditingId(null);
            setForm({
              name: "",
              category: "",
              description: "",
              alertBeforeDays: 7,
              price: 0,
              cost: 0,
            });
            setModalOpen(true);
          }}
        >
          Add Product
        </button>
      </div>
      <ProductModal open={modalOpen} onClose={handleCancel}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="product-name" className="mb-1 font-medium">
                Name
              </label>
              <input
                id="product-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-3 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="product-category" className="mb-1 font-medium">
                Category
              </label>
              <select
                id="product-category"
                name="category"
                value={form.category}
                onChange={() => handleChange}
                className="border p-3 rounded-lg"
                required
                disabled={loadingCategories}
              >
                <option value="" disabled>
                  {loadingCategories ? "Loading..." : "Select category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categoryError && (
                <span className="text-red-600 text-xs">{categoryError}</span>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="product-price" className="mb-1 font-medium">
                Price
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-3 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="product-cost" className="mb-1 font-medium">
                Cost
              </label>
              <input
                id="product-cost"
                name="cost"
                type="number"
                min={0}
                value={form.cost}
                onChange={handleChange}
                placeholder="Cost"
                className="border p-3 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label
                htmlFor="product-alertBeforeDays"
                className="mb-1 font-medium"
              >
                Alert Before Days
              </label>
              <input
                id="product-alertBeforeDays"
                name="alertBeforeDays"
                type="number"
                min={1}
                value={form.alertBeforeDays}
                onChange={handleChange}
                placeholder="Alert Before Days"
                className="border p-3 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="product-description" className="mb-1 font-medium">
              Description
            </label>
            <textarea
              id="product-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-3 rounded-lg"
            />
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6  rounded-lg shadow hover:bg-blue-700 transition-all font-semibold text-lg"
            >
              {editingId ? "Update" : "Add"} Product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-6  rounded-lg shadow font-semibold text-sm hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </ProductModal>
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto flex justify-center w-full">
        <table className="text-left text-sm w-full">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Alert Before (days)</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-blue-50 dark:hover:bg-zinc-700 transition-all"
                >
                  <td className="p-2 font-semibold">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.cost}</td>
                  <td className="p-2">{product.alertBeforeDays}</td>
                  <td className="p-2 flex gap-1">
                    <button
                      className="bg-yellow-400 px-2 py-1 rounded-lg text-md font-semibold shadow hover:bg-yellow-500 transition-all"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg text-md font-semibold shadow hover:bg-red-600 transition-all"
                      onClick={() => product._id && deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
