import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from './Footer'

export default {
  title: 'MyComponents/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;


const Template: ComponentStory<typeof Footer> = (args) => {
  return (
    <Footer {...args} />
  )
};


export const Primary = Template.bind({});

Primary.args = {

};