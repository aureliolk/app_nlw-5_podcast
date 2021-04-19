import { useState } from 'react'

export default function Button(props) {
    const [text, setText] = useState();

    function ask() {
        
        if (props.title == 'Sim') {
            if (text != null) {
                setText()
            } else {
                setText('Parabens !! Volte amanhã...')
            }
        } else {
            if (text != null) {
                setText()
            } else {
                setText('Então volte e continue estudadndo')
            }
        }
    }

        return (
            <>
                <div>
                    <button onClick={ask}>{props.title}</button>
                </div>
                <span>{text}</span>
            </>
        )
    }