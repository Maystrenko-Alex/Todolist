import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { EditableSpan } from "../EditableSpan";

export default {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const EditableSpanDefaultStory = Template.bind({})
EditableSpanDefaultStory.args = {
  title: 'HTML/CSS',
  changeTitle: action('title was changed')
}

const ResponsiveTemplate: ComponentStory<typeof EditableSpan> = () => {
  const [title, setTitle] = useState<string>('HTML/CSS')
  const changeTitle = (newTitle: string) => setTitle(newTitle)
  return <EditableSpan title={title} changeTitle={changeTitle}/>
}

export const ResponsiveEditableSpanStory = ResponsiveTemplate.bind({})