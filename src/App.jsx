import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";
import Button from "./components/ui/Button";
import Accordion from "./components/Accordion";
import { dummyForms } from "../dummyData";
import { Plus } from "lucide-react";
import { useFormManager } from "./hooks/useFormManager";

const App = () => {
  const {
    formData,
    isModalOpen,
    setIsModalOpen,
    editingElement,
    modalMode,
    openCreateForm,
    openAddElement,
    openEditElement,
    handleSubmit,
    deleteElement,
  } = useFormManager(dummyForms);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />

      <main className="p-4 bg-gray-50 mt-5 mx-10 rounded-lg flex-1 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl">Form Builder</h1>
          <Button variant="primary" filled onClick={openCreateForm}>
            <Plus size={18} /> Create New Form
          </Button>
        </div>
        <hr className="my-4 text-gray-300" />

        {formData.map((data) => (
          <Accordion
            key={data.id}
            formData={data}
            onAddElement={() => openAddElement(data.id)}
            onEditElement={(el) => openEditElement(data.id, el)}
            onDeleteElement={(elId) => deleteElement(data.id, elId)}
          />
        ))}
      </main>

      {isModalOpen && (
        <FormModal
          setIsOpen={setIsModalOpen}
          onSubmit={handleSubmit}
          initialData={editingElement}
          mode={modalMode} // Oper mode ke modal
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
