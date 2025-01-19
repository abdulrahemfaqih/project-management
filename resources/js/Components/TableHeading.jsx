import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import React from 'react'

export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChange = () => { },
    children
}) {
    return (
        <th onClick={e => sortChange(name)} className='px-3 py-3 '>
            <div className='flex justify-between items-center gap-1 cursor-pointer'>
                {children}
                {
                    sortable && (
                        <div>
                            <ChevronUpIcon className={"w-4 text-gray-500 " + ((sort_field === name && sort_direction === 'asc') ? "!text-black" : "")} />
                            <ChevronDownIcon className={"w-4 -mt-1 text-gray-500  " + ((sort_field === name && sort_direction === 'desc') ? "!text-black" : "")} />
                        </div>
                    )
                }
            </div>
        </th>
    )
}
