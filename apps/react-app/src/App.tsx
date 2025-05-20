import { Button } from '@common/ui';
import { BellIcon } from '@common/ui/icons';

function App() {
  return (
    <main className={` bg-juiBackground-default text-juiText-primary`}>
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl  font-bold underline">Hello World</h1>
          <Button variant="primary">jui Button</Button>
          <Button variant="default">jui Grey</Button>
          <Button variant="gradient">jui Button Gradient</Button>
          <BellIcon />
        </div>
      </div>
    </main>
  );
}

export default App;
