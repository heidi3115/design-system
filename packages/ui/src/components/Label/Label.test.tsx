import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  test('Label 컴포넌트를 렌더링 테스트를 합니다.', () => {
    render(<Label htmlFor="email-input">label</Label>);

    const label = screen.getByText('label');

    expect(label).toBeInTheDocument();
  });
});
