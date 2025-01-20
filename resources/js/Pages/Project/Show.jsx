import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import TaskTable from '../Task/TaskTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

export default function Show({ project, auth, tasks, queryParams }) {
    const breadCrumbs = [
        { label: "project", href: route("project.index") },
        { label: project.name , href: route("project.show", project.id) },
    ]
    return (
        <AuthenticatedLayout

            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Project ${project.name}`}
                </h2>
            }
        >
            <Head title={`Project ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <Breadcrumbs breadcrumbs={breadCrumbs}/>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project.image_path}
                                className='w-full h-64 object-cover'
                            />
                        </div>
                        <div className="p-6 text-gray-900 space-y-6">
                            <div className='grid gap-1 grid-cols-2'>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='font-bold text-lg'>Project ID </label>
                                        <p className='mt-1'>{project.id}</p>
                                    </div>
                                    <div >
                                        <label className='font-bold text-lg'>Project Name </label>
                                        <p className='mt-1'>{project.name}</p>
                                    </div>
                                    <div>
                                        <label className='font-bold text-lg'>Project Status</label>
                                        <p className='mt-1'>
                                            <span className={"px-2 py-1 rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className='font-bold text-lg'>Created by</label>
                                        <p className='mt-1'>{project.createdBy.name}</p>
                                    </div>

                                </div>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{project.due_date}</p>
                                    </div>
                                    <div>
                                        <label className='font-bold text-lg'>Create Date</label>
                                        <p className='mt-1'>{project.created_at}</p>
                                    </div>
                                    <div>
                                        <label className='font-bold text-lg'>Updated by</label>
                                        <p className='mt-1'>{project.updatedBy.name}</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <label className='font-bold text-lg'>Project Description</label>
                                <p className='mt-1'>{project.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-6">
                            <TaskTable tasks={tasks} queryParams={{ ...queryParams, project_id: project.id }} context='project' hideProjectColumn={true} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
