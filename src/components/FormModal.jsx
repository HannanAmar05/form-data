import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import InputGroup from "./ui/InputGroup";
import Select from "./ui/Select";

const FormModal = ({ initialData, setIsOpen, onSubmit, mode }) => {
  // State Form Name (Hanya dipakai saat CREATE_FORM)
  const [formName, setFormName] = useState("");

  // State Element
  const [elementType, setElementType] = useState("text");
  const [elementName, setElementName] = useState("");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [errors, setErrors] = useState({});

  // Judul Modal Berdasarkan Mode
  const getTitle = () => {
    if (mode === "CREATE_FORM") return "Create New Form";
    if (mode === "ADD_ELEMENT") return "Add New Element";
    return "Edit Element";
  };

  useEffect(() => {
    // Jika Edit Element, isi data lama
    if (initialData && mode === "EDIT_ELEMENT") {
      setElementName(initialData.name || "");
      setElementType(initialData.type || "text");
      setDateFormat(initialData.date || "dd/mm/yyyy");
    } else {
      // Reset
      setFormName("");
      setElementName("");
      setElementType("text");
      setDateFormat("dd/mm/yyyy");
    }
  }, [initialData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validasi Form Name hanya jika mode CREATE
    if (mode === "CREATE_FORM" && !formName.trim()) {
      newErrors.formName = "Form name is required";
    }

    if (!elementName.trim()) {
      newErrors.elementName = "Label / Question is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Kirim data gabungan
    onSubmit({
      formName,
      type: elementType,
      name: elementName,
      date: elementType === "date" ? dateFormat : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6  md:w-1/2 w-11/12 xl:w-1/3 rounded-lg shadow-xl"
      >
        <div className="mb-5 border-b pb-3">
          <h1 className="text-xl font-bold text-gray-800">{getTitle()}</h1>
        </div>

        {/* INPUT FORM NAME (Hanya Muncul Saat Buat Form Baru) */}
        {mode === "CREATE_FORM" && (
          <div className="mb-6 bg-blue-50 p-3 rounded-md border border-blue-100">
            <InputGroup label="Form Name" error={errors.formName}>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="border border-blue-300 rounded-md w-full p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter form title..."
                autoFocus
              />
            </InputGroup>
          </div>
        )}

        {/* INPUT ELEMENT (Selalu Muncul) */}
        <div className={mode === "CREATE_FORM" ? "border-t pt-4" : ""}>
          {mode === "CREATE_FORM" && (
            <p className="text-sm font-bold text-gray-500 mb-3 uppercase">
              First Element Details
            </p>
          )}

          <InputGroup label="Element Type">
            <Select
              value={elementType}
              onChange={(e) => setElementType(e.target.value)}
              options={[
                { value: "text", label: "Text Input" },
                { value: "textarea", label: "Textarea" },
                { value: "date", label: "Date Picker" },
              ]}
            />
          </InputGroup>

          <InputGroup label="Element Name" error={errors.elementName}>
            <input
              type="text"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="border border-gray-300 rounded-md w-full p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Full Name"
            />
          </InputGroup>

          {elementType === "date" && (
            <div className="mt-2 bg-gray-50 p-2 rounded">
              <span className="text-xs text-gray-500 font-bold">
                Date Format
              </span>
              <div className="flex gap-4 text-sm mt-1">
                {["dd/mm/yyyy", "mm/dd/yyyy"].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="dateFormat"
                      value={fmt}
                      checked={dateFormat === fmt}
                      onChange={(e) => setDateFormat(e.target.value)}
                    />
                    {fmt}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            className="w-1/4"
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button className="w-1/4" type="submit" variant="primary" filled>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
