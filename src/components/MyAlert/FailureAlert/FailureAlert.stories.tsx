import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FailureAlert from './FailureAlert'

export default {
  title: 'MyComponents/Alerts/FailureAlert',
  component: FailureAlert,
  parameters: {
    docs: {
      description: {
        component: 'попап для отображения ошибок',
      },
    },
  },
} as ComponentMeta<typeof FailureAlert>;


const Template: ComponentStory<typeof FailureAlert> = (args) => {
  const [visible, setVisible] = useState(true)
  const toggleModal = () => {
    setVisible(state => !state)
    setTimeout(() => {
      setVisible(state => !state)
    }, 700);
  }
  return (
    <FailureAlert {...args} visible={visible} setVisible={toggleModal} />
  )
};


export const Primary = Template.bind({});

Primary.args = {
  visible: true,
  bottomMessage: ''
};

export const WithBottomMessage = Template.bind({});

WithBottomMessage.args = {
  visible: true,
  bottomMessage: 'внизу доп информация'
};