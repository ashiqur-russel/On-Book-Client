import { useState } from "react";
import Select from "react-select";

const Filters = () => {
  const [selectedThemes, setSelectedThemes] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedAuthors, setSelectedAuthors] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const themeOptions = [
    { value: "fiction", label: "Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "romance", label: "Romance" },
    { value: "fantasy", label: "Fantasy" },
  ];

  const authorOptions = [
    { value: "rebecca-yarros", label: "Rebecca Yarros" },
    { value: "kiarash-hossainpour", label: "Kiarash Hossainpour" },
    { value: "stephen-king", label: "Stephen King" },
  ];

  const categoryOptions = [
    { value: "thriller", label: "Thriller" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "biography", label: "Biography" },
  ];

  const languageOptions = [
    { value: "all", label: "All Languages" },
    { value: "german", label: "German" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white shadow-md rounded-lg border border-gray-300 text-black">
      {/** Theme Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Thema</label>
        <Select
          options={themeOptions}
          isMulti
          closeMenuOnSelect={false}
          onChange={(newValue) =>
            setSelectedThemes(newValue as { value: string; label: string }[])
          }
          className="border-2 border-red-500 rounded-md"
        />
      </div>

      {/** Author Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Autor</label>
        <Select
          options={authorOptions}
          isMulti
          closeMenuOnSelect={false}
          onChange={(newValue) =>
            setSelectedAuthors(newValue as { value: string; label: string }[])
          }
          className="border-2 border-red-500 rounded-md"
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
          onChange={(newValue) =>
            setSelectedCategories(
              newValue as { value: string; label: string }[]
            )
          }
          className="border-2 border-red-500 rounded-md"
        />
      </div>

      {/** Language Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sprache
        </label>
        <div className="border-2 border-red-500 rounded-md p-2">
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
