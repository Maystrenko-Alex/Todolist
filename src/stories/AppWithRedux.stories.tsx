import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppWithRedux } from "../AppWithRedux";
import { ReduxStoreProviderDecorator } from "../store/decorators/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  decorators:  [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />

export const AppWithReduxStory = Template.bind({})
