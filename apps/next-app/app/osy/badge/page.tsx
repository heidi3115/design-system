'use client';

import { useState } from 'react';
import { badgeVariants, Button, ScoringBadge } from '@common/ui';
import { AlertCircleIcon, AlertTriangleFilledIcon, CalendarIcon, CornerDownLeftIcon } from '@common/ui/icons';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { Badge, CountBadge, StateBadge } from '@common/ui/components/Badge';
import GradeBadge from '@common/ui/src/components/Badge/GradeBadge';
import TextBadge from '@common/ui/src/components/Badge/TextBadge';

const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '80%', height: '2px' }} />;

export default function BadgePage() {
  const MAX_VAL = 20;
  const SHORT_STR = 'TextBadge';
  const LONG_STR =
    'TextBadgePropsType is composite type that combines with several sources: React.ComponentProps of span tag without children property, badgeVariants(except variant, status, score and grade), TextBadgeContentProps';
  const gradeKeys = Object.keys(badgeVariants.variants.grade) as (keyof typeof badgeVariants.variants.grade)[];
  const statusKeys = Object.keys(badgeVariants.variants.status) as (keyof typeof badgeVariants.variants.status)[];
  const scoreKeys = Object.keys(badgeVariants.variants.score) as (keyof typeof badgeVariants.variants.score)[];
  const combinedKeys = [...statusKeys, ...scoreKeys] as (
    | keyof typeof badgeVariants.variants.status
    | keyof typeof badgeVariants.variants.score
  )[];

  const [count, setCount] = useState(0);

  return (
    <section>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
        <h2 className={'text-juiText-blue text-4xl font-bold'}>Badges - 기본과 컴포넌트 별 분리</h2>
        <span className={'text-xl'}>
          각 badge 클릭 시 전체 숫자가 올라갑니다. <br />
          <span className={'text-sm'}>
            기본값 : {count}
            <br />
            현재 최대값(MAX_VAL) : {MAX_VAL}
          </span>
        </span>
        <h3 className={'text-juiText-primary text-2xl font-bold text-center'}>
          Count badges : 기본 Badge들의 예시
          <strong className={'block text-sm'}>기본 Badge만 asChild가 가능하니 유념해주세요.</strong>
        </h3>
        <div className={'flex flex-row gap-2'}>
          <Badge>pure Badge</Badge>
          <Badge isBtn>isBtn true</Badge>
          <Badge variant={'scoring'} score={'veryHigh'}>
            Badge : variant scoring score veryHigh test
          </Badge>
          <Badge asChild>asChild true with Text</Badge>
          <Badge asChild>
            <div>asChild true with div</div>
          </Badge>
          <Badge asChild>
            <div>
              <span>multi child in div 1</span>
              <span>multi child in div 2</span>
              <span>multi child in div 3</span>
            </div>
          </Badge>

          {/*<Badge asChild>*/}
          {/*  <div>multi div 1</div>*/}
          {/*  <div>multi div 2</div>*/}
          {/*  <div>multi div 3</div>*/}
          {/*</Badge>*/}
        </div>
        <strong className={'text-juiError'}>
          <Link
            href={'https://www.radix-ui.com/primitives/docs/utilities/slot#basic-example'}
            target={'_blank'}
            title={'to Raidx page'}>
            {`Radix UI 의 Slot 시, asChild={true}일 경우, single children element 이어야 하며, 여러 개의 요소 시 에러 나는 내역 확인`}
          </Link>
        </strong>
        <Line />
        <h3 className={'text-juiText-primary text-2xl font-bold'}>StateBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            StateBadge 는 variant가 state로 고정이며, status만 받을 수 있고, children에 대해서 따로 제한이 있지는
            않습니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>StateBadge - status 로 색 지정 시,</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {statusKeys.map((status) => {
                return (
                  <StateBadge key={status + 'state'} status={status} onClick={() => setCount((prev) => (prev += 1))}>
                    {status}
                  </StateBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>StateBadge - status 로 색 지정 시, with Icon</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {statusKeys.map((status) => {
                return (
                  <StateBadge
                    key={status + 'stateWithIcon'}
                    status={status}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    <AlertCircleIcon size={'small'} />
                    {status}
                  </StateBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>StateBadge - status 로 색 지정 시, only Icon</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {statusKeys.map((status) => {
                return (
                  <StateBadge
                    key={status + 'stateWithIcon'}
                    status={status}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    <AlertTriangleFilledIcon size={'small'} />
                  </StateBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>StateBadge - isBtn</h5>
            <div className={'flex flex-row gap-3 items-center'}>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={true} 일 때`}</h6>
                <StateBadge isBtn status={'complete'}>
                  {true.toString()}
                </StateBadge>
                <StateBadge isBtn status={'complete'}>
                  <CalendarIcon size={'small'} />
                  {true.toString()}
                </StateBadge>
              </div>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={false} 일 때`}</h6>
                <StateBadge status={'boundary'}>{false.toString()}</StateBadge>
                <StateBadge status={'boundary'}>
                  <CalendarIcon size={'small'} />
                  {false.toString()}
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h3 className={'text-juiText-primary text-2xl font-bold'}>ScoringBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            ScoringBadge 는 variant가 scoring 로 고정이며, score, scoreVal, children 이 필수값, maxVal, icon,
            iconPosition 이 옵션값이며 이들만 받을 수 있고, children는 문자열만 받을 수 있습니다.
            <br />
            Icon을 받을 수 있고 iconPosition은 &#39;left&#39; 혹은 &#39;right&#39; 로 위치 조정이 가능합니다.
            기본적으로는 &#39;left&#39;입니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>CountBadge - score 별(scoreVal Only)</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {scoreKeys.map((score) => {
                return (
                  <ScoringBadge
                    key={score + 'scoring'}
                    score={score}
                    scoreVal={count}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    {score}
                  </ScoringBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - 음수, 소수점</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              <ScoringBadge score={'practice'} scoreVal={-count} onClick={() => setCount((prev) => (prev += 1))}>
                {'음수'}
              </ScoringBadge>
              <ScoringBadge score={'scoreAlert'} scoreVal={count / 2} onClick={() => setCount((prev) => (prev += 1))}>
                {'소수점'}
              </ScoringBadge>
            </div>
            <h5 className={'text-base font-bold'}>
              ScoringBadge - score 별(with maxVal)<span className={'block text-xs'}>현재 maxVal : {MAX_VAL}</span>
            </h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {scoreKeys.map((score) => {
                return (
                  <ScoringBadge
                    key={score + 'scoring-w-max'}
                    score={score}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    {score}
                  </ScoringBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - score 별(with maxVal and Icon) : left</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {scoreKeys.map((score) => {
                return (
                  <ScoringBadge
                    key={score + 'scoringWithIconLeft'}
                    score={score}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    icon={<AlertCircleIcon size={'small'} />}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    {score}
                  </ScoringBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - score 별(with maxVal and Icon) : right</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {scoreKeys.map((score) => {
                return (
                  <ScoringBadge
                    key={score + 'scoringWithIconRight'}
                    score={score}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    icon={<AlertCircleIcon size={'small'} />}
                    iconPosition={'right'}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    {score}
                  </ScoringBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - isBtn(with maxVal)</h5>
            <div className={'flex flex-row gap-3 items-center'}>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={true} 일 때`}</h6>
                <ScoringBadge
                  isBtn
                  score={'veryLow'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'veryLow'}
                </ScoringBadge>
                <ScoringBadge
                  isBtn
                  score={'veryHigh'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'veryHigh'}
                </ScoringBadge>
                <ScoringBadge
                  isBtn
                  score={'normal'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'normal'}
                </ScoringBadge>
                <ScoringBadge
                  isBtn
                  score={'scoreAlert'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'scoreAlert'}
                </ScoringBadge>
              </div>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={false} 일 때`}</h6>
                <ScoringBadge
                  score={'veryLow'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'veryLow'}
                </ScoringBadge>
                <ScoringBadge
                  score={'veryHigh'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'veryHigh'}
                </ScoringBadge>
                <ScoringBadge
                  score={'normal'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'normal'}
                </ScoringBadge>
                <ScoringBadge
                  score={'scoreAlert'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  {'scoreAlert'}
                </ScoringBadge>
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h3 className={'text-juiText-primary text-2xl font-bold'}>GradeBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            GradeBadge 는 variant가 grading 로 고정이며, grade, children가 필수값이며 이들만 받을 수 있고, children는
            `string` 으로만 받을 수 있습니다.
            <br />
            Icon은 grade에 따라 mapping이 되어 있고 위치도 고정입니다. 기본값은 &#39;info&#39;입니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>GradeBadge - grade 별</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {gradeKeys.map((grade) => {
                return (
                  <GradeBadge key={grade + 'grade'} grade={grade}>
                    {grade}
                  </GradeBadge>
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>
              - isBtn의 예시들
              <strong className={'block text-sm font-bold'}>
                GradeBadge 의 경우 isBtn 을 했을 때의 변화는 다른 Badge와 조금 다를 수 있습니다.
              </strong>
            </h5>
            <div className={'flex flex-col gap-3 items-start'}>
              <h6 className={'text-base'}>{`isBtn={true} 일 때`}</h6>
              <div className={'flex flex-row gap-3 '}>
                {gradeKeys.map((grade) => {
                  return (
                    <GradeBadge isBtn key={grade + 'isBtnTrue'} grade={grade}>
                      {grade}
                    </GradeBadge>
                  );
                })}
              </div>
              <h6 className={'text-base'}>{`isBtn={false} 일 때`}</h6>
              <div className={'flex flex-row gap-3 '}>
                {gradeKeys.map((grade) => {
                  return (
                    <GradeBadge key={grade + 'isBtnFalse'} grade={grade}>
                      {grade}
                    </GradeBadge>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h3 className={'text-juiText-primary text-2xl font-bold'}>CountBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            CountBadge 는 variant가 count 로 고정이며, color, scoreVal가 필수값, maxVal이 옵션값이며 이들만 받을 수
            있고, children는 받을 수 없습니다.
            <br />
            Icon을 받을 수 있고 iconPosition은 &#39;left&#39; 혹은 &#39;right&#39; 로 위치 조정이 가능합니다.
            기본적으로는 &#39;left&#39;입니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>CountBadge - color 별(scoreVal Only)</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {combinedKeys.map((status) => {
                return (
                  <CountBadge
                    key={status + 'count'}
                    color={status}
                    scoreVal={count}
                    onClick={() => setCount((prev) => (prev += 1))}
                  />
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - 음수, 소수점, 커스텀 색상(&#39;bg-lime-400&#39;)</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              <CountBadge color={'practice'} scoreVal={-count} onClick={() => setCount((prev) => (prev += 1))} />
              <CountBadge color={'urgency'} scoreVal={count / 2} onClick={() => setCount((prev) => (prev += 1))} />
              <CountBadge color={'bg-lime-400'} scoreVal={count / 2} onClick={() => setCount((prev) => (prev += 1))} />
            </div>
            <h5 className={'text-base font-bold'}>
              CountBadge - color 별(with maxVal)<span className={'block text-xs'}>현재 maxVal : {MAX_VAL}</span>
            </h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {combinedKeys.map((status) => {
                return (
                  <CountBadge
                    key={status + 'state-w-max'}
                    color={status}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    onClick={() => setCount((prev) => (prev += 1))}
                  />
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - color 별(with maxVal and Icon) : left</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {combinedKeys.map((status) => {
                return (
                  <CountBadge
                    key={status + 'stateWithIconLeft'}
                    color={status}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    icon={<AlertCircleIcon size={'small'} />}
                    onClick={() => setCount((prev) => (prev += 1))}
                  />
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - color 별(with maxVal and Icon) : right</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {combinedKeys.map((status) => {
                return (
                  <CountBadge
                    key={status + 'stateWithIconRight'}
                    color={status}
                    scoreVal={count}
                    maxVal={MAX_VAL}
                    icon={<AlertCircleIcon size={'small'} />}
                    iconPosition={'right'}
                    onClick={() => setCount((prev) => (prev += 1))}
                  />
                );
              })}
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - isBtn(with maxVal)</h5>
            <div className={'flex flex-row gap-3 items-center'}>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={true} 일 때`}</h6>
                <CountBadge
                  isBtn
                  color={'info'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  isBtn
                  color={'info'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  isBtn
                  color={'info'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  isBtn
                  color={'info'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
              </div>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={false} 일 때`}</h6>
                <CountBadge
                  color={'complete'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  color={'complete'}
                  scoreVal={count}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  color={'complete'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  iconPosition={'right'}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
                <CountBadge
                  color={'complete'}
                  scoreVal={count}
                  maxVal={MAX_VAL}
                  icon={<AlertCircleIcon size={'small'} />}
                  onClick={() => setCount((prev) => (prev += 1))}
                />
              </div>
            </div>
          </div>
        </div>
        <Line />
        <h3 className={'text-juiText-primary text-2xl font-bold'}>TextBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            TextBadge 는 variant가 text 로 고정이며, children 이 필수값, textOnly, onClick 이 옵션값이며 이들만 받을 수
            있고, children은 문자열만 가능합니다. textOnly 의 기본값은 false입니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>TextBadge - Default</h5>
            <div className={'flex flex-col gap-2.5'}>
              <TextBadge onClick={() => alert('click TextBadge SHORT_STR!')}>{SHORT_STR}</TextBadge>
              <TextBadge onClick={() => alert('click TextBadge LONG_STR!')}>{LONG_STR}</TextBadge>
            </div>
            <h5 className={'text-base font-bold'}>TextBadge - textOnly(true)</h5>
            <div className={'flex flex-col gap-2.5'}>
              <TextBadge textOnly={true}>{SHORT_STR}</TextBadge>
              <TextBadge textOnly={true}>{LONG_STR}</TextBadge>
            </div>
            <h5 className={'text-base font-bold'}>TextBadge - isBtn</h5>
            <div className={'flex flex-row gap-3 items-center'}>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={true} 일 때`}</h6>
                <TextBadge isBtn onClick={() => alert('click TextBadge!')}>
                  {true.toString()}
                </TextBadge>
                <TextBadge isBtn textOnly={true}>
                  {true.toString()}
                </TextBadge>
              </div>
              <div className={'flex flex-col gap-3 '}>
                <h6 className={'text-base'}>{`isBtn={false} 일 때`}</h6>
                <TextBadge onClick={() => alert('click TextBadge!')}>{false.toString()}</TextBadge>
                <TextBadge textOnly={true}>{false.toString()}</TextBadge>
              </div>
            </div>
          </div>
        </div>
        <Line />
      </div>
    </section>
  );
}
