import React, { useState } from 'react';
import JsonEditor from '../components/JsonEditor';
import FormPreview from '../components/FormPreview';
import { FormSchema } from '../types/Schema';

const Home: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 border-r">
        <JsonEditor onSchemaChange={setSchema} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <FormPreview schema={schema} />
      </div>
    </div>
  );
};

export default Home;