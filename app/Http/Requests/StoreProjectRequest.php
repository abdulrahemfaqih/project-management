<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "image" => ["nullable", "image" ],
            "name" => ["required", "max:255"],
            "description" => ["string"],
            "due_date" => ["nullable", "date"],
            "status" => ["required", Rule::in(["pending", "in_progress", "completed"])]
        ];
    }

    public function messages()
    {
       return [
            "name.required" => "Nama project wajib diisi",
            "name.max" => "Tidak boleh lebih dari 255 karakter",
            "status.required" => "Status wajib diisi",
            'status.in' => 'Status harus salah satu dari: pending, in_progress, completed.',
            "image.image" => "Isian harus berupa gambar"

       ];
    }
}
