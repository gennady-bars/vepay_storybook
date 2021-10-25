import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SuccessAlert from './SuccessAlert'

export default {
  title: 'MyComponents/Alerts/SuccessAlert',
  component: SuccessAlert,
  parameters: {
    docs: {
      description: {
        component: 'попап для отображения успешной операции с автозакрытием через 3 секунды (можно управлять временем закрытия через `timeout`)',
      },
    },
  },
} as ComponentMeta<typeof SuccessAlert>;


const Template: ComponentStory<typeof SuccessAlert> = (args) => {
  const [visible, setVisible] = useState(true)
  const toggleModal = () => {
    setVisible(state => !state)
    setTimeout(() => {
      setVisible(state => !state)
    }, 700);
  }
  return (
    <SuccessAlert {...args} visible={visible} setVisible={toggleModal}/>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  visible: true,
  alertHeading: 'Всё отлично!',
  bottomMessage: '',
  timeout: 3000
};

export const WithBottomMessage = Template.bind({});

WithBottomMessage.args = {
  visible: true,
  alertHeading: 'Отлично',
  bottomMessage: 'Можно продолжать дальше',
  message: 'Данные успешно отправлены',
  timeout: 3000
};