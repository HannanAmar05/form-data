import React, { useState } from "react";
import InputGroup from "./ui/InputGroup";
import { ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react";
import Select from "./ui/Select";

const Accordion = ({ formData }) => {
  const [isShow, setIsShow] = useState(false);

  if (!formData) return null;

  return (
    // CONTAINER UTAMA (Satu Background Putih)
    <div className="bg-white w-full border border-gray-200 rounded-lg shadow-sm mb-4 transition-all duration-200 hover:shadow-md">
      
      {/* --- HEADER --- */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setIsShow(!isShow)}
      >
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-800 text-lg">
            {formData.formName || "Untitled Form"}
          </h1>
          <span className="text-xs text-gray-400 mt-1">
            {formData.elements?.length || 0} Elements
          </span>
        </div>
        <button className="text-gray-500 hover:text-blue-600 transition-colors">
          {isShow ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* --- BODY (Isi Form) --- */}
      {/* Kita gunakan border-t untuk memisahkan header dan body, tapi bg tetap putih */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isShow ? "max-h-500 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-5">
          
          {/* BAGIAN 1: Edit Form Utama */}
          <div className="mb-8">
            <InputGroup label="Form Title">
              <input
                type="text"
                defaultValue={formData.formName}
                className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </InputGroup>
          </div>

          {/* Divider/Pemisah Halus */}
          <div className="border-b border-gray-100 mb-6 relative">
             <span className="absolute -top-3 left-0 bg-white pr-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Form Elements
             </span>
          </div>

          {/* BAGIAN 2: List Elements */}
          <div className="flex flex-col gap-6">
            {formData.elements?.length === 0 ? (
                <p className="text-gray-400 italic text-sm">No elements added yet.</p>
            ) : (
                formData.elements?.map((element, index) => (
                <div key={index} className="flex gap-4 items-start group">
                    
                    {/* Area Input yang menyatu (tanpa kotak-kotak terpisah) */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label={`Label #${index + 1}`}>
                            <input
                                type="text"
                                defaultValue={element.name}
                                placeholder="Question Label"
                                className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </InputGroup>

                        <InputGroup label="Type">
                            <Select
                                value={element.type}
                                options={[
                                    { value: "text", label: "Text Input" },
                                    { value: "textarea", label: "Long Text" },
                                    { value: "date", label: "Date Picker" },
                                ]}
                            />
                        </InputGroup>
                    </div>

                    {/* Tombol Hapus (Muncul saat hover) */}
                    <div className="pt-9">
                        <button 
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            title="Remove Element"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                ))
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Accordion;