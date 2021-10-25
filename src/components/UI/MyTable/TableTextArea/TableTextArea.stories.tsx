import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableTextArea from './TableTextArea'

export default {
  title: 'MyComponents/Table/TableTextArea',
  component: TableTextArea,
} as ComponentMeta<typeof TableTextArea>;


const Template: ComponentStory<typeof TableTextArea> = (args) => {
  return (
    <TableTextArea {...args} />
  )
};


export const Primary = Template.bind({});

Primary.args = {
  // label: 'textarea'
};