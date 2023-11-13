import { useState } from 'react';
import Input from './Input';
import Button from './button';
import Card from './card';
import Textarea from './Textarea';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');
import { getInitialData } from '../utils';

export default function Note() {
    const [newNote, setNewNote] = useState('');
    const [bodyNote, setBodyNote] = useState('');
    const initialNotes = getInitialData();
    const [notes, setNotes] = useState(initialNotes);

    function handleAddNote(e) {
        e.preventDefault();
        const newNoteItem = {
            id: Math.floor(Math.random() * Date.now()),
            title: newNote,
            body: bodyNote,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        setNotes((prevNotes) => [...prevNotes, newNoteItem]);
        setNewNote('');
        setBodyNote('');
    }

    function handleArchiveNote(id) {
        const updateNote = notes.map((note) => {
            if (id === note.id) {
                return {
                    ...note,
                    archived: !note.archived,
                };
            }
            return note;
        });

        setNotes(updateNote);
    }

    function handleMoveNote(id) {
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return {
                    ...note,
                    archived: false,
                };
            }
            return note;
        });

        setNotes(updatedNotes);
    }

    const [searchTerm, setSearchTerm] = useState('');

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    const filteredNotes = notes.filter((note) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const lowerCaseNoteName = note.title.toLowerCase();
        const lowerCaseNoteBody = note.body.toLowerCase();

        return (
            (note.archived && lowerCaseNoteName.includes(lowerCaseSearchTerm)) ||
            (!note.archived && (lowerCaseNoteName.includes(lowerCaseSearchTerm) || lowerCaseNoteBody.includes(lowerCaseSearchTerm)))
        );
    });

    function handleRemoveNote(id) {
        const removeNote = notes.filter((note) => note.id !== id);
        {
            setNotes(removeNote);
        }
    }

    return (
        <div className='grid grid-cols-2 gap-4 p-10 w-full'>
            <div>
                <div className='mb-4'>
                    <div className='relative'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 20'>
                                <path
                                    stroke='currentColor'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                />
                            </svg>
                        </div>
                        <input
                            type='search'
                            id='search'
                            title='search'
                            value={searchTerm}
                            onChange={handleSearch}
                            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Search note'
                        />
                    </div>
                </div>
                <Card>
                    <Card.Title>Buat Catatan</Card.Title>
                    <Card.Body>
                        <form onSubmit={handleAddNote}>
                            <div className='flex flex-col items-center gap-x-2'>
                                <div className='mb-4 w-full'>
                                    <label className='block text-sm font-medium text-gray-900'>Judul</label>
                                    <Input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label className='block text-sm font-medium text-gray-900'>Catatan</label>
                                    <Textarea value={bodyNote} onChange={(e) => setBodyNote(e.target.value)} />
                                </div>
                                <Button type='primary' htmlType='submit'>
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
            <div>
                {notes.length > 0 ? (
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <div className='w-full justify-center items-center flex'>
                                <h2 className='text-lg font-bold'>Note</h2>
                            </div>
                            <div className='h-[400px] p-4 overflow-auto max-h-full'>
                                {filteredNotes
                                    .filter((note) => !note.archived)
                                    .map((note) => (
                                        <Card key={note.id}>
                                            <Card.Title>
                                                {note.title}
                                            </Card.Title>
                                            <Card.Body>
                                                <p className='text-gray-800 mb-2'>{note.body}</p>
                                                <p className='text-xs text-gray-500'>{dayjs(note.createdAt).format('dddd, D MMM YYYY')}</p>
                                            </Card.Body>
                                            <Card.Footer>
                                                <button
                                                    onClick={() => handleArchiveNote(note.id)}
                                                    className='px-2 bg-yellow-500 rounded py-1 border text-xs w-full font-bold text-white hover:bg-yellow-600'>
                                                    Archive
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveNote(note.id)}
                                                    className='px-2 bg-red-500 rounded py-1 border text-xs w-full font-bold text-white hover:bg-red-600'>
                                                    Remove
                                                </button>
                                            </Card.Footer>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <div className='w-full justify-center items-center flex'>
                                <h2 className='text-lg font-bold'>Archive</h2>
                            </div>
                            <div className='h-[400px] p-4 overflow-auto max-h-full'>
                                {filteredNotes
                                    .filter((note) => note.archived)
                                    .map((note) => (
                                        <Card key={note.id}>
                                            <Card.Title>{note.title}</Card.Title>
                                            <Card.Body>
                                                <p className='text-gray-800 mb-2'>{note.body}</p>
                                                <p className='text-xs text-gray-500'>{dayjs(note.createdAt).format('dddd, D MMM YYYY')}</p>
                                            </Card.Body>
                                            <Card.Footer>
                                                <button
                                                    onClick={() => handleMoveNote(note.id)}
                                                    className='px-2 bg-yellow-500 rounded py-1 border text-xs w-full font-bold text-white hover:bg-yellow-600'>
                                                    Pindahkan
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveNote(note.id)}
                                                    className='px-2 bg-red-500 rounded py-1 border text-xs w-full font-bold text-white hover:bg-red-600'>
                                                    Remove
                                                </button>
                                            </Card.Footer>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='text-white w-full text-center h-full items-center'>
                            <p>Tidak ada catatan</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
