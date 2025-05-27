'use client';

import { useState } from 'react';
import { badgeVariants, Button } from '@common/ui';
import { AlertCircleIcon, ArrowUpIcon, BookmarkIcon, CornerDownLeftIcon, EditIcon } from '@common/ui/icons';
import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';
import { Badge, CountBadge, GradeBadge, ScoringBadge, StateBadge, TextBadge } from '@common/ui/components/Badge';

export default function BadgePage() {
  const [count, setCount] = useState(0);
  const MAX_VAL = 99;

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
        <span className={'text-xl'}>각 badge 클릭 시 전체 숫자가 올라갑니다.</span>
        <h3 className={'text-juiText-primary text-2xl font-bold'}>Count badges : 기본 Badge</h3>
        <div className={'flex flex-row gap-2'}>
          <Badge>test</Badge>
          <Badge variant={'state'}>state test</Badge>
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
        <h3 className={'text-juiText-primary text-2xl font-bold'}>Count badges : CountBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            CountBadge 는 variant가 &#39;count&#39;로 고정이며, scoreVal 에서 숫자만 혹은 숫자 & 최대값만 입력
            가능합니다.
            <s>이는 asChild가 true일 때도 동일합니다. (스타일 고정을 위함)</s>
            <br />
            {'asChild 허용 여부 회의 필요. -> 허용.'}
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>CountBadge - color 로 색 지정 시,</h5>
            <div className={'flex flex-col gap-10 w-fit space-y-2 px-5'}>
              <h6>Absolute test</h6>
              <div className={'relative flex flex-col gap-8'}>
                <Button variant={'primary'}>Absolute Alarm btn</Button>
                <Button variant={'secondary'}>No alarm btn</Button>
                <Button variant={'default'}>No alarm btn</Button>
                <Button variant={'gradient'}>No alarm btn</Button>
                <Button variant={'secondary'}>No alarm btn</Button>
                <Button variant={'error'}>
                  Alarm btn
                  <CountBadge color={'scoreAlert'} scoreVal={12} maxVal={10} className={'absolute top-2/3 -left-1/2'} />
                </Button>
                <Button variant={'transparent'}>No alarm btn</Button>
                <CountBadge color={''} scoreVal={12} maxVal={10} className={'absolute -top-4 -right-1/4'} />
              </div>
            </div>
            <div className={'flex flex-row gap-x-2.5 items-center'}>
              <CountBadge
                color={'bg-juiScore-alert'}
                scoreVal={count}
                onClick={() => setCount((prev) => (prev += 1))}
              />
              <CountBadge
                color={'bg-juiStatus-alert'}
                scoreVal={count + MAX_VAL}
                onClick={() => setCount((prev) => (prev += 1))}
                className={'bg-juiScore-alert'}
              />
              <CountBadge
                color={'bg-juiStatus-alert'}
                scoreVal={count + MAX_VAL}
                maxVal={MAX_VAL}
                onClick={() => setCount((prev) => (prev += 1))}
              />
              <span>
                MAX_VAL({MAX_VAL})이 지정이 되어있다면 MAX_VAL 보다 크거나 같을 경우 이 이상 올라가지 않고 + 처리 가능
              </span>
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - status 로 색 지정 시,</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.status) as Array<keyof typeof badgeVariants.variants.status>).map(
                (status, idx) => {
                  return (
                    <CountBadge
                      key={status}
                      color={status}
                      scoreVal={
                        idx === Object.keys(badgeVariants.variants.status).length - 1
                          ? count + idx + 90 - 1
                          : count + idx
                      }
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>CountBadge - score 로 색 지정 시,</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.score) as Array<keyof typeof badgeVariants.variants.score>).map(
                (score, idx) => {
                  return (
                    <CountBadge
                      key={score}
                      color={score}
                      scoreVal={
                        idx === Object.keys(badgeVariants.variants.score).length - 1
                          ? count + idx + 90 - 1
                          : count + idx
                      }
                      onClick={() => setCount((prev) => (prev += 1))}
                    />
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>
              CountBadge - asChild
              <span className={'block font-bold'}>
                asChild 시 children이 더 우선되므로, scoreVal의 값 등을 살리고 싶다면 children 안에 넣어야 하고, + 등에
                대한 것도 밖에서 처리해서 children 으로 전달해야 합니다..
              </span>
            </h5>
            <div className={'flex flex-row gap-x-2.5 items-center'}>
              <div className={'flex flex-col'}>
                <h6>Link & Link with scoreVal, 내부 + 처리 한 것과 안 한 것</h6>
                <div className={'flex flex-col gap-3'}>
                  <CountBadge asChild scoreVal={count} color={'default'}>
                    test
                  </CountBadge>
                </div>
                <h6>Link & Link with scoreVal, 내부 + 처리 한 것과 안 한 것</h6>
                <div className={'flex flex-col gap-3'}>
                  <CountBadge
                    asChild
                    scoreVal={count}
                    color={'critical'}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    <Link href={'/osy/badge'}>{count}</Link>
                  </CountBadge>
                  <CountBadge
                    asChild
                    color={'critical'}
                    scoreVal={count + 90}
                    maxVal={MAX_VAL}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    <Link href={'/osy/badge'}>
                      {count + 90}
                      {' <- scoreVal 과 maxVal로 인한 +처리 안되고 무시됨.'}
                    </Link>
                  </CountBadge>
                  <CountBadge
                    asChild
                    color={'critical'}
                    scoreVal={count + 90}
                    maxVal={MAX_VAL}
                    onClick={() => setCount((prev) => (prev += 1))}>
                    <Link href={'/osy/badge'}>
                      {count + 90 >= MAX_VAL ? `${MAX_VAL} + ` : count + 90}
                      {' <- 내부 처리 해야 함'}
                    </Link>
                  </CountBadge>
                </div>
                <h6>Link with icon :</h6>
                <CountBadge asChild color={'complete'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>
                    <BookmarkIcon />
                    link
                  </Link>
                </CountBadge>
                <div className={'flex flex-col'}>
                  <h6>{`asChild={true} 임에도 자식이 없을 때`}</h6>
                  <CountBadge asChild color={''} scoreVal={count}></CountBadge>
                  <h6>{`asChild={true} 임에도 자식의 자식이 없을 때`}</h6>
                  <CountBadge asChild color={''} scoreVal={count}>
                    <Button variant={'gradient'}></Button>
                  </CountBadge>
                </div>
              </div>
              <div className={'flex flex-col'}>
                <h6>Button with no scoreVal:</h6>
                <CountBadge asChild scoreVal={count} color={'critical'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </CountBadge>
                <h6>Button with scoreVal & children(count) :</h6>
                <CountBadge asChild color={'complete'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count} test</Button>
                </CountBadge>
                <h6>Button :</h6>
                <CountBadge asChild scoreVal={count} color={'critical'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </CountBadge>
                <h6>Button with scoreVal & children :</h6>
                <CountBadge
                  asChild
                  color={'complete'}
                  scoreVal={count} // children이 우선되어 무시됨.
                  onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>button</Button>
                </CountBadge>
              </div>
            </div>
          </div>
        </div>
        <h3 className={'text-juiText-primary text-2xl font-bold'}>State badges : StateBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            StateBadge 는 variant가 state로 고정이며, status만 받을 수 있고, 텍스트 및 child만 받습니다.
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>StateBadge - status 로 색 지정 시,</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.status) as Array<keyof typeof badgeVariants.variants.status>).map(
                (status) => {
                  return (
                    <StateBadge key={status + 'state'} status={status} onClick={() => setCount((prev) => (prev += 1))}>
                      {status}
                    </StateBadge>
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>StateBadge - status 로 색 지정 시, with Icon</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.status) as Array<keyof typeof badgeVariants.variants.status>).map(
                (status) => {
                  return (
                    <StateBadge
                      key={status + 'stateWithIcon'}
                      status={status}
                      onClick={() => setCount((prev) => (prev += 1))}>
                      <AlertCircleIcon size={'small'} />
                      {status}
                    </StateBadge>
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>StateBadge - asChild</h5>
            <div className={'flex flex-row gap-x-2.5 items-center'}>
              <div className={'flex flex-col'}>
                <div className={'flex flex-col'}>
                  <h6>{`asChild={true} 임에도 자식이 없을 때`}</h6>
                  <StateBadge asChild status={'complete'}></StateBadge>
                  <h6>{`asChild={true} 임에도 자식의 자식이 없을 때`}</h6>
                  <StateBadge asChild status={'progress'}>
                    <Button variant={'gradient'}></Button>
                  </StateBadge>
                </div>
                <h6>Link :</h6>
                <StateBadge asChild status={'critical'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>{count}</Link>
                </StateBadge>
                <h6>Link with icon :</h6>
                <StateBadge asChild status={'complete'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>link</Link>
                </StateBadge>
              </div>
              <div className={'flex flex-col'}>
                <h6>Button with no scoreVal:</h6>
                <StateBadge asChild status={'critical'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </StateBadge>
                <h6>Button with scoreVal & children(count) :</h6>
                <StateBadge asChild status={'complete'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count} test</Button>
                </StateBadge>
                <h6>Button :</h6>
                <StateBadge asChild status={'critical'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </StateBadge>
                <h6>Button with children :</h6>
                <StateBadge asChild status={'complete'} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>StateBadge button</Button>
                </StateBadge>
              </div>
            </div>
          </div>
        </div>
        <h3 className={'text-juiText-primary text-2xl font-bold'}>Scoring badges : ScoringBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            ScoringBadge 는 variant가 score 로 고정이며, score 만 받을 수 있습니다. <br />
            scoreVal 는 필수(숫자만), maxVal는 옵션입니다. maxVal 지정 시 maxVal값 이상부터는 maxVal값 고정 + 표기.
            <br />
            이는 asChild가 true일 때도 동일합니다. (스타일 고정을 위함)
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>
              ScoringBadge - score 로 색 지정 시, maxVal 지정 안 된 경우와 된 경우
            </h5>
            <div className={'flex flex-row gap-x-2.5 items-center'}>
              <ScoringBadge
                score={'extra'}
                scoreVal={-count}
                // maxVal={MAX_VAL}
                onClick={() => setCount((prev) => (prev += 1))}>
                extra
              </ScoringBadge>
              {(Object.keys(badgeVariants.variants.score) as Array<keyof typeof badgeVariants.variants.score>).map(
                (score, idx) => {
                  return (
                    <div key={score + idx} className={'flex flex-col gap-3'}>
                      <ScoringBadge score={score} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                        {score}
                      </ScoringBadge>
                      <ScoringBadge score={score} scoreVal={count / 2} onClick={() => setCount((prev) => (prev += 1))}>
                        소수점
                      </ScoringBadge>
                      <ScoringBadge
                        score={score}
                        scoreVal={count + 90}
                        maxVal={MAX_VAL}
                        onClick={() => setCount((prev) => (prev += 1))}>
                        {score}
                      </ScoringBadge>
                    </div>
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - score 로 색 지정 시, with Icon</h5>
            <div className={'flex flex-row gap-x-2.5'}>
              {(Object.keys(badgeVariants.variants.score) as Array<keyof typeof badgeVariants.variants.score>).map(
                (score, idx) => {
                  return (
                    <ScoringBadge
                      key={score + idx + 'withIcon'}
                      score={score}
                      scoreVal={count}
                      onClick={() => setCount((prev) => (prev += 1))}>
                      <AlertCircleIcon size={'small'} />
                      {score}
                    </ScoringBadge>
                  );
                },
              )}
            </div>
            <h5 className={'text-base font-bold'}>ScoringBadge - asChild</h5>
            <div className={'flex flex-row gap-x-2.5 gap-y-3 items-center [&_h6]:my-4'}>
              {/* [&_h6]: space-y-4 -> h6끼리  */}
              <div className={'flex flex-col'}>
                <h6>textOnly :</h6>
                <ScoringBadge
                  asChild
                  score={'veryLow'}
                  scoreVal={count}
                  className={'ScoringBadge-text'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  text
                </ScoringBadge>
              </div>
              <div className={'flex flex-col'}>
                <h6>Link :</h6>
                <ScoringBadge asChild score={'low'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>{count}</Link>
                </ScoringBadge>
                <ScoringBadge
                  asChild
                  score={'low'}
                  scoreVal={count + 90}
                  maxVal={MAX_VAL}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>{count + 90}</Link>
                </ScoringBadge>
                <h6>Link with icon :</h6>
                <ScoringBadge asChild score={'high'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Link href={'/osy/badge'}>link</Link>
                </ScoringBadge>
              </div>
              <div className={'flex flex-col gap-2'}>
                <h6>Button with no maxVal:</h6>
                <ScoringBadge asChild score={'low'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </ScoringBadge>
                <h6>Button with scoreVal & children(count) :</h6>
                <ScoringBadge asChild score={'high'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count} test</Button>
                </ScoringBadge>
                <h6>Button :</h6>
                <ScoringBadge asChild score={'low'} scoreVal={count} onClick={() => setCount((prev) => (prev += 1))}>
                  <Button>{count}</Button>
                </ScoringBadge>
                <h6>Button with variant : button의 varitant는 undefined로 전달되도록 하여 스타일 충돌 방지</h6>
                <ScoringBadge
                  asChild
                  score={'scoreAlert'}
                  scoreVal={count}
                  className={'ScoringBadge-class'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  <Button variant={'gradient'} className={'ScoringBadge-btn-gradient'}>
                    button gradient
                  </Button>
                </ScoringBadge>
                <ScoringBadge
                  asChild
                  score={'veryLow'}
                  scoreVal={count}
                  className={'ScoringBadge-class'}
                  onClick={() => setCount((prev) => (prev += 1))}>
                  <Button variant={'primary'} className={'ScoringBadge-btn-primary-noChildren'} />
                </ScoringBadge>
                <span className={'flex'}>
                  <ArrowUpIcon size={'small'} />
                  {`ScoringBadge 에서 asChild={true}임에도 Button에 자식이 없을 경우,`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <h3 className={'text-juiText-primary text-2xl font-bold'}>Text badges : TextBadge 컴포넌트</h3>
        <div className={'flex flex-col gap-5 w-3/4 *:w-full'}>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            {`TextBadge 는 variant가 'text' 로 고정이며, 만 받을 수 있고, 텍스트 및 child만 받습니다.`}
          </h4>
          <div className={'flex flex-col gap-4'}>
            <h5 className={'text-base font-bold'}>Default</h5>
            <div className={'overflow-hidden flex flex-row flex-wrap gap-2.5 w-full'}>
              <TextBadge
                onClick={() => {
                  alert('TextBadge 클릭');
                }}>
                Name
              </TextBadge>
              <TextBadge
                onClick={() => {
                  alert('TextBadge Icon 클릭');
                }}>
                <EditIcon size={'small'} />
                현재까지 따로 길이에 대한 제약이 없으며 그냥 size-fit 으로 되어있으므로 해당에 대해 주의해주셔야 합니다.
              </TextBadge>
              <TextBadge
                onClick={() => {
                  alert('TextBadge 클릭');
                }}>
                Name
              </TextBadge>
              <TextBadge textOnly className={'w-[150px]'}>
                textOnly 짧은 text의 경우
              </TextBadge>
              <TextBadge
                onClick={() => {
                  alert('TextBadge Icon 클릭');
                }}
                textOnly>
                현재까지 따로 길이에 대한 제약이 없으며 그냥 size-fit 으로 되어있으므로 해당에 대해 주의해주셔야 합니다.
                그리고 혹시나 해서 textOnly 옵션을 추가하였습니다. 시나리오의 분류를 고려하였습니다.
                <br />
                줄바꿈은 br 태그로 가능하며 textOnly 시 onClick 동작하지 않습니다. textOnly시 자식에는 text만 들어가야
                합니다.(말줄임으로 인해 inline-block 처리됨. 말줄임표를 원하면 className 으로 width 길이를 지정하면
                됩니다. 기본적으로는 가운데 정렬에 w-fit입니다.)
              </TextBadge>
              <TextBadge textOnly className={'w-[150px]'}>
                <EditIcon size={'small'} />
                아이콘을 추가하게 되면 inline-block이 되기 때문에...
              </TextBadge>
              <TextBadge textOnly className={'w-[200px]'}>
                text-ellipsis 테스트. width는 200px 커스텀 하였습니다. textOnly 옵션은 시나리오의 분류를 고려하였습니다.
                줄바꿈은 br 태그로 가능하며 textOnly 시 onClick 동작하지 않습니다.
              </TextBadge>
            </div>
            <h5 className={'text-base font-bold'}> - ,</h5>
            <div className={'flex flex-row gap-x-2.5'}></div>
            <h5 className={'text-base font-bold'}> - with Icon</h5>
            <div className={'flex flex-row gap-x-2.5'}></div>
            <h5 className={'text-base font-bold'}> - asChild</h5>
            <div className={'flex flex-row gap-x-2.5 items-center'}>
              <div className={'flex flex-col'}>
                <h6>Link :</h6>
                <h6>Link with icon :</h6>
              </div>
              <div className={'flex flex-col'}>
                <h6>Button with no scoreVal:</h6>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <h3>Grade Badges</h3>
          <h4 className={'space-y-4 text-juiGrey-a400 text-sm text-center'}>
            {`GradeBadge 는 variant가 'grading' 로 고정이며, status 와 gradeIcon이 필수입니다. `}
          </h4>
          <div className={'flex flex-row gap-4'}>
            <div className={'flex flex-col'}>
              <h5 className={'text-base font-bold'}>Default</h5>
              <div className={'flex flex-row gap-4'}>
                <GradeBadge grade={'info'}>정보</GradeBadge>
                <GradeBadge grade={'boundary'}>주의</GradeBadge>
                <GradeBadge grade={'alert'}>경계</GradeBadge>
                <GradeBadge grade={'critical'}>심각</GradeBadge>
                <GradeBadge grade={'urgency'}>긴급</GradeBadge>
              </div>
            </div>
            <div className={'flex flex-col'}>
              <h5 className={'text-base font-bold'}>{'asChild -> button'}</h5>
              <div className={'flex flex-row gap-4'}>
                <GradeBadge asChild={true} grade={'info'}>
                  <Button>정보1</Button>
                </GradeBadge>
                <GradeBadge asChild={true} grade={'boundary'}>
                  <Button>주의2</Button>
                </GradeBadge>
                <GradeBadge asChild={true} grade={'alert'}>
                  <Button>경계3</Button>
                </GradeBadge>
                <GradeBadge asChild={true} grade={'critical'}>
                  <Button>심각4</Button>
                </GradeBadge>
                <GradeBadge asChild={true} grade={'urgency'}>
                  <Button>긴급5</Button>
                </GradeBadge>
              </div>
            </div>
          </div>
          <div className={'flex flex-row gap-4'}>
            <div>flex-row1</div>
            <div>flex-row2</div>
          </div>
          <div className={'flex flex-row gap-4'}>
            <div>flex-row1</div>
            <div>flex-row2</div>
          </div>
        </div>
        <div className={'flex flex-col gap-5'}>
          <h3>title</h3>
          <div className={'flex flex-row gap-4'}>
            <div>flex-row1</div>
            <div>flex-row2</div>
          </div>
        </div>
      </div>
    </section>
  );
}
