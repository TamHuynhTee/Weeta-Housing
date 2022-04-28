import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const LimitedTextArea = (props: {
  value: string;
  limit: number;
  registerForm?: UseFormRegisterReturn;
  placeholder?: string;
  name?: string;
  id?: string;
}) => {
  const { name, registerForm, value, limit, placeholder, id } = props;
  const [content, setContent] = React.useState(value.slice(0, limit));

  const setFormattedContent = React.useCallback(
    (text) => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );
  return (
    <div className="relative">
      <textarea
        {...registerForm}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={(event) => setFormattedContent(event.target.value)}
        value={content}
        className="min-h-[240px] h-auto resize-none w-full px-[16px] py-[8px] border-[0.5px] border-grey-200 rounded-[3px] outline-none text-16px font-normal relative"
      ></textarea>
      <span
        className={`absolute bottom-[8px] right-[16px] select-none text-gray-400 ${
          content.length === limit && 'text-red-600'
        }`}
      >
        {content.length}/{limit}
      </span>
    </div>
  );
};

export default LimitedTextArea;
