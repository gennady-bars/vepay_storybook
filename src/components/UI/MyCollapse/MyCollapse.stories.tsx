import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyCollapse from './MyCollapse';

export default {
  title: 'MyComponents/MyCollapse',
  component: MyCollapse,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      options: ['primary' , 'secondary'],
      description: 'цвет кнопки',
      control: { type: 'radio' }
    },
    children: {
      description: 'Вся начинка выпадающего списка помещается в качестве `children` между тегами компонента'
    }
  },
} as ComponentMeta<typeof MyCollapse>;


const Template: ComponentStory<typeof MyCollapse> = (args) => {
  return (
    <MyCollapse {...args} >
        <ul>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
        <li>Hello</li>
        <li>World</li>
      </ul>
    </MyCollapse>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  color: 'primary',
  buttonText: 'Показать фильтр'
};