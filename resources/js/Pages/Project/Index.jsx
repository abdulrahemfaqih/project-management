import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import TableHeading from '@/Components/TableHeading'

export default function Index({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {}

    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams, {
            preserveScroll: true
        })
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

        router.get(route('project.index'), queryParams, {
            preserveScroll: true
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                                Due Datw
                                            </TableHeading>
                                            <th className='px-3 py-3'>Created By</th>
                                            <th className='px-3 py-3 text-right'>Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className='text-xs text-gray-700 uppercase border-b-2 bg-gray-50 border-gray-500'>
                                        <tr className='text-nowrap'>
                                            <th className='px-3 py-3'></th>
                                            <th className='px-3 py-3'></th>
                                            <th className='px-3 py-3 w-80'>
                                                <TextInput className='w-full' placeholder="Project Name"
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
                                        {projects.data.map(project => (
                                            <tr className='bg-white border-b' key={project.id}>
                                                <th className='px-3 py-2'>{project.id}</th>
                                                <td className='px-3 py-2 w-28 h-28 object-cover'>
                                                    <img src={project.image_path} />
                                                </td>
                                                <th className='px-3 py-2 hover:underline'>
                                                    <Link href={route("project.show", project.id)}>{project.name}</Link>
                                                </th>
                                                <td className='px-3 py-2'>
                                                    <span className={"px-2 py-1 rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                </td>
                                                <td className='px-3 py-2 text-nowrap'>{project.created_at}</td>
                                                <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                                <td className='px-3 py-2'>{project.createdBy.name}</td>
                                                <td className='px-3 py-2'>
                                                    <Link href={route('project.edit', project.id)} className='font-medium text-blue-600 mx-4'>
                                                        Edit
                                                    </Link>
                                                    <Link href={route('project.destroy', project.id)} className='font-medium text-red-500'>
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
