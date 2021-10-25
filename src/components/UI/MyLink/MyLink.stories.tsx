import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter,  Route, Switch  } from "react-router-dom";

import MyLink from './MyLink'

export default {
  title: 'MyComponents/MyLink',
  component: MyLink,
  parameters: {
    docs: {
      description: {
        component: 'Ссылка становится сиреневого цвета, если она активная',
      },
    },
  },
} as ComponentMeta<typeof MyLink>;


const Template: ComponentStory<typeof MyLink> = (args) => {
  return (
    <BrowserRouter>
    <Switch>
    <Route >
       <MyLink {...args} />
    </Route>

    </Switch>
    </BrowserRouter>
  )
};


export const Primary = Template.bind({});

Primary.args = {
  children: 'Ссылка',
  to: '/'
};