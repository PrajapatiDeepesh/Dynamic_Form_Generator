import React, { useState } from 'react';
import { FormSchema } from '../types/Schema';

interface JsonEditorProps {
  onSchemaChange: (schema: FormSchema) => void;
}


const JsonEditor: React.FC<JsonEditorProps> = ({ onSchemaChange }) => {
  const [json, setJson] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);

    try {
      const parsed = JSON.parse(value);
      onSchemaChange(parsed);
    } catch {
      console.error('Invalid JSON');
    }
  };

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-4 border"
        value={json}
        onChange={handleChange}
        placeholder="Enter JSON schema here..."
      ></textarea>
    </div>
  );
};

export default JsonEditor;

