import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";
import { dummyForms } from "../dummyData";
import Button from "./components/ui/Button";
import Accordion from "./components/Accordion";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(dummyForms);

  const handleSubmit = (data) => {
    const newForm = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
    setFormData((prev) => [...prev, newForm]);
    setIsOpen(false);
  };
  console.log(formData, "ini data");

  return (
    <div className="h-screen overflow-hidden">
      <Header />

      <main className="p-4 bg-gray-50 mt-5 mx-10 rounded-lg">
        <div className="flex items-center justify-between h-full">
          <h1 className="font-semibold text-2xl">Saved Form</h1>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Create Form
          </Button>
        </div>
        <hr className="my-4 text-gray-300" />
        {formData.map((data) => (
          <Accordion key={data.id} formData={data} setIsOpen={setIsOpen} />
        ))}
      </main>

      {isOpen && (
        <FormModal
          formData={formData}
          setIsOpen={setIsOpen}
          onSubmit={handleSubmit}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
