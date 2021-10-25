import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HoverTable from './HoverTable'
import { mockStories } from '../../../../utils/mockStories';

export default {
  title: 'MyComponents/Table/HoverTable',
  component: HoverTable,
  parameters: {
    docs: {
      description: {
        component: 'Таблица, в которой подсвечиваются строки при наведении мышкой на них',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Вся начинка таблицы помещается в качестве `children` между тегами компонента'
    }
  }
} as ComponentMeta<typeof HoverTable>;


const Template: ComponentStory<typeof HoverTable> = (args) => {
  return (
    <HoverTable {...args} >
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Банк</th>
          <th>Email</th>
          <th>телефон</th>
        </tr>
       
       </thead>
       <tbody>
         {
           mockStories.map((item, i) => {
             return (
              <tr  key={i} >
                <th scope="row">{i+1}</th>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.company}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
            </tr>
             )
           })
         }
       </tbody>
    </HoverTable>
  )
};


export const Primary = Template.bind({});

Primary.args = {

};