import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TableMultiselect from './TableMultiselect'
import { activeOptions, currencyOptions } from '../../../../utils/constants';
import { useFormAndValidation } from '../../../../hooks/useFormValiation';

export default {
  title: 'MyComponents/Table/TableMultiselect',
  component: TableMultiselect,
} as ComponentMeta<typeof TableMultiselect>;


const Template: ComponentStory<typeof TableMultiselect> = (args) => {
  const {values, setValues } = useFormAndValidation()
  const onMultiSelect = (selectedList: any, selectedItem: any) => {
    setValues({
        ...values,
        [selectedItem.jsonKey]: selectedList.map((i: any) => i.value)
    })
}
  return (
    <form>
      <TableMultiselect 
      {...args}
      onSelect={onMultiSelect}
      displayValue="name"

      />
    </form>
  )
};


export const Multiselect = Template.bind({});

Multiselect.args = {
  label: 'Выбрать несколько',
  options: currencyOptions,
  placeholder: 'Выберите'

};
export const SingleSelect = Template.bind({});

SingleSelect.args = {
  label: 'Выбрать что-то одно',
  options: activeOptions,
  singleSelect: true,
  placeholder: 'Выберите'

};