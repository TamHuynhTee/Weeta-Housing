// import { formatMoney } from 'helpers/base.helper';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
// import { EMOJI } from '../../../constants/emoji.constants';

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  registerForm?: UseFormRegisterReturn;
  setValue?: (key: string, value: unknown) => void;
}

const InputChat = (props: Props) => {
  const {
    name,
    placeholder = '',
    className = '',
    registerForm = {},
    setValue = () => {
      return;
    },
  } = props;
  //   const [message, setMessage] = React.useState('');

  //   const handleDetectIconChat = (e: React.FormEvent<HTMLInputElement>) => {
  //     const value = e.currentTarget.value;
  //     const words = value.split(' ');
  //     for (let i = 0; i < words.length; i++) {
  //       if (words[i][0] === ':' && words[i].length > 1) {
  //         const word = words[i].slice(1);
  //         const emoji = EMOJI.find((emo) =>
  //           emo.aliases.find((alias) => alias === word)
  //         );
  //         if (emoji) {
  //           words[i] = emoji.emoji;
  //         }
  //       }
  //     }
  //     const result = words.join(' ');
  //     setValue(name, result);
  //   };

  return (
    <input
      type="text"
      name={name}
      {...registerForm}
      placeholder={placeholder}
      className={className}
      //   value={message}
      //   onChange={handleDetectIconChat}
    />
  );
};

export default InputChat;
