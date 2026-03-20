"use client";

import { useState } from "react";

type PeriodOption = {
  value: string;
  label: string;
};

type StoreOption = {
  value: string;
  label: string;
};

type FormState = {
  store: string;
  dateTime: string;
  period: string;
  storeSearch: string;
  item: string;
  quantity: string;
};
const storeOptions: StoreOption[] = [
  { value: "store-1", label: "Alpha Mart" },
  { value: "store-2", label: "Bravo Supermarket" },
  { value: "store-3", label: "Charlie Grocers" },
  { value: "store-4", label: "Delta Foods" },
  { value: "store-5", label: "Echo Supplies" },
];

const periodOptions: PeriodOption[] = [];
for (let year = 2025; year <= 2027; year++) {
  for (let month = 1; month <= 12; month++) {
    const value = `${year}-${month.toString().padStart(2, "0")}`;
    const label = `${new Date(year, month - 1).toLocaleString("default", { month: "long" })} ${year}`;
    periodOptions.push({ value, label });
  }
}

function getCurrentPeriod(): string {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`;
}

export default function BeginningPage() {
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const defaultPeriod =
    periodOptions.find((p) => p.value === getCurrentPeriod())?.value ||
    periodOptions[0].value;
  const [form, setForm] = useState<FormState>({
    store: "",
    dateTime: "",
    period: defaultPeriod,
    storeSearch: "",
    item: "",
    quantity: "",
  });
  type BeginningRow = {
    store: string;
    dateTime: string;
    period: string;
    item: string;
    quantity: string;
  };
  const [rows, setRows] = useState<BeginningRow[]>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleStoreSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, storeSearch: e.target.value }));
    setStoreDropdownOpen(true);
  }

  function handleStoreInputFocus() {
    setStoreDropdownOpen(true);
  }

  function handleStoreInputBlur() {
    // Delay closing to allow click selection
    setTimeout(() => setStoreDropdownOpen(false), 100);
  }

  function handleStoreSelect(value: string) {
    setForm((prev) => ({ ...prev, store: value, storeSearch: "" }));
    setStoreDropdownOpen(false);
  }

  // Show all stores by default if search is empty
  const filteredStores = form.storeSearch
    ? storeOptions.filter((store) =>
        store.label.toLowerCase().includes(form.storeSearch.toLowerCase()),
      )
    : storeOptions;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !form.store ||
      !form.dateTime ||
      !form.period ||
      !form.item ||
      !form.quantity
    )
      return;
    setRows((prev) => [
      ...prev,
      {
        store: form.store,
        dateTime: form.dateTime,
        period: form.period,
        item: form.item,
        quantity: form.quantity,
      },
    ]);
    setForm({
      store: "",
      dateTime: "",
      period: defaultPeriod,
      storeSearch: "",
      item: "",
      quantity: "",
    });
  }

  return (
    <div className="p-8 w-[75%] mx-auto">
      <h1 className="text-3xl font-bold mb-4">Beginning</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow w-full md:w-1/3"
        >
          <div className="relative">
            <label className="block font-medium mb-1">Store</label>
            <input
              type="text"
              name="storeSearch"
              value={form.storeSearch}
              onChange={handleStoreSearch}
              onFocus={handleStoreInputFocus}
              onBlur={handleStoreInputBlur}
              className="w-full border rounded px-3 py-2"
              placeholder="Search or select store..."
              autoComplete="off"
            />
            {storeDropdownOpen && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                {filteredStores.length > 0 ? (
                  filteredStores.map((option) => (
                    <li
                      key={option.value}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                      onMouseDown={() => handleStoreSelect(option.label)}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-400">No stores found</li>
                )}
              </ul>
            )}
            {form.store && !form.storeSearch && (
              <div className="mt-1 text-sm text-gray-600">
                Selected: {form.store}
              </div>
            )}
            <input type="hidden" name="store" value={form.store} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Date & Time</label>
            <input
              type="date"
              name="dateTime"
              value={form.dateTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Period</label>
            <select
              name="period"
              value={form.period}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Item</label>
            <input
              type="text"
              name="item"
              value={form.item}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              min="1"
              placeholder="Enter quantity"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Beginning
          </button>
        </form>
        {/* Table of beginnings */}
        {rows.length > 0 && (
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Beginnings Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Store</th>
                    <th className="px-4 py-2 border">Date & Time</th>
                    <th className="px-4 py-2 border">Period</th>
                    <th className="px-4 py-2 border">Item</th>
                    <th className="px-4 py-2 border">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{row.store}</td>
                      <td className="px-4 py-2 border">{row.dateTime}</td>
                      <td className="px-4 py-2 border">
                        {periodOptions.find((p) => p.value === row.period)
                          ?.label || row.period}
                      </td>
                      <td className="px-4 py-2 border">{row.item}</td>
                      <td className="px-4 py-2 border">{row.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
