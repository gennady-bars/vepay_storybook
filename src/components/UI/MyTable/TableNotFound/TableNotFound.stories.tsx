import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableNotFound from './TableNotFound'

export default {
  title: 'MyComponents/Table/TableNotFound',
  component: TableNotFound,
} as ComponentMeta<typeof TableNotFound>;


const Template: ComponentStory<typeof TableNotFound> = (args) => {
  return (
    <TableNotFound {...args} />
  )
};


export const Primary = Template.bind({});

Primary.args = {

};