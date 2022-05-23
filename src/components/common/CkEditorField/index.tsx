// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5/build/ckeditor';
import React from 'react';
import ErrorText from '../ErrorText';

interface Prop {
  classNameContainer?: string;
  overrideClassNameContainer?: boolean;
  label?: string;
  classNameContainerTextArea?: string;
  overrideClassNameContainerTextArea?: boolean;
  classNameTextArea?: string;
  overrideClassNameTextArea?: boolean;
  name?: string;
  setValue: (key: string, value: unknown) => void;
  defaultValue?: string;
  errorStr?: string;
  showLabel?: boolean;
  isRequired?: boolean;
}

const defaultClass = {
  classNameContainer: 'mt-[24px]',
  classNameLabel: 'text-[16px] text-black leading-[24px] font-normal',
  classNameContainerTextArea: 'mt-[16px] relative customCkEditor',
  classNameTextArea:
    'min-h-[170px] h-auto resize-none w-full px-[16px] py-[8px] border-none outline-none text-16px font-normal',
};

const GetClass = (
  override: boolean,
  defaultClass: string,
  applyClass: string
) => {
  return override ? applyClass : defaultClass + ' ' + applyClass;
};

const CkEditorField = (props: Prop) => {
  const {
    classNameContainer = '',
    overrideClassNameContainer = false,
    label = '',
    classNameContainerTextArea = '',
    overrideClassNameContainerTextArea = false,
    name = '',
    defaultValue = '',
    errorStr = '',
    showLabel = true,
    isRequired = false,
    setValue,
  } = props;

  const classContainer = GetClass(
    overrideClassNameContainer,
    defaultClass.classNameContainer,
    classNameContainer
  );
  const classContainerTextArea = GetClass(
    overrideClassNameContainerTextArea,
    defaultClass.classNameContainerTextArea,
    classNameContainerTextArea
  );

  return (
    <div className={classContainer}>
      {showLabel && (
        <label htmlFor={name} className="block font-semibold mb-[10px]">
          {label} {isRequired && <span className="text-red-400">(*)</span>}
        </label>
      )}
      <div className={classContainerTextArea}>
        <CKEditor
          editor={ClassicEditor}
          data={defaultValue}
          onChange={(_: any, editor: any) => {
            const data = editor.getData();
            setValue(name, data);
          }}
          //   config={{
          //     ckfinder: {
          //       uploadUrl: `${BASE_CONSTANTS.BASE_URL}/upload-ckeditor-image`,
          //       withCredentials: true,
          //       headers: {
          //         'X-CSRF-TOKEN': 'CSRF-Token',
          //         Authorization: 'Bearer <JSON Web Token>',
          //       },
          //     },
          //   }}
        />
        {errorStr !== '' && <ErrorText>{errorStr}</ErrorText>}
      </div>
    </div>
  );
};

export default CkEditorField;
