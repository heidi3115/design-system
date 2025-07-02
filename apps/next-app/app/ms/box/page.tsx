'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  Popover,
  Select,
  Separator,
  Skeleton,
  SplitOtpInput,
  Switch,
} from '@common/ui';
import { CalendarIcon, ClockIcon, UserIcon } from '@common/ui/icons';

export default function BoxPages() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-juiBackground-paper min-h-full">
      <h1 className="text-4xl font-bold">BOX LAYOUT</h1>
      <Switch defaultChecked />
      <Switch variant="secondary" defaultChecked />
      <Switch variant="error" defaultChecked />
      <Switch defaultChecked />
      <Switch defaultChecked />
      <Popover trigger={<Button variant="gradient">popover</Button>} size="small">
        <div className="flex flex-col gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Select
            isContentfitTriggerWidth
            options={[
              { label: 'Eastern Standard Time (EST)ddddddddddddddd', value: 'est1' },
              { label: 'Pacific Standard Time (PST)', value: 'pst1' },
              { type: 'separator' },
              {
                type: 'group',
                label: 'North America',
                items: [
                  { label: 'Eastern Standard Time (EST)', value: 'est' },
                  { label: 'Pacific Standard Time (PST)', value: 'pst' },
                ],
              },
            ]}
          />
        </div>
      </Popover>
      <Separator />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />
      <SplitOtpInput value="123456" />

      <Separator className="my-4" />
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <p>Card Content</p>
          <p>Card Content</p>
          <p>Card Content</p>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <CommandRoot className="w-96">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <UserIcon />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <ClockIcon />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <ClockIcon />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <ClockIcon />
              <span>Billing2</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandSeparator />
            <CommandItem>
              <ClockIcon />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <ClockIcon />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandRoot>
    </div>
  );
}
