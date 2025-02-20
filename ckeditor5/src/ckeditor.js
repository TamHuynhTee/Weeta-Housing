// The editor creator to use.
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
//Extend plugin
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Essentials,
  CKFinder,
  UploadAdapter,
  SimpleUploadAdapter,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  FindAndReplace,
  Heading,
  Image,
  ImageResize,
  ImageInsert,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  Alignment,
  Font,
  Highlight,
  HorizontalLine,
  PageBreak,
  RemoveFormat,
  SpecialCharacters,
  Subscript,
  Superscript,
  TodoList,
  Underline,
  SpecialCharactersArrows,
  SpecialCharactersEssentials,
  SpecialCharactersCurrency,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'removeformat',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'fontfamily',
      'fontsize',
      'fontcolor',
      'fontbackgroundcolor',
      'highlight',
      '|',
      'bulletedList',
      'numberedList',
      'todolist',
      '|',
      'alignment',
      'outdent',
      'indent',
      '|',
      'imageInsert',
      'insertTable',
      'tabletoolbar',
      'link',
      '|',
      'subscript',
      'superscript',
      'blockquote',
      'specialcharacters',
      '|',
      'horizontalline',
      'pagebreak',
      '|',
      'findAndReplace',
      'undo',
      'redo',
    ],
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
    ],
  },
  image: {
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
    resizeOptions: [
      {
        name: 'resizeImage: original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage: 25',
        value: '25',
        icon: 'small',
      },
      {
        name: 'resizeImage: 50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage: 75',
        value: '75',
        icon: 'large',
      },
    ],
    toolbar: [
      'imageStyle:full',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'imageTextAlternative',
      '|',
      'resizeImage: 25',
      'resizeImage: 50',
      'resizeImage: 75',
      'resizeImage: original',
    ],
  },
  fontSize: {
    options: [9, 10, 11, 12, 13, 'default', 16, 17, 19, 21, 23, 25],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  language: 'en',
  indentBlock: {
    offset: 1,
    unit: 'em',
    classes: [
      'custom-block-indent-a',
      'custom-block-indent-b',
      'custom-block-indent-c',
    ],
  },
};
