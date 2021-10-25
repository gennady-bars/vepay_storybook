import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ClickableTH from './ClickableTH'

export default {
  title: 'MyComponents/Table/ClickableTH',
  component: ClickableTH,
  parameters: {
    docs: {
      description: {
        component: 'элемент таблицы `th`, при клике на который появляется подсветка и направление сортировки',
      },
    },
  },
} as ComponentMeta<typeof ClickableTH>;



const Template: ComponentStory<typeof ClickableTH> = (args) => {
const [clicked, setClicked] = useState('')
const [order, setOrder] = useState(true)

const clickHandler = () => {
  setClicked('clicked')
  setOrder(!order)
}

  return (
    <table>
      <thead>
        <tr>
          <ClickableTH 
          {...args}  
          sortField={clicked}
          onClick={clickHandler}
          order={order}
          />
        </tr>
      </thead>
    </table>
  )
};



export const Primary = Template.bind({});

Primary.args = {
  label: 'Click me',
  thisField: 'clicked',
  sortField: 'notClicked',

};
