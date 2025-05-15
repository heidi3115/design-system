import { Button } from '@common/ui';
import { AddIcon, AlarmIcon } from '@common/ui/icons';

function App() {
  return (
    <main className={` bg-juiBackground-default text-juiText-primary`}>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl  font-bold underline">Hello World</h1>
          <Button variant="jui">jui Button</Button>
          <Button variant="juiGrey">jui Grey</Button>
          <Button variant="juiGradient">jui Button Gradient</Button>
          <AlarmIcon fill={'var(--juiError)'} className="size-28" />
          <AddIcon />
        </div>
      </div>
    </main>
  );
}

export default App;
