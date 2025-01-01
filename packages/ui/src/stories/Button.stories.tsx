import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from 'src/components/ui/button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
}

// const meta: Meta<typeof FbModal> = {
//   title: 'Design System/components/Modal',
//   component: FbModal,
// };

// export default meta;
// type Story = StoryObj<typeof FbModal>;

// export const Default: Story = {
//   args: {
//     title: 'Modal Title',
//     show: true,
//   },
//   render: (args) => (
//     <FbModal {...args}>
//       <FbModalBody>Modal Body</FbModalBody>
//       <FbModalFooter>
//         <FbButton label="Custom Button" />
//       </FbModalFooter>
//     </FbModal>
//   ),
// };

// export const ClearValue: Story = {
//   render: () => {
//     const [selectedValue, setSelectedValue] = useState<string | null>(null);

//     const clearValue = () => {
//       setSelectedValue(null);
//     };

//     const options = [
//       {
//         label: 'Alan Anderson',
//         value: 'aanderson',
//       },
//       {
//         label: 'Andrew Bateman',
//         value: 'abateman',
//       }
//     ]

//     return (
//       <>
//          <FbSelect options={options} value={selectedValue} onChange={(selectedOption: any) => setSelectedValue(selectedOption)}/>
//          <button onClick={clearValue}>Clear Value</button>
//       </>
//     );
//   },
// };
