import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Header} from './Header'
import { BrowserRouter,  Route, Switch  } from "react-router-dom";


export default {
  title: 'MyComponents/Header',
  component: Header,
} as ComponentMeta<typeof Header>;


const Template: ComponentStory<typeof Header> = (args) => {
  return (
       <BrowserRouter>
        <Switch>
          <Route >
           <Header {...args} />
          </Route>
        </Switch>
      </BrowserRouter>
  )
};


export const Primary = Template.bind({});

Primary.args = {

};