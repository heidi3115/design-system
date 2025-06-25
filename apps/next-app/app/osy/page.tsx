'use client';

import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';
import {
  Avatar,
  AvatarContents,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
  Separator,
  separatorVariants,
} from '@common/ui';
import { CornerDownLeftIcon, InfoIcon, RotateIcon } from '@common/ui/icons';
import { useRef } from 'react';

const Line = () => <hr className={'mt-4 mb-4 text-juiText-primary'} style={{ width: '100%', height: '2px' }} />;

export default function CommonOsyPage() {
  const wrapperRef = useRef(null);

  return (
    <main className={'relative w-full'}>
      <div>
        <Button asChild variant={'transparent'} size={'large'}>
          <Link href="/" title={'to main'}>
            <CornerDownLeftIcon size={'small'} /> to main
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <section className={'flex flex-col items-center justify-center w-full'} ref={wrapperRef}>
        <div className={'flex flex-col gap-4 items-center justify-center w-4/5'}>
          <div className={'flex flex-col gap-4 w-3/5'}>
            <div className={'flex flex-col gap-4'}>
              <h2 className={'text-juiText-blue text-3xl font-bold'}>Hover Card</h2>
              <div className={'flex flex-col gap-4'}>
                <h3 className={'my-3 text-base'}>HoverCard Tests</h3>
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex flex-col gap-2'}>
                    <span className={'text-juiText-blue text-base font-bold'}>HoverCard Parts</span>
                    <div className={'flex flex-row gap-3'}>
                      <HoverCardRoot>
                        <HoverCardTrigger>Hover</HoverCardTrigger>
                        <HoverCardContent>The React Framework – created and maintained by @vercel.</HoverCardContent>
                      </HoverCardRoot>
                    </div>
                  </div>
                  <div className={'flex flex-col gap-2'}>
                    <span className={'text-juiText-blue text-base font-bold'}>HoverCard custom</span>
                    <div className={'flex flex-row gap-3'}>
                      <HoverCard
                        size={'small'}
                        variant={'primary'}
                        side={'bottom'}
                        // cardSrc={'wrong.png'}
                        trigger={<Button variant="transparentGrey">@nextJs without cardSrc</Button>}>
                        <h4 className="text-sm font-semibold">@nextJs</h4>
                        <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                        <div className="text-muted-foreground text-xs">Joined December 2021</div>
                      </HoverCard>
                      <HoverCard
                        size={'large'}
                        variant={'transparent'}
                        open={true}
                        trigger={<InfoIcon size={'large'} />}>
                        <div className={'flex flex-row items-center gap-3'}>
                          <Avatar src={'https://github.com/vercel.png'} shape={'square'} />
                          <div className={'flex-col items-center justify-between'}>
                            <h4 className="text-sm font-semibold">@nextJs</h4>
                            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                            <div className="text-muted-foreground text-xs">Joined December 2021</div>
                          </div>
                        </div>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Line />
            <h2 className={'text-juiText-blue text-3xl font-bold text-center'}>Avatar</h2>
            <div className={'flex flex-row gap-10 [&>div]:flex-1'}>
              <div className={'flex flex-col gap-4'}>
                <h3 className={'my-3 text-xl font-bold'}>Default (shape:round)</h3>
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex flex-col gap-4'}>
                    <span className={'text-juiText-blue text-base font-bold'}>default</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'Default test'} />
                      <Avatar src={'./test.png'} fallback={'Default test'} />
                      <Avatar src={'./test.png'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>small</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'small'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'small'} />
                      <Avatar src={'./test.png'} size={'small'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>basic</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'basic'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'basic'} />
                      <Avatar src={'./test.png'} size={'basic'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>medium</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'medium'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'medium'} />
                      <Avatar src={'./test.png'} size={'medium'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>large</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'large'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'large'} />
                      <Avatar src={'./test.png'} size={'large'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-4'}>
                <h3 className={'my-3 text-xl font-bold'}>Square</h3>
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex flex-col gap-4'}>
                    <span className={'text-juiText-blue text-base font-bold'}>default - shape: square</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} shape={'square'} />
                      <Avatar src={'./test.png'} fallback={'test'} shape={'square'} />
                      <Avatar src={'./test.png'} shape={'square'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>small - shape: square</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'small'} shape={'square'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'small'} shape={'square'} />
                      <Avatar src={'./test.png'} size={'small'} shape={'square'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>basic - shape: square</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'basic'} shape={'square'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'basic'} shape={'square'} />
                      <Avatar src={'./test.png'} size={'basic'} shape={'square'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>medium - shape: square</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'medium'} shape={'square'} />
                      <Avatar src={'./test.png'} fallback={'test'} size={'medium'} shape={'square'} />
                      <Avatar src={'./test.png'} size={'medium'} shape={'square'} />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>large - shape: square</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar
                        src={
                          'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
                        }
                        fallback={'web test'}
                        size={'large'}
                        shape={'square'}
                      />
                      <Avatar
                        src={'/images/avatar-slack.png'}
                        fallback={'square slack test'}
                        size={'large'}
                        shape={'square'}
                      />
                      <Avatar src={'./test.png'} fallback={'test.png test'} size={'large'} shape={'square'} />
                      <Avatar src={'./test.png'} size={'large'} shape={'square'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={'flex flex-row gap-10 [&>div]:flex-1'}>
              <div className={'flex flex-col gap-4'}>
                <h3 className={'my-3 text-xl font-bold'}>asChild</h3>
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex flex-col gap-4'}>
                    <span className={'text-juiText-blue text-base font-bold'}>asChild - Button</span>
                    <div className={'flex flex-col gap-3'}>
                      <Avatar
                        src={
                          'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80'
                        }
                        fallback={'web asChild Button test fallback'}
                        asChild={true}>
                        <Button>[url]basic Button test</Button>
                      </Avatar>
                      <Avatar
                        src={'/images/avatar-jira.png'}
                        fallback={'avatar-jira.png: basic Button test fallback'}
                        asChild={true}>
                        <Button>basic Button test</Button>
                      </Avatar>
                      <Avatar
                        src={'/images/avatar-jira.png'}
                        fallback={'avatar-jira.png: basic Button test fallback'}
                        asChild={true}>
                        <Button>
                          <RotateIcon size={'small'} />
                          Rotate
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'avatar-jira.png: basic Button test fallback'}
                        asChild={true}>
                        <Button>basic Button test</Button>
                      </Avatar>

                      <Button variant={'gradient'}>Real Button test</Button>

                      {/*<Avatar src={'./test.png'} fallback={'test'} asChild={true} size={'fit'} />*/}

                      {/* Avatar에  https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80 */}

                      <Avatar src={''} asChild={true} size={'large'}>
                        <Button variant={'primary'}>
                          <AvatarContents
                            src={
                              'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=256&h=256&dpr=2&q=100'
                            }></AvatarContents>
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'/images/avatar-kakaotalk.png'}
                        fallback={'kakaotalk img AvatarContents fallback'}
                        asChild={true}>
                        <Button variant={'error'}>
                          <AvatarContents src={'/images/avatar-kakaotalk.png'} />
                          kakaotalk
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'/images/avatar-kakaotalk.png'}
                        fallback={'kakaotalk img AvatarContents fallback'}
                        asChild={true}
                        size={'fit'}>
                        <Button variant={'default'}>
                          <AvatarContents src={'/images/avatar-kakaotalk.png'} />
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong AvatarContents test fallback parent1'}
                        asChild={true}
                        size={'fit'}>
                        <Button variant={'error'} disabled={true}>
                          <AvatarContents src={'./test.png'} size={'fit'} />
                          both fit
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong AvatarContents test fallback parent Button'}
                        asChild={true}
                        size={'fit'}>
                        <Button variant={'error'}>
                          <AvatarContents src={'./test.png'} />
                          Avatar fit
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong AvatarContents test fallback parent Button'}
                        asChild={true}>
                        <Button variant={'error'} size={'large'}>
                          <AvatarContents src={'./test.png'} size={'fit'} />
                          AvatarContents fit
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong AvatarContents size small'}
                        asChild={true}
                        size={'fit'}>
                        <Button variant={'error'} disabled={true} size={'small'}>
                          AvatarContents child small
                          <AvatarContents src={'./test.png'} size={'fit'} />
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong AvatarContents test fallback parent small'}
                        asChild={true}
                        size={'fit'}>
                        {/*className={'w-[300px] h-[35px]'}*/}
                        <Button variant={'error'} disabled={false} size={'large'}>
                          <AvatarContents src={'./test.png'} />
                          AvatarContents Avatar size=small
                        </Button>
                      </Avatar>
                      <Avatar
                        src={'./test.png'}
                        fallback={'wrong img AvatarContents fallback parent'}
                        shape={'square'}
                        asChild={true}>
                        <Button variant={'error'} disabled={true} className={'text-red-700'}>
                          <AvatarContents
                            src={'./test.png'}
                            fallback={'wrong img AvatarContents fallback child'}
                            className={'text-lime-500'}
                          />
                        </Button>
                      </Avatar>
                      <Avatar src={'./test.png'} asChild={true}>
                        <Button variant={'error'} disabled={true}>
                          <AvatarContents src={'./test.png'} fallback={'wrong img AvatarContents fallback child'} />
                        </Button>
                      </Avatar>
                      {/*<Avatar src={'./test.png'} asChild={true} />*/}
                      {/* 아래처럼 하면 Error: `AvatarImage` must be used within `Avatar` 에러남 */}
                      {/*<Button variant={'default'}>*/}
                      {/*  <AvatarContents src={'/images/avatar-kakaotalk.png'}>kakaotalk</AvatarContents>*/}
                      {/*</Button>*/}
                    </div>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-4'}>
                <h3 className={'my-3 text-xl font-bold'}>disabled</h3>
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex flex-col gap-4'}>
                    <span className={'text-juiText-blue text-base font-bold'}>default - disabled:true</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} disabled />
                      <Avatar src={'./test.png'} fallback={'test'} disabled />
                      <Avatar src={'./test.png'} disabled />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>small - disabled:true</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'small'} disabled />
                      <Avatar src={'./test.png'} fallback={'test'} size={'small'} disabled />
                      <Avatar src={'./test.png'} size={'small'} disabled />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>basic - disabled:true</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'basic'} disabled />
                      <Avatar src={'./test.png'} fallback={'test'} size={'basic'} disabled />
                      <Avatar src={'./test.png'} size={'basic'} disabled />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>medium - disabled:true</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'medium'} disabled />
                      <Avatar src={'./test.png'} fallback={'test'} size={'medium'} disabled />
                      <Avatar src={'./test.png'} size={'medium'} disabled />
                    </div>
                    <span className={'text-juiText-blue text-base font-bold'}>large - disabled:true</span>
                    <div className={'flex flex-row gap-3'}>
                      <Avatar src={'/images/avatar-slack.png'} fallback={'test'} size={'large'} disabled />
                      <Avatar src={'./test.png'} fallback={'test'} size={'large'} disabled />
                      <Avatar src={'./test.png'} size={'large'} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={'flex flex-col gap-4'}>
              <h3 className={'my-3 text-xl font-bold'}>title</h3>
              <strong>subtitle</strong>
              <div className={'flex flex-row gap-4'}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}></span>
                  <div className={'flex flex-row gap-3'}></div>
                </div>
              </div>
            </div>
          </div>
          <Line />
          <div className={'flex flex-col gap-4 items-center justify-center w-full'}>
            <h2 className={'text-juiText-blue text-3xl font-bold'}>Separators</h2>
            <h3 className={'my-3 text-base'}>Content Title</h3>
            <strong className={'text-2xl'}>subtitle</strong>
            <div className={'flex flex-col gap-6 w-4/5'}>
              <div className={'flex flex-col gap-2 w-full'}>
                <span className={'text-juiText-blue text-base font-bold'}>SideBarTitle</span>
                <div className={'flex flex-row gap-3'}>
                  <div className={'flex flex-col gap-4 text-juiText-primary font-bold text-base'}>
                    {(
                      Object.keys(
                        separatorVariants.variants.variant,
                      ) as (keyof typeof separatorVariants.variants.variant)[]
                    ).map((variant) => (
                      <div className={'flex flex-row'} key={variant}>
                        <Separator orientation={'vertical'} variant={variant} />
                        <span className={`text-juiText-${variant}`}>{variant} : 컨텐츠 타이틀(figma 참조)</span>
                      </div>
                    ))}
                  </div>
                </div>
                <span className={'text-juiText-blue text-base font-bold'}>여러 개 분리 </span>
                <div className={'flex flex-row gap-3'}>
                  <div className={'flex flex-row text-juiText-primary font-bold text-base'}>
                    <span>컨텐츠 타이틀(figma 참조)</span>
                    <Separator orientation={'vertical'} size={'medium'} decorative={false} />
                    <span>컨텐츠 타이틀(figma 참조)</span>
                    <Separator orientation={'vertical'} size={'medium'} />
                    <span>컨텐츠 타이틀(figma 참조)</span>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-2 w-full'}>
                <span className={'text-juiText-blue text-base font-bold'}>분리선(부모가 w-full이 아닐 경우)</span>
                <div className={'flex flex-row gap-3'}>
                  <div className={'flex flex-col text-juiText-primary font-bold text-base'}>
                    <div>위 아래 분리 1</div>
                    <Separator orientation={'horizontal'} />
                    <div>위 아래 분리 2</div>
                    <Separator orientation={'horizontal'} />
                    <div>위 아래 분리 3</div>
                  </div>
                </div>
                <span className={'text-juiText-blue text-base font-bold'}>분리선(부모가 w-full 인 경우)</span>
                <div className={'flex flex-row gap-3'}>
                  <div className={'flex flex-col w-full text-juiText-primary font-bold text-base'}>
                    <div>위 아래 분리 1</div>
                    <Separator orientation={'horizontal'} />
                    <div>위 아래 분리 2</div>
                    <Separator orientation={'horizontal'} />
                    <div>위 아래 분리 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Line />
          <div className={'flex flex-col gap-4'}>
            <h2 className={'text-juiText-blue text-3xl font-bold'}>Components</h2>
            <div className={'flex flex-col gap-4'}>
              <h3 className={'my-3 text-base'}>title</h3>
              <strong>subtitle</strong>
              <div className={'flex flex-row gap-4'}>
                <div className={'flex flex-col gap-2'}>
                  <span className={'text-juiText-blue text-base font-bold'}></span>
                  <div className={'flex flex-row gap-3'}></div>
                </div>
              </div>
            </div>
          </div>
          <Line />
        </div>
      </section>
    </main>
  );
}
