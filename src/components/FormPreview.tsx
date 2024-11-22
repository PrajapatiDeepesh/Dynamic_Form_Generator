import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormSchema } from '../types/Schema';

interface FormPreviewProps {
  schema: FormSchema | null;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsSubmitting(true);
    console.log('Form Data:', data);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Form submitted successfully!');
      reset();
    }, 2000);
  };

  if (!schema) return <p className="text-gray-500">Provide a valid JSON schema to preview the form.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-bold">{schema.formTitle}</h2>
      <p className="text-gray-600">{schema.formDescription}</p>

      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              type={field.type}
              {...register(field.id, {
                required: field.required,
                pattern: field.validation?.pattern
                  ? new RegExp(field.validation.pattern)
                  : undefined,
              })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded"
            />
          ) : field.type === 'textarea' ? (
            <textarea
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded"
            ></textarea>
          ) : field.type === 'radio' ? (
            field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                  id={`${field.id}-${option.value}`}
                  className="cursor-pointer"
                />
                <label htmlFor={`${field.id}-${option.value}`} className="cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))
          ) : field.type === 'select' ? (
            <select
              {...register(field.id, { required: field.required })}
              className="w-full p-2 border rounded"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : null}

          {/* Validation Errors */}
          {errors[field.id] && (
            <p className="text-red-500">
              {field.validation?.message || `${field.label} is required.`}
            </p>
          )}
        </div>
      ))}

      {/* Loading and Success States */}
      {isSubmitting ? (
        <p className="text-blue-500">Submitting...</p>
      ) : successMessage ? (
        <p className="text-green-500">{successMessage}</p>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default FormPreview;
