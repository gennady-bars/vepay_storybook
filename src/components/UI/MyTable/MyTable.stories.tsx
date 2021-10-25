import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyTable from './MyTable'
import DivTableTH from '../DivTable/DivTableTH/DivTableTH';
import DivTableRow from '../DivTable/DivTableRow/DivTableRow';
import DivTableTD from '../DivTable/DivTableTD/DivTableTD';

export default {
  title: 'MyComponents/Table/MyTable',
  component: MyTable,
  argTypes: {
    children: {
      description: 'Вся начинка таблицы помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof MyTable>;


const Template: ComponentStory<typeof MyTable> = (args) => {
  return (
    <MyTable {...args} >
        <DivTableRow>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
          <DivTableTH>Hello</DivTableTH>
        </DivTableRow>
        <DivTableRow>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
        </DivTableRow>
        <DivTableRow>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
        </DivTableRow>
        <DivTableRow>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
        </DivTableRow>
        <DivTableRow>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
          <DivTableTD>World</DivTableTD>
        </DivTableRow>
      

    </MyTable>
  )
};


export const Primary = Template.bind({});

Primary.args = {

};