import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  message: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={state.email}
          onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={state.message}
          onChange={(e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
        ></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
