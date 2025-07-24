'use client';

import { Button, Calendar, DateRange, Input, Popover, Separator, Skeleton, Tabs, type TabItemType } from '@common/ui';
import { useState } from 'react';
import { PlayIcon } from '@common/ui/icons';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function TabsPage() {
  function ScenarioList(props: { scenarioId: number }) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(2025, 5, 8),
      to: new Date(2025, 6, 19),
    });

    const [confirmationRequest, setConfirmationRequest] = useState<Date | null>(null);

    const handleSelect = (selectedDate: Date | undefined) => {
      if (selectedDate) {
        const needsConfirmation = selectedDate < new Date();

        if (needsConfirmation) {
          setConfirmationRequest(selectedDate);
        } else {
          setDate(selectedDate);
          setConfirmationRequest(null);
        }
      }
    };

    const handleConfirm = () => {
      if (confirmationRequest) {
        setDate(confirmationRequest);
        setConfirmationRequest(null);
      }
    };

    const handleCancel = () => {
      setConfirmationRequest(null);
    };

    return (
      <div className="bg-juiBackground-paper w-full p-4 h-[2000px] overflow-auto">
        <h1 className="text-4xl font-bold">TABS LAYOUT</h1>
        <div className="flex flex-col gap-4">
          <Input underline="secondary" className="w-50" placeholder="text" />
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            onSelect={handleSelect}
            dialogOpen={confirmationRequest !== null}
            onDialogConfirm={handleConfirm}
            onDialogCancel={handleCancel}
            dialogContent="과거 날짜를 선택하셨습니다."
          />
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            numberOfMonths={2}
            onSelect={setDate}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown-months"
          />
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={setDate}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown-years"
          />
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm min-w"
            captionLayout="dropdown"
          />
          <div className="w-48">
            <Popover
              open={open}
              onOpenChange={setOpen}
              align="start"
              trigger={
                <Input
                  type="date"
                  value={date ? format(date, 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const value = e.target.value;

                    setDate(value ? new Date(value + 'T00:00:00') : undefined);
                  }}
                  className="[&::-webkit-calendar-picker-indicator]:hidden"
                />
              }>
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                onSelect={(selectDate) => {
                  setDate(selectDate);

                  if (selectDate) {
                    setOpen(false);
                  }
                }}
                className="rounded-md shadow-sm"
                captionLayout="dropdown"
              />
            </Popover>
          </div>
        </div>
        Scenario {props.scenarioId}
      </div>
    );
  }

  type ComplexScenarioProps = {
    name: string;
  };

  function ComplexScenario(props: ComplexScenarioProps) {
    return <div className="bg-juiBackground-paper w-full p-4">Complex {props.name}</div>;
  }

  const [acitveTab, setActiveTab] = useState('');

  const tabsArray: TabItemType<typeof ScenarioList | typeof ComplexScenario> = [
    {
      value: 'scenario',
      label: 'Scenario',
      component: ScenarioList,
      props: { scenarioId: 1 },
    },
    {
      value: 'complex',
      label: 'Complex',
      component: ComplexScenario,
      props: { name: 'Test' },
    },
    {
      value: 'exception',
      label: 'Exception',
    },
    {
      value: 'target',
      label: 'Targetㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ',
    },
    {
      value: 'tab4',
      label: '탭 4',
      content: <div className="bg-juiBackground-paper w-full p-4">탭 4 컨텐츠</div>,
    },
    {
      value: 'tab5',
      disabled: true,
      label: (
        <div className="flex gap-1">
          <PlayIcon />탭 5
        </div>
      ),
      content: <ScenarioList scenarioId={3} />,
    },
  ];

  return (
    <div className="relative">
      <Tabs
        // defaultValue="target"
        // align="center"
        // size="small"
        // variant="secondary"
        // shape="text"
        // shape="folder"
        tabs={tabsArray}
        restScreenHeight={120}
        // maxWidth={100}
        // align="full"
        onValueChange={(val) => setActiveTab(val)}
      />
      {acitveTab === 'exception' && (
        <div className="max-h-[calc(100svh-120px)] overflow-auto bg-juiBackground-paper w-full p-4">
          <div className="h-[2000px]">Exception</div>
        </div>
      )}
      {acitveTab === 'target' && (
        <div className="h-[2000px] bg-juiBackground-paper w-full p-4">
          Target
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-2">
            <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-72" />
          </div>
        </div>
      )}
    </div>
  );
}
