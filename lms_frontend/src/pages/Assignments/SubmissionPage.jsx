import React, { useState } from 'react';
import { TextArea } from '../../components/forms/inputs';
import Button from '../../components/common/Button';

// PUBLIC_INTERFACE
export default function SubmissionPage({ params }) {
  const id = params?.id;
  const [text, setText] = useState('');

  function submit(e) {
    e.preventDefault();
    // mock-safe: no backend call required
    alert('Submission stored locally (mock).');
    window.location.hash = `#/assignments/${id}`;
  }

  return (
    <>
      <header className="page-header">
        <h1>Submit Assignment {id}</h1>
      </header>
      <form onSubmit={submit}>
        <TextArea label="Submission Text" value={text} onChange={setText} placeholder="Paste your answer or reflection..." rows={8} />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
