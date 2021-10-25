import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivTableInput from './DivTableInput'

export default {
  title: 'MyComponents/Table/DivTableInput',
  component: DivTableInput,
} as ComponentMeta<typeof DivTableInput>;


const Template: ComponentStory<typeof DivTableInput> = (args) => {
  const [value, setValue] = useState('')
  const changeHandler = (e: any) => {
    setValue(e.target.value)
  }
  return (
    <DivTableInput {...args} value={value} onChange={changeHandler} />
  )
};


export const Primary = Template.bind({});

Primary.args = {
  label: 'Hello',
  errorText: '',
  value: ''
};
export const WithError = Template.bind({});

WithError.args = {
  label: 'С ошибкой',
  errorText: 'ошибка инпута',
  value: ''
};
export const TypeNumber = Template.bind({});

TypeNumber.args = {
  label: 'для цифр',
  value: 0,
  type: 'number'
};