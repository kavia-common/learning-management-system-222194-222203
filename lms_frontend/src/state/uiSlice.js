export const initialUiState = {
  modalOpen: false,
  toast: null,
};

export function uiReducer(state, action) {
  switch (action.type) {
    case 'ui/openModal':
      return { ...state, modalOpen: true };
    case 'ui/closeModal':
      return { ...state, modalOpen: false };
    case 'ui/toast':
      return { ...state, toast: action.payload };
    default:
      return state;
  }
}
