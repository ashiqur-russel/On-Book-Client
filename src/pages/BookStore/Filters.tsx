import { IProduct, TCategory } from "@/types";
import { useState, useEffect } from "react";
import Select from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface FiltersProps {
  products: IProduct[];
  onFilterChange: (filters: {
    themes: string[];
    authors: string[];
    categories: TCategory[];
    language: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ products, onFilterChange }) => {
  const [selectedThemes, setSelectedThemes] = useState<SelectOption[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<SelectOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>(
    []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");

  // Extract unique filter options dynamically
  const extractUniqueOptions = (key: keyof IProduct): SelectOption[] => {
    return Array.from(new Set(products.map((product) => product[key])))
      .filter((item): item is string => typeof item === "string")
      .map((item) => ({ value: item, label: item }));
  };

  const themeOptions = extractUniqueOptions("title");
  const authorOptions = extractUniqueOptions("author");
  const categoryOptions = extractUniqueOptions("category");
  const languageOptions: SelectOption[] = [
    { value: "all", label: "All Languages" },
    ...extractUniqueOptions("language"),
  ];

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      themes: selectedThemes.map((t) => t.value),
      authors: selectedAuthors.map((a) => a.value),
      categories: selectedCategories.map((c) => c.value as TCategory),
      language: selectedLanguage,
    });
  }, [
    selectedThemes,
    selectedAuthors,
    selectedCategories,
    selectedLanguage,
    onFilterChange,
  ]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white shadow-md rounded-lg border border-gray-300 text-black">
      {/** Theme Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Thema</label>
        <Select
          options={themeOptions}
          isMulti
          closeMenuOnSelect={false}
          value={selectedThemes}
          onChange={(newValue) => setSelectedThemes(newValue as SelectOption[])}
          className="border-2 border-gray-300 rounded-md"
        />
      </div>

      {/** Author Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Autor</label>
        <Select
          options={authorOptions}
          isMulti
          closeMenuOnSelect={false}
          value={selectedAuthors}
          onChange={(newValue) =>
            setSelectedAuthors(newValue as SelectOption[])
          }
          className="border-2 border-gray-300 rounded-md"
        />
      </div>

      {/** Category Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kategorien
        </label>
        <Select
          options={categoryOptions}
          isMulti
          closeMenuOnSelect={false}
          value={selectedCategories}
          onChange={(newValue) =>
            setSelectedCategories(newValue as SelectOption[])
          }
          className="border-2 border-gray-300 rounded-md"
        />
      </div>

      {/** Language Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sprache
        </label>
        <div className="border-2 border-gray-300 rounded-md p-2">
          {languageOptions.map((lang) => (
            <label key={lang.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="language"
                value={lang.value}
                checked={selectedLanguage === lang.value}
                onChange={() => setSelectedLanguage(lang.value)}
                className="text-red-600 focus:ring-red-500"
              />
              <span>{lang.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
