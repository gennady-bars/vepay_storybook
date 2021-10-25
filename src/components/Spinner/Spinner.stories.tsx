import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Spinner from './Spinner'

export default {
  title: 'MyComponents/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;


const Template: ComponentStory<typeof Spinner> = (args) => {
  return (
    <Spinner {...args} />
  )
};


export const Primary = Template.bind({});

Primary.args = {

};