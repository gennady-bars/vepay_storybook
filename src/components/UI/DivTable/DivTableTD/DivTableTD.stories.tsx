import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivTableTD from './DivTableTD'

export default {
  title: 'MyComponents/Table/DivTableTD',
  component: DivTableTD,
  argTypes: {
    children: {
      description: 'Текст помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof DivTableTD>;


const Template: ComponentStory<typeof DivTableTD> = (args) => {
  return (
    <DivTableTD {...args} >
      
    </DivTableTD>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  children: 'Hello'
};