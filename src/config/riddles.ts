import { padStart } from 'lodash'
import * as Blockly from 'node-blockly/browser'

import l10nStore from '../stores/l10nStore'

export interface Riddle {
    id: string
    question: () => (variables: any[]) => string
    defaultToolbox: () => string[]
    defaultWorkspace: () => string
    paramsXML: (variables: any[]) => string
    solution: (variables: any[]) => string
    solutionLength: number
    solutionType: SolutionType
    argsGenerator: () => any[]
}

export type SolutionType = 'string' | 'number' | 'knocks'

const randomNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const randomIndex = Math.floor(Math.random() * letters.length)
    return letters[randomIndex]
}

export const userSolutionInit = (type: SolutionType, length: number) => {
    let str = ''
    // tslint:disable-next-line:curly
    for (let i = 0; i < length; i++)
        str = str.concat(type === 'string' ? 'a' : '0')
    return str
}

const riddles: Riddle[] = [
    {
        id: 'return',
        question: () => l10nStore.dictionary.riddle_return_question,
        defaultToolbox: () => [
            `
            <block type="get_number" id="numero" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}</field>
            </block>
            `,
            `<block type="math_number"></block>`
        ],
        defaultWorkspace: () => `
            <xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="riddle_return" id="riddle_return" deletable="false">
                    <statement name="RIDDLE_PARAMS"></statement>
                </block>
            </xml>
        `,
        paramsXML: ([a]) => `
            <block type="set_last_number" id="numero" deletable="false" editable="false" movable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}</field>
                <value name="VALUE">
                    <block type="math_number" id="numero_value" deletable="false" editable="false" movable="false">
                        <field name="NUM">${a}</field>
                    </block>
                </value>
            </block>
        `,
        solution: ([a]: number[]) => `${a}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9)]
    },
    {
        id: 'somma',
        question: () => l10nStore.dictionary.riddle_sum_question,
        defaultToolbox: () => [
            `
            <block type="get_number" id="numero1" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}1</field>
            </block>
            `,
            `
            <block type="get_number" id="numero2" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}2</field>
            </block>
            `,
            `
            <block type="math_operation" editable="false">
                <field name="OPERATOR">+</field>
            </block>
            `
        ],
        defaultWorkspace: () => `
            <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
                <block type="riddle_somma" id="riddle_somma" deletable="false">
                    <statement name="RIDDLE_PARAMS"></statement>
                </block>
            </xml>
        `,
        paramsXML: ([a, b]) => `
            <block type="set_number" id="numero1" deletable="false" editable="false" movable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}1</field>
                <value name="VALUE">
                    <block type="math_number" id="numero1_value" deletable="false" editable="false" movable="false">
                        <field name="NUM">${a}</field>
                    </block>
                </value>
                <next>
                    <block type="set_last_number" id="numero2" deletable="false" editable="false" movable="false">
                        <field name="NAME">${l10nStore.dictionary
                            .block_number}2</field>
                        <value name="VALUE">
                            <block type="math_number" id="numero2_value" deletable="false" editable="false" movable="false">
                                <field name="NUM">${b}</field>
                            </block>
                        </value>
                    </block>
                </next>
            </block>
        `,
        solution: ([a, b]: number[]) => padStart(`${a + b}`, 2, '0'),
        solutionLength: 2,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9), randomNum(1, 9)]
    },
    {
        id: 'word',
        question: () => l10nStore.dictionary.riddle_word_question,
        defaultToolbox: () => [
            `
            <block type="get_letter" id="lettera1" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_letter}1</field>
            </block>
            `,
            `
            <block type="get_letter" id="lettera2" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_letter}2</field>
            </block>
            `,
            `
            <block type="get_letter" id="lettera3" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_letter}3</field>
            </block>
            `,
            `
            <block type="get_letter" id="lettera4" editable="false">
                <field name="NAME">${l10nStore.dictionary.block_letter}4</field>
            </block>
            `,
            `
            <block type="text">
                <field name="TEXT"></field>
            </block>
            `,
            `
            <block type="text_join"></block>
            `
        ],
        defaultWorkspace: () => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_word" id="riddle_word" deletable="false">
                <statement name="RIDDLE_PARAMS"></statement>
            </block>
        </xml>`,
        paramsXML: ([a, b, c, d]) => `
            <block type="set_letter" id="lettera1" deletable="false" editable="false" movable="false">
                <field name="NAME">${l10nStore.dictionary.block_letter}1</field>
                <value name="VALUE">
                    <block type="text" id="lettera1_text" deletable="false" editable="false" movable="false">
                        <field name="TEXT">${a}</field>
                    </block>
                </value>
                <next>
                    <block type="set_letter" id="lettera2" deletable="false" editable="false" movable="false">
                        <field name="NAME">${l10nStore.dictionary
                            .block_letter}2</field>
                        <value name="VALUE">
                            <block type="text" id="lettera2_text" deletable="false" editable="false" movable="false">
                                <field name="TEXT">${b}</field>
                            </block>
                        </value>
                        <next>
                            <block type="set_letter" id="lettera3" deletable="false" editable="false" movable="false">
                                <field name="NAME">${l10nStore.dictionary
                                    .block_letter}3</field>
                                <value name="VALUE">
                                    <block type="text" id="lettera3_text" deletable="false" editable="false" movable="false">
                                        <field name="TEXT">${c}</field>
                                    </block>
                                </value>
                                <next>
                                    <block type="set_last_letter" id="lettera4" deletable="false" editable="false" movable="false">
                                        <field name="NAME">${l10nStore
                                            .dictionary.block_letter}4</field>
                                        <value name="VALUE">
                                            <block type="text" id="lettera4_text" deletable="false" editable="false" movable="false">
                                                <field name="TEXT">${d}</field>
                                            </block>
                                        </value>
                                    </block>
                                </next>
                            </block>
                        </next>
                    </block>
                </next>
            </block>
        `,
        solution: ([a, b, c, d]: string[]) => `${a + b + c + d}`,
        solutionLength: 4,
        solutionType: 'string',
        argsGenerator: () => [
            randomLetter(),
            randomLetter(),
            randomLetter(),
            randomLetter()
        ]
    },
    {
        id: 'if',
        question: () => l10nStore.dictionary.riddle_if_question,
        defaultToolbox: () => [
            `
                <block type="get_number" id="numero1" editable="false">
                    <field name="NAME">${l10nStore.dictionary
                        .block_number}1</field>
                </block>
            `,
            `
                <block type="get_number" id="numero2" editable="false">
                    <field name="NAME">${l10nStore.dictionary
                        .block_number}2</field>
                </block>
            `,
            `
                <block type="get_number" id="numero_magico" editable="false">
                    <field name="NAME">${l10nStore.dictionary
                        .block_magic_number}</field>
                </block>
            `,
            `
                <block type="set_var_number" editable="false">
                    <field name="NAME">${l10nStore.dictionary
                        .block_result}</field>
                </block>
            `,
            `
                <block type="is_even"></block>
            `,
            `
                <block type="if"></block>
            `,
            `
                <block type="math_operation" editable="false">
                    <field name="OPERATOR">+</field>
                </block>
            `,
            `
                <block type="math_operation" editable="false">
                    <field name="OPERATOR">x</field>
                </block>
            `
        ],
        defaultWorkspace: () => `
            <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
                <block type="riddle_if" id="riddle_if" deletable="false">
                    <statement name="RIDDLE_PARAMS"></statement>
                    <statement name="USERCODE"></statement>
                    <value name="RETURN">
                        <block type="get_number" id="numero1" editable="false" movable="false" deletable="false">
                            <field name="NAME">${l10nStore.dictionary
                                .block_result}</field>
                        </block>
                    </value>
                </block>
            </xml>
        `,
        paramsXML: ([a, b, c]) => `
            <block type="set_number" id="numero1" deletable="false" editable="false" movable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}1</field>
                <value name="VALUE">
                    <block type="math_number" id="numero1_value" deletable="false" editable="false" movable="false">
                        <field name="NUM">${a}</field>
                    </block>
                </value>
                <next>
                    <block type="set_number" id="numero2" deletable="false" editable="false" movable="false">
                        <field name="NAME">${l10nStore.dictionary
                            .block_number}2</field>
                        <value name="VALUE">
                            <block type="math_number" id="numero2_value" deletable="false" editable="false" movable="false">
                                <field name="NUM">${b}</field>
                            </block>
                        </value>
                        <next>
                            <block type="set_last_number" id="numero_magico" deletable="false" editable="false" movable="false">
                                <field name="NAME">${l10nStore.dictionary
                                    .block_magic_number}</field>
                                <value name="VALUE">
                                    <block type="math_number" id="numero_magico_value" deletable="false" editable="false" movable="false">
                                        <field name="NUM">${c}</field>
                                    </block>
                                </value>
                            </block>
                        </next>
                    </block>
                </next>
            </block>
        `,
        solution: ([a, b, c]: number[]) =>
            padStart(`${c % 2 === 0 ? a + b : a * b}`, 2, '0'),
        solutionLength: 2,
        solutionType: 'number',
        argsGenerator: () => [
            randomNum(1, 9),
            randomNum(1, 9),
            randomNum(1, 10)
        ]
    },
    {
        id: 'loop',
        question: () => l10nStore.dictionary.riddle_loop_question,
        defaultToolbox: () => [
            `
                <block type="get_number" id="numero1" editable="false">
                    <field name="NAME">${l10nStore.dictionary
                        .block_number}1</field>
                </block>
            `,
            `
                <block type="function_call" id="bussa" editable="false">
                    <field name="FUNCALL">${l10nStore.dictionary
                        .block_knock_door}</field>
                </block>
            `,
            `
                <block type="loop_times"></block>
            `
        ],
        defaultWorkspace: () => `
            <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
                <block type="riddle_loop" id="riddle_loop" deletable="false">
                    <statement name="RIDDLE_PARAMS"></statement>
                    <statement name="USERCODE"></statement>
                </block>
            </xml>
        `,
        paramsXML: ([a]) => `
            <block type="set_number" id="numero1" deletable="false" editable="false" movable="false">
                <field name="NAME">${l10nStore.dictionary.block_number}1</field>
                <value name="VALUE">
                    <block type="math_number" id="numero1_value" deletable="false" editable="false" movable="false">
                        <field name="NUM">${a}</field>
                    </block>
                </value>
            </block>
        `,
        solution: ([a]: number[]) => `${a}`,
        solutionLength: 4,
        solutionType: 'knocks',
        argsGenerator: () => [randomNum(5000, 9999)]
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles
