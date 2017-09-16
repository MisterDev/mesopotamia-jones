import * as React from 'react'

import * as ComputerImage from '../../assets/images/computer.png'
import * as ComputerKeyImage from '../../assets/images/key.png'
import * as TranslatorImage from '../../assets/images/rock.png'

export interface Item {
    id: string
    name: string
    description: string
    image: any
}

export class Computer implements Item {
    id: string = COMPUTER
    name = 'computer'
    description = 'il computer che Von Talin in passato ha cercato di costruire. Questo artefatto si collega alle porte della piramide e permette di risolvere gli enigmi automaticamente, se programmato correttamente'
    workspace: { [riddleId: string]: string } = {}
    image = ComputerImage
}

// Computer allows user to have the blockly editor
export const COMPUTER = 'COMPUTER'
// export const ROCK_SMASHER = 'ROCK_SMASHER'
export const COMPUTER_KEY = 'COMPUTER_KEY'
export const TRANSLATOR = 'CUNEIFORM_TRANSLATOR'

export const toolboxEntries: any = [
    // {
    //     id: 'math_number',
    //     xml: `<block type="math_number"></block>`
    // }
    // {
    //     id: 'variables_get',
    //     xml: `<block type="variables_get">
    //         <field name="VAR">variable</field>
    //     </block>`
    // }
]

export const addToolboxEntry = (id: string, xml: string) =>
    toolboxEntries.push({ id, xml })

export const getToolbox = (additionalEntries: any[]) => {
    let toolbox = '<xml id="toolbox" style="display: none">'
    // tslint:disable:curly
    for (const entry of additionalEntries) toolbox += entry
    for (const entry of toolboxEntries) toolbox += entry.xml
    // tslint:enable:curly
    toolbox += '</xml>'
    return toolbox
}
// <block type="controls_if"></block>
// <block type="controls_repeat_ext"></block>
// <block type="logic_compare"></block>
// <block type="math_arithmetic"></block>
// <block type="text"></block>
// <block type="text_print"></block>

const createItem = (
    id: string,
    name: string,
    description: string,
    image: any
): Item => ({
    id,
    name,
    description,
    image
})

export const computer = new Computer()
// export const rockSmasher = createItem(ROCK_SMASHER, 'rock smasher', '')
export const computerKey = createItem(
    COMPUTER_KEY,
    'vecchia chiave',
    'questa chiave serve ad aprire una cassa contenente il computer di Von Talin',
    ComputerKeyImage
)

export const translator = createItem(
    TRANSLATOR,
    'una roccia',
    'questo oggetto traduce automaticamente i testi degli indovinelli. Sembra contenere il fantasma di un maestro di cuneiforme',
    TranslatorImage
)

const items: Item[] = [computer]

export type Inventory = Item[]

export const getItemById = (id: string) =>
    items.filter((item: Item) => item.id === id)[0]

export const defaultInventory = (): Inventory => []

export const hasItem = (inventory: Inventory, item: Item): boolean =>
    inventory.filter(i => i.id === item.id).length > 0

export const addItem = (inventory: Inventory, item: Item): Inventory => {
    if (hasItem(inventory, item)) {
        return [...inventory]
    } else {
        return [...inventory, item]
    }
}

export const reactourInventory = (inventory: Inventory) => {
    const tutorials = inventory.map(item => {
        if (item.id === COMPUTER) {
            return [
                {
                    selector: '#blocklyArea',
                    text:
                        'Grazie al computer posso risolvere questi indovinelli una volta per tutte!'
                },
                {
                    selector: '.blocklyFlyout',
                    text: "Posso trascinare questi elementi nell'area bianca!"
                },
                {
                    selector: '#play',
                    text:
                        'Se premo questo bottone il computer eseguirà questo codice e sposterà automaticamente gli ingranaggi'
                }
            ]
        }
    })
    return tutorials.reduce(
        (prev, curr) => (curr ? prev.concat(curr) : prev),
        []
    )
}
