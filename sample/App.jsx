import React, { useState, useEffect, useRef } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, editorConfig } from './ckeditor';
import 'ckeditor5/ckeditor5.css';
import './App.css';

import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const initialEditorData = {
  "time": 1708959802944,
  "blocks": [
    {
      "type": "buttonPlugin",
      "data": {
        "href": "https://www.google.com",
        "title": "google map"
      }
    },
    {
      "type": "imageContainer",
      "data": {
          "children": [
              {
                  "type": "image",
                  "data": {
                      "file": {
                          "url": "https://assets.prod.roole.fr/data/assets/Stand_Renault_au_Mondial_de_l_Auto_2022_8ee202b96c.png",
                          "alt": "Stand Renault au Mondial de l'Auto 2022."
                      },
                      "caption": "En 2022, Renault a dévoilé la 4ever Trophy : la 4L électrique ! ©Roole",
                      "withBorder": false,
                      "stretched": false,
                      "withBackground": false
                  }
              },
              {
                  "type": "image",
                  "data": {
                      "file": {
                          "url": "https://assets.prod.roole.fr/data/assets/Mondial_de_l_Auto_2022_3fc1d1d485.png",
                          "alt": "Stands au Mondal de l'Auto 2022."
                      },
                      "caption": "Le Mondial de l'Auto 2024 se tiendra au Parc des expositions de Versailles, du lundi 14 au dimanche 20 octobre 2024. ©Roole",
                      "withBorder": false,
                      "stretched": false,
                      "withBackground": false
                  }
              }
          ]
      }
    },
    {
      "id": "tX2JJ9J9",
      "type": "linkTool",
      "data": {
        "link": "https://media.roole.fr/transition/territoires/zfe-de-nancy-les-premieres-restrictions-ne-concerneront-pas-les-voitures-particulieres",
        "meta": {
          "id": "1",
          "title": "Tuto : recharger un véhicule électrique sur une borne rapide",
          "image": {
            "url": "https://media.roole.fr/_next/image?url=https%3A%2F%2Fassets.prod.roole.fr%2Fdata%2Fassets%2FLionel_Robert_47390759bd.jpg&w=3840&q=75"
          }
        }
      }
    },
    {
      "id": "FImSyWsvGW",
      "type": "embed",
      "data": {
        "service": "youtube",
        "source": "https://www.youtube.com/watch?v=zlOKjRe33hU",
        "embed": "https://www.youtube.com/embed/zlOKjRe33hU",
        "width": 580,
        "height": 320,
        "caption": "blabla"
      }
    },
    {
      "id": "tX2J6J9J9",
      "type": "linkTool",
      "data": {
        "link": "http://localhost:3200/transition/voiture-propre/leasing-social-quel-est-le-profil-des-beneficiaires",
        "meta": {
          "id": "1",
          "title": "Leasing social : quel est le profil des bénéficiaires ?",
          "image": {
            "url": "http://localhost:3200/_next/image?url=https%3A%2F%2Fassets.prod.roole.fr%2Fdata%2Fassets%2Fi_Stock_1426471241_d86b809b69.jpg&w=3840&q=75"
          }
        }
      }
    },
    {
      "id": "7rI39ce9-d",
      "type": "embed",
      "data": {
        "service": "instagram",
        "source": "https://www.instagram.com/p/C5BcXVILN5H/",
        "embed": "https://www.instagram.com/p/C5BcXVILN5H/embed/captioned",
        "width": 550,
        "height": 929,
        "caption": ""
      }
    },
    {
      "id": "nLVV0O2ew2",
      "type": "embed",
      "data": {
        "service": "facebook",
        "source": "https://www.facebook.com/myelmut/posts/pfbid023DehMPggKk2nTtZqHyobCuPJALJVKJmjCZR2QyH2GXeg1XrNZx82wy1VfKM5rVbhl",
        "embed": "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/myelmut/posts/pfbid023DehMPggKk2nTtZqHyobCuPJALJVKJmjCZR2QyH2GXeg1XrNZx82wy1VfKM5rVbhl&amp;width=500",
        "caption": "okokopok"
      }
    },
    {
      "id": "yDxIhMD4Ke",
      "type": "embed",
      "data": {
        "service": "twitter",
        "source": "https://twitter.com/le_Parisien/status/1772970700157915524",
        "embed": "https://twitframe.com/show?url=https://twitter.com/le_Parisien/status/1772970700157915524",
        "width": 600,
        "height": 300,
        "caption": "toto"
      }
    },
    {
      "id": "wZSZqoTcQr",
      "type": "embed",
      "data": {
        "service": "shorts",
        "source": "https://www.youtube.com/shorts/Vi_8hfgcNPg",
        "embed": "https://www.youtube.com/embed/Vi_8hfgcNPg",
        "width": 580,
        "height": 320,
        "caption": ""
      }
    },
    {
      "id": "hn_9rwe2zw",
      "type": "quote",
      "data": {
        "text": "<strong>Toto</strong> is <i>so</i> <b>nice</b>",
        "caption": "<b> <i>Accessory </i></b>",
        "alignment": "left"
      }
    },
    {
      "id": "d5QH3sTOks",
      "type": "quote",
      "data": {
        "text": "toto is cool",
        "caption": "",
        "alignment": "left"
      }
    },
    {
      "id": "JN4rN50JUB",
      "type": "image",
      "data": {
        "file": {
          "url": "https://assets.prod.roole.fr/data/assets/Stationnement_a_Rennes_2973598b2a.jpg",
          "mime": "image/jpeg",
          "height": 835,
          "width": 1255,
          "size": 160.75,
          "alt": "Stationnement à Rennes"
        },
        "caption": "Stationnement à Rennes",
        "withBorder": false,
        "stretched": false,
        "withBackground": false
      }
    },
    {
      "id": "nR7B1CiX7h",
      "type": "image",
      "data": {
        "file": {
          "url": "https://assets.prod.roole.fr/data/assets/Chaine_De_Valeur_VE_3840_26ec74d388.jpg",
          "mime": "image/jpeg",
          "height": 2160,
          "width": 3840,
          "size": 690.25,
          "alt": "ChaineDeValeurVE_3840.jpg"
        },
        "caption": "toto is cool dddd",
        "withBorder": false,
        "stretched": true,
        "withBackground": false
      }
    },
    {
      "id": "95lJ6U1ybm",
      "type": "paragraph",
      "data": {
        "text": "Malgré une construction longue et laborieuse, de 1953 à 1970, l'autoroute du Soleil est l'un des plus anciens axes autoroutiers français. Inaugurée en 1970 par Georges Pompidou au volant de sa Renault 16, elle symbolise l'avènement de la 5e semaine de congés payés en France et le développement du secteur du tourisme."
      }
    }
  ],
  "version": "2.27.2"
};

// User initialization plugin
class UsersInit {
  constructor(editor) {
    this.editor = editor;
  }

  static get pluginName() {
    return 'UsersInit';
  }

  init() {
    const users = [
      {
        id: '1',
        name: 'Test User'
      }
    ];

    const { editor } = this;

    // Initialize the Users plugin with the predefined list of users.
    editor.plugins.get('Users').addUser(users[0]);

    // Set the current user.
    editor.plugins.get('Users').defineMe(users[0].id);
  }
}

export default function App() {
  // Add refs for the collaboration UI containers
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorAnnotationsRef = useRef(null);
  const editorRevisionHistoryRef = useRef(null);
  const editorRevisionHistoryEditorRef = useRef(null);
  const editorRevisionHistorySidebarRef = useRef(null);

  const [editorData] = useState(initialEditorData);
  const [currentData, setCurrentData] = useState('');
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editor, setEditor] = useState(null);

  const cloud = useCKEditorCloud({
    version: '44.2.1',
    premium: true,
    plugins: {
      RoolePlugin: () => import('../dist/browser/index.umd.js'),
      RoolePluginCss: () => import('../dist/browser/index-editor.css'),
      checkPluginLoaded: () => {
        return window.RoolePlugin;
      }
    }
  });


  useEffect(() => {
    if (cloud.status === 'success' && !isLayoutReady) {
      setIsLayoutReady(true);
    }
  }, [cloud.status]);



  if (cloud.status === 'error') {
    return <div>Error!</div>;
  }

  if (cloud.status === 'loading') {
    return <div>Loading...</div>;
  }

  const {
    ClassicEditor,
    Autoformat,
    Bold,
    Italic,
    Subscript,
    Superscript,
    CloudServices,
    Essentials,
    FindAndReplace,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    Indent,
    Link,
    List,
    Paragraph,
    PasteFromOffice,
    TextTransformation,
    Undo,
    Table,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    SpecialCharacters,
    SpecialCharactersEssentials,
  } = cloud.CKEditor;

  // Import collaboration features from premium features
  const {
    Comments,
    CommentsUI,
    TrackChanges,
    TrackChangesData,
    RevisionHistory
  } = cloud.CKEditorPremiumFeatures;

  const { ButtonPlugin, Editorjs } = window.CKEditorjs;

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor editor-container_include-annotations" ref={editorContainerRef}>
        <div className="editor-container__editor-wrapper">
          <div className="editor-container__editor">
            <h1>Playground for testing CkEditor</h1>
            <div className="editor-wrapper" ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  data={'<p>Hello world!</p>'}
                  onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                    editorRef.current = editor;
                    setEditor(editor);
                  }}
                  config={{
                    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzE2MzE5OTksImp0aSI6IjA3NDYzY2E5LTQ3NjgtNDAzOC1iMTFmLWNlMTI3MzI5NWFiNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sIndoaXRlTGFiZWwiOnRydWUsImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRE8iLCJGUCIsIlNDIiwiVE9DIiwiVFBMIiwiUE9FIiwiQ0MiLCJNRiIsIlNFRSIsIkNNVCIsIlRDIiwiUkgiXSwidmMiOiJiODU3ZTM4OSJ9.rZuMKgoqG4QcxTyjsbhPKUy_gyjfre4bwdSba-lFxPziUi0F-Ln_T2S9vtx65ggXx8Vn1HYKa3Mb4VdGRA5Jyg',
                    plugins: [
                      Autoformat,
                      Bold,
                      Italic,
                      Subscript,
                      Superscript,
                      CloudServices,
                      Essentials,
                      FindAndReplace,
                      Heading,
                      Image,
                      ImageCaption,
                      ImageStyle,
                      ImageToolbar,
                      ImageUpload,
                      ImageResize,
                      Indent,
                      Link,
                      List,
                      Paragraph,
                      PasteFromOffice,
                      TextTransformation,
                      Undo,
                      Table,
                      TableCellProperties,
                      TableColumnResize,
                      TableProperties,
                      TableToolbar,
                      SpecialCharacters,
                      SpecialCharactersEssentials,

                      // Your custom plugins
                      ButtonPlugin,
                      Editorjs,

                      // Collaboration plugins
                      Comments,
                      CommentsUI,
                      TrackChanges,
                      TrackChangesData,
                      RevisionHistory,
                      UsersInit,
                    ],
                    toolbar: [
                      'undo',
                      'redo',
                      '|',
                      'revisionHistory',
                      'trackChanges',
                      'comment',
                      'commentsArchive',
                      '|',
                      'editorjs',
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'code',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'outdent',
                      'indent',
                      '|',
                      'uploadImage',
                      'blockQuote',
                      'insertTable',
                      'mediaEmbed',
                      'codeBlock',
                      'buttonPlugin',
                      'highlight'
                    ],
                    comments: {
                      editorConfig: {
                        extraPlugins: [Bold, Italic, Autoformat]
                      }
                    },
                    revisionHistory: {
                      editorContainer: editorContainerRef.current,
                      viewerContainer: editorRevisionHistoryRef.current,
                      viewerEditorElement: editorRevisionHistoryEditorRef.current,
                      viewerSidebarContainer: editorRevisionHistorySidebarRef.current
                    },
                    sidebar: {
                      container: editorAnnotationsRef.current
                    },
                    ...{
                      initialData: JSON.stringify(editorData, null, 2)
                    }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    try {
                      setCurrentData(JSON.stringify(JSON.parse(data), null, 2));
                    } catch (e) {
                      setCurrentData(data);
                    }
                  }}
                  onError={(error, { willEditorRestart }) => {
                    // Log any initialization errors
                    console.error('Editor error:', error);
                  }}
                />
              )}
            </div>
          </div>
          <div className="editor-container__sidebar">
            <div ref={editorAnnotationsRef}></div>
          </div>
        </div>
      </div>
      <div className="revision-history" ref={editorRevisionHistoryRef}>
        <div className="revision-history__wrapper">
          <div className="revision-history__editor" ref={editorRevisionHistoryEditorRef}></div>
          <div className="revision-history__sidebar" ref={editorRevisionHistorySidebarRef}></div>
        </div>
      </div>
      <div className="output">
        <h2>Output</h2>
        <pre className="json-output"><code>{currentData}</code></pre>
      </div>
    </div>
  );
}
