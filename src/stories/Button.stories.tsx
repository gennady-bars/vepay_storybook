import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyButton from '../components/UI/MyButton/MyButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'MyComponents/MyButton',
  component: MyButton,
  parameters: {
    docs: {
      description: {
        component: 'Кнопка с 4мя основными цветами',
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      options: ['primary' , 'secondary', 'success', 'danger'],
      description: 'цвет кнопки',
      control: { type: 'radio' }
    },

  },
} as ComponentMeta<typeof MyButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyButton> = (args) => <MyButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  buttonText: 'Primary',
  color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonText: 'Secondary',
  color: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  buttonText: 'Подтвердить',
  color: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
  buttonText: 'Удалить',
  color: 'danger'
};
