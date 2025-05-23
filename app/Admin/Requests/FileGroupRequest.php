<?php

namespace App\Admin\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileGroupRequest extends FormRequest
{
    public function rules(): array
    {
        if ($this->method() == 'PUT') {
            return [
                'group_id' => 'required|integer|exists:file_group,group_id',
                'name' => 'required',
                'sort' => 'required',
                'describe' => 'required',
            ];
        }
        return [
            'name' => 'required',
            'sort' => 'required',
            'describe' => 'required',
        ];
    }
}