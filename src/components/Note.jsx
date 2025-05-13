import { MdDelete } from 'react-icons/md';

const Note = ({ title, content, onDelete, id }) => {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button className='delete-btn' onClick={() => onDelete(id)}>
        <MdDelete size={20} />
      </button>
    </div>
  );
};

export default Note;
