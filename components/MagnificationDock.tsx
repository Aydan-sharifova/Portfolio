'use client';

import { motion, MotionValue, useMotionValue, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import React, { useRef, useState } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type DockProps = {
  items: DockItemData[];
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

function DockItem({ item, mouseX, distance, baseItemSize, magnification, spring }: {
  item: DockItemData;
  mouseX: MotionValue<number>;
  distance: number;
  baseItemSize: number;
  magnification: number;
  spring: SpringOptions;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseDistance = useTransform(mouseX, value => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return distance;
    return value - rect.left - rect.width / 2;
  });
  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="dock-item"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={item.onClick}
      aria-label={item.label}
    >
      {item.icon}
      {hovered && <motion.span className="dock-tooltip" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: -7 }} exit={{ opacity: 0 }}>{item.label}</motion.span>}
    </motion.button>
  );
}

export function MagnificationDock({
  items,
  distance = 160,
  baseItemSize = 44,
  magnification = 66,
  spring = { mass: 0.12, stiffness: 170, damping: 14 },
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.nav
      className="magnification-dock"
      onMouseMove={({ clientX }) => mouseX.set(clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      aria-label="Quick section navigation"
    >
      {items.map(item => <DockItem key={item.label} item={item} mouseX={mouseX} distance={distance} baseItemSize={baseItemSize} magnification={magnification} spring={spring} />)}
    </motion.nav>
  );
}
