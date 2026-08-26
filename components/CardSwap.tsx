'use client';

import gsap from 'gsap';
import React, { Children, cloneElement, forwardRef, isValidElement, ReactElement, ReactNode, useEffect, useMemo, useRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass = '', className = '', ...rest }, ref) => (
  <div ref={ref} {...rest} className={`swap-card ${customClass} ${className}`.trim()} />
));
Card.displayName = 'Card';

export function CardSwap({ children, delay = 4200, cardDistance = 34, verticalDistance = 30, pauseOnHover = true, onCardClick }: {
  children: ReactNode;
  delay?: number;
  cardDistance?: number;
  verticalDistance?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
}) {
  const cards = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo(() => cards.map(() => React.createRef<HTMLDivElement>()), [cards.length]);
  const order = useRef(cards.map((_, index) => index));
  const timer = useRef<number | null>(null);
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const place = (element: HTMLElement, slot: number, immediate = false) => {
      const vars = { x: slot * cardDistance, y: -slot * verticalDistance, z: -slot * 55, rotateY: slot * -1.4, zIndex: cards.length - slot };
      return immediate ? gsap.set(element, vars) : gsap.to(element, { ...vars, duration: 1.1, ease: 'elastic.out(.65,.9)' });
    };
    refs.forEach((ref, index) => ref.current && place(ref.current, index, true));
    const swap = () => {
      const [front, ...rest] = order.current;
      const frontElement = refs[front]?.current;
      if (!frontElement || order.current.length < 2) return;
      const timeline = gsap.timeline();
      activeTimeline.current = timeline;
      timeline.to(frontElement, { y: '+=430', opacity: .15, duration: .65, ease: 'power2.in' });
      rest.forEach((index, slot) => {
        const element = refs[index]?.current;
        if (element) timeline.add(place(element, slot), slot === 0 ? '-=.35' : '<.08');
      });
      timeline.set(frontElement, { zIndex: 0, opacity: 1 }).add(place(frontElement, cards.length - 1), '-=.75').call(() => { order.current = [...rest, front]; });
    };
    const start = () => { timer.current = window.setInterval(swap, delay); };
    const stop = () => { if (timer.current) window.clearInterval(timer.current); timer.current = null; };
    start();
    const node = container.current;
    const pause = () => { stop(); activeTimeline.current?.pause(); };
    const resume = () => { activeTimeline.current?.play(); start(); };
    if (pauseOnHover && node) { node.addEventListener('mouseenter', pause); node.addEventListener('mouseleave', resume); }
    return () => { stop(); activeTimeline.current?.kill(); if (node) { node.removeEventListener('mouseenter', pause); node.removeEventListener('mouseleave', resume); } };
  }, [cards.length, cardDistance, delay, pauseOnHover, refs, verticalDistance]);

  return <div ref={container} className="card-swap" aria-label="Featured project carousel">
    {cards.map((child, index) => isValidElement<CardProps>(child) ? cloneElement(child, {
      key: index,
      ref: refs[index],
      onClick: event => { child.props.onClick?.(event); onCardClick?.(index); },
    } as CardProps & React.RefAttributes<HTMLDivElement>) : child)}
  </div>;
}
