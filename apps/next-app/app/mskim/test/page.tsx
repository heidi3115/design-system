'use client';

import React from 'react';
import useToggle from '../../../hooks/useToggle';
import { Toggle } from '@common/ui';
import Image from 'next/image';

const Page = () => {
  const [value, toggle] = useToggle(false);

  return (
    <div className="m-3  w-auto text-2xl">
      브로콜리의 주요 효능: 항암 효과: 브로콜리에 함유된 설포라판과 인돌은 암세포 성장을 억제하고 암 예방에 도움을 줄 수
      있습니다. 특히 대장암, 위암, 유방암, 폐암 등에 효과가 있다는 연구 결과가 있습니다. 면역력 증진: 비타민C와
      베타카로틴이 풍부하여 면역 세포 활성화를 돕고, 감기 예방에도 효과적입니다. 위장 건강 개선: 비타민U와 식이섬유가
      풍부하여 위염, 위궤양 완화에 도움을 주고, 위장 기능 활성화에 기여합니다. 심혈관 질환 예방: 브로콜리에 풍부한 칼륨,
      식이섬유, 항산화 성분은 혈압 조절 및 콜레스테롤 수치 감소에 도움을 주어 심혈관 질환 예방에 효과적입니다.
      <Toggle size="small" pressed={value} onPressedChange={toggle}>
        {value ? '이미지 숨기기' : '더보기'}
      </Toggle>
      {value && <Image src="/images/broccoli.png" alt="broccoli" width={500} height={500} />}
    </div>
  );
};

export default Page;
