import { render, screen } from '@testing-library/react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card 컴포넌트', () => {
  test('Card 기본 렌더링', () => {
    render(<Card data-testid="card">내용</Card>);

    // Assert
    const card = screen.getByTestId('card');

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-xl border bg-card text-card-foreground shadow');
    expect(card).toHaveTextContent('내용');
  });

  test('CardHeader, CardTitle, CardDescription 렌더링 확인', () => {
    render(
      <Card>
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">타이틀</CardTitle>
          <CardDescription data-testid="description">설명</CardDescription>
        </CardHeader>
      </Card>,
    );

    const header = screen.getByTestId('header');
    const title = screen.getByTestId('title');
    const description = screen.getByTestId('description');

    // Header 클래스 확인
    expect(header).toHaveClass('flex flex-col space-y-1.5 p-6');
    // Title 클래스 확인
    expect(title).toHaveClass('font-semibold leading-none tracking-tight');
    // Description 클래스 확인
    expect(description).toHaveClass('text-sm text-muted-foreground');

    // 내용 확인
    expect(title).toHaveTextContent('타이틀');
    expect(description).toHaveTextContent('설명');
  });

  test('CardContent와 CardFooter 렌더링 확인', () => {
    render(
      <Card>
        <CardContent data-testid="content">컨텐츠</CardContent>
        <CardFooter data-testid="footer">푸터</CardFooter>
      </Card>,
    );

    const content = screen.getByTestId('content');
    const footer = screen.getByTestId('footer');

    // 클래스 확인
    expect(content).toHaveClass('p-6 pt-0');
    expect(footer).toHaveClass('flex items-center p-6 pt-0');

    // 내용 확인
    expect(content).toHaveTextContent('컨텐츠');
    expect(footer).toHaveTextContent('푸터');
  });
});
