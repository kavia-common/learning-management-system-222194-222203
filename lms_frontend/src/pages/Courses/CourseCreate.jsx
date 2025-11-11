import React, { useState } from 'react';
import { TextInput, TextArea } from '../../components/forms/inputs';
import Button from '../../components/common/Button';
import { courseService } from '../../services/courseService';

// PUBLIC_INTERFACE
export default function CourseCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleCreate(e) {
    e.preventDefault();
    const created = await courseService.create({ title, description });
    if (created?.id) {
      window.location.hash = `#/courses/${created.id}`;
    } else {
      window.location.hash = '#/courses';
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Create Course</h1>
        <div style={{ flex: 1 }} />
        <Button kind="ghost" onClick={() => (window.location.hash = '#/courses')}>Cancel</Button>
      </header>
      <form onSubmit={handleCreate}>
        <TextInput label="Title" value={title} onChange={setTitle} required placeholder="Intro to Oceanography" />
        <TextArea label="Description" value={description} onChange={setDescription} placeholder="What is this course about?" />
        <Button type="submit">Create</Button>
      </form>
    </>
  );
}
