import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StatusTD from './StatusTD'

export default {
  title: 'MyComponents/Table/StatusTD',
  component: StatusTD,
} as ComponentMeta<typeof StatusTD>;


const Template: ComponentStory<typeof StatusTD> = (args) => {
  return (
   <table>
     <thead>
        <tr>
          <StatusTD {...args} />
        </tr>
     </thead>
   </table>
  )
};


export const Active = Template.bind({});

Active.args = {
  active: true
};
export const NotActive = Template.bind({});

NotActive.args = {
  active: false
};