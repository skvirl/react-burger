import { useState,FormEvent } from "react";
export function useForm(inputValues:{[key: string]: number | string | boolean | null;}) {
  const [form, setFormValue] = useState(inputValues);
  const onChange = (event:FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setFormValue({ ...form, [name]: value });
  };
  return { form, onChange, setFormValue };
}
