import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter,  Route, Switch  } from "react-router-dom";


import SideMenu from './SideMenu'

export default {
  title: 'MyComponents/SideMenu',
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;


const Template: ComponentStory<typeof SideMenu> = (args) => {
  return (
    <BrowserRouter>
    <Switch>
      <Route >
        <SideMenu {...args} />
      </Route>
    </Switch>
  </BrowserRouter>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  isOpen: true
};