import React, { useState } from "react";
import Button from "./ui/Button";
import { 
  Calendar, Type, FileText, ChevronDown, Plus, 
  Pencil, Trash2, GripVertical, Folder 
} from "lucide-react";

const Accordion = ({ formData, onAddElement, onEditElement, onDeleteElement }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper function UI (Sama)
  const getTypeIcon = (type) => {
    switch (type) {
      case "date": return <Calendar size={14} />;
      case "textarea": return <FileText size={14} />;
      default: return <Type size={14} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "date": return "bg-blue-50 text-blue-600 border-blue-200";
      case "textarea": return "bg-purple-50 text-purple-600 border-purple-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm overflow-hidden">
      
      <div 
        className="p-4 flex items-center justify-between bg-white cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded text-indigo-600">
             <Folder size={20}/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{formData.formName}</h3>
            <p className="text-xs text-gray-400">{formData.elements.length} Elements founded</p>
          </div>
        </div>

        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
           <ChevronDown size={20} className="text-gray-400"/>
        </div>
      </div>

      {/* BODY: List Element & Button Add */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden bg-gray-50/50 border-t border-gray-100">
          <div className="p-4 space-y-3">
            
            {/* List Element */}
            {formData.elements.map((el) => (
              <div key={el.id} className="group flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <GripVertical size={16} className="text-gray-300" />
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{el.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded border uppercase font-bold tracking-wide ${getTypeColor(el.type)}`}>
                        {getTypeIcon(el.type)} {el.type}
                      </span>
                      {el.type === 'date' && <span className="text-[10px] bg-gray-100 px-1 rounded border">{el.date}</span>}
                    </div>
                  </div>
                </div>

                {/* Tombol Edit/Delete PER ELEMENT */}
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEditElement(el)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => onDeleteElement(el.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {/* Tombol Add Element (Khusus form ini) */}
            <button 
              onClick={onAddElement}
              className="w-full py-3 mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-medium text-sm"
            >
              <Plus size={18} /> Add Element to "{formData.formName}"
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;