import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivTableRow from './DivTableRow'
import * as DivTableTDStories from '../DivTableTD/DivTableTD.stories'
import * as DivTableTHStories from '../DivTableTH/DivTableTH.stories'

export default {
  title: 'MyComponents/Table/DivTableRow',
  component: DivTableRow,
  argTypes: {
    children: {
      description: 'Вся начинка ряда таблицы помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof DivTableRow>;


const Template: ComponentStory<typeof DivTableRow> = (args) => {
  return (
    <DivTableRow {...args} >
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
    </DivTableRow>
  )
};


export const Primary = Template.bind({});

Primary.args = {

};