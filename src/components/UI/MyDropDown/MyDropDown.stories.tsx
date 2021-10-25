import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyDropDown from './MyDropDown';

export default {
  title: 'MyComponents/MyDropDown',
  component: MyDropDown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: 'Вся начинка выпадающего списка помещается в качестве `children` между тегами компонента'
    }
  },
} as ComponentMeta<typeof MyDropDown>;


const Template: ComponentStory<typeof MyDropDown> = (args) => {
  return (
    <MyDropDown {...args} >
      <ul>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
      </ul>
    </MyDropDown>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  title: 'Выпадающий список'
};