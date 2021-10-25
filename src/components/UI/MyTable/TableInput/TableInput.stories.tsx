import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableInput from './TableInput'

export default {
  title: 'MyComponents/Table/TableInput',
  component: TableInput,
} as ComponentMeta<typeof TableInput>;


const Template: ComponentStory<typeof TableInput> = (args) => {
  const [value, setValue] = useState('')
  const changeHandler = (e: any) => {
    setValue(e.target.value)
  }
  return (
    <TableInput {...args} value={value} onChange={changeHandler} />
  )
};


export const Primary = Template.bind({});

Primary.args = {
  label: 'инпут'
};
export const TypeNumber = Template.bind({});

TypeNumber.args = {
  label: 'инпут',
  type: 'number',
  value: 0
};
export const WithError = Template.bind({});

WithError.args = {
  label: 'инпут с ошибкой',
  errorText: 'ошибка'
};