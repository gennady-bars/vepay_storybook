import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DivTableTH from './DivTableTH'

export default {
  title: 'MyComponents/Table/DivTableTH',
  component: DivTableTH,
  argTypes: {
    children: {
      description: 'Текст помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof DivTableTH>;


const Template: ComponentStory<typeof DivTableTH> = (args) => {
  return (
    <DivTableTH {...args} >

    </DivTableTH>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  children: 'Hello'
};