import React, { useState } from 'react'

// React Ace
import AceEditor from 'react-ace'
import { diff as DiffEditor } from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-github'

// My Components
import MyButton from '../Button'
// Render editor
export const AceExample = () => {
  const [currentCodeValue, setCurrentCodeValue] = useState([
    '',
    `console.log("Hello World")`,
  ])
  const [singleEditorValue, setSingleEditorValue] = useState('')
  const [currentMode, setCurrentMode] = useState('javascript')
  const [isMessage, setIsMessage] = useState('false')
  const [message, setMessage] = useState(undefined)
  const stripText = (text) => {
    text
      .toLowerCase()
      // to lowercase
      .replace(/\s+/g, '')
      // remove spaces
      .replace(/(\r\n|\n|\r)/gm, '')
      // remove linebreaks
      .replace(/"/g, "'")
    // switch double quote to single}
    console.log('Text Stripped -', text)
    return text
  }

  const languages = [
    'javascript',
    'java',
    'python',
    'xml',
    'ruby',
    'sass',
    'markdown',
    'mysql',
    'json',
    'html',
    'handlebars',
    'golang',
    'csharp',
    'elixir',
    'typescript',
    'css',
  ]
  languages.forEach((lang) => {
    require(`ace-builds/src-noconflict/mode-${lang}`)
    require(`ace-builds/src-noconflict/snippets/${lang}`)
  })

  const onChange = (newValue) => {
    console.log('new value is -', newValue[0], newValue[1])
    const newArray = [stripText(newValue[0]), stripText(newValue[1])]
    setCurrentCodeValue(newArray)
  }

  const setMode = (e) => {
    setCurrentMode(e.target.value)
  }
  const onSubmitHandler = (value) => {
    const val0 = stripText(value[0])

    const val1 = stripText(value[1])

    if (val0 === val1) {
      console.log('values are identical', 'val0 -', val0, 'val1 -', val1)
    } else {
      console.log('Vales are NOTTTTT matching')
    }
  }
  const onSubmitSingleHandler = (newValue) => {
    const val0 = stripText(newValue)

    const val1 = stripText(currentCodeValue[1])

    if (val0 === val1) {
      console.log('values are identical', 'val0 -', val0, 'val1 -', val1)
      setMessage('Hello World')
      setIsMessage(true)
    } else {
      console.log('Vales are NOTTTTT matching')
    }
  }

  const singleEditorChangeHandler = (newValue) => {
    setSingleEditorValue(newValue)
  }

  return (
    <>
      <div className='columns'>
        <div className='column'>
          <div className='field'>
            <label>Mode:</label>
            <p className='control'>
              <span className='select'>
                <select name='mode' onChange={setMode} value={currentMode}>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className='field' />
        </div>
        <div className='examples column'>
          <h2>Editor</h2>
          <DiffEditor
            value={currentCodeValue}
            height='500px'
            width='1000px'
            setOptions={{
              useWorker: false,
            }}
            mode={currentMode}
            onChange={onChange}
          />
          <MyButton
            content='Test Matching'
            to={() => onSubmitHandler(currentCodeValue)}
            variant='func'
          />
          <AceEditor
            editorProps={{ $blockScrolling: true }}
            mode={currentMode}
            theme='github'
            onChange={singleEditorChangeHandler}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 16,
            }}
          />
          <MyButton
            content='Test Matching'
            to={() => onSubmitSingleHandler(singleEditorValue)}
            variant='func'
          />
          {isMessage ? <div>{message}</div> : null}
        </div>
      </div>
    </>
  )
}
