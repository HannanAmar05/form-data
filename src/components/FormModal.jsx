import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { Plus } from "lucide-react";
import InputGroup from "./ui/InputGroup";
import Select from "./ui/Select";

const FormModal = ({ initialData, setFormData, setIsOpen, onSubmit }) => {
  const [isAddingElement, setIsAddingElement] = useState(false);
  const [formName, setFormName] = useState("");
  const [elements, setElements] = useState([]);
  const [elementType, setElementType] = useState("");
  const [elementName, setElementName] = useState("");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (isOpen) {
  //     setFormName(initialData?.title || "");
  //     setIsAddingElement(initialData?.elements || []);
  //     setIsAddingElement(false);
  //     setErrors({});
  //   }
  // }, [initialData, isOpen]);

  const handleSubmitElement = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formName.trim()) {
      newErrors.formName = "Form name is required";
    }

    if (isAddingElement && !elementName.trim()) {
      newErrors.elementName = "Element name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      formName,
      elements: isAddingElement
        ? [
            {
              type: elementType,
              name: elementName,
              date: elementType === "date" ? dateFormat : null,
            },
          ]
        : [],
    };

    if (onSubmit) {
      onSubmit(data);
    }

    setFormName("");
    setElementName("");
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmitElement}
        className="bg-white p-4 w-1/4 rounded-lg"
      >
        <div className="flex justify-between items-center mb-5">
          <h1>New Form</h1>
          <Button variant="outline" onClick={() => setIsAddingElement(true)}>
            <Plus size={18} /> Add elements
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <InputGroup label="Form Name" error={errors.formName}>
            <input
              type="text"
              placeholder="Form Name"
              onChange={(e) => setFormName(e.target.value)}
              className="border border-gray-200 rounded-md w-full p-2 focus:outline-none"
            />
          </InputGroup>

          {isAddingElement && (
            <>
              <InputGroup label="Type">
                <Select
                  value={elementType}
                  onChange={(e) => setElementType(e.target.value)}
                  options={[
                    { value: "text", label: "Text Input" },
                    { value: "textarea", label: "Textarea" },
                    { value: "date", label: "Date Input" },
                  ]}
                />
              </InputGroup>

              <InputGroup label="Form Element Name" error={errors.elementName}>
                <textarea
                  onChange={(e) => setElementName(e.target.value)}
                  rows="2"
                  placeholder="Form Element Name"
                  className="border border-gray-200 rounded-md w-full p-2 focus:outline-none"
                />
              </InputGroup>
            </>
          )}
        </div>
        {elementType === "date" && (
          <div className="flex gap-6 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateFormat"
                value="dd/mm/yyyy"
                checked={dateFormat === "dd/mm/yyyy"}
                onChange={(e) => setDateFormat(e.target.value)}
              />
              dd/mm/yyyy
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateFormat"
                value="mm/dd/yyyy"
                checked={dateFormat === "mm/dd/yyyy"}
                onChange={(e) => setDateFormat(e.target.value)}
              />
              mm/dd/yyyy
            </label>
          </div>
        )}
        <div className="flex justify-end w-full gap-4 mt-6">
          <Button
            variant="outline"
            className="w-1/4"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="w-1/4" filled>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
