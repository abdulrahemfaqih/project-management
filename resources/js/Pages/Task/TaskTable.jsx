import TableHeading from '@/Components/TableHeading'
import { router, Link } from '@inertiajs/react'
import React, { Fragment } from 'react'
import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant.jsx'

export default function TaskTable({ tasks, queryParams = null, context = "task", hideProjectColumn = false }) {
    queryParams = queryParams || {}
    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        if (context == "task") {
            router.get(route('task.index'), queryParams, {
                preserveScroll: true
            })
        } else if (context == "project") {
            router.get(route('project.show', { id: queryParams.project_id }), queryParams, {
                preserveScroll: true
            })
        }
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return
        searchFieldChange(name, e.target.value)
    }

    const sortChange = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction == "asc") {
                queryParams.sort_direction = "desc"
            } else {
                queryParams.sort_direction = "asc"
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = "asc"
        }

        if (context == "task") {
            router.get(route('task.index'), queryParams, {
                preserveScroll: true
            })
        } else if (context == "project") {
            router.get(route('project.show', { id: queryParams.project_id }), queryParams, {
                preserveScroll: true
            })
        }
    }
    return (
        <Fragment>
            <div className='overflow-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase border-b-2 bg-gray-50 border-gray-500'>
                        <tr className='text-nowrap'>
                            <TableHeading
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                name="id"
                                sortChange={sortChange}
                            >
                                ID
                            </TableHeading>
                            <th className='px-3 py-3'>Image</th>
                            {!hideProjectColumn &&
                                <th className='px-3 py-3'>Project Name</th>
                            }
                            <TableHeading
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                name="name"
                                sortChange={sortChange}
                            >
                                Name
                            </TableHeading>

                            <TableHeading
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                name="status"
                                sortChange={sortChange}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                name="created_at"
                                sortChange={sortChange}
                            >
                                Created Date
                            </TableHeading>
                            <TableHeading
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                name="due_date"
                                sortChange={sortChange}
                            >
                                Due Date
                            </TableHeading>
                            <th className='px-3 py-3'>Created By</th>
                            <th className='px-3 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <thead className='text-xs text-gray-700 uppercase border-b-2 bg-gray-50 border-gray-500'>
                        <tr className='text-nowrap'>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            {!hideProjectColumn && <th className='px-3 py-3'></th>}
                            <th className='px-3 py-3'>
                                <TextInput className='w-full' placeholder="Task Name"
                                    defaultValue={queryParams.name}
                                    onBlur={e => searchFieldChange('name', e.target.value)}
                                    onKeyPress
                                    ={e => onKeyPress('name', e)}
                                />
                            </th>
                            <th className='px-3 py-3'>
                                <SelectInput className='w-full'
                                    defaultValue={queryParams.status}
                                    onChange={e => searchFieldChange('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3'></th>
                            <th className='px-3 py-3 text-right'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data && tasks.data.length > 0 ? (
                            tasks.data.map(task => (

                                <tr className='bg-white border-b' key={task.id}>
                                    <th className='px-3 py-2'>{task.id}</th>
                                    <td className='px-3 py-2 w-28 h-28 object-cover'>
                                        <img src={task.image_path} />
                                    </td>
                                    <td className='px-3 py-2'>{task.name}</td>
                                    {!hideProjectColumn && <td className='px-3 py-2'>{task.project.name}</td>}
                                    <td className='px-3 py-2'>
                                        <span className={"px-2 py-1 rounded " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                    </td>
                                    <td className='px-3 py-2 text-nowrap'>{task.created_at}</td>
                                    <td className='px-3 py-2 text-nowrap'>{task.due_date}</td>
                                    <td className='px-3 py-2'>{task.createdBy.name}</td>
                                    <td className='px-3 py-2'>
                                        <Link href={route('task.edit', task.id)} className='font-medium text-blue-600 mx-4'>
                                            Edit
                                        </Link>
                                        <Link href={route('task.destroy', task.id)} className='font-medium text-red-500'>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>

                            ))
                        ) : (
                            <tr><td colSpan="8" className='text-center py-6 text-base'>No tasks available</td></tr>
                        )}
                    </tbody>
                </table>

            </div>
            <Pagination links={tasks.meta.links} />
        </Fragment>
    )
}
