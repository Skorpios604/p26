import {
    BookOpen,
    FileText,
    Github,
    Home,
    Linkedin,
} from 'lucide-react';
import resumeUrl from '../assets/3Resume.pdf';
import { Link } from 'react-router-dom';

import { VerticalDock, VerticalDockIcon, VerticalDockItem, VerticalDockLabel } from './ui/vertical-dock';

const data = [
    {
        title: 'Home',
        icon: (
            <Home className='h-full w-full text-fuchsia-500 dark:text-fuchsia-400' />
        ),
        href: '/',
        external: false,
    },
    {
        title: 'LinkedIn',
        icon: (
            <Linkedin className='h-full w-full text-fuchsia-500 dark:text-fuchsia-400' />
        ),
        href: 'https://www.linkedin.com/in/monzermourad/',
        external: true,
    },
    {
        title: 'GitHub',
        icon: (
            <Github className='h-full w-full text-fuchsia-500 dark:text-fuchsia-400' />
        ),
        href: 'https://github.com/Skorpios604',
        external: true,
    },
    {
        title: 'Blog',
        icon: (
            <BookOpen className='h-full w-full text-fuchsia-500 dark:text-fuchsia-400' />
        ),
        href: '/blog',
        external: false,
    },
    {
        title: 'Resume',
        icon: (
            <FileText className='h-full w-full text-fuchsia-500 dark:text-fuchsia-400' />
        ),
        href: resumeUrl,
        external: true,
    },
];

export function AppleStyleVerticalDock() {
    return (
        <div className='fixed right-4 top-1/2 -translate-y-1/2 z-50'>
            <VerticalDock className='items-end bg-transparent dark:bg-transparent'>
                {data.map((item, idx) => (
                    item.external ? (
                        <a
                            key={idx}
                            href={item.href}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <VerticalDockItem
                                className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
                            >
                                <VerticalDockLabel>{item.title}</VerticalDockLabel>
                                <VerticalDockIcon>{item.icon}</VerticalDockIcon>
                            </VerticalDockItem>
                        </a>
                    ) : (
                        <Link
                            key={idx}
                            to={item.href}
                            onClick={() => {
                                if (item.href === '/') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                        >
                            <VerticalDockItem
                                className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
                            >
                                <VerticalDockLabel>{item.title}</VerticalDockLabel>
                                <VerticalDockIcon>{item.icon}</VerticalDockIcon>
                            </VerticalDockItem>
                        </Link>
                    )
                ))}
            </VerticalDock>
        </div>
    );
}
