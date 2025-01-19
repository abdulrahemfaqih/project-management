import React from 'react'
import { Link } from '@inertiajs/react'

const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <nav className="breadcrumbs mb-2">
            <ul className="flex">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex items-center">
                        {/* Jika bukan elemen terakhir, tampilkan Link */}
                        {index < breadcrumbs.length - 1 ? (
                            <Link href={breadcrumb.href} className="text-gray-800">
                                {breadcrumb.label}
                            </Link>
                        ) : (
                            <span className="text-gray-500">{breadcrumb.label}</span>
                        )}
                        {/* Tampilkan separator '>' antara breadcrumb */}
                        {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-500">/</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
