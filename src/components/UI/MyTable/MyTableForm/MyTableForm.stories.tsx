import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MyTableForm from './MyTableForm'

import * as MyTableInputStories from '../TableInput/TableInput.stories'
import { mockStories } from '../../../../utils/mockStories';

export default {
  title: 'MyComponents/Table/MyTableForm',
  component: MyTableForm,
  parameters: {
    docs: {
      description: {
        component: 'Форма, внутри которой есть 2 кнопки: одна для сабмита, другая для очистки формы.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Вся начинка табличной формы помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof MyTableForm>;


const Template: ComponentStory<typeof MyTableForm> = (args) => {
  return (
    <MyTableForm {...args} >
      {
        mockStories.map((item, i) => {
          if (i < 5) {
            return (
              // @ts-ignore
              <MyTableInputStories.Primary
                key={i}
                {...MyTableInputStories.Primary.args}
                label={item.company}
              >
  
              </MyTableInputStories.Primary>
            )
          } else {
            return null
          }
          
        })
      }

    </MyTableForm>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  resetForm: () => { },
  buttonText: 'Сохранить'
};
export const ValidForm = Template.bind({});

ValidForm.args = {
  resetForm: () => {},
  isValid: true,
  onSubmit: ((e: any) => {e.preventDefault()})
};