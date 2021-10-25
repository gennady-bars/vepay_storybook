import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DetailsTableRow from './DetailsTableRow'

export default {
  title: 'MyComponents/Table/DetailsTableRow',
  component: DetailsTableRow,
} as ComponentMeta<typeof DetailsTableRow>;


const Template: ComponentStory<typeof DetailsTableRow> = (args) => {
  return ( 
    <DetailsTableRow {...args}/>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  label: 'Пункт детальной информации',
  data: 'данные мерчанта'
};

export const NoData = Template.bind({});

NoData.args = {
  label: 'Пункт без данных',
};
export const Column = Template.bind({});

Column.args = {
  label: 'Пункт детальной информации в вертикальном виде',
  column: true,
  data: 'много разного текста на всю длину экрана'
};