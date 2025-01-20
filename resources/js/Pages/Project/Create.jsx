import Breadcrumbs from '@/Components/Breadcrumbs'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

export default function Create({ auth }) {
    const breadCrumbs = [
        { label: "project", href: route("project.index") },
        { label: "create", href: route("project.create") },
    ]

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        image: '',
        status: '',
        description: '',
        due_date: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()

        post(route("project.store"))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create new project
                </h2>
            }
        >

            <Head title="Create Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Breadcrumbs breadcrumbs={breadCrumbs} />
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={onSubmit} className='space-y-6' encType="multipart/form-data">

                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput
                                        type="file"
                                        className="mt-1 w-full block"
                                        onChange={(file) => setData('image', file)} 
                                    />
                                    <InputError message={errors.image} className='mt-2' />
                                </div>
                                <div>
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput
                                        id="project_name"
                                        className="mt-1 w-full block" name="name" type="text" value={data.name}
                                        onChange={e => setData("name", e.target.value)}
                                    />
                                    <InputError message={errors.name} className='mt-2' />
                                </div>
                                <div>
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput
                                        id="project_description"
                                        name="description"
                                        className="mt-1 block w-full"
                                        onChange={e => setData("description", e.target.value)}
                                        value={ data.description }
                                    />
                                    <InputError message={errors.description} className='mt-2' />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="project_due_date"
                                        value="Project Deadline"
                                    />

                                    <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("due_date", e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput
                                        name="status"
                                        id="project_status"
                                        className="mt-1 block w-full"
                                        onChange={e => setData("status", e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className='mt-2' />
                                </div>
                                <div className='flex items-center justify-end space-x-3'>
                                    <Link href={route("project.index")} className='py-1 px-3 bg-gray-200 hover:bg-gray-400'>
                                        Cancel
                                    </Link>
                                    <button type='submit' className='py-1 px-3 bg-gray-200 hover:bg-gray-400'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
