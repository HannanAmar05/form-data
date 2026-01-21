import { useState } from "react";

export const useFormManager = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE_FORM");
  const [activeFormId, setActiveFormId] = useState(null);
  const [editingElement, setEditingElement] = useState(null);

  const openCreateForm = () => {
    setModalMode("CREATE_FORM");
    setEditingElement(null);
    setIsModalOpen(true);
  };

  const openAddElement = (formId) => {
    setModalMode("ADD_ELEMENT");
    setActiveFormId(formId);
    setEditingElement(null);
    setIsModalOpen(true);
  };

  const openEditElement = (formId, element) => {
    setModalMode("EDIT_ELEMENT");
    setActiveFormId(formId);
    setEditingElement(element);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingElement(null);
  };

  const handleSubmit = (data) => {
    if (modalMode === "CREATE_FORM") {
      const newForm = {
        id: Date.now(),
        formName: data.formName,
        createdAt: new Date().toLocaleDateString(),
        elements: [
          {
            id: Date.now() + 1,
            type: data.type,
            name: data.name,
            date: data.date,
          },
        ],
      };
      setFormData((prev) => [...prev, newForm]);
    } else if (modalMode === "ADD_ELEMENT") {
      setFormData((prev) =>
        prev.map((form) => {
          if (form.id === activeFormId) {
            return {
              ...form,
              elements: [
                ...form.elements,
                {
                  id: Date.now(),
                  type: data.type,
                  name: data.name,
                  date: data.date,
                },
              ],
            };
          }
          return form;
        }),
      );
    } else if (modalMode === "EDIT_ELEMENT") {
      setFormData((prev) =>
        prev.map((form) => {
          if (form.id === activeFormId) {
            return {
              ...form,
              elements: form.elements.map((el) =>
                el.id === editingElement.id
                  ? {
                      type: data.type,
                      name: data.name,
                      date: data.date,
                    }
                  : el,
              ),
            };
          }
          return form;
        }),
      );
    }

    closeModal();
  };

  const deleteElement = (formId, elementId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFormData((prev) =>
        prev.map((form) => {
          if (form.id === formId) {
            return {
              ...form,
              elements: form.elements.filter((el) => el.id !== elementId),
            };
          }
          return form;
        }),
      );
    }
  };

  return {
    formData,
    isModalOpen,
    setIsModalOpen,
    editingElement,
    modalMode,
    openCreateForm,
    openAddElement,
    openEditElement,
    closeModal,
    handleSubmit,
    deleteElement,
  };
};
