import { Link } from '@inertiajs/react'
import React from 'react'

export default function Pagination({ links }) {
    return (
        <nav className='text-center mt-4'>
            {links.map((link, index) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={'inline-block py-2 px-3 rounded-lg text-gray-500 text-xs ' +
                        (link.active ? 'bg-gray-200 ' : ' ') +
                        (!link.url ? '!text-gray-500 cursor-not-allowed opacity-50 ' : 'hover:bg-gray-200')
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}>

                </Link>
            ))}
        </nav>
    )
}
