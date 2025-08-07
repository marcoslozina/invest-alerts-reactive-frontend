import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Click me!',
  },
};
//agregar comentarios
export const CustomColor: Story = {
  args: {
    label: 'Danger Button',
    className: 'bg-red-600 hover:bg-red-700',
  },
};
