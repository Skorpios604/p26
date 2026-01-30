'use client';

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence,
} from 'framer-motion';
import {
    Children,
    cloneElement,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { cn } from '../../lib/utils';

const DOCK_WIDTH = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_WIDTH = 64;

type DockProps = {
    children: React.ReactNode;
    className?: string;
    distance?: number;
    panelWidth?: number;
    magnification?: number;
    spring?: SpringOptions;
};
type DockItemProps = {
    className?: string;
    children: React.ReactNode;
};
type DockLabelProps = {
    className?: string;
    children: React.ReactNode;
};
type DockIconProps = {
    className?: string;
    children: React.ReactNode;
};

type DocContextType = {
    mouseY: MotionValue;
    spring: SpringOptions;
    magnification: number;
    distance: number;
};
type DockProviderProps = {
    children: React.ReactNode;
    value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
    return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
    const context = useContext(DockContext);
    if (!context) {
        throw new Error('useDock must be used within an DockProvider');
    }
    return context;
}

function VerticalDock({
    children,
    className,
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = DEFAULT_MAGNIFICATION,
    distance = DEFAULT_DISTANCE,
    panelWidth = DEFAULT_PANEL_WIDTH,
}: DockProps) {
    const mouseY = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxWidth = useMemo(() => {
        return Math.max(DOCK_WIDTH, magnification + magnification / 2 + 4);
    }, [magnification]);

    const widthColumn = useTransform(isHovered, [0, 1], [panelWidth, maxWidth]);
    const width = useSpring(widthColumn, spring);

    return (
        <motion.div
            style={{
                width: width,
                scrollbarWidth: 'none',
            }}
            className='h-full flex items-end flex-col'
        >
            <motion.div
                onMouseMove={({ clientY }) => {
                    isHovered.set(1);
                    mouseY.set(clientY);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseY.set(Infinity);
                }}
                className={cn(
                    'flex flex-col gap-4 rounded-2xl bg-gray-50 py-4 dark:bg-neutral-900',
                    className
                )}
                style={{ width: width }}
                role='toolbar'
                aria-label='Application dock'
            >
                <DockProvider value={{ mouseY, spring, distance, magnification }}>
                    {children}
                </DockProvider>
            </motion.div>
        </motion.div>
    );
}

function VerticalDockItem({ children, className }: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { distance, magnification, mouseY, spring } = useDock();

    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseY, (val) => {
        const domRect = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
        return val - domRect.y - domRect.height / 2;
    });

    const sizeTransform = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [40, magnification, 40]
    );

    const size = useSpring(sizeTransform, spring);

    return (
        <motion.div
            ref={ref}
            style={{ width: size, height: size }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            className={cn(
                'relative inline-flex items-center justify-center',
                className
            )}
            tabIndex={0}
            role='button'
            aria-haspopup='true'
        >
            {Children.map(children, (child) =>
                cloneElement(child as React.ReactElement, { width: size, isHovered } as any)
            )}
        </motion.div>
    );
}

function VerticalDockLabel({ children, className, ...rest }: DockLabelProps) {
    const restProps = rest as Record<string, unknown>;
    const isHovered = restProps['isHovered'] as MotionValue<number>;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', (latest) => {
            setIsVisible(latest === 1);
        });

        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: -10 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        'absolute right-full top-1/2 w-fit -translate-y-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
                        className
                    )}
                    role='tooltip'
                    style={{ marginRight: '10px' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function VerticalDockIcon({ children, className, ...rest }: DockIconProps) {
    const restProps = rest as Record<string, unknown>;
    const width = restProps['width'] as MotionValue<number>;

    const widthTransform = useTransform(width, (val) => val / 2);

    return (
        <motion.div
            style={{ width: widthTransform, height: widthTransform }}
            className={cn('flex items-center justify-center', className)}
        >
            {children}
        </motion.div>
    );
}

export { VerticalDock, VerticalDockIcon, VerticalDockItem, VerticalDockLabel };
