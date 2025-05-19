'use client';

import { useState } from 'react';

import { Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@common/ui';
import { CournerDownRightIcon, LogInIcon } from '@common/ui/icons';

import { useUpdateEffect } from '@common/utils';
// import LogInIcon from '@common/ui/icons/Icon/LogInIcon';
// import CournerDownRightIcon from '@common/ui/icons/Icon/CournerDownRightIcon';
// import MailIcon from '@common/ui/icons/Icon/MailIcon';

export default function Page() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl text-juiGrey-400 font-bold underline">Hello World</h1>
        <Button variant="jui" onClick={() => setCount((prev) => (prev += 1))}>
          jui Button
        </Button>
        <Button variant="juiGrey" onClick={() => setCount((prev) => (prev += 1))}>
          jui Grey <CournerDownRightIcon />
        </Button>
        <Button variant="juiGradient" onClick={() => setCount((prev) => (prev += 1))}>
          jui Button Gradient
        </Button>
        <Badge className="text-juiStatus-urgency">
          {/*{count} <AddIcon className="stroke-juiSecondary" />*/}
          {/*{count} <AddIcon className="fill-juiSecondary" />*/}
          {/*{count} <AddIcon className="fill-current" />*/}
        </Badge>
        <div className="flex justify-between items-center gap-5">
          <Card>
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
          <Card>
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
          <CournerDownRightIcon />
          <LogInIcon />
        </div>
      </div>
    </div>
  );
}
