import * as React from 'react'

import * as ComputerImage from '../../assets/images/computer.png'
import * as ComputerKeyImage from '../../assets/images/key.png'
import * as CuneiformLegendImage from '../../assets/images/legend.png'
import * as MapImage from '../../assets/images/map.png'
import * as TranslatorImage from '../../assets/images/rock.png'

import l10nStore from '../stores/l10nStore'

export interface Item {
    id: string
    nameId: string
    descriptionId: string
    image: any
}

export class Computer implements Item {
    id: string = COMPUTER
    nameId = 'computer_name'
    descriptionId = 'computer_description'
    workspace: { [riddleId: string]: string } = {}
    image = ComputerImage
}

// Computer allows user to have the blockly editor
export const COMPUTER = 'COMPUTER'
// export const ROCK_SMASHER = 'ROCK_SMASHER'
export const COMPUTER_KEY = 'COMPUTER_KEY'
export const TRANSLATOR = 'CUNEIFORM_TRANSLATOR'
export const LEGEND = 'LEGEND'
export const MAP = 'MAP'

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
    nameId: string,
    descriptionId: string,
    image: any
): Item => ({
    id,
    nameId,
    descriptionId,
    image
})

export const computer = new Computer()
// export const rockSmasher = createItem(ROCK_SMASHER, 'rock smasher', '')
export const computerKey = createItem(
    COMPUTER_KEY,
    'old_key_name',
    'old_key_description',
    ComputerKeyImage
)

export const translator = createItem(
    TRANSLATOR,
    'conscious_rock_name',
    'conscious_rock_description',
    TranslatorImage
)

export const legend = createItem(
    LEGEND,
    'cuneiform_legend_name',
    'cuneiform_legend_description',
    CuneiformLegendImage
)

export const map = createItem(MAP, 'map_name', 'map_description', MapImage)

const items: Item[] = [computer]

export type Inventory = Item[]

export const getItemById = (id: string) =>
    items.filter((item: Item) => item.id === id)[0]

export const defaultInventory = (): Inventory => [legend, map]

export const hasItem = (inventory: Inventory, item: Item): boolean =>
    inventory.filter(i => i.id === item.id).length > 0

export const addItem = (inventory: Inventory, item: Item): Inventory => {
    if (hasItem(inventory, item)) {
        return [...inventory]
    } else {
        return [...inventory, item]
    }
}
