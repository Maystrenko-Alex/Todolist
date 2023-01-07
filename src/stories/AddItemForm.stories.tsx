import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AddItemForm from "../AddItemForm";

export default {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  args: {
    addItem: action('changed title'),
    placeholder: 'Enter todolist title...'
  }
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

export const AddItemFormStory = Template.bind({});
