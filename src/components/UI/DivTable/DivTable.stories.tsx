import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivTable from './DivTable'

import * as DivTableRowStories from './DivTableRow/DivTableRow.stories'
import * as DivTableTDStories from './DivTableTD/DivTableTD.stories'
import * as DivTableTHStories from './DivTableTH/DivTableTH.stories'
import { mockStories } from '../../../utils/mockStories';

export default {
  title: 'MyComponents/Table/DivTable',
  component: DivTable,
  argTypes: {
    children: {
      description: 'Вся начинка таблицы помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof DivTable>;



const Template: ComponentStory<typeof DivTable> = (args) => {
  return (
    <DivTable {...args} >
            <DivTableRowStories.Primary >
              <DivTableTHStories.Primary>
                #
              </DivTableTHStories.Primary>
              <DivTableTDStories.Primary>
                Имя
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                Возраст
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                Компания
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                Email
              </DivTableTDStories.Primary>
            </DivTableRowStories.Primary>
      {
        mockStories.map((item, i) => {
          return (
            <DivTableRowStories.Primary key={i} >
              <DivTableTHStories.Primary>
                {i+1}
              </DivTableTHStories.Primary>
              <DivTableTDStories.Primary>
                {item.name}
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                {item.age}
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                {item.company}
              </DivTableTDStories.Primary>
              <DivTableTDStories.Primary>
                {item.email}
              </DivTableTDStories.Primary>
            </DivTableRowStories.Primary>
          )
        })
      }
      
    </DivTable>
  )
};


export const Primary = Template.bind({});

Primary.args = {

};