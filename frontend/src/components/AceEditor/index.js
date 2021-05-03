import React, { useState } from 'react'

// React Ace
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-jsx'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-twilight'

// Mine
import { stripText } from './utils'

// My Components
import MyButton from '../Button'
import classes from './AceEditor.module.css'
// Render editor
export const MyEditor = (props) => {
  const { theme } = props
  const currentCodeValue = ['', `console.log("Hello World")`]
  const [singleEditorValue, setSingleEditorValue] = useState('')
  const [currentMode, setCurrentMode] = useState('javascript')
  const [isMessage, setIsMessage] = useState('false')
  const [message, setMessage] = useState(undefined)

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

  const setMode = (e) => {
    setCurrentMode(e.target.value)
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
        <div className={classes.editor_container}>
          <h2>Editor</h2>

          <AceEditor
            editorProps={{ $blockScrolling: true }}
            mode={currentMode}
            theme={theme ? theme : 'twilight'}
            onChange={singleEditorChangeHandler}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 16,
            }}
            style={{
              height: '75vh',
              width: '100%',
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
