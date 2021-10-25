import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyInput from './MyInput'

export default {
  title: 'MyComponents/MyInput',
  component: MyInput,
  parameters: {
    docs: {
      description: {
        component: 'Обычный инпут без `label`',
      },
    },
  },
} as ComponentMeta<typeof MyInput>;


const Template: ComponentStory<typeof MyInput> = (args) => {
  return (
    <MyInput {...args} />
  )
};


export const Primary = Template.bind({});

Primary.args = {

};

export const WithError = Template.bind({});

WithError.args = {
  errorText: 'Ошибка данных',
  value: 'что-то неправильное'
};

export const NumberInput = Template.bind({});

NumberInput.args = {
  type: 'number',
  placeholder: 'введите число',
  value: '0'
};